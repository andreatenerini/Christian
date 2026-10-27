import type { CollectionConfig } from 'payload'

const isLoggedIn = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const Richieste: CollectionConfig = {
  slug: 'richieste',
  labels: { singular: 'Richiesta', plural: 'Richieste di contatto' },
  admin: {
    group: 'Contatti',
    useAsTitle: 'nome',
    defaultColumns: ['nome', 'interesse', 'telefono', 'stato', 'createdAt'],
    description: 'Messaggi arrivati dal modulo "Contatti" del sito.',
  },
  // Le richieste si creano solo dal server (route /api/contatto), mai via REST pubblica
  access: {
    read: isLoggedIn,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  defaultSort: '-createdAt',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'nome', type: 'text', required: true, label: 'Nome e cognome' },
        {
          name: 'profilo',
          type: 'select',
          label: 'Chi scrive',
          options: [
            { label: 'Studente', value: 'studente' },
            { label: 'Genitore', value: 'genitore' },
            { label: 'Adulto', value: 'adulto' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', required: true, label: 'Email' },
        { name: 'telefono', type: 'text', label: 'Telefono' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'interesse', type: 'text', label: 'Interessato a' },
        { name: 'partecipanti', type: 'number', label: 'Partecipanti' },
      ],
    },
    { name: 'messaggio', type: 'textarea', label: 'Messaggio' },
    { name: 'privacy', type: 'checkbox', label: 'Consenso privacy', defaultValue: false, admin: { readOnly: true } },
    {
      name: 'stato',
      type: 'select',
      label: 'Stato',
      defaultValue: 'nuova',
      options: [
        { label: 'Nuova', value: 'nuova' },
        { label: 'Contattato', value: 'contattato' },
        { label: 'Chiusa', value: 'chiusa' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'note', type: 'textarea', label: 'Note interne', admin: { position: 'sidebar' } },
  ],
}
