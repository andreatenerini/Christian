import Link from 'next/link'
import type { Media } from '@/payload-types'
import type { Contatti } from '@/lib/contatti'
import { CmsImage } from '../CmsImage'
import { ArrowIcon, WhatsAppIcon } from '../Icons'
import { SunStripes } from '../SunStripes'
import { PhoneBlock } from './PhoneBlock'

interface HeroProps {
  etichetta?: string | null
  titolo: string
  sottotitolo?: string | null
  immagine: Media | null
  contatti: Contatti
  programmaHref?: string
}

export function Hero({ etichetta, titolo, sottotitolo, immagine, contatti, programmaHref }: HeroProps) {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-68px)] flex-col overflow-hidden bg-petrol-ink">
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

        <div className="mt-10 w-full animate-fade-up rounded-[28px] border border-cream/15 bg-petrol-ink/45 px-5 py-8 backdrop-blur-md [animation-delay:240ms] sm:mt-12 sm:w-auto sm:px-14 sm:py-10">
          <PhoneBlock contatti={contatti} />
        </div>

        <div className="mt-8 flex animate-fade-up flex-wrap items-center justify-center gap-3 [animation-delay:320ms]">
          {contatti.waLink && (
            <a href={contatti.waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <WhatsAppIcon className="h-5 w-5" /> Scrivimi su WhatsApp
            </a>
          )}
          {programmaHref && (
            <Link href={programmaHref} className="btn-ghost">
              Scopri il programma <ArrowIcon />
            </Link>
          )}
        </div>
      </div>

      <SunStripes className="opacity-95" />
    </section>
  )
}
