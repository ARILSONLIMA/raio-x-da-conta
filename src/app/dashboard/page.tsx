import { verifySession } from '@/lib/auth'
import { cookies } from 'next/headers'
import pool from '@/lib/db'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DashboardCharts } from '@/app/dashboard/charts'
import { InvoiceTable } from '@/app/dashboard/invoice-table'
import { GoalsProgress } from '@/app/dashboard/goals-progress'
import { SmartInsights } from '@/app/dashboard/insights'
import { YearFilter } from '@/app/dashboard/year-filter'
import { ExportButton } from '@/app/dashboard/export-button'
import { TopHeader } from '@/app/dashboard/top-header'
import type { Invoice } from '@/types'

export default async function DashboardPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams
  const yearFilter = searchParams.year as string | undefined

  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  const session = await verifySession(token)

  if (!session || !session.userId) redirect('/login')

  const [userRows] = await pool.query<any[]>('SELECT waterGoal, energyGoal FROM User WHERE id = ?', [session.userId])
  const user = userRows[0] || {}

  let query = 'SELECT * FROM Invoice WHERE userId = ? ORDER BY year DESC, month DESC'
  let queryParams: any[] = [session.userId]

  if (yearFilter) {
    query = 'SELECT * FROM Invoice WHERE userId = ? AND year = ? ORDER BY year DESC, month DESC'
    queryParams.push(Number(yearFilter))
  }

  const [rows] = await pool.query<any[]>(query, queryParams)
  const invoices = rows;

  const [yearsRows] = await pool.query<any[]>('SELECT DISTINCT year FROM Invoice WHERE userId = ? ORDER BY year DESC', [session.userId])
  const availableYears = yearsRows.map(r => r.year)

  const invoicesSerialized: Invoice[] = invoices.map(i => ({
    id: i.id,
    userId: i.userId,
    type: i.type,
    month: i.month,
    year: i.year,
    consumption: Number(i.consumption),
    cost: Number(i.cost),
    createdAt: i.createdAt,
    updatedAt: i.updatedAt
  }))

  const waterInvoices = [...invoicesSerialized].sort((a,b) => (a.year - b.year) || (a.month - b.month)).filter(i => i.type === 'WATER')
  const energyInvoices = [...invoicesSerialized].sort((a,b) => (a.year - b.year) || (a.month - b.month)).filter(i => i.type === 'ENERGY')

  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  const waterSpent = waterInvoices.filter(i => i.month === currentMonth && i.year === currentYear).reduce((acc, curr) => acc + curr.cost, 0)
  const energySpent = energyInvoices.filter(i => i.month === currentMonth && i.year === currentYear).reduce((acc, curr) => acc + curr.cost, 0)

  return (
    <div className="flex-1 flex flex-col h-full relative">
      <TopHeader title="Meu Painel" subtitle="Acompanhe seu histórico de consumo de água e energia.">
        {(invoices.length > 0 || yearFilter) && (
          <div className="flex gap-2 items-center">
            <YearFilter availableYears={availableYears} />
            <ExportButton invoices={invoicesSerialized} />
          </div>
        )}
      </TopHeader>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 hide-scrollbar pb-24">
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          @keyframes fadeUp {
              from { opacity: 0; transform: translateY(15px); }
              to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-up {
              animation: fadeUp 0.6s ease-out forwards;
          }
        `}</style>

        {invoices.length === 0 && !yearFilter ? (
          <Card className="text-center p-12 bg-white dark:bg-slate-950 shadow-sm border-dashed dark:border-slate-800 animate-fade-up">
            <CardContent className="space-y-4 pt-6">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Nenhum dado encontrado</h2>
              <p className="text-slate-600 dark:text-slate-400 pb-4">Adicione sua primeira fatura para visualizar o gráfico.</p>
              <Link href="/dashboard/add">
                <Button className="bg-[#00AEDB] hover:bg-[#00AEDB]/90 text-white shadow-md">Adicionar Primeira Fatura</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GoalsProgress
                waterGoal={Number(user.waterGoal)}
                energyGoal={Number(user.energyGoal)}
                waterSpent={waterSpent}
                energySpent={energySpent}
              />
              <SmartInsights invoices={invoicesSerialized} />
            </div>
            {invoices.length > 0 ? (
              <DashboardCharts water={waterInvoices} energy={energyInvoices} />
            ) : (
              <div className="p-8 text-center text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 animate-fade-up">
                Nenhuma fatura encontrada neste formato.
              </div>
            )}
            <InvoiceTable invoices={invoicesSerialized} />
          </>
        )}
      </div>
    </div>
  )
}
