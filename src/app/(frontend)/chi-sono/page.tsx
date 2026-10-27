import type { Metadata } from 'next'
import { CmsImage } from '@/components/CmsImage'
import { RichText } from '@/components/RichText'
import { SunStripes } from '@/components/SunStripes'
import { PhotoMosaic } from '@/components/sections/PhotoMosaic'
import { CtaFinale } from '@/components/sections/CtaFinale'
import { asMedia, asMediaList, getChiSono, getImpostazioni } from '@/lib/cms'
import { buildContatti } from '@/lib/contatti'

export const metadata: Metadata = {
  title: 'Chi sono',
  description: 'Christian, titolare di Americanitalia: vive a Orlando, insegnante e guida turistica, tour leader per ragazzi.',
}

export default async function ChiSonoPage() {
  const [chiSono, impostazioni] = await Promise.all([getChiSono(), getImpostazioni()])
  const contatti = buildContatti(impostazioni)
  const tappe = chiSono.tappe ?? []
  const fotoEsperienze = asMediaList(chiSono.fotoEsperienze)

  return (
    <>
      <section className="overflow-hidden pt-14 sm:pt-20">
        <div className="container-app grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="pb-6 lg:pb-20">
            <p className="eyebrow text-teal">Chi sono</p>
            <h1
              className="mt-4 text-[44px] leading-[1.04] text-petrol-ink sm:text-6xl lg:text-7xl"
              style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 1, 'opsz' 144" }}
            >
              {chiSono.titolo}
            </h1>
            {chiSono.sottotitolo && (
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-petrol-deep/80">{chiSono.sottotitolo}</p>
            )}
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full shadow-lift">
              <CmsImage media={asMedia(chiSono.foto)} size="card" priority sizes="(min-width:1024px) 40vw, 90vw" />
            </div>
          </div>
        </div>
        <SunStripes />
      </section>

      {tappe.length > 0 && (
        <section className="bg-petrol-ink py-14 text-cream">
          <dl className="container-app grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {tappe.map((t, i) => (
              <div key={t.id ?? i}>
                <dt className="font-display text-4xl text-sun-gold">{t.etichetta}</dt>
                <dd className="mt-2 text-[14px] leading-snug text-cream/75">{t.testo}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="py-20 sm:py-28">
        <div className="container-app grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {chiSono.citazione && (
            <blockquote className="font-display text-3xl italic leading-snug text-petrol-deep lg:sticky lg:top-28 lg:self-start">
              <span className="block text-6xl leading-none text-sun-orange" aria-hidden="true">
                “
              </span>
              {chiSono.citazione}
            </blockquote>
          )}
          <RichText data={chiSono.biografia} />
        </div>
      </section>

      {fotoEsperienze.length > 0 && (
        <section className="bg-cream-dark py-20 sm:py-28">
          <div className="container-app">
            <p className="eyebrow text-teal">Esperienza sul campo</p>
            <h2 className="h-section mb-10 mt-4 max-w-2xl text-petrol-ink">
              {chiSono.fotoEsperienzeTitolo || 'I gruppi che ho accompagnato'}
            </h2>
            <PhotoMosaic foto={fotoEsperienze} />
          </div>
        </section>
      )}

      <CtaFinale
        titolo="Parliamo del tuo viaggio"
        testo="Rispondo io, di persona: niente call center."
        contatti={contatti}
      />
    </>
  )
}
