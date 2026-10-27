import Image from 'next/image'
import type { Media } from '@/payload-types'

type Size = 'thumbnail' | 'card' | 'hero'

interface CmsImageProps {
  media: Media | null | undefined
  size?: Size
  className?: string
  sizes?: string
  priority?: boolean
  fill?: boolean
}

/** Immagine caricata dal CMS, con punto focale rispettato in modalità `fill`. */
export function CmsImage({ media, size, className, sizes = '100vw', priority, fill = true }: CmsImageProps) {
  if (!media?.url) return null
  const variant = size ? media.sizes?.[size] : undefined
  const src = variant?.url || media.url
  const objectPosition =
    typeof media.focalX === 'number' && typeof media.focalY === 'number'
      ? `${media.focalX}% ${media.focalY}%`
      : 'center'

  if (fill) {
    return (
      <Image
        src={src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        style={{ objectFit: 'cover', objectPosition }}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={media.alt}
      width={variant?.width || media.width || 1200}
      height={variant?.height || media.height || 800}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  )
}
