import { verifySession } from '@/lib/auth'
import { cookies } from 'next/headers'
import pool from '@/lib/db'
import { redirect } from 'next/navigation'
import { ProfileForm } from './profile-form'
import { TopHeader } from '@/app/dashboard/top-header'
import type { User } from '@/types'

export default async function ProfilePage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  const session = await verifySession(token)

  if (!session || !session.userId) redirect('/login')

  const [rows] = await pool.query<any[]>('SELECT * FROM User WHERE id = ?', [session.userId])
  const user = rows[0] as User

  if (!user) redirect('/login')

  return (
    <div className="flex-1 flex flex-col h-full relative">
      <TopHeader title="Meu Perfil e Metas" subtitle="Gerencie as limitações e avisos do seu orçamento" />
      
      <div className="flex-1 overflow-y-auto p-4 md:p-8 hide-scrollbar pb-24 text-slate-800">
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          @keyframes fadeIn { to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; opacity: 0; transform: translateY(4px); }
        `}</style>
        
        <div className="max-w-2xl mx-auto flex flex-col justify-center min-h-[calc(100vh-14rem)] animate-fade-in">
          <ProfileForm user={user} />
        </div>
      </div>
    </div>
  )
}
