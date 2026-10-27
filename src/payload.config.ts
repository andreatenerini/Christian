import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { it } from '@payloadcms/translations/languages/it'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Programmi } from './collections/Programmi'
import { Gallerie } from './collections/Gallerie'
import { Pagine } from './collections/Pagine'
import { Richieste } from './collections/Richieste'
import { Impostazioni } from './globals/Impostazioni'
import { Home } from './globals/Home'
import { ChiSono } from './globals/ChiSono'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
    supportedLanguages: { it },
    fallbackLanguage: 'it',
  },
  admin: {
    user: Users.slug,
    meta: { titleSuffix: '— Americanitalia' },
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Programmi, Gallerie, Pagine, Media, Richieste, Users],
  globals: [Home, ChiSono, Impostazioni],
  editor: lexicalEditor({}),
  sharp,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
  }),
  email:
    process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL
      ? resendAdapter({
          defaultFromAddress: process.env.RESEND_FROM_EMAIL,
          defaultFromName: 'Americanitalia',
          apiKey: process.env.RESEND_API_KEY,
        })
      : undefined,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
