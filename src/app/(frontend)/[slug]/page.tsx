import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RichText } from '@/components/RichText'
import { getPagine } from '@/lib/cms'

interface Props {
  params: Promise<{ slug: string }>
}

async function findPagina(slug: string) {
  const pagine = await getPagine()
  return pagine.find((p) => p.slug === slug) ?? null
}

export async function generateStaticParams() {
  const pagine = await getPagine()
  return pagine.map((p) => ({ slug: p.slug as string }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const pagina = await findPagina(slug)
  return pagina ? { title: pagina.titolo } : {}
}

export default async function PaginaCms({ params }: Props) {
  const { slug } = await params
  const pagina = await findPagina(slug)
  if (!pagina) notFound()

  return (
    <article className="py-16 sm:py-24">
      <div className="container-app max-w-3xl">
        <h1 className="text-[40px] leading-[1.08] text-petrol-ink sm:text-5xl">{pagina.titolo}</h1>
        <RichText data={pagina.contenuto} className="prose-cms mt-10" />
      </div>
    </article>
  )
}
