import { TrendingUp, TrendingDown, Minus, Sparkles, AlertTriangle, AlertCircle } from 'lucide-react'
import type { Invoice } from '@/types'

interface SmartInsightsProps {
  invoices: Invoice[]
  waterGoal?: number
  energyGoal?: number
}

export function SmartInsights({ invoices, waterGoal, energyGoal }: SmartInsightsProps) {
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

  let lastMonth = currentMonth - 1
  let lastMonthYear = currentYear
  if (lastMonth === 0) {
    lastMonth = 12
    lastMonthYear = currentYear - 1
  }

  // Separar faturas de água e energia ordenadas por data
  const waterInvoices = invoices.filter(i => i.type === 'WATER')
  const energyInvoices = invoices.filter(i => i.type === 'ENERGY')

  const currentWater = waterInvoices.find(i => i.month === currentMonth && i.year === currentYear)
  const lastWater = waterInvoices.find(i => i.month === lastMonth && i.year === lastMonthYear)

  const currentEnergy = energyInvoices.find(i => i.month === currentMonth && i.year === currentYear)
  const lastEnergy = energyInvoices.find(i => i.month === lastMonth && i.year === lastMonthYear)

  const waterSpent = currentWater ? currentWater.cost : 0
  const energySpent = currentEnergy ? currentEnergy.cost : 0

  const waterCons = currentWater ? currentWater.consumption : 0
  const lastWaterCons = lastWater ? lastWater.consumption : 0

  const currentTotal = waterSpent + energySpent
  const lastTotal = (lastWater ? lastWater.cost : 0) + (lastEnergy ? lastEnergy.cost : 0)

  let percentChange = 0
  if (lastTotal > 0) {
    percentChange = ((currentTotal - lastTotal) / lastTotal) * 100
  }

  // Lógica de Alertas
  const alerts: { type: 'danger' | 'warning'; message: string }[] = []

  // Alerta de Vazamento: Consumo de água aumentou mais de 20%
  if (lastWaterCons > 0 && waterCons > lastWaterCons * 1.20) {
    const increase = ((waterCons - lastWaterCons) / lastWaterCons) * 100
    alerts.push({
      type: 'danger',
      message: `Possível vazamento! Seu consumo de água subiu ${increase.toFixed(1)}% este mês (de ${lastWaterCons}m³ para ${waterCons}m³). Verifique torneiras e descargas.`
    })
  }

  // Alerta de estouro de meta de água
  if (waterGoal && waterSpent > waterGoal) {
    alerts.push({
      type: 'warning',
      message: `Meta de água excedida! O gasto atual (R$ ${waterSpent.toFixed(2)}) ultrapassou a meta de R$ ${waterGoal.toFixed(2)}.`
    })
  }

  // Alerta de estouro de meta de energia
  if (energyGoal && energySpent > energyGoal) {
    alerts.push({
      type: 'warning',
      message: `Meta de energia excedida! O gasto atual (R$ ${energySpent.toFixed(2)}) ultrapassou a meta de R$ ${energyGoal.toFixed(2)}.`
    })
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
      
      <div className="relative z-10 space-y-4">
        {(lastTotal > 0 && currentTotal > 0) ? (
          <div>
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
          </div>
        ) : (lastTotal > 0 && currentTotal === 0) ? (
          <div>
            <p className="text-xl font-medium text-emerald-900 dark:text-emerald-100 mb-2">
              Registre suas faturas deste mês para comparar e gerar insights.
            </p>
            <p className="text-sm text-emerald-700/80 dark:text-emerald-400/80">
              Gasto total no mês passado: R$ {lastTotal.toFixed(2)}.
            </p>
          </div>
        ) : (currentTotal > 0) ? (
          <p className="text-xl font-medium text-emerald-900 dark:text-emerald-100 mb-2">
            Primeiro mês de uso! Registre o próximo mês para ver comparações de economia.
          </p>
        ) : (
          <p className="text-xl font-medium text-emerald-900 dark:text-emerald-100 mb-2">
            Acompanhe seus gastos para ver tendências.
          </p>
        )}

        {/* Exibição de Alertas Lógicos */}
        {alerts.length > 0 && (
          <div className="pt-2 border-t border-emerald-100/50 dark:border-emerald-800/30 space-y-2">
            {alerts.map((alert, index) => (
              <div 
                key={index} 
                className={`flex gap-2 items-start p-3 rounded-2xl text-sm ${
                  alert.type === 'danger' 
                    ? 'bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300 border border-red-100 dark:border-red-900/30' 
                    : 'bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border border-amber-100 dark:border-amber-900/30'
                }`}
              >
                {alert.type === 'danger' ? (
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500" />
                )}
                <span>{alert.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
