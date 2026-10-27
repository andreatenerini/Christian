import type { Metadata } from 'next'
import Link from 'next/link'
import { CmsImage } from '@/components/CmsImage'
import { ArrowIcon } from '@/components/Icons'
import { asMedia, getGallerie } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Galleria',
  description: 'Le foto dei viaggi accompagnati da Christian: vacanze studio in Florida e tour di gruppo.',
}

export default async function GalleriaPage() {
  const gallerie = await getGallerie()

  return (
    <section className="py-16 sm:py-24">
      <div className="container-app">
        <p className="eyebrow text-teal">Galleria</p>
        <h1 className="mt-4 max-w-3xl text-[44px] leading-[1.05] text-petrol-ink sm:text-6xl">
          I viaggi, raccontati dalle foto
        </h1>

        {gallerie.length === 0 ? (
          <p className="mt-10 text-petrol-deep/70">Nessuna galleria pubblicata per ora.</p>
        ) : (
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {gallerie.map((g, i) => {
              const totale = Array.isArray(g.foto) ? g.foto.length : 0
              return (
                <li key={g.id} className={i === 0 ? 'md:col-span-2' : ''}>
                  <Link
                    href={`/galleria/${g.slug}`}
                    className="group relative block overflow-hidden rounded-[28px] bg-petrol-ink shadow-soft"
                  >
                    <div className={`relative ${i === 0 ? 'aspect-[4/3] md:aspect-[21/9]' : 'aspect-[4/3]'}`}>
                      <CmsImage
                        media={asMedia(g.copertina)}
                        size={i === 0 ? 'hero' : 'card'}
                        sizes={i === 0 ? '100vw' : '(min-width:768px) 50vw, 100vw'}
                        className="transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-petrol-ink/90 via-petrol-ink/20 to-transparent" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-cream sm:p-8">
                      <div>
                        <p className="eyebrow text-sun-gold">
                          {[g.luogo, g.anno].filter(Boolean).join(' · ')}
                        </p>
                        <h2 className="mt-2 text-3xl sm:text-4xl">{g.titolo}</h2>
                        <p className="mt-1 text-sm text-cream/70">{totale} foto</p>
                      </div>
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sun-orange text-petrol-ink transition group-hover:translate-x-1">
                        <ArrowIcon className="h-5 w-5" />
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
