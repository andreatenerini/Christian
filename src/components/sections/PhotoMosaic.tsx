import type { Media } from '@/payload-types'
import { CmsImage } from '../CmsImage'

interface PhotoMosaicProps {
  foto: Media[]
}

/** Griglia fotografica a colonne (masonry CSS), mantiene le proporzioni originali. */
export function PhotoMosaic({ foto }: PhotoMosaicProps) {
  if (!foto.length) return null
  return (
    <div className="columns-2 gap-3 sm:gap-4 lg:columns-3 [&>figure]:mb-3 sm:[&>figure]:mb-4">
      {foto.map((m) => (
        <figure key={m.id} className="group relative break-inside-avoid overflow-hidden rounded-2xl bg-petrol/10">
          <CmsImage
            media={m}
            size="card"
            fill={false}
            sizes="(min-width:1024px) 33vw, 50vw"
            className="h-auto w-full transition duration-500 group-hover:scale-[1.03]"
          />
          {m.didascalia && (
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-petrol-ink/85 to-transparent px-3 pb-2.5 pt-8 text-[13px] font-semibold text-cream sm:px-4 sm:text-sm">
              {m.didascalia}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}
