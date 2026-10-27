'use client'

import Link from 'next/link'
import { useState } from 'react'
import { contattoSchema, toFieldErrors, type FieldErrors } from '@/lib/validation'
import { ArrowIcon, CheckIcon } from './Icons'

interface ContactFormProps {
  interessi: string[]
  interesseIniziale?: string
  privacyHref?: string
}

type Stato = 'idle' | 'invio' | 'ok' | 'errore'

export function ContactForm({ interessi, interesseIniziale, privacyHref }: ContactFormProps) {
  const [stato, setStato] = useState<Stato>('idle')
  const [errori, setErrori] = useState<FieldErrors>({})
  const [messaggioErrore, setMessaggioErrore] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const partecipanti = fd.get('partecipanti')
    const dati = {
      nome: fd.get('nome'),
      email: fd.get('email'),
      telefono: fd.get('telefono'),
      profilo: fd.get('profilo'),
      interesse: fd.get('interesse'),
      partecipanti: partecipanti ? Number(partecipanti) : undefined,
      messaggio: fd.get('messaggio'),
      privacy: fd.get('privacy') === 'on',
      sito: fd.get('sito'),
    }

    const parsed = contattoSchema.safeParse(dati)
    if (!parsed.success) {
      setErrori(toFieldErrors(parsed.error))
      setStato('idle')
      return
    }

    setErrori({})
    setStato('invio')
    try {
      const res = await fetch('/api/contatto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      const json: { success: boolean; error?: string; fields?: FieldErrors } = await res.json()
      if (json.success) {
        setStato('ok')
        return
      }
      setErrori(json.fields ?? {})
      setMessaggioErrore(json.error ?? 'Invio non riuscito')
      setStato('errore')
    } catch {
      setMessaggioErrore('Connessione assente. Riprova o chiamami direttamente.')
      setStato('errore')
    }
  }

  if (stato === 'ok') {
    return (
      <div className="rounded-[28px] bg-white p-10 text-center shadow-soft ring-1 ring-petrol/5" role="status">
        <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-teal text-cream">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h2 className="mt-6 text-3xl text-petrol-ink">Messaggio ricevuto!</h2>
        <p className="mx-auto mt-3 max-w-md text-petrol-deep/75">
          Ti ricontatto io al più presto. Tieni conto del fuso orario: Orlando è 6 ore indietro rispetto all’Italia.
        </p>
      </div>
    )
  }

  const err = (k: keyof FieldErrors) =>
    errori[k] ? (
      <p id={`${k}-errore`} className="field-error">
        {errori[k]}
      </p>
    ) : null
  const cls = (k: keyof FieldErrors) => `field-input ${errori[k] ? 'field-invalid' : ''}`
  const aria = (k: keyof FieldErrors) =>
    errori[k] ? { 'aria-invalid': true, 'aria-describedby': `${k}-errore` } : {}

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[28px] bg-white p-6 shadow-soft ring-1 ring-petrol/5 sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="nome" className="field-label">
            Nome e cognome *
          </label>
          <input id="nome" name="nome" autoComplete="name" className={cls('nome')} {...aria('nome')} />
          {err('nome')}
        </div>
        <div>
          <label htmlFor="email" className="field-label">
            Email *
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={cls('email')} {...aria('email')} />
          {err('email')}
        </div>
        <div>
          <label htmlFor="telefono" className="field-label">
            Telefono / WhatsApp
          </label>
          <input id="telefono" name="telefono" type="tel" autoComplete="tel" className={cls('telefono')} {...aria('telefono')} />
          {err('telefono')}
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="field-label">Chi sei?</legend>
          <div className="flex flex-wrap gap-2">
            {[
              ['studente', 'Studente'],
              ['genitore', 'Genitore'],
              ['adulto', 'Adulto'],
            ].map(([value, label]) => (
              <label key={value} className="cursor-pointer">
                <input type="radio" name="profilo" value={value} className="peer sr-only" />
                <span className="inline-block rounded-full border border-petrol/20 px-5 py-2.5 text-[15px] font-medium text-petrol-deep transition peer-checked:border-petrol peer-checked:bg-petrol peer-checked:text-cream peer-focus-visible:ring-4 peer-focus-visible:ring-teal/20">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="interesse" className="field-label">
            Mi interessa
          </label>
          <select id="interesse" name="interesse" defaultValue={interesseIniziale ?? ''} className="field-input">
            <option value="">Scegli…</option>
            {interessi.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="partecipanti" className="field-label">
            Quante persone?
          </label>
          <input
            id="partecipanti"
            name="partecipanti"
            type="number"
            min={1}
            max={50}
            inputMode="numeric"
            className={cls('partecipanti')}
            {...aria('partecipanti')}
          />
          {err('partecipanti')}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="messaggio" className="field-label">
            Messaggio
          </label>
          <textarea
            id="messaggio"
            name="messaggio"
            rows={5}
            placeholder="Periodo, età dei ragazzi, domande…"
            className={cls('messaggio')}
            {...aria('messaggio')}
          />
          {err('messaggio')}
        </div>

        {/* honeypot: invisibile alle persone */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="sito">Sito web</label>
          <input id="sito" name="sito" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-petrol-deep/80">
            <input
              type="checkbox"
              name="privacy"
              className="mt-1 h-5 w-5 shrink-0 rounded border-petrol/30 accent-petrol"
              {...aria('privacy')}
            />
            <span>
              Acconsento al trattamento dei dati per essere ricontattato
              {privacyHref && (
                <>
                  {' '}
                  (
                  <Link href={privacyHref} className="font-semibold text-teal underline underline-offset-2">
                    informativa privacy
                  </Link>
                  )
                </>
              )}
              . *
            </span>
          </label>
          {err('privacy')}
        </div>
      </div>

      {stato === 'errore' && messaggioErrore && (
        <p className="mt-6 rounded-xl bg-sun-red/10 px-4 py-3 text-[14px] font-medium text-sun-red" role="alert">
          {messaggioErrore}
        </p>
      )}

      <button type="submit" disabled={stato === 'invio'} className="btn-sun mt-8 w-full disabled:opacity-60 sm:w-auto">
        {stato === 'invio' ? 'Invio in corso…' : 'Invia il messaggio'} <ArrowIcon />
      </button>
    </form>
  )
}
