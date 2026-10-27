import type { Media, Programmi } from '@/payload-types'
import { CmsImage } from '../CmsImage'
import { PinIcon } from '../Icons'

interface RoadTripProps {
  intro?: string | null
  tappe: Programmi['tappe']
  foto: Media[]
}

export function RoadTrip({ intro, tappe, foto }: RoadTripProps) {
  if (!tappe?.length) return null

  return (
    <section className="relative overflow-hidden bg-petrol-ink py-20 text-cream sm:py-28">
      <div className="container-app">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-sun-orange">Turismo</p>
            <h2 className="h-section mt-4">
              Un road trip lungo
              <br />
              <span className="bg-sunset-x bg-clip-text text-transparent">tutta la Florida</span>
            </h2>
          </div>
          {intro && <p className="text-[17px] leading-relaxed text-cream/75">{intro}</p>}
        </div>

        <ol className="mt-14 flex flex-wrap gap-x-2 gap-y-3" aria-label="Tappe del road trip">
          {tappe.map((t, i) => (
            <li key={t.id ?? i} className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/[0.06] py-2 pl-2 pr-4 text-[15px] transition hover:border-sun-orange/60 hover:bg-cream/10">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sun-orange/15 text-[12px] font-bold tabular-nums text-sun-gold">
                  {i + 1}
                </span>
                <span className="font-semibold">{t.localita}</span>
                {t.nota && <span className="text-cream/55">· {t.nota}</span>}
              </span>
              {i < tappe.length - 1 && (
                <span className="hidden h-px w-4 border-t border-dashed border-cream/30 sm:block" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>

        {foto.length > 0 && (
          <div className="-mx-4 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0">
            {foto.slice(0, 4).map((m, i) => (
              <figure
                key={m.id}
                className={`relative aspect-[3/4] w-[70%] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-auto ${
                  i % 2 === 1 ? 'sm:translate-y-8' : ''
                }`}
              >
                <CmsImage media={m} size="card" sizes="(min-width:640px) 25vw, 70vw" />
                {m.didascalia && (
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-petrol-ink/90 to-transparent px-4 pb-3 pt-10 text-[13px] font-semibold">
                    <PinIcon className="h-4 w-4 text-sun-orange" />
                    {m.didascalia}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
