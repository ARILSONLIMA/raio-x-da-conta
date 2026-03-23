import { Target } from 'lucide-react'

interface GoalsProgressProps {
  waterGoal: number | null
  energyGoal: number | null
  waterSpent: number
  energySpent: number
}

export function GoalsProgress({ waterGoal, energyGoal, waterSpent, energySpent }: GoalsProgressProps) {
  if (!waterGoal && !energyGoal) return null

  const calculateProgress = (spent: number, goal: number | null) => {
    if (!goal) return 0
    return Math.min((spent / goal) * 100, 100)
  }

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-100 dark:border-slate-700/50 animate-fade-up" style={{ animationDelay: '0.1s' }}>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
        <Target className="w-5 h-5 text-indigo-500" />
        Metas do Mês
      </h3>
      
      {waterGoal && (
        <div className="mb-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-slate-700 dark:text-slate-300">Água</span>
            <span className="text-slate-500 font-medium">
              <span className="text-slate-800 dark:text-slate-200">{formatCurrency(waterSpent)}</span> / {formatCurrency(waterGoal)}
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden shadow-inner flex">
            <div 
              className="bg-gradient-to-r from-sky-400 to-sky-500 h-3 rounded-full relative transition-all duration-1000"
              style={{ width: `${calculateProgress(waterSpent, waterGoal)}%` }}
            >
              <div className="absolute inset-0 bg-white/20"></div>
            </div>
          </div>
        </div>
      )}

      {energyGoal && (
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-slate-700 dark:text-slate-300">Energia</span>
            <span className="text-slate-500 font-medium">
              <span className="text-slate-800 dark:text-slate-200">{formatCurrency(energySpent)}</span> / {formatCurrency(energyGoal)}
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden shadow-inner flex">
            <div 
              className="bg-gradient-to-r from-amber-400 to-amber-500 h-3 rounded-full relative transition-all duration-1000"
              style={{ width: `${calculateProgress(energySpent, energyGoal)}%` }}
            >
              <div className="absolute inset-0 bg-white/20"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
