'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" className="w-full justify-start px-3 py-2 text-slate-700 dark:text-slate-300">
        <Sun className="h-5 w-5 mr-3" />
        <span className="font-medium mr-2">Tema</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-full justify-start px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
    >
      <Sun className="h-5 w-5 mr-3 dark:hidden" />
      <Moon className="h-5 w-5 mr-3 hidden dark:block" />
      <span className="font-medium mr-2">Tema</span>
      <span className="text-xs text-slate-500 uppercase font-bold dark:hidden">Claro</span>
      <span className="text-xs text-slate-400 uppercase font-bold hidden dark:inline">Escuro</span>
    </Button>
  )
}
