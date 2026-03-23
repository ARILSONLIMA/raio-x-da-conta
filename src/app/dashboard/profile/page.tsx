import { verifySession } from '@/lib/auth'
import { cookies } from 'next/headers'
import pool from '@/lib/db'
import { redirect } from 'next/navigation'
import { ProfileForm } from './profile-form'
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
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Meu Perfil</h1>
        <p className="text-slate-600 mt-2">Gerencie suas configurações e metas de gastos.</p>
      </div>
      <ProfileForm user={user} />
    </div>
  )
}
