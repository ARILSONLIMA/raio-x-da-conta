'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { deleteInvoice, updateInvoice } from '@/app/actions/invoice'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pencil, Download, Droplet, Zap, Trash2 } from 'lucide-react'
import type { Invoice } from '@/types'

export function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null)

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

  const exportCSV = (type: 'WATER' | 'ENERGY') => {
    const targetInvoices = invoices.filter(i => i.type === type)
    const headers = ['Mes', 'Ano', 'Consumo', 'Valor(R$)']
    const csvRows = targetInvoices.map(i => [
      i.month,
      i.year,
      i.consumption,
      i.cost
    ])
    const csvContent = [headers.join(','), ...csvRows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    const filename = type === 'WATER' ? 'historico-agua.csv' : 'historico-energia.csv'
    link.setAttribute('download', filename)
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

  const waterInvoices = invoices.filter(i => i.type === 'WATER')
  const energyInvoices = invoices.filter(i => i.type === 'ENERGY')

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: '0.5s' }}>
        
        {/* Histórico de Água */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-100 dark:border-slate-700/50 overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-sky-600 dark:text-sky-400 flex items-center gap-2">
              <Droplet className="w-5 h-5" /> Histórico de Água
            </h3>
            <button 
              onClick={() => exportCSV('WATER')} 
              className="flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-1.5 px-3 rounded-xl font-medium transition-all shadow-sm active:scale-95 text-xs"
            >
              <Download className="w-3.5 h-3.5" /> Exportar
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs border-b border-slate-100 dark:border-slate-700/50">
                  <th className="font-semibold py-3 px-6 whitespace-nowrap">Mês/Ano</th>
                  <th className="font-semibold py-3 px-6 whitespace-nowrap">Consumo</th>
                  <th className="font-semibold py-3 px-6 whitespace-nowrap">Valor Total</th>
                  <th className="font-semibold py-3 px-6 text-right whitespace-nowrap">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-slate-700 dark:text-slate-300 text-sm">
                {waterInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="py-3 px-6 font-medium capitalize">{getMonthName(inv.month)} {inv.year}</td>
                    <td className="py-3 px-6">{inv.consumption} <span className="text-slate-400 text-xs">m³</span></td>
                    <td className="py-3 px-6 font-medium text-slate-900 dark:text-slate-100">{formatCurrency(inv.cost)}</td>
                    <td className="py-3 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => setEditingInvoice(inv)}
                          className="p-1.5 text-slate-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(inv.id)}
                          disabled={isPending && deletingId === inv.id}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {waterInvoices.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 px-6 text-center text-slate-500">
                      Nenhuma fatura de água encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Histórico de Energia */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-100 dark:border-slate-700/50 overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-amber-500 flex items-center gap-2">
              <Zap className="w-5 h-5" /> Histórico de Energia
            </h3>
            <button 
              onClick={() => exportCSV('ENERGY')} 
              className="flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-1.5 px-3 rounded-xl font-medium transition-all shadow-sm active:scale-95 text-xs"
            >
              <Download className="w-3.5 h-3.5" /> Exportar
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs border-b border-slate-100 dark:border-slate-700/50">
                  <th className="font-semibold py-3 px-6 whitespace-nowrap">Mês/Ano</th>
                  <th className="font-semibold py-3 px-6 whitespace-nowrap">Consumo</th>
                  <th className="font-semibold py-3 px-6 whitespace-nowrap">Valor Total</th>
                  <th className="font-semibold py-3 px-6 text-right whitespace-nowrap">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-slate-700 dark:text-slate-300 text-sm">
                {energyInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="py-3 px-6 font-medium capitalize">{getMonthName(inv.month)} {inv.year}</td>
                    <td className="py-3 px-6">{inv.consumption} <span className="text-slate-400 text-xs">kWh</span></td>
                    <td className="py-3 px-6 font-medium text-slate-900 dark:text-slate-100">{formatCurrency(inv.cost)}</td>
                    <td className="py-3 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => setEditingInvoice(inv)}
                          className="p-1.5 text-slate-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(inv.id)}
                          disabled={isPending && deletingId === inv.id}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {energyInvoices.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 px-6 text-center text-slate-500">
                      Nenhuma fatura de energia encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Edit Modal */}
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
    </>
  )
}
