import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Utente', plural: 'Utenti' },
  admin: {
    useAsTitle: 'email',
    group: 'Amministrazione',
    description: 'Persone che possono accedere al pannello di gestione.',
  },
  auth: true,
  fields: [{ name: 'nome', type: 'text', label: 'Nome' }],
}
