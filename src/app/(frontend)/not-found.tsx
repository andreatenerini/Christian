import Link from 'next/link'
import { SunDot } from '@/components/SunStripes'

export default function NotFound() {
  return (
    <section className="py-28 text-center">
      <div className="container-app">
        <SunDot className="mx-auto h-20 w-20" />
        <h1 className="mt-8 text-5xl text-petrol-ink">Pagina non trovata</h1>
        <p className="mt-4 text-petrol-deep/70">Forse ha preso un altro volo.</p>
        <Link href="/" className="btn-petrol mt-10">
          Torna alla home
        </Link>
      </div>
    </section>
  )
}
