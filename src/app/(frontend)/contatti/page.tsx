import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { PhoneIcon, WhatsAppIcon } from '@/components/Icons'
import { PhoneBlock } from '@/components/sections/PhoneBlock'
import { getImpostazioni, getPagine, getProgrammi } from '@/lib/cms'
import { buildContatti } from '@/lib/contatti'

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Chiama o scrivi a Christian per prezzi e disponibilità delle vacanze studio in Florida.',
}

interface Props {
  searchParams: Promise<{ interesse?: string }>
}

const INTERESSI_FISSI = ['Solo viaggio (senza corso)', 'Consulenza voli e assicurazione medica', 'Altro']

export default async function ContattiPage({ searchParams }: Props) {
  const [{ interesse }, impostazioni, programmi, pagine] = await Promise.all([
    searchParams,
    getImpostazioni(),
    getProgrammi(),
    getPagine(),
  ])
  const contatti = buildContatti(impostazioni)
  const interessi = [...programmi.map((p) => p.titolo), ...INTERESSI_FISSI]
  const privacy = pagine.find((p) => p.slug === 'privacy')

  return (
    <>
      <section className="bg-petrol-ink py-16 text-cream sm:py-20">
        <div className="container-app text-center">
          <h1 className="text-[44px] leading-[1.05] sm:text-6xl">Contatti</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-cream/75">
            Prezzi e disponibilità li do di persona: è il modo più veloce per avere la proposta giusta.
          </p>
          <div className="mt-10">
            <PhoneBlock contatti={contatti} />
          </div>
          {impostazioni.orari && <p className="mt-4 text-sm text-cream/60">{impostazioni.orari}</p>}
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-app grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-teal">Preferisci scrivere?</p>
            <h2 className="h-section mt-4 text-petrol-ink">Lasciami un messaggio</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-petrol-deep/75">
              Raccontami chi parte, in che periodo e cosa ti interessa: ti richiamo io.
            </p>
            <ul className="mt-8 space-y-3">
              <li>
                <a href={contatti.telLink} className="flex items-center gap-3 font-semibold text-petrol-ink hover:text-teal">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-petrol text-sun-gold">
                    <PhoneIcon className="h-4 w-4" />
                  </span>
                  {contatti.telefono}
                </a>
              </li>
              {contatti.waLink && (
                <li>
                  <a
                    href={contatti.waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-semibold text-petrol-ink hover:text-teal"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-[#0B2E1A]">
                      <WhatsAppIcon className="h-5 w-5" />
                    </span>
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
            <address className="mt-10 text-[15px] not-italic leading-relaxed text-petrol-deep/70">
              <strong className="block text-petrol-ink">{impostazioni.ragioneSociale}</strong>
              {impostazioni.indirizzo && <span className="whitespace-pre-line">{impostazioni.indirizzo}</span>}
            </address>
          </div>
          <ContactForm
            interessi={interessi}
            interesseIniziale={interesse && interessi.includes(interesse) ? interesse : undefined}
            privacyHref={privacy ? `/${privacy.slug}` : undefined}
          />
        </div>
      </section>
    </>
  )
}
