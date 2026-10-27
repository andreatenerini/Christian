import type { GlobalConfig } from 'payload'
import { revalidateHooks } from '../lib/revalidate'

export const Impostazioni: GlobalConfig = {
  slug: 'impostazioni',
  label: 'Impostazioni sito',
  admin: { group: 'Impostazioni' },
  access: { read: () => true },
  hooks: { afterChange: revalidateHooks.afterChange },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contatti',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'telefono',
                  type: 'text',
                  required: true,
                  label: 'Telefono (come appare sul sito)',
                  admin: { placeholder: '+1 (407) 555-0123' },
                },
                {
                  name: 'telefonoLink',
                  type: 'text',
                  required: true,
                  label: 'Telefono per la chiamata',
                  admin: { placeholder: '+14075550123', description: 'Formato internazionale, senza spazi.' },
                },
              ],
            },
            {
              name: 'whatsapp',
              type: 'text',
              label: 'Numero WhatsApp',
              admin: { placeholder: '14075550123', description: 'Solo cifre con prefisso internazionale, senza + né spazi. Vuoto = pulsante nascosto.' },
            },
            { name: 'email', type: 'email', label: 'Email (facoltativa)' },
            {
              name: 'claimPrezzi',
              type: 'text',
              label: 'Frase sotto il numero di telefono',
              defaultValue: 'Garantiamo i migliori prezzi sul mercato',
            },
            { name: 'orari', type: 'text', label: 'Orari / fuso orario', admin: { placeholder: 'Rispondo anche su WhatsApp, ora di Orlando (EST)' } },
          ],
        },
        {
          label: 'Società',
          fields: [
            { name: 'ragioneSociale', type: 'text', label: 'Ragione sociale', defaultValue: 'Americanitalia LLC' },
            { name: 'ein', type: 'text', label: 'EIN (Tax ID)' },
            { name: 'indirizzo', type: 'textarea', label: 'Indirizzo' },
          ],
        },
        {
          label: 'Social',
          fields: [
            { name: 'instagram', type: 'text', label: 'Instagram (URL)' },
            { name: 'facebook', type: 'text', label: 'Facebook (URL)' },
            { name: 'tiktok', type: 'text', label: 'TikTok (URL)' },
          ],
        },
      ],
    },
  ],
}
