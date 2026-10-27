import { NextResponse } from 'next/server'
import { payloadClient } from '@/lib/cms'
import { contattoSchema, toFieldErrors } from '@/lib/validation'

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
// Limite semplice per istanza: sufficiente contro invii ripetuti, non contro attacchi distribuiti
const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  hits.set(ip, [...recent, now])
  return recent.length >= MAX_PER_WINDOW
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Troppi invii ravvicinati. Riprova tra qualche minuto o chiamami.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Richiesta non valida' }, { status: 400 })
  }

  const parsed = contattoSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Controlla i campi evidenziati', fields: toFieldErrors(parsed.error) },
      { status: 422 },
    )
  }

  const { sito, ...dati } = parsed.data
  // Bot: rispondiamo OK senza salvare
  if (sito) return NextResponse.json({ success: true })

  try {
    const payload = await payloadClient()
    await payload.create({
      collection: 'richieste',
      overrideAccess: true,
      data: {
        nome: dati.nome,
        email: dati.email,
        telefono: dati.telefono || undefined,
        profilo: dati.profilo || undefined,
        interesse: dati.interesse || undefined,
        partecipanti: dati.partecipanti,
        messaggio: dati.messaggio || undefined,
        privacy: true,
      },
    })

    const destinatario = process.env.NOTIFICA_RICHIESTE_EMAIL
    if (destinatario && process.env.RESEND_API_KEY) {
      await payload
        .sendEmail({
          to: destinatario,
          replyTo: dati.email,
          subject: `Nuova richiesta dal sito: ${dati.nome}`,
          text: [
            `Nome: ${dati.nome}`,
            `Email: ${dati.email}`,
            `Telefono: ${dati.telefono || '-'}`,
            `Profilo: ${dati.profilo || '-'}`,
            `Interesse: ${dati.interesse || '-'}`,
            `Partecipanti: ${dati.partecipanti ?? '-'}`,
            '',
            dati.messaggio || '',
          ].join('\n'),
        })
        .catch((err: unknown) => payload.logger.error({ err }, 'Notifica email richiesta non inviata'))
    }

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const payload = await payloadClient()
    payload.logger.error({ err }, 'Salvataggio richiesta di contatto fallito')
    return NextResponse.json(
      { success: false, error: 'Non sono riuscito a inviare il messaggio. Chiamami direttamente.' },
      { status: 500 },
    )
  }
}
