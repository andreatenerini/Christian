import Link from 'next/link'
import type { Contatti } from '@/lib/contatti'
import { ArrowIcon, WhatsAppIcon } from '../Icons'
import { PhoneBlock } from './PhoneBlock'

interface HeroContattiProps {
  contatti: Contatti
  programmaHref?: string
}

/**
 * Fascia subito sotto l'hero della home: numero in evidenza, claim sui prezzi,
 * WhatsApp e link al programma. Lo sfondo petrol prosegue l'ultima striscia dell'hero.
 */
export function HeroContatti({ contatti, programmaHref }: HeroContattiProps) {
  return (
    <section className="bg-petrol py-12 sm:py-16" aria-label="Contatti">
      <div className="container-app flex flex-col items-center text-center">
        <div className="w-full rounded-[28px] border border-cream/15 bg-petrol-ink/45 px-5 py-8 sm:w-auto sm:px-14 sm:py-10">
          <PhoneBlock contatti={contatti} />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
    </section>
  )
}
