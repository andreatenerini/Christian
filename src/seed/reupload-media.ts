/**
 * Ricarica sullo storage attivo (Vercel Blob) le immagini già presenti nel DB,
 * aggiornando i record esistenti: relazioni e id restano invariati.
 * Prende i file da /media (upload locali) o, in mancanza, da /seed/images.
 * Uso: npm run media:reupload            (tutte)
 *      npm run media:reupload -- --limit 1
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const SOURCES = [path.resolve(dirname, '../../media'), path.resolve(dirname, '../../seed/images')]

function findSource(filename: string): string | null {
  for (const dir of SOURCES) {
    const candidate = path.join(dir, filename)
    if (fs.existsSync(candidate)) return candidate
  }
  return null
}

async function reupload() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN mancante: niente da fare')
  const limitArg = process.argv.indexOf('--limit')
  const limit = limitArg > -1 ? Number(process.argv[limitArg + 1]) : 1000

  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'media', limit, depth: 0, sort: 'id' })

  let ok = 0
  for (const doc of docs) {
    if (doc.url?.includes('blob.vercel-storage.com')) continue
    const source = doc.filename ? findSource(doc.filename) : null
    if (!source) {
      payload.logger.warn(`file sorgente non trovato per ${doc.filename}`)
      continue
    }
    await payload.update({ collection: 'media', id: doc.id, data: {}, filePath: source })
    ok++
    payload.logger.info(`ricaricata: ${doc.filename}`)
  }
  payload.logger.info(`Fatto: ${ok} immagini ricaricate su ${docs.length}`)
  process.exit(0)
}

// top-level await: `payload run` termina il processo appena l'import del modulo si risolve
try {
  await reupload()
} catch (err: unknown) {
  console.error(err)
  process.exit(1)
}
