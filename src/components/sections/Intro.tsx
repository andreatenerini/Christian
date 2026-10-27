import type { Media } from '@/payload-types'
import { CmsImage } from '../CmsImage'

interface Punto {
  id?: string | null
  titolo: string
  testo?: string | null
}

interface IntroProps {
  titolo?: string | null
  testo?: string | null
  punti: Punto[]
  immagini: Media[]
}

export function Intro({ titolo, testo, punti, immagini }: IntroProps) {
  const [a, b] = immagini
  return (
    <section className="py-20 sm:py-28">
      <div className="container-app grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <p className="eyebrow text-teal">Non solo una vacanza</p>
          {titolo && <h2 className="h-section mt-4 text-petrol-ink">{titolo}</h2>}
          {testo && <p className="mt-6 whitespace-pre-line text-[17px] leading-[1.75] text-petrol-deep/80">{testo}</p>}

          {punti.length > 0 && (
            <ol className="mt-10 space-y-7">
              {punti.map((p, i) => (
                <li key={p.id ?? i} className="grid grid-cols-[48px_1fr] gap-4">
                  <span className="font-display text-4xl leading-none text-sun-orange" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="border-t border-petrol/15 pt-3">
                    <h3 className="text-xl text-petrol-ink">{p.titolo}</h3>
                    {p.testo && <p className="mt-1.5 text-[15px] leading-relaxed text-petrol-deep/75">{p.testo}</p>}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>

        {a && (
          <div className="relative mx-auto w-full max-w-md pb-16 pr-10 sm:pr-16 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-lift">
              <CmsImage media={a} size="card" sizes="(min-width:1024px) 40vw, 90vw" />
            </div>
            {b && (
              <div className="absolute bottom-0 right-0 aspect-[4/3] w-[58%] overflow-hidden rounded-[22px] border-[6px] border-cream shadow-lift">
                <CmsImage media={b} size="card" sizes="(min-width:1024px) 25vw, 55vw" />
              </div>
            )}
            <span className="absolute -left-3 top-8 rotate-[-4deg] rounded-full bg-sun-orange px-4 py-2 text-[13px] font-bold uppercase tracking-[0.14em] text-petrol-ink shadow-glow">
              Orlando, FL
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
