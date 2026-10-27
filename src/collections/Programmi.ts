import type { CollectionConfig } from 'payload'
import { revalidateHooks } from '../lib/revalidate'
import { slugField } from '../fields/slug'

export const Programmi: CollectionConfig = {
  slug: 'programmi',
  labels: { singular: 'Programma', plural: 'Programmi' },
  admin: {
    group: 'Contenuti',
    useAsTitle: 'titolo',
    defaultColumns: ['titolo', 'periodo', 'inEvidenza', 'pubblicato'],
    description: 'Le proposte di viaggio (vacanza studio, solo viaggio, ecc.). Nessun prezzo: il cliente contatta Christian.',
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
    { name: 'sottotitolo', type: 'textarea', label: 'Sottotitolo / descrizione breve' },
    {
      type: 'row',
      fields: [
        { name: 'periodo', type: 'text', label: 'Periodo e durata', admin: { placeholder: '3 settimane · estate' } },
        { name: 'destinatari', type: 'text', label: 'Per chi è', admin: { placeholder: 'Neodiplomati e adulti' } },
      ],
    },
    { name: 'copertina', type: 'upload', relationTo: 'media', required: true, label: 'Foto di copertina' },
    { name: 'descrizione', type: 'richText', label: 'Descrizione' },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Cosa include',
          fields: [
            {
              name: 'inclusi',
              type: 'array',
              label: 'Servizi inclusi',
              labels: { singular: 'Servizio', plural: 'Servizi' },
              admin: { initCollapsed: true },
              fields: [
                { name: 'titolo', type: 'text', required: true, label: 'Titolo' },
                { name: 'dettaglio', type: 'textarea', label: 'Dettaglio' },
              ],
            },
          ],
        },
        {
          label: 'Didattica',
          fields: [
            {
              name: 'didattica',
              type: 'group',
              label: false,
              fields: [
                { name: 'titolo', type: 'text', label: 'Titolo sezione' },
                { name: 'introduzione', type: 'textarea', label: 'Introduzione' },
                {
                  name: 'numeri',
                  type: 'array',
                  label: 'Numeri chiave',
                  labels: { singular: 'Numero', plural: 'Numeri' },
                  maxRows: 4,
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'valore', type: 'text', required: true, label: 'Valore', admin: { placeholder: '48' } },
                        { name: 'etichetta', type: 'text', required: true, label: 'Etichetta', admin: { placeholder: 'ore di lingua e cultura' } },
                      ],
                    },
                  ],
                },
                {
                  name: 'unita',
                  type: 'array',
                  label: 'Unità didattiche',
                  labels: { singular: 'Unità', plural: 'Unità' },
                  fields: [{ name: 'titolo', type: 'text', required: true, label: 'Titolo' }],
                },
              ],
            },
          ],
        },
        {
          label: 'Road trip',
          fields: [
            { name: 'roadTripIntro', type: 'textarea', label: 'Introduzione road trip' },
            {
              name: 'tappe',
              type: 'array',
              label: 'Tappe',
              labels: { singular: 'Tappa', plural: 'Tappe' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'localita', type: 'text', required: true, label: 'Località' },
                    { name: 'nota', type: 'text', label: 'Nota (facoltativa)', admin: { placeholder: 'festa del 4 luglio' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Opzioni',
          fields: [
            {
              name: 'opzioni',
              type: 'array',
              label: 'Opzioni e servizi aggiuntivi',
              labels: { singular: 'Opzione', plural: 'Opzioni' },
              fields: [
                { name: 'titolo', type: 'text', required: true, label: 'Titolo' },
                { name: 'testo', type: 'textarea', label: 'Testo' },
              ],
            },
          ],
        },
        {
          label: 'Foto',
          fields: [
            { name: 'galleria', type: 'upload', relationTo: 'media', hasMany: true, label: 'Foto del programma' },
          ],
        },
      ],
    },
    {
      name: 'inEvidenza',
      type: 'checkbox',
      label: 'In evidenza in home page',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'pubblicato',
      type: 'checkbox',
      label: 'Pubblicato',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'ordine',
      type: 'number',
      label: 'Ordine',
      defaultValue: 10,
      admin: { position: 'sidebar', description: 'Numeri più bassi compaiono prima.' },
    },
  ],
}
