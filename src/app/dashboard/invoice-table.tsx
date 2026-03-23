'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { deleteInvoice, updateInvoice } from '@/app/actions/invoice'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pencil, Download, Filter, Droplet, Zap, Trash2 } from 'lucide-react'
import type { Invoice } from '@/types'

export function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)
  const [typeFilter, setTypeFilter] = useState<'Todas as contas' | 'Apenas Água' | 'Apenas Energia'>('Todas as contas')

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingInvoice) return
    
    const formData = new FormData(e.currentTarget)
    formData.append('id', editingInvoice.id)
    
    startTransition(async () => {
      const result = await updateInvoice(null, formData)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(result.message)
        setEditingInvoice(null)
        router.refresh()
      }
    })
  }

  const exportCSV = () => {
    const headers = ['Tipo', 'Mes', 'Ano', 'Consumo', 'Valor(R$)']
    const csvRows = filteredInvoices.map(i => [
      i.type === 'WATER' ? 'Agua' : 'Energia',
      i.month,
      i.year,
      i.consumption,
      i.cost
    ])
    const csvContent = [headers.join(','), ...csvRows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'historico-consumo.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta fatura?')) return

    setDeletingId(id)
    startTransition(async () => {
      const result = await deleteInvoice(id)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(result.message || 'Excluído com sucesso')
        router.refresh()
      }
      setDeletingId(null)
    })
  }

  const formatCurrency = (val: string | number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(val))
  
  const getMonthName = (m: number) => {
    const date = new Date(2000, m - 1)
    return date.toLocaleString('pt-BR', { month: 'long' })
  }

  const filteredInvoices = typeFilter === 'Todas as contas' ? invoices : invoices.filter(inv => {
    if (typeFilter === 'Apenas Água') return inv.type === 'WATER'
    if (typeFilter === 'Apenas Energia') return inv.type === 'ENERGY'
    return true
  })

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-100 dark:border-slate-700/50 animate-fade-up overflow-hidden" style={{ animationDelay: '0.5s' }}>
      
      {/* Cabeçalho */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Histórico de Faturas</h3>
        
        <div className="flex gap-2">
          <div className="relative group">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-2 pl-4 pr-10 rounded-xl font-medium outline-none cursor-pointer text-sm"
            >
              <option value="Todas as contas">Todas as contas</option>
              <option value="Apenas Água">Apenas Água</option>
              <option value="Apenas Energia">Apenas Energia</option>
            </select>
            <Filter className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          
          <button onClick={exportCSV} className="hidden sm:flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-2 px-4 rounded-xl font-medium transition-all shadow-sm active:scale-95 text-sm">
              <Download className="w-4 h-4" />
              Exportar CSV
          </button>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm border-b border-slate-100 dark:border-slate-700/50">
              <th className="font-semibold py-4 px-6 whitespace-nowrap">Tipo</th>
              <th className="font-semibold py-4 px-6 whitespace-nowrap">Data</th>
              <th className="font-semibold py-4 px-6 whitespace-nowrap">Consumo</th>
              <th className="font-semibold py-4 px-6 whitespace-nowrap">Valor Total</th>
              <th className="font-semibold py-4 px-6 text-right whitespace-nowrap">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-slate-700 dark:text-slate-300 text-sm">
            {filteredInvoices.map((inv) => {
              const isAgua = inv.type === 'WATER';
              const badgeClass = isAgua 
                  ? 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300' 
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300';
              const label = isAgua ? 'Água' : 'Energia';

              return (
                <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>
                      {label}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-medium capitalize">{getMonthName(inv.month)} {inv.year}</td>
                  <td className="py-4 px-6">{inv.consumption} <span className="text-slate-400 text-xs">{isAgua ? 'm³' : 'kWh'}</span></td>
                  <td className="py-4 px-6 font-medium text-slate-900 dark:text-slate-100">{formatCurrency(inv.cost)}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setEditingInvoice(inv)}
                        className="p-2 text-slate-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(inv.id)}
                        disabled={isPending && deletingId === inv.id}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {filteredInvoices.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 px-6 text-center text-slate-500">
                  Nenhuma fatura encontrada com os filtros atuais.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal (unchanged generic Card structure for quick editing) */}
      {editingInvoice && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-[60] backdrop-blur-sm">
          <Card className="w-full max-w-md shadow-2xl rounded-3xl border-0 overflow-hidden">
            <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <CardTitle>Editar Fatura</CardTitle>
              <CardDescription>
                Atualize o consumo e o valor desta fatura ({editingInvoice.type === 'WATER' ? 'Água' : 'Energia'}).
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleEditSubmit} className="bg-white dark:bg-slate-900">
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="consumption">Consumo ({editingInvoice.type === 'WATER' ? 'm³' : 'kWh'})</Label>
                  <Input id="consumption" name="consumption" defaultValue={editingInvoice.consumption} required pattern="[0-9]+([,\.][0-9]+)?" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Valor (R$)</Label>
                  <Input id="cost" name="cost" defaultValue={editingInvoice.cost} required pattern="[0-9]+([,\.][0-9]{1,2})?" className="rounded-xl" />
                </div>
              </CardContent>
              <div className="p-6 pt-0 flex gap-3 justify-end bg-white dark:bg-slate-900">
                <Button type="button" variant="outline" onClick={() => setEditingInvoice(null)} className="rounded-xl">Cancelar</Button>
                <Button type="submit" disabled={isPending} className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl shadow-md">
                  {isPending ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
