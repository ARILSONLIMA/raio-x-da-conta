import { verifySession } from '@/lib/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import pool from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Droplets, Zap, Info, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { TopHeader } from '@/app/dashboard/top-header'

export default async function TipsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  const session = await verifySession(token)

  if (!session) redirect('/login')

  const [rows] = await pool.query<any[]>(
    'SELECT type, SUM(cost) as totalCost FROM Invoice WHERE userId = ? GROUP BY type',
    [session.userId]
  )

  const totals = { WATER: 0, ENERGY: 0 }
  ;(rows as any[]).forEach(row => {
    totals[row.type as 'WATER' | 'ENERGY'] = Number(row.totalCost)
  })

  // Logical condition
  const isEnergyHigher = totals.ENERGY >= totals.WATER

  const energyTips = [
    { title: 'Ar-condicionado Inteligente', desc: 'Mantenha em 23°C. Cada grau a menos aumenta o consumo em até 8%. Limpe o filtro mensalmente.' },
    { title: 'Geladeira Eficiente', desc: 'Verifique as borrachas de vedação, não coloque roupas para secar atrás e evite abrir a porta sem necessidade.' },
    { title: 'Chuveiro Elétrico', desc: 'Tome banhos curtos. No calor, use a chave na posição "Verão" para economizar até 30% na potência.' },
    { title: 'Iluminação de LED', desc: 'Aproveite a luz do dia e troque todas as suas lâmpadas incandescentes ou fluorescentes antigas por LED (que gastam 80% menos).' }
  ]

  const waterTips = [
    { title: 'Vazamentos Silenciosos', desc: 'Um pinga-pinga pode desperdiçar até 46 litros por dia. Verifique válvulas de descargas e torneiras.' },
    { title: 'Banhos Mais Curtos', desc: 'Reduzir o banho em apenas 5 minutos economiza até 90 litros de água (feche a torneira ao se ensaboar).' },
    { title: 'Máquina de Lavar Cheia', desc: 'Não ligue a máquina com pouca roupa. Acumule roupas sujas e lave tudo de uma vez para usar 100% da capacidade.' },
    { title: 'Reaproveitamento', desc: 'Use a água do enxágue final da máquina de lavar roupa para limpar o quintal ou o carro em vez da mangueira.' }
  ]

  const primaryTips = isEnergyHigher ? energyTips : waterTips
  const secondaryTips = isEnergyHigher ? waterTips : energyTips
  const primaryType = isEnergyHigher ? 'Energia' : 'Água'
  const primaryIcon = isEnergyHigher ? <Zap className="text-[#FCC30B] h-5 w-5" /> : <Droplets className="text-[#00AEDB] h-5 w-5" />
  const isFirstTime = totals.ENERGY === 0 && totals.WATER === 0

  return (
    <div className="flex-1 flex flex-col h-full relative">
      <TopHeader title="Dicas de Economia" subtitle="Ações curadas para abaixar sua conta na prática" />
      
      <div className="flex-1 overflow-y-auto p-4 md:p-8 hide-scrollbar pb-24 text-slate-800">
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          @keyframes fadeIn { to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; opacity: 0; transform: translateY(4px); }
        `}</style>
        
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">

          <Card className="bg-gradient-to-br from-indigo-50 to-emerald-50 dark:from-indigo-950/40 dark:to-emerald-900/20 border-indigo-100 dark:border-indigo-900 shadow-sm rounded-2xl">
            <CardContent className="p-6 md:p-8 flex items-start flex-col sm:flex-row gap-4">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-full shadow-sm shrink-0 border border-indigo-100 dark:border-slate-800">
                <Info className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  {isFirstTime ? 'Comece a poupar!' : 'Análise Personalizada do seu Histórico'}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mt-2 text-base leading-relaxed">
                  {isFirstTime ? (
                    'Adicione sua primeira fatura para receber dicas de economia direcionadas para você!'
                  ) : (
                    <>Com base nos seus registros, você tem gastado mais dinheiro do seu orçamento com <strong className="font-bold underline decoration-indigo-300 dark:decoration-indigo-700 underline-offset-4">{primaryType}</strong> (valor total de R$ {totals[isEnergyHigher ? 'ENERGY' : 'WATER'].toFixed(2)}). Preparamos abaixo dicas essenciais e prioritárias para você aplicar hoje mesmo.</>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                {primaryIcon} Dicas Prioritárias de {primaryType}
              </h3>
              <div className="grid gap-4">
                {primaryTips.map((tip, idx) => (
                  <Card key={idx} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all dark:border-slate-800 dark:hover:border-slate-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-start gap-3 font-bold text-slate-800 dark:text-slate-100">
                        <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5" /> 
                        {tip.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-14">
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">{tip.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                {isEnergyHigher ? <Droplets className="text-[#00AEDB] h-5 w-5" /> : <Zap className="text-[#FCC30B] h-5 w-5" />} 
                Dicas de {isEnergyHigher ? 'Água' : 'Energia'} (Secundárias)
              </h3>
              <div className="grid gap-4 opacity-90">
                {secondaryTips.map((tip, idx) => (
                  <Card key={idx} className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 shadow-none hover:bg-slate-100 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base md:text-lg flex items-start gap-3 font-bold text-slate-700 dark:text-slate-300">
                        <ArrowUpRight className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" /> 
                        {tip.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-14">
                      <p className="text-sm text-slate-500 dark:text-slate-400">{tip.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

