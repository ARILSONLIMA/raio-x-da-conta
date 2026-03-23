'use client'

import { useActionState, useEffect, useState } from 'react'
import { updateGoals } from '@/app/actions/user'
import { toast } from 'sonner'
import type { User } from '@/types'

export function ProfileForm({ user }: { user: User }) {
  const [state, formAction, pending] = useActionState(updateGoals, null)
  const [waterGoal, setWaterGoal] = useState(user.waterGoal?.toString() || '')
  const [energyGoal, setEnergyGoal] = useState(user.energyGoal?.toString() || '')

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
    } else if (state?.error) {
      toast.error(state.error)
    }
  }, [state])

  useEffect(() => {
    setWaterGoal(user.waterGoal?.toString() || '')
    setEnergyGoal(user.energyGoal?.toString() || '')
  }, [user.waterGoal, user.energyGoal])

  return (
    <div className="bg-white dark:bg-slate-900 w-full rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
      <form action={formAction} className="p-6 md:p-8 space-y-8">
        
        <div className="text-center space-y-1 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Metas Mensais</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Defina um teto de gastos e receba alertas caso comece a ultrapassá-lo na Dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Water */}
          <div className="space-y-2">
            <label htmlFor="waterGoal" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Meta de Água (R$)</label>
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 overflow-hidden transition-all focus-within:ring-2 focus-within:ring-sky-500 focus-within:bg-white dark:focus-within:bg-slate-900">
              <span className="pl-4 text-sky-500 font-semibold">R$</span>
              <input 
                id="waterGoal" 
                name="waterGoal" 
                type="text" 
                placeholder="Ex: 80,00" 
                value={waterGoal}
                onChange={(e) => setWaterGoal(e.target.value)}
                pattern="[0-9]+([,\.][0-9]{1,2})?"
                className="w-full p-4 outline-none text-slate-800 dark:text-slate-200 bg-transparent text-lg font-medium placeholder:text-slate-400" 
              />
            </div>
          </div>

          {/* Energy */}
          <div className="space-y-2">
            <label htmlFor="energyGoal" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Meta de Energia (R$)</label>
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 overflow-hidden transition-all focus-within:ring-2 focus-within:ring-amber-500 focus-within:bg-white dark:focus-within:bg-slate-900">
              <span className="pl-4 text-amber-500 font-semibold">R$</span>
              <input 
                id="energyGoal" 
                name="energyGoal" 
                type="text" 
                placeholder="Ex: 150,00" 
                value={energyGoal}
                onChange={(e) => setEnergyGoal(e.target.value)}
                pattern="[0-9]+([,\.][0-9]{1,2})?"
                className="w-full p-4 outline-none text-slate-800 dark:text-slate-200 bg-transparent text-lg font-medium placeholder:text-slate-400" 
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <button 
            type="submit" 
            disabled={pending}
            className={`w-full text-white font-semibold rounded-xl p-4 transition-all duration-300 shadow-lg flex justify-center items-center gap-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 shadow-slate-800/20 active:scale-[0.98] ${pending ? 'opacity-80 cursor-not-allowed' : ''}`}
          >
            {pending ? 'Salvando Alterações...' : 'Salvar Metas'}
          </button>
        </div>
      </form>
    </div>
  )
}
