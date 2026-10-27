import type { Programmi } from '@/payload-types'
import { CheckIcon } from '../Icons'

interface InclusiProps {
  inclusi: Programmi['inclusi']
  titolo?: string
  intro?: string
}

export function Inclusi({ inclusi, titolo = 'Tutto quello che serve, già pensato', intro }: InclusiProps) {
  if (!inclusi?.length) return null
  const [primo, ...altri] = inclusi

  return (
    <section className="bg-cream-dark py-20 sm:py-28">
      <div className="container-app grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-teal">Cosa include</p>
          <h2 className="h-section mt-4 text-petrol-ink">{titolo}</h2>
          {intro && <p className="mt-5 text-[17px] leading-relaxed text-petrol-deep/75">{intro}</p>}
          <div className="mt-8 rounded-3xl bg-petrol-ink p-7 text-cream shadow-lift">
            <p className="eyebrow text-sun-gold">In primo piano</p>
            <p className="mt-3 font-display text-2xl leading-snug">{primo.titolo}</p>
            {primo.dettaglio && <p className="mt-3 text-[15px] leading-relaxed text-cream/75">{primo.dettaglio}</p>}
          </div>
        </div>

        <ul className="grid gap-x-10 sm:grid-cols-2">
          {altri.map((voce, i) => (
            <li key={voce.id ?? i} className="border-t border-petrol/15 py-6">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal text-cream">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-[19px] leading-snug text-petrol-ink">{voce.titolo}</h3>
                  {voce.dettaglio && (
                    <p className="mt-2 text-[15px] leading-relaxed text-petrol-deep/75">{voce.dettaglio}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
