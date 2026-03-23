import { ReactNode } from 'react'
import { verifySession } from '@/lib/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SidebarClient } from './sidebar-client'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  const session = await verifySession(token)

  if (!session) redirect('/login')

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300 flex h-[100dvh] overflow-hidden font-inter">
      <SidebarClient />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {children}
      </main>
    </div>
  )
}
