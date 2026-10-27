import Link from 'next/link'
import Image from 'next/image'
import type { Impostazioni } from '@/payload-types'
import type { Contatti } from '@/lib/contatti'
import { PhoneIcon, WhatsAppIcon } from './Icons'
import { SunStripes } from './SunStripes'

interface FooterProps {
  nav: { href: string; label: string }[]
  legali: { href: string; label: string }[]
  impostazioni: Impostazioni
  contatti: Contatti
}

export function Footer({ nav, legali, impostazioni, contatti }: FooterProps) {
  const social = [
    { label: 'Instagram', href: impostazioni.instagram },
    { label: 'Facebook', href: impostazioni.facebook },
    { label: 'TikTok', href: impostazioni.tiktok },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href))

  return (
    <footer className="relative mt-auto bg-petrol-ink pb-24 text-cream/80 md:pb-0">
      <SunStripes className="opacity-90" direction="up" />
      <div className="container-app grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <Image src="/logo-sole-512.png" alt="" width={64} height={64} className="h-16 w-16" />
            <div>
              <p className="text-xl font-light uppercase tracking-[0.18em] text-cream">Americanitalia</p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-sage">LLC · Orlando, Florida</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-cream/65">
            Vacanze studio in Florida per ragazzi e adulti, seguite di persona dalla partenza in Italia fino al ritorno.
          </p>
          <a
            href={contatti.telLink}
            className="mt-7 inline-flex items-center gap-3 font-display text-3xl text-cream transition hover:text-sun-gold"
          >
            <PhoneIcon className="h-6 w-6 text-sun-orange" />
            {contatti.telefono}
          </a>
          <p className="mt-2 text-sm font-semibold text-sun-gold">{contatti.claim}</p>
        </div>

        <div>
          <p className="eyebrow text-sage">Il sito</p>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-sun-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {contatti.waLink && (
            <a
              href={contatti.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-[#5BE38E] transition hover:text-[#8af0b0]"
            >
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp
            </a>
          )}
          {social.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-4 text-sm">
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-sun-gold">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <p className="eyebrow text-sage">Dati societari</p>
          <address className="mt-5 space-y-1.5 text-[15px] not-italic leading-relaxed">
            <span className="block font-semibold text-cream">{impostazioni.ragioneSociale}</span>
            {impostazioni.ein && <span className="block">EIN {impostazioni.ein}</span>}
            {impostazioni.indirizzo && <span className="block whitespace-pre-line">{impostazioni.indirizzo}</span>}
            {contatti.email && (
              <a href={`mailto:${contatti.email}`} className="block pt-2 hover:text-sun-gold">
                {contatti.email}
              </a>
            )}
          </address>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-app flex flex-col gap-3 py-6 text-[13px] text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {impostazioni.ragioneSociale}. Tutti i diritti riservati.
          </p>
          <ul className="flex flex-wrap gap-5">
            {legali.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-cream">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
