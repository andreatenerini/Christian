import Link from 'next/link'
import type { Media } from '@/payload-types'
import { CmsImage } from '../CmsImage'
import { ArrowIcon } from '../Icons'

interface ChiSonoTeaserProps {
  foto: Media | null
  titolo: string
  citazione?: string | null
  tappe: { id?: string | null; etichetta: string; testo: string }[]
}

export function ChiSonoTeaser({ foto, titolo, citazione, tappe }: ChiSonoTeaserProps) {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-app grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-md">
          <div className="sun-mask relative aspect-square overflow-hidden">
            <CmsImage media={foto} size="card" sizes="(min-width:1024px) 420px, 85vw" />
          </div>
        </div>

        <div>
          <p className="eyebrow text-teal">Chi ti accompagna</p>
          <h2 className="h-section mt-4 text-petrol-ink">{titolo}</h2>
          {citazione && (
            <blockquote className="mt-7 border-l-4 border-sun-orange pl-5 font-display text-2xl italic leading-snug text-petrol-deep">
              “{citazione}”
            </blockquote>
          )}
          {tappe.length > 0 && (
            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
              {tappe.slice(0, 6).map((t, i) => (
                <div key={t.id ?? i}>
                  <dt className="font-display text-3xl text-sun-red">{t.etichetta}</dt>
                  <dd className="mt-1 text-[14px] leading-snug text-petrol-deep/75">{t.testo}</dd>
                </div>
              ))}
            </dl>
          )}
          <Link href="/chi-sono" className="btn-petrol mt-10">
            La mia storia <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  )
}
