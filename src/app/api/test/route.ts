import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    // Tenta uma consulta super simples que não exige nenhuma tabela
    const [rows] = await pool.query('SELECT 1 + 1 AS result')
    return NextResponse.json({ 
      success: true, 
      message: 'Conexão com o banco na Hostinger foi um SUCESSO ABSOLUTO!', 
      data: rows 
    })
  } catch (err: any) {
    return NextResponse.json({ 
      success: false, 
      error: err?.message || 'Falha de conexão desconhecida',
      code: err?.code
    }, { status: 500 })
  }
}
