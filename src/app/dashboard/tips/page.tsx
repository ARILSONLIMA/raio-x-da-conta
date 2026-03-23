import { verifySession } from '@/lib/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import pool from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Droplets, Zap, Info, ArrowUpRight, CheckCircle2 } from 'lucide-react'

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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dicas de Economia</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Nós lemos seus dados e listamos o que pode reduzir sua próxima conta.</p>
      </div>

      <Card className="bg-gradient-to-br from-indigo-50 to-emerald-50 dark:from-indigo-950/40 dark:to-emerald-900/20 border-indigo-100 dark:border-indigo-900 shadow-sm">
        <CardContent className="p-6 flex items-start gap-4">
          <div className="bg-white dark:bg-slate-900 p-3 rounded-full shadow-sm shrink-0">
            <Info className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              {isFirstTime ? 'Comece a poupar!' : 'Análise do seu Histórico'}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              {isFirstTime ? (
                'Adicione sua primeira fatura para receber dicas de economia direcionadas para você!'
              ) : (
                <>Com base nos seus registros, você tem gastado mais dinheiro do seu orçamento com <strong>{primaryType}</strong> (R$ {totals[isEnergyHigher ? 'ENERGY' : 'WATER'].toFixed(2)} no total). Preparamos abaixo dicas prioritárias para você aplicar hoje mesmo.</>
              )}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            {primaryIcon} Dicas Prioritárias de {primaryType}
          </h3>
          <div className="grid gap-4">
            {primaryTips.map((tip, idx) => (
              <Card key={idx} className="bg-white dark:bg-slate-950 shadow-sm hover:shadow-md transition-shadow dark:border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between font-bold">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> {tip.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{tip.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            {isEnergyHigher ? <Droplets className="text-[#00AEDB] h-5 w-5" /> : <Zap className="text-[#FCC30B] h-5 w-5" />} 
            Dicas Secundárias de {isEnergyHigher ? 'Água' : 'Energia'}
          </h3>
          <div className="grid gap-4 opacity-80">
            {secondaryTips.map((tip, idx) => (
              <Card key={idx} className="bg-slate-50 dark:bg-slate-900 border-dashed dark:border-slate-800 shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                    <ArrowUpRight className="h-4 w-4 text-slate-400 shrink-0" /> {tip.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{tip.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
