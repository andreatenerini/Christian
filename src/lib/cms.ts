import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Gallerie, Media, Pagine, Programmi } from '@/payload-types'

export const payloadClient = cache(() => getPayload({ config }))

export const getImpostazioni = cache(async () => {
  const payload = await payloadClient()
  return payload.findGlobal({ slug: 'impostazioni', depth: 0 })
})

export const getHome = cache(async () => {
  const payload = await payloadClient()
  return payload.findGlobal({ slug: 'home', depth: 1 })
})

export const getChiSono = cache(async () => {
  const payload = await payloadClient()
  return payload.findGlobal({ slug: 'chi-sono', depth: 1 })
})

export const getProgrammi = cache(async (): Promise<Programmi[]> => {
  const payload = await payloadClient()
  const res = await payload.find({
    collection: 'programmi',
    where: { pubblicato: { equals: true } },
    sort: 'ordine',
    depth: 1,
    limit: 50,
  })
  return res.docs
})

export const getProgrammaInEvidenza = cache(async (): Promise<Programmi | null> => {
  const programmi = await getProgrammi()
  return programmi.find((p) => p.inEvidenza) ?? programmi[0] ?? null
})

export const getProgramma = cache(async (slug: string): Promise<Programmi | null> => {
  const programmi = await getProgrammi()
  return programmi.find((p) => p.slug === slug) ?? null
})

export const getGallerie = cache(async (): Promise<Gallerie[]> => {
  const payload = await payloadClient()
  const res = await payload.find({
    collection: 'gallerie',
    where: { pubblicato: { equals: true } },
    sort: 'ordine',
    depth: 1,
    limit: 50,
  })
  return res.docs
})

export const getGalleria = cache(async (slug: string): Promise<Gallerie | null> => {
  const gallerie = await getGallerie()
  return gallerie.find((g) => g.slug === slug) ?? null
})

export const getPagine = cache(async (): Promise<Pagine[]> => {
  const payload = await payloadClient()
  const res = await payload.find({ collection: 'pagine', depth: 0, limit: 50 })
  return res.docs
})

/** Le relazioni upload possono arrivare come id (depth 0) o come documento. */
export function asMedia(value: unknown): Media | null {
  return value && typeof value === 'object' && 'url' in value ? (value as Media) : null
}

export function asMediaList(values: unknown): Media[] {
  return Array.isArray(values) ? values.map(asMedia).filter((m): m is Media => m !== null) : []
}
