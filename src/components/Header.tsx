'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from './Icons'
import type { Contatti } from '@/lib/contatti'

interface NavItem {
  href: string
  label: string
}

interface HeaderProps {
  nav: NavItem[]
  contatti: Contatti
}

export function Header({ nav, contatti }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="sticky top-0 z-50 border-b border-petrol/10 bg-cream/90 backdrop-blur-md">
      <div className="container-app flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Americanitalia — home">
          <Image src="/logo-sole-512.png" alt="" width={44} height={44} className="h-10 w-10 sm:h-11 sm:w-11" priority />
          <span className="flex flex-col leading-none">
            <span className="text-[17px] font-light uppercase tracking-[0.16em] text-petrol-ink sm:text-[19px]">
              Americanitalia
            </span>
            <span className="mt-1 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.2em] text-teal sm:text-[10px] sm:tracking-[0.3em]">
              Vacanze studio · Florida
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Menu principale">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                isActive(item.href) ? 'text-petrol-ink' : 'text-petrol/70 hover:text-petrol-ink'
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute inset-x-4 -bottom-0.5 h-[3px] rounded-full bg-sunset-x" aria-hidden="true" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contatti.telLink}
            className="hidden items-center gap-2 rounded-full bg-petrol px-4 py-2.5 text-sm font-semibold text-cream transition hover:bg-petrol-deep md:inline-flex"
          >
            <PhoneIcon className="h-4 w-4 text-sun-gold" />
            {contatti.telefono}
          </a>
          <a
            href={contatti.telLink}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-petrol text-sun-gold md:hidden"
            aria-label={`Chiama ${contatti.telefono}`}
          >
            <PhoneIcon className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-petrol-ink hover:bg-petrol/5 lg:hidden"
            aria-label="Apri il menu"
            aria-expanded={open}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            className="absolute inset-0 bg-petrol-ink/50 backdrop-blur-sm"
            aria-label="Chiudi il menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-cream shadow-lift">
            <div className="flex h-[68px] items-center justify-between border-b border-petrol/10 px-5">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-teal">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-petrol/5"
                aria-label="Chiudi il menu"
              >
                <CloseIcon />
              </button>
            </div>
            <nav className="flex flex-col px-3 py-4" aria-label="Menu mobile">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-3.5 font-display text-2xl ${
                    isActive(item.href) ? 'bg-petrol/5 text-petrol-ink' : 'text-petrol/80'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto space-y-3 border-t border-petrol/10 p-5">
              <a href={contatti.telLink} className="btn-petrol w-full">
                <PhoneIcon className="h-4 w-4 text-sun-gold" /> {contatti.telefono}
              </a>
              {contatti.waLink && (
                <a href={contatti.waLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
                  <WhatsAppIcon className="h-4 w-4" /> Scrivimi su WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
