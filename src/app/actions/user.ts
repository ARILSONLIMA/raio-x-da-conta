'use server'

import pool from '@/lib/db'
import { verifySession } from '@/lib/auth'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function updateGoals(prevState: any, formData: FormData) {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  const session = await verifySession(token)

  if (!session || !session.userId) {
    return { error: 'Não autorizado' }
  }

  const waterGoalRaw = formData.get('waterGoal') as string
  const energyGoalRaw = formData.get('energyGoal') as string

  let waterGoal = null;
  let energyGoal = null;

  if (waterGoalRaw) {
    waterGoal = parseFloat(waterGoalRaw.replace(',', '.'))
    if (isNaN(waterGoal) || waterGoal < 0) return { error: 'Meta de água inválida.' }
  }

  if (energyGoalRaw) {
    energyGoal = parseFloat(energyGoalRaw.replace(',', '.'))
    if (isNaN(energyGoal) || energyGoal < 0) return { error: 'Meta de energia inválida.' }
  }

  try {
    await pool.query('UPDATE User SET waterGoal = ?, energyGoal = ? WHERE id = ?', [waterGoal, energyGoal, session.userId])
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/profile')
    return { success: true, message: 'Metas salvas com sucesso!' }
  } catch (err: any) {
    console.error(err)
    return { error: 'Erro ao salvar metas.' }
  }
}
