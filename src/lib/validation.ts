import { z } from 'zod'

export const PROFILI = ['studente', 'genitore', 'adulto'] as const

export const contattoSchema = z.object({
  nome: z.string().trim().min(2, 'Inserisci nome e cognome').max(120),
  email: z.string().trim().email('Email non valida').max(160),
  telefono: z
    .string()
    .trim()
    .max(40)
    .regex(/^[+\d\s().-]*$/, 'Numero non valido')
    .optional()
    .or(z.literal('')),
  profilo: z.enum(PROFILI).optional().or(z.literal('')),
  interesse: z.string().trim().max(160).optional().or(z.literal('')),
  partecipanti: z.coerce.number().int().min(1, 'Almeno 1').max(50, 'Massimo 50').optional(),
  messaggio: z.string().trim().max(3000, 'Massimo 3000 caratteri').optional().or(z.literal('')),
  privacy: z.literal(true, { errorMap: () => ({ message: 'Serve il consenso per poterti ricontattare' }) }),
  // honeypot anti-spam: se compilato la route risponde OK senza salvare (nessun errore che lo riveli)
  sito: z.string().max(500).optional(),
})

export type ContattoInput = z.infer<typeof contattoSchema>

export type FieldErrors = Partial<Record<keyof ContattoInput, string>>

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {}
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContattoInput
    if (key && !out[key]) out[key] = issue.message
  }
  return out
}
