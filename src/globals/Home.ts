import type { GlobalConfig } from 'payload'
import { revalidateHooks } from '../lib/revalidate'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home page',
  admin: { group: 'Pagine fisse' },
  access: { read: () => true },
  hooks: { afterChange: revalidateHooks.afterChange },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Apertura',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: false,
              fields: [
                { name: 'etichetta', type: 'text', label: 'Etichetta sopra il titolo' },
                { name: 'titolo', type: 'text', required: true, label: 'Titolo' },
                { name: 'sottotitolo', type: 'textarea', label: 'Sottotitolo' },
                { name: 'immagine', type: 'upload', relationTo: 'media', required: true, label: 'Foto di sfondo' },
              ],
            },
          ],
        },
        {
          label: 'Presentazione',
          fields: [
            {
              name: 'intro',
              type: 'group',
              label: false,
              fields: [
                { name: 'titolo', type: 'text', label: 'Titolo' },
                { name: 'testo', type: 'textarea', label: 'Testo' },
                {
                  name: 'punti',
                  type: 'array',
                  label: 'Punti di forza',
                  labels: { singular: 'Punto', plural: 'Punti' },
                  maxRows: 4,
                  fields: [
                    { name: 'titolo', type: 'text', required: true, label: 'Titolo' },
                    { name: 'testo', type: 'textarea', label: 'Testo' },
                  ],
                },
                {
                  name: 'immagini',
                  type: 'upload',
                  relationTo: 'media',
                  hasMany: true,
                  maxRows: 2,
                  label: 'Due foto affiancate',
                },
              ],
            },
          ],
        },
        {
          label: 'Galleria',
          fields: [
            { name: 'galleriaTitolo', type: 'text', label: 'Titolo sezione foto' },
            {
              name: 'galleriaFoto',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              maxRows: 8,
              label: 'Foto in evidenza (max 8)',
            },
          ],
        },
        {
          label: 'Chiusura',
          fields: [
            {
              name: 'cta',
              type: 'group',
              label: false,
              fields: [
                { name: 'titolo', type: 'text', label: 'Titolo' },
                { name: 'testo', type: 'textarea', label: 'Testo' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
