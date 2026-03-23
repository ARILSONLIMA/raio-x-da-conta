import { TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react'
import type { Invoice } from '@/types'

export function SmartInsights({ invoices }: { invoices: Invoice[] }) {
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  let lastMonth = currentMonth - 1
  let lastMonthYear = currentYear
  if (lastMonth === 0) {
    lastMonth = 12
    lastMonthYear = currentYear - 1
  }

  const currentTotal = invoices.filter(i => i.month === currentMonth && i.year === currentYear).reduce((acc, curr) => acc + curr.cost, 0)
  const lastTotal = invoices.filter(i => i.month === lastMonth && i.year === lastMonthYear).reduce((acc, curr) => acc + curr.cost, 0)

  let percentChange = 0
  if (lastTotal > 0) {
    percentChange = ((currentTotal - lastTotal) / lastTotal) * 100
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl p-6 border border-emerald-100 dark:border-emerald-800/30 shadow-xl shadow-emerald-100/50 dark:shadow-none flex flex-col justify-center animate-fade-up relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
      <Sparkles className="absolute -right-6 -bottom-6 w-32 h-32 text-emerald-500/10 dark:text-emerald-500/5" />
      
      <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-2 relative z-10">
        <div className="p-2 bg-emerald-100 dark:bg-emerald-800/50 rounded-lg">
          {percentChange > 0 
            ? <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" />
            : percentChange < 0 
            ? <TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
            : <Minus className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          }
        </div>
        Insights Inteligentes
      </h3>
      
      <div className="relative z-10">
        {(lastTotal > 0 && currentTotal > 0) ? (
          <>
            <p className="text-xl font-medium text-emerald-900 dark:text-emerald-100 mb-2">
              {percentChange < 0 ? 'Parabéns! Seus gastos caíram ' : percentChange > 0 ? 'Atenção, seus gastos aumentaram ' : 'Seus gastos estão iguais aos do último mês '}
              {percentChange !== 0 && (
                <span className={`${percentChange < 0 ? 'bg-emerald-200 dark:bg-emerald-700 text-emerald-800 dark:text-emerald-200' : 'bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-200'} px-2 py-0.5 rounded`}>
                  {Math.abs(percentChange).toFixed(1)}%
                </span>
              )}
            </p>
            <p className="text-sm text-emerald-700/80 dark:text-emerald-400/80">
              Comparando R$ {lastTotal.toFixed(2)} (mês passado) com R$ {currentTotal.toFixed(2)} (atual).
            </p>
          </>
        ) : (lastTotal > 0 && currentTotal === 0) ? (
          <>
            <p className="text-xl font-medium text-emerald-900 dark:text-emerald-100 mb-2">
              Registre suas faturas deste mês para comparar e gerar insights.
            </p>
            <p className="text-sm text-emerald-700/80 dark:text-emerald-400/80">
              Gasto total no mês passado: R$ {lastTotal.toFixed(2)}.
            </p>
          </>
        ) : (currentTotal > 0) ? (
          <p className="text-xl font-medium text-emerald-900 dark:text-emerald-100 mb-2">
            Primeiro mês de uso! Registre o próximo mês para ver comparações de economia.
          </p>
        ) : (
          <p className="text-xl font-medium text-emerald-900 dark:text-emerald-100 mb-2">
            Acompanhe seus gastos para ver tendências.
          </p>
        )}
      </div>
    </div>
  )
}
