/**
 * Firma grafica del sito: le strisce orizzontali del sole del logo,
 * dal salvia al petrolio, con altezza decrescente.
 */
const BANDS = ['#ACC494', '#8DB693', '#6FA28A', '#3F7F6C', '#245E52', '#174940']

interface SunStripesProps {
  className?: string
  /** 'down' = strisce che si assottigliano verso il basso (come nel logo) */
  direction?: 'down' | 'up'
}

export function SunStripes({ className = '', direction = 'down' }: SunStripesProps) {
  const bands = direction === 'down' ? BANDS : [...BANDS].reverse()
  return (
    <div className={`flex flex-col gap-[4px] ${className}`} aria-hidden="true">
      {bands.map((color, i) => {
        const h = direction === 'down' ? 10 - i * 1.4 : 3 + i * 1.4
        return <span key={color} className="block w-full" style={{ background: color, height: `${h}px` }} />
      })}
    </div>
  )
}

/** Piccolo sole a strisce in CSS, usato come marcatore decorativo. */
export function SunDot({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block rounded-full ${className}`}
      style={{
        background:
          'linear-gradient(180deg,#E5401B 0%,#F7900F 30%,#EDB040 46%,transparent 46%,transparent 52%,#ACC494 52%,#ACC494 62%,transparent 62%,transparent 67%,#7FAE90 67%,#7FAE90 77%,transparent 77%,transparent 82%,#3F7F6C 82%,#3F7F6C 91%,transparent 91%,transparent 95%,#174940 95%)',
      }}
    />
  )
}
