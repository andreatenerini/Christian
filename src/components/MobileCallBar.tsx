import type { Contatti } from '@/lib/contatti'
import { PhoneIcon, WhatsAppIcon } from './Icons'

/** Barra fissa in basso su mobile: chiamata e WhatsApp sempre a portata di pollice. */
export function MobileCallBar({ contatti }: { contatti: Contatti }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-petrol/10 bg-cream/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
      <div className="flex gap-3">
        <a href={contatti.telLink} className="btn-petrol flex-1 px-3 py-3">
          <PhoneIcon className="h-4 w-4 text-sun-gold" /> Chiama
        </a>
        {contatti.waLink && (
          <a href={contatti.waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex-1 px-3 py-3">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
        )}
      </div>
    </div>
  )
}
