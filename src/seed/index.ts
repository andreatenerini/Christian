/**
 * Popola il CMS con i contenuti iniziali (testi del brief + foto in /seed/images).
 * Idempotente: le immagini già caricate (stesso nome file) e i documenti con lo stesso slug vengono riusati.
 * Uso: npm run seed
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload, type Payload } from 'payload'
import config from '@payload-config'
import { CHRISTIAN, FLORIDA, IRLANDA, type SeedMedia } from './media'
import { CHI_SONO, HOME, IMPOSTAZIONI, PAGINE, PROGRAMMA } from './content'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = path.resolve(dirname, '../../seed/images')

async function upsertMedia(payload: Payload, item: SeedMedia): Promise<number> {
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: item.file } },
    limit: 1,
  })
  if (existing.docs[0]) return existing.docs[0].id as number
  const doc = await payload.create({
    collection: 'media',
    data: { alt: item.alt, didascalia: item.didascalia },
    filePath: path.join(IMAGES_DIR, item.file),
  })
  payload.logger.info(`media: ${item.file}`)
  return doc.id as number
}

async function upsertBySlug<T extends 'programmi' | 'gallerie' | 'pagine'>(
  payload: Payload,
  collection: T,
  slug: string,
  data: Record<string, unknown>,
) {
  const existing = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1 })
  if (existing.docs[0]) {
    await payload.update({ collection, id: existing.docs[0].id, data: data as never })
  } else {
    await payload.create({ collection, data: { ...data, slug } as never })
  }
  payload.logger.info(`${collection}: ${slug}`)
}

async function seed() {
  const payload = await getPayload({ config })

  const ids: Record<string, number> = {}
  for (const item of [...FLORIDA, ...IRLANDA, CHRISTIAN]) {
    ids[item.file] = await upsertMedia(payload, item)
  }
  const m = (file: string) => {
    const id = ids[file]
    if (!id) throw new Error(`Immagine di seed mancante: ${file}`)
    return id
  }
  const florida = FLORIDA.map((f) => m(f.file))

  await payload.updateGlobal({ slug: 'impostazioni', data: IMPOSTAZIONI })

  await upsertBySlug(payload, 'programmi', PROGRAMMA.slug, {
    ...PROGRAMMA,
    copertina: m('miami-ocean-drive.jpg'),
    galleria: florida.slice(0, 13),
  })

  await upsertBySlug(payload, 'gallerie', 'florida-estate-2026', {
    titolo: 'Vacanza studio in Florida',
    luogo: 'Florida',
    anno: '2026',
    descrizione: 'Tre settimane tra lezioni a Orlando, spiagge, parchi e road trip: le foto del gruppo dell’estate 2026.',
    copertina: m('miami-ocean-drive.jpg'),
    foto: florida,
    ordine: 1,
  })
  await upsertBySlug(payload, 'gallerie', 'irlanda-tour-di-gruppo', {
    titolo: 'Tour di gruppo in Irlanda',
    luogo: 'Irlanda',
    descrizione: 'I viaggi in Irlanda in cui Christian è stato tour leader: scogliere, laghi, pub e Belfast.',
    copertina: m('irlanda-04.jpg'),
    foto: IRLANDA.map((f) => m(f.file)),
    ordine: 2,
  })

  for (const pagina of PAGINE) {
    await upsertBySlug(payload, 'pagine', pagina.slug, pagina)
  }

  await payload.updateGlobal({
    slug: 'home',
    data: {
      ...HOME,
      hero: { ...HOME.hero, immagine: m('tramonto-gruppo.jpg') },
      intro: { ...HOME.intro, immagini: [m('lezione-in-classe.jpg'), m('scuola-welcome.jpg')] },
      galleriaFoto: [
        'partenza-volo.jpg',
        'lake-eola-notte.jpg',
        'battello-sanford.jpg',
        'universal-orlando.jpg',
        'cena-vista-lago.jpg',
        'cowboys-orlando.jpg',
      ].map(m),
    },
  })

  await payload.updateGlobal({
    slug: 'chi-sono',
    data: {
      ...CHI_SONO,
      foto: m(CHRISTIAN.file),
      fotoEsperienze: IRLANDA.slice(0, 9).map((f) => m(f.file)),
    },
  })

  payload.logger.info('Seed completato')
  process.exit(0)
}

// top-level await: `payload run` termina il processo appena l'import del modulo si risolve
try {
  await seed()
} catch (err: unknown) {
  console.error(err)
  process.exit(1)
}
