import type { CollectionConfig } from 'payload'
import { revalidateHooks } from '../lib/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Immagine', plural: 'Immagini' },
  admin: { group: 'Contenuti', useAsTitle: 'alt' },
  access: { read: () => true },
  hooks: revalidateHooks,
  upload: {
    mimeTypes: ['image/*'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 480, height: 360, position: 'centre' },
      { name: 'card', width: 960, height: 720, position: 'centre' },
      { name: 'hero', width: 1920, height: undefined, position: 'centre' },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Testo alternativo',
      admin: { description: 'Descrive la foto per chi non la vede (accessibilità e Google).' },
    },
    { name: 'didascalia', type: 'text', label: 'Didascalia (facoltativa)' },
  ],
}
