import type { Programmi } from '@/payload-types'

interface DidatticaProps {
  didattica: Programmi['didattica']
}

export function Didattica({ didattica }: DidatticaProps) {
  if (!didattica) return null
  const numeri = didattica.numeri ?? []
  const unita = didattica.unita ?? []

  return (
    <section className="relative overflow-hidden bg-petrol py-20 text-cream sm:py-28">
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-sunset opacity-[0.13] blur-2xl"
        aria-hidden="true"
      />
      <div className="container-app relative">
        <div className="max-w-2xl">
          <p className="eyebrow text-sun-gold">Didattica</p>
          {didattica.titolo && <h2 className="h-section mt-4">{didattica.titolo}</h2>}
          {didattica.introduzione && (
            <p className="mt-5 text-[17px] leading-relaxed text-cream/75">{didattica.introduzione}</p>
          )}
        </div>

        {numeri.length > 0 && (
          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-cream/10 lg:grid-cols-4">
            {numeri.map((n, i) => (
              <div key={n.id ?? i} className="bg-petrol px-5 py-7 sm:px-7 sm:py-9">
                <dt className="sr-only">{n.etichetta}</dt>
                <dd>
                  <span
                    className="block font-display text-5xl leading-none text-sun-gold sm:text-6xl"
                    style={{ fontVariationSettings: "'SOFT' 100, 'opsz' 144" }}
                  >
                    {n.valore}
                  </span>
                  <span className="mt-3 block text-[15px] leading-snug text-cream/80" aria-hidden="true">
                    {n.etichetta}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}

        {unita.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl text-cream sm:text-3xl">
              {unita.length} unità didattiche di inglese americano
            </h3>
            <ol className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {unita.map((u, i) => (
                <li key={u.id ?? i} className="flex items-baseline gap-4 border-t border-cream/15 py-4">
                  <span className="w-7 shrink-0 text-sm font-bold tabular-nums text-sun-orange">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[16px] text-cream/90" lang="en">
                    {u.titolo}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  )
}
