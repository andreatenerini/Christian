import type { GlobalConfig } from 'payload'
import { revalidateHooks } from '../lib/revalidate'

export const ChiSono: GlobalConfig = {
  slug: 'chi-sono',
  label: 'Chi sono',
  admin: { group: 'Pagine fisse' },
  access: { read: () => true },
  hooks: { afterChange: revalidateHooks.afterChange },
  fields: [
    { name: 'titolo', type: 'text', required: true, label: 'Titolo' },
    { name: 'sottotitolo', type: 'textarea', label: 'Sottotitolo' },
    { name: 'foto', type: 'upload', relationTo: 'media', required: true, label: 'Foto del titolare' },
    { name: 'biografia', type: 'richText', label: 'Biografia' },
    {
      name: 'tappe',
      type: 'array',
      label: 'Esperienze in evidenza',
      labels: { singular: 'Esperienza', plural: 'Esperienze' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'etichetta', type: 'text', required: true, label: 'Etichetta', admin: { placeholder: '8 anni' } },
            { name: 'testo', type: 'text', required: true, label: 'Testo', admin: { placeholder: 'vissuti in Florida' } },
          ],
        },
      ],
    },
    { name: 'citazione', type: 'textarea', label: 'Citazione in evidenza' },
    { name: 'fotoEsperienze', type: 'upload', relationTo: 'media', hasMany: true, label: 'Foto dei viaggi accompagnati' },
    { name: 'fotoEsperienzeTitolo', type: 'text', label: 'Titolo sezione foto' },
  ],
}
