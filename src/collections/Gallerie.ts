import type { CollectionConfig } from 'payload'
import { revalidateHooks } from '../lib/revalidate'
import { slugField } from '../fields/slug'

export const Gallerie: CollectionConfig = {
  slug: 'gallerie',
  labels: { singular: 'Galleria', plural: 'Gallerie' },
  admin: {
    group: 'Contenuti',
    useAsTitle: 'titolo',
    defaultColumns: ['titolo', 'anno', 'pubblicato'],
    description: 'Album fotografici dei viaggi. Prima di pubblicare foto di minori serve la liberatoria dei genitori.',
  },
  access: { read: () => true },
  hooks: revalidateHooks,
  defaultSort: 'ordine',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'titolo', type: 'text', required: true, label: 'Titolo' },
        slugField('titolo'),
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'luogo', type: 'text', label: 'Luogo', admin: { placeholder: 'Florida' } },
        { name: 'anno', type: 'text', label: 'Anno', admin: { placeholder: '2026' } },
      ],
    },
    { name: 'descrizione', type: 'textarea', label: 'Descrizione' },
    { name: 'copertina', type: 'upload', relationTo: 'media', required: true, label: 'Copertina' },
    { name: 'foto', type: 'upload', relationTo: 'media', hasMany: true, label: 'Foto' },
    { name: 'pubblicato', type: 'checkbox', label: 'Pubblicata', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'ordine', type: 'number', label: 'Ordine', defaultValue: 10, admin: { position: 'sidebar' } },
  ],
}
