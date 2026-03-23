'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import type { Invoice } from '@/types'

export function ExportButton({ invoices }: { invoices: Invoice[] }) {
  const handleExport = () => {
    // CSV Header
    const headers = ['ID', 'Tipo', 'Mês', 'Ano', 'Consumo (kWh/m3)', 'Valor (R$)', 'Data de Registro']
    
    // Convert rows
    const rows = invoices.map(i => [
      i.id,
      i.type === 'ENERGY' ? 'Energia' : 'Água',
      i.month,
      i.year,
      i.consumption.toString().replace('.', ','),
      i.cost.toString().replace('.', ','),
      i.createdAt ? new Date(i.createdAt).toLocaleDateString('pt-BR') : ''
    ])

    const csvContent = [
      headers.join(';'),
      ...rows.map(r => r.join(';'))
    ].join('\n')

    // Create Blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `raio-x-historico-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button variant="outline" onClick={handleExport} className="gap-2 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700">
      <Download className="h-4 w-4" />
      Exportar CSV
    </Button>
  )
}
