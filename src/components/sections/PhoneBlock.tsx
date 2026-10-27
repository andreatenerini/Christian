import type { Contatti } from '@/lib/contatti'
import { PhoneIcon } from '../Icons'

interface PhoneBlockProps {
  contatti: Contatti
  tone?: 'light' | 'dark'
  label?: string
  /** 'compact' per colonne strette (es. sidebar del programma) */
  size?: 'large' | 'compact'
}

const NUMBER_SIZE = {
  large: 'text-[31px] min-[400px]:text-[34px] sm:text-6xl lg:text-7xl',
  compact: 'text-[31px] min-[400px]:text-[34px] sm:text-5xl lg:text-[40px]',
}

/** Numero di telefono in evidenza, centrato, con la frase sui prezzi subito sotto. */
export function PhoneBlock({
  contatti,
  tone = 'light',
  label = 'Chiama o scrivi a Christian',
  size = 'large',
}: PhoneBlockProps) {
  const light = tone === 'light'
  return (
    <div className="flex flex-col items-center text-center">
      <p className={`eyebrow ${light ? 'text-sun-gold' : 'text-petrol'}`}>{label}</p>
      <a
        href={contatti.telLink}
        className={`group mt-3 inline-flex items-center gap-2.5 font-display leading-none tracking-tight transition sm:gap-4 ${NUMBER_SIZE[size]} ${
          light ? 'text-cream hover:text-sun-gold' : 'text-petrol-ink hover:text-sun-red'
        }`}
        style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 0, 'opsz' 144" }}
      >
        <span
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition group-hover:scale-105 sm:h-16 sm:w-16 ${
            light ? 'bg-sun-orange text-petrol-ink shadow-glow' : 'bg-petrol text-sun-gold'
          }`}
        >
          <PhoneIcon className="h-5 w-5 sm:h-7 sm:w-7" />
        </span>
        <span className="whitespace-nowrap">{contatti.telefono}</span>
      </a>
      <p className={`mt-4 flex items-center gap-3 text-[15px] font-semibold sm:text-lg ${light ? 'text-cream' : 'text-petrol-ink'}`}>
        <span className="hidden h-[3px] w-10 rounded-full bg-sun-orange sm:block" aria-hidden="true" />
        <span className="max-w-[16rem] text-balance sm:max-w-none">{contatti.claim}</span>
        <span className="hidden h-[3px] w-10 rounded-full bg-sun-orange sm:block" aria-hidden="true" />
      </p>
    </div>
  )
}
