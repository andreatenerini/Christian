import type { Media } from '@/payload-types'
import { CmsImage } from '../CmsImage'
import { SunStripes } from '../SunStripes'

interface HeroProps {
  etichetta?: string | null
  titolo: string
  sottotitolo?: string | null
  immagine: Media | null
}

/** Hero della home. Numero di telefono e CTA stanno nella fascia subito sotto (HeroContatti). */
export function Hero({ etichetta, titolo, sottotitolo, immagine }: HeroProps) {
  return (
    <section className="hero-home relative isolate flex flex-col overflow-hidden bg-petrol-ink">
      <div className="absolute inset-0 -z-10 motion-safe:animate-hero-zoom">
        <CmsImage media={immagine} size="hero" priority sizes="100vw" />
      </div>
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(11,31,28,0.55) 0%, rgba(11,31,28,0.35) 35%, rgba(11,31,28,0.72) 72%, rgba(11,31,28,0.92) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="container-app flex flex-1 flex-col items-center justify-center py-14 text-center sm:py-20">
        {etichetta && <p className="eyebrow animate-fade-up text-sage-light">{etichetta}</p>}
        <h1
          className="mt-5 max-w-4xl animate-fade-up text-[40px] leading-[1.04] text-cream [animation-delay:80ms] sm:text-6xl lg:text-[76px]"
          style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 1, 'opsz' 144" }}
        >
          {titolo}
        </h1>
        {sottotitolo && (
          <p className="mt-6 max-w-2xl animate-fade-up text-[17px] leading-relaxed text-cream/85 [animation-delay:160ms] sm:text-xl">
            {sottotitolo}
          </p>
        )}
      </div>

      <SunStripes className="opacity-95" />
    </section>
  )
}
