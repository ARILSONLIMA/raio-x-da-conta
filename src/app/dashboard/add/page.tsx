'use client'

import { useActionState, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { addInvoice } from '@/app/actions/invoice'
import { Droplet, Zap, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TopHeader } from '@/app/dashboard/top-header'

const currentYear = new Date().getFullYear()
const anos = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i) // [currentYear - 2, ..., currentYear + 2]
const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
const mesesCompletos = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

export default function AddInvoicePage() {
  const [state, formAction, pending] = useActionState(addInvoice, null)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  
  const [showConfirm, setShowConfirm] = useState(false)

  // Estados locais do form UI
  const [tipoConta, setTipoConta] = useState<string>('')
  const [mesSelecionado, setMesSelecionado] = useState<number>(new Date().getMonth() + 1)
  const [anoSelecionado, setAnoSelecionado] = useState<number>(currentYear)
  const [costValue, setCostValue] = useState('')

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || 'Fatura guardada com sucesso!')
      router.push('/dashboard')
    } else if (state?.error === 'DUPLICATE') {
      setShowConfirm(true)
    } else if (state?.error) {
      setShowConfirm(false)
      toast.error(state.error)
    }
  }, [state, router])

  const handleConfirm = () => {
    if (formRef.current) {
      formRef.current.requestSubmit()
    }
  }

  const formatarMoeda = (val: string) => {
    let value = val.replace(/\D/g, '') // Remove tudo que não é dígito
    if (value === '') return ''
    value = (parseInt(value) / 100).toFixed(2) // Divide por 100 e formata com 2 casas
    value = value.replace('.', ',') // Troca ponto por vírgula
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') // Adiciona os pontos de milhar
    return value
  }

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCostValue(formatarMoeda(e.target.value))
  }

  return (
    <div className="flex-1 flex flex-col h-full relative">
      <TopHeader title="Adicionar Fatura" subtitle="Cadastre seu novo consumo de água ou energia" />
      
      <div className="flex-1 overflow-y-auto p-4 md:p-8 hide-scrollbar pb-24 text-slate-800">
        <style>{`
          .select-pop { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
          .select-pop:active { transform: scale(0.95); }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .input-focus-ring:focus-within { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.2); }
          @keyframes fadeIn { to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; opacity: 0; transform: translateY(4px); }
        `}</style>
        
        <div className="max-w-2xl mx-auto flex flex-col justify-center min-h-[calc(100vh-14rem)]">
          {/* Recipiente Principal */}
          <div className="bg-white dark:bg-slate-900 w-full rounded-3xl shadow-xl overflow-hidden animate-fade-in border border-slate-100 dark:border-slate-800">
            {/* Formulário */}
            <form action={formAction} ref={formRef} className="p-6 md:p-8 space-y-8">
              
              <div className="text-center space-y-1 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white tracking-tight">Nova Fatura</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Preencha os detalhes abaixo para registrar seus gastos mensais no seu Raio-X.
                </p>
              </div>

              {/* Campos Ocultos para armazenar os valores submetidos */}
              <input type="hidden" name="type" value={tipoConta} required />
              <input type="hidden" name="month" value={mesSelecionado} required />
              <input type="hidden" name="year" value={anoSelecionado} required />

              {/* 1. Tipo de Conta */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Tipo de Conta</label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Botão Água */}
                  <div 
                    onClick={() => setTipoConta('WATER')} 
                    className={`select-pop cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-colors
                      ${tipoConta === 'WATER' 
                        ? 'border-sky-500 bg-sky-50 dark:bg-sky-500/10 ring-4 ring-sky-500/10' 
                        : 'border-slate-200 dark:border-slate-700 hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-sky-500/10'}`}
                  >
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                      <Droplet className="w-6 h-6" />
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Água</span>
                  </div>
                  
                  {/* Botão Energia */}
                  <div 
                    onClick={() => setTipoConta('ENERGY')} 
                    className={`select-pop cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-colors
                      ${tipoConta === 'ENERGY' 
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/10 ring-4 ring-amber-500/10' 
                        : 'border-slate-200 dark:border-slate-700 hover:border-yellow-300 hover:bg-yellow-50 dark:hover:bg-amber-500/10'}`}
                  >
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full">
                      <Zap className="w-6 h-6" />
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Energia</span>
                  </div>
                </div>
                {/* Erro customizado de tipo de conta */}
                {state?.error && !tipoConta && !showConfirm && (
                    <p className="text-sm font-medium text-red-500 mt-2">Por favor, selecione um tipo de conta.</p>
                )}
              </div>

              {/* 2. Período (Mês e Ano) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Seleção de Mês */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 flex justify-between">
                    Mês <span className="text-sky-600 font-normal">{mesesCompletos[mesSelecionado - 1]}</span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {meses.map((mes, index) => {
                      const valorMes = index + 1;
                      const isSelected = mesSelecionado === valorMes;
                      return (
                        <button
                          key={mes}
                          type="button"
                          onClick={() => setMesSelecionado(valorMes)}
                          className={`select-pop py-2 px-1 text-sm rounded-lg border transition-all
                            ${isSelected
                              ? 'font-bold bg-sky-500 text-white shadow-md shadow-sky-500/30 transform scale-105 border-sky-500' 
                              : 'font-medium border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-sky-400 hover:text-sky-600 bg-white dark:bg-slate-800'}`}
                        >
                          {mes}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Seleção de Ano */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Ano</label>
                  <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
                    {anos.map(ano => {
                      const isSelected = anoSelecionado === ano;
                      return (
                        <button
                          key={ano}
                          type="button"
                          onClick={() => setAnoSelecionado(ano)}
                          className={`select-pop whitespace-nowrap py-2 px-5 text-sm rounded-full border transition-all
                            ${isSelected 
                              ? 'font-bold bg-slate-800 dark:bg-slate-700 text-white shadow-md border-slate-800 dark:border-slate-700' 
                              : 'font-medium border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-sky-400 hover:text-sky-600 bg-white dark:bg-slate-800'}`}
                        >
                          {ano}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-800" />

              {/* 3. Valores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Consumo */}
                <div className="space-y-2">
                  <label htmlFor="consumption" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Consumo Registado</label>
                  <div className="input-focus-ring flex items-center border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 overflow-hidden transition-all focus-within:ring-2 focus-within:ring-sky-500">
                    <input 
                      type="text" 
                      id="consumption" 
                      name="consumption"
                      pattern="[0-9]+([,\.][0-9]+)?"
                      className="w-full p-3 outline-none text-slate-700 dark:text-slate-200 bg-transparent" 
                      placeholder="Ex: 154" 
                      required 
                    />
                    <span className="px-4 text-slate-400 font-medium bg-slate-50 dark:bg-slate-700 h-full flex items-center border-l border-slate-300 dark:border-slate-600">
                      {tipoConta === 'WATER' ? 'm³' : tipoConta === 'ENERGY' ? 'kWh' : '--'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {tipoConta === 'WATER' 
                      ? <>Medido em <strong className="font-semibold text-slate-700 dark:text-slate-300">metros cúbicos (m³)</strong>.</>
                      : tipoConta === 'ENERGY' 
                      ? <>Medido em <strong className="font-semibold text-slate-700 dark:text-slate-300">Kilowatt-hora (kWh)</strong>.</>
                      : 'Selecione o tipo de conta primeiro.'}
                  </p>
                </div>

                {/* Valor */}
                <div className="space-y-2">
                  <label htmlFor="cost" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Valor Total</label>
                  <div className="input-focus-ring flex items-center border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 overflow-hidden transition-all focus-within:ring-2 focus-within:ring-sky-500">
                    <span className="pl-4 text-slate-500 font-medium">R$</span>
                    <input 
                      type="text" 
                      id="cost" 
                      name="cost"
                      value={costValue}
                      onChange={handleCostChange}
                      className="w-full p-3 outline-none text-slate-700 dark:text-slate-200 bg-transparent" 
                      placeholder="0,00" 
                      required 
                    />
                  </div>
                </div>
              </div>

              {state?.error && state.error !== 'DUPLICATE' && (
                <div className="p-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-md text-sm border border-red-200 dark:border-red-500/20">
                  {state.error}
                </div>
              )}

              {showConfirm && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-md">
                  <p className="text-sm text-yellow-800 dark:text-yellow-500 font-medium mb-3">{state?.message}</p>
                  <input type="hidden" name="forceUpdate" value="true" />
                  <div className="flex gap-2 w-full">
                    <Button type="button" size="sm" onClick={handleConfirm} disabled={pending} className="bg-yellow-600 hover:bg-yellow-700 text-white flex-1">
                      Sim, sobrescrever
                    </Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => setShowConfirm(false)} className="flex-1">
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}

              {/* Botão de Submissão */}
              {!showConfirm && (
                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={pending}
                    className={`w-full text-white font-semibold rounded-xl p-4 transition-all duration-300 transform active:scale-[0.98] shadow-lg flex justify-center items-center gap-2
                      ${state?.success
                        ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30'
                        : 'bg-sky-500 hover:bg-sky-600 shadow-sky-500/30'
                      }
                      ${pending ? 'opacity-80 cursor-not-allowed' : ''}
                    `}
                  >
                    {state?.success ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Fatura Guardada com Sucesso!</span>
                      </>
                    ) : (
                      <>
                        {pending ? 'Salvando...' : 'Salvar Fatura'}
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
