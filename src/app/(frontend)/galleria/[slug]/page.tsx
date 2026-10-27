import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PhotoMosaic } from '@/components/sections/PhotoMosaic'
import { asMediaList, getGalleria, getGallerie } from '@/lib/cms'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const gallerie = await getGallerie()
  return gallerie.map((g) => ({ slug: g.slug as string }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const galleria = await getGalleria(slug)
  return galleria ? { title: galleria.titolo, description: galleria.descrizione ?? undefined } : {}
}

export default async function GalleriaDettaglio({ params }: Props) {
  const { slug } = await params
  const galleria = await getGalleria(slug)
  if (!galleria) notFound()

  return (
    <section className="py-16 sm:py-24">
      <div className="container-app">
        <Link href="/galleria" className="text-sm font-semibold text-teal hover:text-petrol-ink">
          ← Tutte le gallerie
        </Link>
        <p className="eyebrow mt-8 text-teal">{[galleria.luogo, galleria.anno].filter(Boolean).join(' · ')}</p>
        <h1 className="mt-3 max-w-3xl text-[44px] leading-[1.05] text-petrol-ink sm:text-6xl">{galleria.titolo}</h1>
        {galleria.descrizione && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-petrol-deep/80">{galleria.descrizione}</p>
        )}
        <div className="mt-12">
          <PhotoMosaic foto={asMediaList(galleria.foto)} />
        </div>
      </div>
    </section>
  )
}
