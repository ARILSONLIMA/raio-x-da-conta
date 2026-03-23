'use client'

import { ComposedChart, Bar, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import { Droplet, Zap } from 'lucide-react'

const monthNames = ['', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

type InvoiceData = {
  id: string
  type: 'WATER' | 'ENERGY'
  month: number
  year: number
  consumption: number
  cost: number
}

interface ChartsProps {
  water: InvoiceData[]
  energy: InvoiceData[]
}

export function DashboardCharts({ water, energy }: ChartsProps) {
  const formatData = (data: InvoiceData[]) => {
    return data.map(item => ({
      name: `${monthNames[item.month]}/${item.year.toString().slice(2)}`,
      consumo: Number(item.consumption),
      valor: Number(item.cost)
    }))
  }

  const waterData = formatData(water)
  const energyData = formatData(energy)

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Gráfico: Água */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-100 dark:border-slate-700/50 animate-fade-up" style={{ animationDelay: '0.3s' }}>
        <h3 className="text-xl font-bold text-sky-600 dark:text-sky-400 mb-6 flex items-center gap-2">
            <Droplet className="w-5 h-5" /> Consumo de Água
        </h3>
        <div className="h-[300px] w-full font-sans text-sm">
          {waterData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={waterData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="costColorW" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#E2E8F0" strokeOpacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} dy={10} />
                <YAxis yAxisId="left" orientation="left" stroke="#0ea5e9" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" axisLine={false} tickLine={false} tickFormatter={(val) => `R$ ${val}`} tick={{fontSize: 11, fontWeight: 'bold'}} />
                <Tooltip 
                  cursor={{fill: 'rgba(150,150,150,0.05)'}} 
                  contentStyle={{ backgroundColor: 'var(--card, #fff)', color: 'var(--card-foreground, #000)', borderRadius: '12px', border: '1px solid var(--border)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" />
                <Bar yAxisId="left" dataKey="consumo" name="Consumo (m³)" fill="#0ea5e9" radius={[6, 6, 0, 0]} maxBarSize={32} />
                <Area yAxisId="right" type="monotone" dataKey="valor" name="Valor (R$)" fill="url(#costColorW)" stroke="#10b981" strokeWidth={3} activeDot={{ r: 6, strokeWidth: 0 }} />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
              Sem dados de água registrados
            </div>
          )}
        </div>
      </div>

      {/* Gráfico: Energia */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-100 dark:border-slate-700/50 animate-fade-up" style={{ animationDelay: '0.4s' }}>
        <h3 className="text-xl font-bold text-amber-500 mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5" /> Consumo de Energia
        </h3>
        <div className="h-[300px] w-full font-sans text-sm">
          {energyData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={energyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="costColorE" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#E2E8F0" strokeOpacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} dy={10} />
                <YAxis yAxisId="left" orientation="left" stroke="#f59e0b" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" axisLine={false} tickLine={false} tickFormatter={(val) => `R$ ${val}`} tick={{fontSize: 11, fontWeight: 'bold'}} />
                <Tooltip 
                  cursor={{fill: 'rgba(150,150,150,0.05)'}} 
                  contentStyle={{ backgroundColor: 'var(--card, #fff)', color: 'var(--card-foreground, #000)', borderRadius: '12px', border: '1px solid var(--border)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" />
                <Bar yAxisId="left" dataKey="consumo" name="Consumo (kWh)" fill="#f59e0b" radius={[6, 6, 0, 0]} maxBarSize={32} />
                <Area yAxisId="right" type="monotone" dataKey="valor" name="Valor (R$)" fill="url(#costColorE)" stroke="#10b981" strokeWidth={3} activeDot={{ r: 6, strokeWidth: 0 }} />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
              Sem dados de energia registrados
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
