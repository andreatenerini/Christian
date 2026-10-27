import Link from 'next/link'
import { Hero } from '@/components/sections/Hero'
import { Intro } from '@/components/sections/Intro'
import { Didattica } from '@/components/sections/Didattica'
import { Inclusi } from '@/components/sections/Inclusi'
import { RoadTrip } from '@/components/sections/RoadTrip'
import { ChiSonoTeaser } from '@/components/sections/ChiSonoTeaser'
import { PhotoMosaic } from '@/components/sections/PhotoMosaic'
import { CtaFinale } from '@/components/sections/CtaFinale'
import { ArrowIcon } from '@/components/Icons'
import { asMedia, asMediaList, getChiSono, getHome, getImpostazioni, getProgrammaInEvidenza } from '@/lib/cms'
import { buildContatti } from '@/lib/contatti'

export default async function HomePage() {
  const [home, chiSono, impostazioni, programma] = await Promise.all([
    getHome(),
    getChiSono(),
    getImpostazioni(),
    getProgrammaInEvidenza(),
  ])
  const contatti = buildContatti(impostazioni)
  const programmaHref = programma ? `/vacanza-studio/${programma.slug}` : undefined
  const galleria = asMediaList(home.galleriaFoto)

  return (
    <>
      <Hero
        etichetta={home.hero.etichetta}
        titolo={home.hero.titolo}
        sottotitolo={home.hero.sottotitolo}
        immagine={asMedia(home.hero.immagine)}
        contatti={contatti}
        programmaHref={programmaHref}
      />

      <Intro
        titolo={home.intro?.titolo}
        testo={home.intro?.testo}
        punti={home.intro?.punti ?? []}
        immagini={asMediaList(home.intro?.immagini)}
      />

      {programma && (
        <>
          <Didattica didattica={programma.didattica} />
          <Inclusi inclusi={programma.inclusi} />
          <RoadTrip intro={programma.roadTripIntro} tappe={programma.tappe} foto={asMediaList(programma.galleria)} />
        </>
      )}

      <ChiSonoTeaser
        foto={asMedia(chiSono.foto)}
        titolo={chiSono.titolo}
        citazione={chiSono.citazione}
        tappe={chiSono.tappe ?? []}
      />

      {galleria.length > 0 && (
        <section className="bg-cream-dark py-20 sm:py-28">
          <div className="container-app">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow text-teal">Galleria</p>
                <h2 className="h-section mt-4 max-w-xl text-petrol-ink">
                  {home.galleriaTitolo || 'Com’è andata l’ultima estate'}
                </h2>
              </div>
              <Link href="/galleria" className="btn-petrol">
                Tutte le foto <ArrowIcon />
              </Link>
            </div>
            <PhotoMosaic foto={galleria} />
          </div>
        </section>
      )}

      <CtaFinale titolo={home.cta?.titolo} testo={home.cta?.testo} contatti={contatti} interesse={programma?.titolo} />
    </>
  )
}
