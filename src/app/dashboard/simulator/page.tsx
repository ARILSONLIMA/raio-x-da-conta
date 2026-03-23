'use client'

import { useState, useRef } from 'react'
import { Calculator, Zap, PlugZap, Clock, CalendarDays, Coins, CircleDollarSign, ShowerHead, Snowflake, Refrigerator, Tv, Monitor, Settings2 } from 'lucide-react'
import { TopHeader } from '@/app/dashboard/top-header'

// Base de dados de aparelhos comuns
const aparelhos = [
    { id: 'chuveiro', nome: 'Chuveiro', pot: 5500, horas: 0.5, icon: ShowerHead },
    { id: 'ar', nome: 'Ar Cond.', pot: 1000, horas: 8, icon: Snowflake },
    { id: 'geladeira', nome: 'Geladeira', pot: 400, horas: 24, icon: Refrigerator },
    { id: 'tv', nome: 'Televisão', pot: 100, horas: 5, icon: Tv },
    { id: 'pc', nome: 'Computador', pot: 300, horas: 4, icon: Monitor },
    { id: 'outro', nome: 'Personalizado', pot: '', horas: '', icon: Settings2 }
]

export default function SimulatorPage() {
    const [aparelhoSelecionado, setAparelhoSelecionado] = useState<string>('outro')
    const [potencia, setPotencia] = useState<number | ''>('')
    const [horas, setHoras] = useState<number | ''>('')
    const [dias, setDias] = useState<number | ''>('')
    const [tarifa, setTarifa] = useState<string>('0,95')
    const [resultado, setResultado] = useState<{ kwh: number, custo: number } | null>(null)
    const [animatingInputs, setAnimatingInputs] = useState(false)
    const resultRef = useRef<HTMLDivElement>(null)

    const handleAparelhoSelect = (id: string) => {
        setAparelhoSelecionado(id)
        const dados = aparelhos.find(a => a.id === id)
        if (dados && id !== 'outro') {
            setPotencia(dados.pot as number)
            setHoras(dados.horas as number)
            setDias(30)
            
            // Trigger animation
            setAnimatingInputs(true)
            setTimeout(() => setAnimatingInputs(false), 500)
            
            // Ocultar resultado
            setResultado(null)
        } else {
            setPotencia('')
            setHoras('')
            setDias('')
            setResultado(null)
        }
    }

    const calcularGasto = (e: React.FormEvent) => {
        e.preventDefault()
        
        const potVal = Number(potencia)
        const horasVal = Number(horas)
        const diasVal = Number(dias)
        const tarifaVal = parseFloat(tarifa.toString().replace(',', '.'))
        
        if (isNaN(potVal) || isNaN(horasVal) || isNaN(diasVal) || isNaN(tarifaVal) || !potencia || !horas || !dias) {
            alert("Por favor, preencha todos os campos com valores válidos.")
            return
        }

        const consumoKwh = (potVal * horasVal * diasVal) / 1000
        const custoMensal = consumoKwh * tarifaVal

        // Forçar re-renderização com animação
        setResultado(null)
        setTimeout(() => {
            setResultado({ kwh: consumoKwh, custo: custoMensal })
            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
            }, 100)
        }, 10)
    }

    // handleTarifaChange for smooth typing
    const handleTarifaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Allows typing something like "0,9" safely
        const val = e.target.value.replace(/[^0-9,.]/g, '')
        setTarifa(val)
    }

    return (
        <div className="flex-1 flex flex-col h-full relative">
            <TopHeader />
            
            <div className="flex-1 overflow-y-auto p-4 md:p-8 hide-scrollbar pb-24 text-slate-800">
                <style>{`
                    .hide-scrollbar::-webkit-scrollbar { display: none; }
                    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                    .select-pop { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
                    .select-pop:active { transform: scale(0.95); }
                    .input-group:focus-within .icon-wrapper { color: #0ea5e9; background-color: #f0f9ff; }
                    .input-group:focus-within { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15); }
                    .dark .input-group:focus-within .icon-wrapper { color: #38bdf8; background-color: rgba(14, 165, 233, 0.1); }
                    .dark .input-group:focus-within { border-color: #38bdf8; box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15); }
                    @keyframes slideUpFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                    .animate-result { animation: slideUpFade 0.5s ease-out forwards; opacity: 0; }
                    .animate-slide-up { animation: slideUpFade 0.5s ease-out forwards; opacity: 0; transform: translateY(4px); }
                `}</style>

                <div className="max-w-3xl mx-auto flex flex-col justify-center min-h-[calc(100vh-14rem)]">
                    <div className="bg-white dark:bg-slate-900 w-full rounded-3xl shadow-xl overflow-hidden animate-slide-up border border-slate-100 dark:border-slate-800">
                        
                        {/* Cabeçalho Principal */}
                        <div className="px-8 pt-10 pb-6">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-sky-100 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-2xl">
                                    <Calculator className="w-8 h-8" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">Simulador de Gastos</h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Descubra quanto cada aparelho consome na sua conta de luz no fim do mês.</p>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 pb-8">
                            <div className="border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 rounded-2xl p-6">
                                
                                {/* Título Secundário */}
                                <div className="flex items-center gap-2 mb-6 text-amber-500">
                                    <Zap className="w-5 h-5 fill-amber-500" />
                                    <h2 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">Simular Consumo Elétrico</h2>
                                </div>

                                <form onSubmit={calcularGasto} className="space-y-8">
                                    
                                    {/* 1. Seleção Rápida de Aparelho */}
                                    <div className="space-y-3">
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Selecione o Aparelho (Preenchimento Rápido)</label>
                                        <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2 -mx-2 px-2">
                                            {aparelhos.map(ap => {
                                                const isSelected = aparelhoSelecionado === ap.id;
                                                const IconComponent = ap.icon;
                                                return (
                                                    <button
                                                        key={ap.id}
                                                        type="button"
                                                        onClick={() => handleAparelhoSelect(ap.id)}
                                                        className={`select-pop flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl border transition-all focus:outline-none
                                                            ${isSelected 
                                                                ? 'border-sky-500 bg-sky-50 dark:bg-sky-500/10 ring-2 ring-sky-500/20 text-sky-700 dark:text-sky-400' 
                                                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-sky-500/5'
                                                            }
                                                        `}
                                                    >
                                                        <IconComponent className={`w-5 h-5 ${isSelected ? 'text-sky-500' : 'text-slate-400'}`} />
                                                        <span className="font-medium text-sm whitespace-nowrap">{ap.nome}</span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* 2. Inputs Detalhados */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        
                                        {/* Potência */}
                                        <div className="space-y-2">
                                            <label htmlFor="potencia" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Potência (Watts)</label>
                                            <div className={`input-group flex items-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl overflow-hidden transition-all
                                                ${animatingInputs ? 'ring-2 ring-emerald-400/50 border-emerald-400 dark:border-emerald-500 dark:ring-emerald-500/50' : ''}`}>
                                                <div className={`icon-wrapper p-3 border-r border-slate-100 dark:border-slate-800 transition-colors ${animatingInputs ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                    <PlugZap className="w-5 h-5" />
                                                </div>
                                                <input 
                                                    type="number" 
                                                    id="potencia" 
                                                    value={potencia}
                                                    onChange={(e) => setPotencia(e.target.value ? Number(e.target.value) : '')}
                                                    className="w-full p-3 outline-none text-slate-700 dark:text-slate-200 bg-transparent font-medium" 
                                                    placeholder="Ex: 5500" 
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        {/* Horas por dia */}
                                        <div className="space-y-2">
                                            <label htmlFor="horas" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Horas de uso por dia</label>
                                            <div className={`input-group flex items-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl overflow-hidden transition-all
                                                ${animatingInputs ? 'ring-2 ring-emerald-400/50 border-emerald-400 dark:border-emerald-500 dark:ring-emerald-500/50' : ''}`}>
                                                <div className={`icon-wrapper p-3 border-r border-slate-100 dark:border-slate-800 transition-colors ${animatingInputs ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                    <Clock className="w-5 h-5" />
                                                </div>
                                                <input 
                                                    type="number" 
                                                    id="horas" 
                                                    step="0.1" 
                                                    value={horas}
                                                    onChange={(e) => setHoras(e.target.value ? Number(e.target.value) : '')}
                                                    className="w-full p-3 outline-none text-slate-700 dark:text-slate-200 bg-transparent font-medium" 
                                                    placeholder="Ex: 1.5" 
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        {/* Dias por mês */}
                                        <div className="space-y-2">
                                            <label htmlFor="dias" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Dias de uso por mês</label>
                                            <div className={`input-group flex items-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl overflow-hidden transition-all
                                                ${animatingInputs ? 'ring-2 ring-emerald-400/50 border-emerald-400 dark:border-emerald-500 dark:ring-emerald-500/50' : ''}`}>
                                                <div className={`icon-wrapper p-3 border-r border-slate-100 dark:border-slate-800 transition-colors ${animatingInputs ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                    <CalendarDays className="w-5 h-5" />
                                                </div>
                                                <input 
                                                    type="number" 
                                                    id="dias" 
                                                    max="31" 
                                                    value={dias}
                                                    onChange={(e) => setDias(e.target.value ? Number(e.target.value) : '')}
                                                    className="w-full p-3 outline-none text-slate-700 dark:text-slate-200 bg-transparent font-medium" 
                                                    placeholder="Ex: 30" 
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        {/* Tarifa */}
                                        <div className="space-y-2">
                                            <label htmlFor="tarifa" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                                                Tarifa de Energia
                                                <span className="text-xs font-normal text-slate-400">(R$/kWh)</span>
                                            </label>
                                            <div className="input-group flex items-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl overflow-hidden transition-all">
                                                <div className="icon-wrapper p-3 text-slate-400 border-r border-slate-100 dark:border-slate-800 transition-colors">
                                                    <Coins className="w-5 h-5" />
                                                </div>
                                                <input 
                                                    type="text" 
                                                    id="tarifa" 
                                                    value={tarifa}
                                                    onChange={handleTarifaChange}
                                                    className="w-full p-3 outline-none text-slate-700 dark:text-slate-200 bg-transparent font-medium" 
                                                    required 
                                                />
                                            </div>
                                            <p className="text-[11px] text-slate-500 mt-1">Média no Brasil: R$ 0,95. Consulte a sua fatura.</p>
                                        </div>
                                    </div>

                                    {/* Botão Calcular */}
                                    <button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl p-4 mt-4 transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-sky-500/30 flex justify-center items-center gap-2">
                                        <Zap className="w-5 h-5" />
                                        <span>Calcular Gasto Mensal</span>
                                    </button>
                                </form>

                            </div>

                            {/* Área de Resultado */}
                            {resultado && (
                                <div ref={resultRef} className="mt-6 animate-result">
                                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                                        {/* Detalhe de Fundo */}
                                        <div className="absolute -right-6 -top-6 opacity-10">
                                            <CircleDollarSign className="w-32 h-32" />
                                        </div>

                                        <h3 className="text-sky-400 font-semibold text-sm tracking-wider uppercase mb-4">Resultado da Simulação</h3>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <p className="text-slate-400 text-sm">Consumo Estimado</p>
                                                <p className="text-3xl font-light">
                                                    <span className="font-bold">{resultado.kwh.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}</span> 
                                                    <span className="text-lg text-slate-400 ml-1">kWh</span>
                                                </p>
                                            </div>
                                            <div className="space-y-1 border-l border-slate-700 pl-4">
                                                <p className="text-slate-400 text-sm">Custo Mensal</p>
                                                <p className="text-3xl font-light text-emerald-400">
                                                    R$ <span className="font-bold">{resultado.custo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-4 border-t border-slate-700 pt-3 pr-10">
                                            * Lembre-se: este valor é apenas uma aproximação baseada nos dados inseridos, podendo variar devido a taxas locais e de iluminação pública inclusas na fatura real.
                                        </p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
