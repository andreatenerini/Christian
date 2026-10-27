import type { Impostazioni } from '@/payload-types'

export interface Contatti {
  telefono: string
  telLink: string
  waLink: string | null
  email: string | null
  claim: string
}

const WA_MESSAGGIO = 'Ciao Christian, vorrei informazioni sulla vacanza studio in Florida.'

export function buildContatti(imp: Impostazioni): Contatti {
  const wa = imp.whatsapp?.replace(/\D/g, '') || ''
  return {
    telefono: imp.telefono,
    telLink: `tel:${imp.telefonoLink.replace(/[^\d+]/g, '')}`,
    waLink: wa ? `https://wa.me/${wa}?text=${encodeURIComponent(WA_MESSAGGIO)}` : null,
    email: imp.email || null,
    claim: imp.claimPrezzi || 'Garantiamo i migliori prezzi sul mercato',
  }
}
