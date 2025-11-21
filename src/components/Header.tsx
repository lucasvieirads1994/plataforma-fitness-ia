'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Logo from './Logo'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-primary">
              Funcionalidades
            </Link>
            <Link href="#pricing" className="text-gray-700 hover:text-primary">
              Preços
            </Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-primary">
              Depoimentos
            </Link>
          </nav>

          <div className="hidden md:flex space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-primary">
              Entrar
            </Link>
            <Link href="/signup" className="btn-primary">
              Começar Grátis
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <Link href="#features" className="text-gray-700 hover:text-primary">
                Funcionalidades
              </Link>
              <Link href="#pricing" className="text-gray-700 hover:text-primary">
                Preços
              </Link>
              <Link href="#testimonials" className="text-gray-700 hover:text-primary">
                Depoimentos
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-primary">
                Entrar
              </Link>
              <Link href="/signup" className="btn-primary">
                Começar Grátis
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}