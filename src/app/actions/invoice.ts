'use server'

import pool from '@/lib/db'
import { verifySession } from '@/lib/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function addInvoice(prevState: any, formData: FormData) {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  const session = await verifySession(token)

  if (!session || !session.userId) {
    return { error: 'Não autorizado' }
  }

  const type = formData.get('type') as 'WATER' | 'ENERGY'
  const month = parseInt(formData.get('month') as string)
  const year = parseInt(formData.get('year') as string)
  const consumptionRaw = formData.get('consumption') as string
  const costRaw = formData.get('cost') as string
  const forceUpdate = formData.get('forceUpdate') === 'true'

  if (!type || !month || !year || !consumptionRaw || !costRaw) {
    return { error: 'Preencha todos os campos.' }
  }

  const consumption = parseFloat(consumptionRaw.replace(',', '.'))
  const cost = parseFloat(costRaw.replace(',', '.'))

  if (isNaN(consumption) || isNaN(cost) || consumption < 0 || cost < 0) {
    return { error: 'Valores numéricos inválidos.' }
  }

  try {
    const [rows] = await pool.query<any[]>(
      'SELECT id FROM Invoice WHERE userId = ? AND type = ? AND month = ? AND year = ?', 
      [session.userId, type, month, year]
    )
    const existing = rows[0]

    if (existing && !forceUpdate) {
      return { error: 'DUPLICATE', message: 'Já existe uma fatura para este tipo e mês. Deseja sobrescrever os dados?' }
    }

    if (existing && forceUpdate) {
      await pool.query('UPDATE Invoice SET consumption = ?, cost = ? WHERE id = ?', [consumption, cost, existing.id])
    } else {
      const id = crypto.randomUUID()
      await pool.query(
        'INSERT INTO Invoice (id, userId, type, month, year, consumption, cost, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())', 
        [id, session.userId, type, month, year, consumption, cost]
      )
    }
  } catch (err: any) {
    console.error(err)
    return { error: 'Erro ao salvar fatura.' }
  }

  return { success: true, message: 'Fatura salva com sucesso!' }
}

export async function deleteInvoice(id: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  const session = await verifySession(token)

  if (!session || !session.userId) {
    return { error: 'Não autorizado' }
  }

  try {
    await pool.query('DELETE FROM Invoice WHERE id = ? AND userId = ?', [id, session.userId])
    return { success: true, message: 'Fatura excluída com sucesso!' }
  } catch (err: any) {
    console.error(err)
    return { error: 'Erro ao excluir fatura.' }
  }
}

export async function updateInvoice(prevState: any, formData: FormData) {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  const session = await verifySession(token)

  if (!session || !session.userId) {
    return { error: 'Não autorizado' }
  }

  const id = formData.get('id') as string
  const consumptionRaw = formData.get('consumption') as string
  const costRaw = formData.get('cost') as string

  if (!id || !consumptionRaw || !costRaw) {
    return { error: 'Preencha todos os campos obrigatórios.' }
  }

  const consumption = parseFloat(consumptionRaw.replace(',', '.'))
  const cost = parseFloat(costRaw.replace(',', '.'))

  if (isNaN(consumption) || isNaN(cost) || consumption < 0 || cost < 0) {
    return { error: 'Valores numéricos inválidos.' }
  }

  try {
    await pool.query('UPDATE Invoice SET consumption = ?, cost = ? WHERE id = ? AND userId = ?', [consumption, cost, id, session.userId])
    return { success: true, message: 'Fatura atualizada com sucesso!' }
  } catch (err: any) {
    console.error(err)
    return { error: 'Erro ao atualizar fatura.' }
  }
}
