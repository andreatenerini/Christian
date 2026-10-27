import type { Metadata } from 'next'
import { Fraunces, Raleway } from 'next/font/google'
import '../globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MobileCallBar } from '@/components/MobileCallBar'
import { getImpostazioni, getPagine, getProgrammaInEvidenza } from '@/lib/cms'
import { buildContatti } from '@/lib/contatti'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-display',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

// I contenuti si aggiornano subito dopo un salvataggio dal CMS (revalidatePath); questo è solo il paracadute.
export const revalidate = 3600

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  title: {
    default: 'Americanitalia — Vacanze studio in Florida',
    template: '%s · Americanitalia',
  },
  description:
    'Vacanze studio in Florida per neodiplomati e adulti: corso di inglese a Orlando, cultura americana, road trip e tour leader 24 ore su 24.',
  openGraph: { type: 'website', locale: 'it_IT', siteName: 'Americanitalia' },
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [impostazioni, pagine, programma] = await Promise.all([
    getImpostazioni(),
    getPagine(),
    getProgrammaInEvidenza(),
  ])
  const contatti = buildContatti(impostazioni)

  const nav = [
    ...(programma ? [{ href: `/vacanza-studio/${programma.slug}`, label: 'La vacanza studio' }] : []),
    { href: '/chi-sono', label: 'Chi sono' },
    { href: '/galleria', label: 'Galleria' },
    { href: '/contatti', label: 'Contatti' },
  ]
  const legali = pagine.filter((p) => p.inFooter).map((p) => ({ href: `/${p.slug}`, label: p.titolo }))

  return (
    <html lang="it" className={`${fraunces.variable} ${raleway.variable}`}>
      <body className="flex min-h-screen flex-col font-body antialiased">
        <a
          href="#contenuto"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-petrol focus:px-4 focus:py-2 focus:text-cream"
        >
          Vai al contenuto
        </a>
        <Header nav={nav} contatti={contatti} />
        <main id="contenuto" className="flex-1">
          {children}
        </main>
        <Footer nav={nav} legali={legali} impostazioni={impostazioni} contatti={contatti} />
        <MobileCallBar contatti={contatti} />
      </body>
    </html>
  )
}
