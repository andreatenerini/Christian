import Link from 'next/link'
import type { Contatti } from '@/lib/contatti'
import { ArrowIcon, WhatsAppIcon } from '../Icons'
import { PhoneBlock } from './PhoneBlock'

interface CtaFinaleProps {
  titolo?: string | null
  testo?: string | null
  contatti: Contatti
  interesse?: string
}

export function CtaFinale({ titolo, testo, contatti, interesse }: CtaFinaleProps) {
  const formHref = interesse ? `/contatti?interesse=${encodeURIComponent(interesse)}` : '/contatti'
  return (
    <section className="relative overflow-hidden bg-sunset py-20 sm:py-28">
      {/* strisce orizzontali come nel logo, in trasparenza */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-25"
        style={{ background: 'repeating-linear-gradient(180deg, transparent 0 22px, #FBF5EA 22px 28px)' }}
        aria-hidden="true"
      />
      <div className="container-app relative text-center">
        {titolo && <h2 className="h-section mx-auto max-w-3xl text-petrol-ink">{titolo}</h2>}
        {testo && <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-petrol-ink/80">{testo}</p>}
        <div className="mx-auto mt-10 max-w-3xl rounded-[28px] bg-cream px-5 py-9 shadow-lift sm:px-10">
          <PhoneBlock contatti={contatti} tone="dark" label="Il prezzo te lo dico io, al telefono" />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {contatti.waLink && (
              <a href={contatti.waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp
              </a>
            )}
            <Link href={formHref} className="btn-petrol">
              Scrivimi dal modulo <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
