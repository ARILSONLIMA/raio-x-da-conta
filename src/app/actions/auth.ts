'use server'

import pool from '@/lib/db'
import { createSession } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash)
}

export async function register(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!name || !email || !password) return { error: 'Preencha todos os campos' }

  try {
    const [existingRows] = await pool.query<any[]>('SELECT * FROM User WHERE email = ?', [email])
    if (existingRows.length > 0) return { error: 'E-mail já cadastrado' }

    const password_hash = await hashPassword(password)
    const id = crypto.randomUUID()

    await pool.query('INSERT INTO User (id, name, email, password_hash, createdAt) VALUES (?, ?, ?, ?, NOW())', [id, name, email, password_hash])

    const { session, expiresAt } = await createSession(id)
    const cookieStore = await cookies()
    cookieStore.set('session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      sameSite: 'lax',
      path: '/'
    })
  } catch (err: any) {
    console.error('Registration Error:', err)
    return { error: 'Erro ao criar conta: ' + (err?.message || 'Falha Desconhecida') }
  }

  redirect('/dashboard')
}

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) return { error: 'Preencha todos os campos' }

  try {
    const [rows] = await pool.query<any[]>('SELECT * FROM User WHERE email = ?', [email])
    const user = rows[0]
    if (!user) return { error: 'Credenciais inválidas' }

    const isValid = await verifyPassword(password, user.password_hash)
    if (!isValid) return { error: 'Credenciais inválidas' }

    const { session, expiresAt } = await createSession(user.id)
    const cookieStore = await cookies()
    cookieStore.set('session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      sameSite: 'lax',
      path: '/'
    })
  } catch (err) {
    console.error('Login Error:', err)
    return { error: 'Erro ao fazer login' }
  }

  redirect('/dashboard')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
  redirect('/login')
}
