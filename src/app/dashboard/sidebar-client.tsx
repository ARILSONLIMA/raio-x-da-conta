'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Droplet, Zap, LayoutDashboard, PlusCircle, Lightbulb, User, Calculator, Sun, Moon, LogOut, X } from 'lucide-react'

export function SidebarClient() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const toggle = () => setIsOpen(prev => !prev)
    window.addEventListener('toggleSidebar', toggle)
    return () => window.removeEventListener('toggleSidebar', toggle)
  }, [])

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Meu Painel' },
    { href: '/dashboard/add', icon: PlusCircle, label: 'Adicionar Fatura' },
    { href: '/dashboard/tips', icon: Lightbulb, label: 'Dicas de Economia' },
    { href: '/dashboard/profile', icon: User, label: 'Meu Perfil / Metas' },
    { href: '/dashboard/simulator', icon: Calculator, label: 'Simulador de Gastos' },
  ]

  const closeSidebar = () => setIsOpen(false)

  return (
    <>
      <aside className={`w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col transition-transform duration-300 absolute md:relative z-50 h-[100dvh] shadow-2xl md:shadow-none ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Logo */}
        <div className="h-20 flex items-center px-8 border-b border-slate-100 dark:border-slate-700/50 flex-shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2" onClick={closeSidebar}>
            <Droplet className="w-6 h-6 text-sky-500" />
            <Zap className="w-6 h-6 text-amber-500 -ml-3" />
            <span className="text-xl font-bold text-slate-900 dark:text-white ml-2 tracking-tight">Raio-X da Conta</span>
          </Link>
          <button onClick={closeSidebar} className="md:hidden ml-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navegação */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto hide-scrollbar">
          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          {navItems.map(item => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActive 
                  ? 'bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Rodapé do Menu */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-700/50 space-y-1 flex-shrink-0">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {mounted && theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <span>Tema</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {mounted ? (theme === 'dark' ? 'Escuro' : 'Claro') : '...'}
            </span>
          </button>
          
          <form action="/actions/logout" method="POST" className="w-full">
            <button type="submit" formAction={async () => {
              const { logout } = await import('@/app/actions/auth');
              await logout();
            }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors font-medium">
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </form>
        </div>
      </aside>

      {/* Overlay Mobile */}
      {isOpen && (
        <div 
          onClick={closeSidebar} 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
        />
      )}
    </>
  )
}
