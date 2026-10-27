import type { CollectionConfig } from 'payload'
import { revalidateHooks } from '../lib/revalidate'
import { slugField } from '../fields/slug'

export const Pagine: CollectionConfig = {
  slug: 'pagine',
  labels: { singular: 'Pagina', plural: 'Pagine' },
  admin: {
    group: 'Contenuti',
    useAsTitle: 'titolo',
    description: 'Pagine di solo testo (privacy, cookie, condizioni…). Indirizzo: /slug',
  },
  access: { read: () => true },
  hooks: revalidateHooks,
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'titolo', type: 'text', required: true, label: 'Titolo' },
        slugField('titolo'),
      ],
    },
    { name: 'contenuto', type: 'richText', label: 'Contenuto' },
    {
      name: 'inFooter',
      type: 'checkbox',
      label: 'Mostra link nel footer',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
