import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CmsImage } from '@/components/CmsImage'
import { RichText } from '@/components/RichText'
import { SunStripes } from '@/components/SunStripes'
import { Didattica } from '@/components/sections/Didattica'
import { Inclusi } from '@/components/sections/Inclusi'
import { RoadTrip } from '@/components/sections/RoadTrip'
import { PhotoMosaic } from '@/components/sections/PhotoMosaic'
import { CtaFinale } from '@/components/sections/CtaFinale'
import { PhoneBlock } from '@/components/sections/PhoneBlock'
import { asMedia, asMediaList, getImpostazioni, getProgramma, getProgrammi } from '@/lib/cms'
import { buildContatti } from '@/lib/contatti'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const programmi = await getProgrammi()
  return programmi.map((p) => ({ slug: p.slug as string }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const programma = await getProgramma(slug)
  if (!programma) return {}
  return {
    title: programma.titolo,
    description: programma.sottotitolo ?? undefined,
    openGraph: { images: asMedia(programma.copertina)?.url ? [asMedia(programma.copertina)!.url!] : [] },
  }
}

export default async function ProgrammaPage({ params }: Props) {
  const { slug } = await params
  const [programma, impostazioni] = await Promise.all([getProgramma(slug), getImpostazioni()])
  if (!programma) notFound()
  const contatti = buildContatti(impostazioni)
  const foto = asMediaList(programma.galleria)
  const opzioni = programma.opzioni ?? []

  return (
    <>
      <section className="relative isolate overflow-hidden bg-petrol-ink text-cream">
        <div className="absolute inset-0 -z-10 opacity-60">
          <CmsImage media={asMedia(programma.copertina)} size="hero" priority />
        </div>
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-petrol-ink via-petrol-ink/60 to-petrol-ink/30"
          aria-hidden="true"
        />
        <div className="container-app pb-16 pt-24 sm:pb-24 sm:pt-36">
          <div className="flex flex-wrap gap-2">
            {programma.periodo && (
              <span className="rounded-full bg-sun-orange px-4 py-1.5 text-[13px] font-bold text-petrol-ink">
                {programma.periodo}
              </span>
            )}
            {programma.destinatari && (
              <span className="rounded-full border border-cream/30 px-4 py-1.5 text-[13px] font-semibold">
                {programma.destinatari}
              </span>
            )}
          </div>
          <h1
            className="mt-6 max-w-4xl text-[40px] leading-[1.05] sm:text-6xl lg:text-7xl"
            style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 1, 'opsz' 144" }}
          >
            {programma.titolo}
          </h1>
          {programma.sottotitolo && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/85 sm:text-xl">{programma.sottotitolo}</p>
          )}
        </div>
        <SunStripes />
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-app grid gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
          <div>
            <p className="eyebrow text-teal">Il programma</p>
            <RichText data={programma.descrizione} className="prose-cms mt-5" />
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[28px] bg-white p-7 shadow-soft ring-1 ring-petrol/5 sm:p-9">
              <PhoneBlock contatti={contatti} tone="dark" label="Prezzi e disponibilità" size="compact" />
              <p className="mt-6 text-center text-[14px] leading-relaxed text-petrol-deep/70">
                Ogni gruppo è piccolo e su misura: chiamami e ti preparo una proposta con il prezzo migliore.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Didattica didattica={programma.didattica} />
      <Inclusi inclusi={programma.inclusi} />
      <RoadTrip intro={programma.roadTripIntro} tappe={programma.tappe} foto={foto} />

      {opzioni.length > 0 && (
        <section className="py-20 sm:py-24">
          <div className="container-app">
            <p className="eyebrow text-teal">Su misura</p>
            <h2 className="h-section mt-4 max-w-2xl text-petrol-ink">Opzioni e servizi in più</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {opzioni.map((o, i) => (
                <div
                  key={o.id ?? i}
                  className={`rounded-3xl p-7 ${i === 0 ? 'bg-sun-orange text-petrol-ink' : 'bg-white shadow-soft ring-1 ring-petrol/5'}`}
                >
                  <h3 className="text-2xl leading-snug">{o.titolo}</h3>
                  {o.testo && (
                    <p className={`mt-3 text-[15px] leading-relaxed ${i === 0 ? 'text-petrol-ink/80' : 'text-petrol-deep/75'}`}>
                      {o.testo}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {foto.length > 4 && (
        <section className="bg-cream-dark py-20 sm:py-24">
          <div className="container-app">
            <h2 className="h-section mb-10 text-petrol-ink">Le foto del viaggio</h2>
            <PhotoMosaic foto={foto} />
          </div>
        </section>
      )}

      <CtaFinale
        titolo="Vuoi sapere il prezzo?"
        testo="Nessun listino da decifrare: chiamami o scrivimi e ti rispondo personalmente."
        contatti={contatti}
        interesse={programma.titolo}
      />
    </>
  )
}
