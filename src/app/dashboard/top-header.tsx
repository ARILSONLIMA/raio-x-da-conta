'use client'
import { Menu } from 'lucide-react'

export function TopHeader({ title, subtitle, children }: { title?: string, subtitle?: string, children?: React.ReactNode }) {
    return (
        <header className="h-20 flex items-center justify-between px-4 md:px-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30 flex-shrink-0">
            <div className="flex items-center gap-4">
                <button onClick={() => window.dispatchEvent(new Event('toggleSidebar'))} className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    <Menu className="w-5 h-5" />
                </button>
                {title && (
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>
                        {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block mt-1">{subtitle}</p>}
                    </div>
                )}
            </div>
            
            {children && (
                <div className="flex items-center gap-3">
                    {children}
                </div>
            )}
        </header>
    )
}
