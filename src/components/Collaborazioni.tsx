import Image from 'next/image'

interface Partner {
  nome: string
  src: string
  width: number
  height: number
}

/** Loghi preparati da .scratch/collaborazioni/process.py (fondo bianco, colori originali). */
const PARTNER: readonly Partner[] = [
  { nome: 'English Language Academy', src: '/collaborazioni/english-language-academy.png', width: 460, height: 480 },
  { nome: 'LAfirstep', src: '/collaborazioni/lafirstep.png', width: 207, height: 218 },
  { nome: 'MW Travel Designer', src: '/collaborazioni/mw-travel-designer.png', width: 499, height: 480 },
]

/** Fascia "Collaborazioni" del footer: loghi dei partner su riquadri bianchi, senza link. */
export function Collaborazioni() {
  return (
    <div className="border-t border-cream/10">
      <div className="container-app py-10 sm:py-12">
        <p className="eyebrow text-sage">Collaborazioni</p>
        <ul className="mt-6 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-4">
          {PARTNER.map((p) => (
            <li
              key={p.nome}
              className="flex aspect-square items-center justify-center rounded-2xl bg-white p-2.5 shadow-[0_1px_0_rgba(255,255,255,0.06)] sm:w-36 sm:p-3 lg:w-40"
            >
              <Image
                src={p.src}
                alt={p.nome}
                width={p.width}
                height={p.height}
                sizes="(min-width: 1024px) 160px, (min-width: 640px) 144px, 30vw"
                className="h-full w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
