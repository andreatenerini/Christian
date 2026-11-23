import US from 'country-flag-icons/react/3x2/US'
import CA from 'country-flag-icons/react/3x2/CA'

interface FlagCycleProps {
  className?: string
}

/** Bandierine USA e Canada che si alternano in dissolvenza. Decorative, senza link. */
export function FlagCycle({ className = '' }: FlagCycleProps) {
  return (
    <span
      role="img"
      aria-label="Stati Uniti e Canada"
      className={`relative inline-block shrink-0 overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(23,73,64,0.14),0_1px_2px_rgba(11,31,28,0.12)] ${className}`}
    >
      <US aria-hidden="true" className="absolute inset-0 h-full w-full animate-flag-cycle" />
      <CA aria-hidden="true" className="absolute inset-0 h-full w-full animate-flag-cycle [animation-delay:-3s]" />
    </span>
  )
}
