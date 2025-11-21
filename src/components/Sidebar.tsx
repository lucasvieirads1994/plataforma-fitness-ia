'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/auth/login')
    router.refresh()
  }

  const menuItems = [
    {
      href: '/dashboard',
      icon: '🏠',
      label: 'Dashboard',
      description: 'Visão geral'
    },
    {
      href: '/workouts',
      icon: '💪',
      label: 'Treinos',
      description: 'Treinos com IA'
    },
    {
      href: '/nutrition',
      icon: '🥗',
      label: 'Nutrição',
      description: 'Scanner de comida'
    },
    {
      href: '/coach',
      icon: '🤖',
      label: 'IA Coach',
      description: 'Tire suas dúvidas'
    }
  ]

  const isActive = (href: string) => pathname === href

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          FitAI 💪
        </h1>
        <p className="text-xs text-gray-500 mt-1">Fitness com Inteligência Artificial</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block p-3 rounded-lg transition-all ${
              isActive(item.href)
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="font-semibold">{item.label}</div>
                <div className={`text-xs ${isActive(item.href) ? 'text-white/80' : 'text-gray-500'}`}>
                  {item.description}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full p-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-3"
        >
          <span className="text-xl">🚪</span>
          <span className="font-semibold">Sair</span>
        </button>
      </div>
    </aside>
  )
}

