'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function YearFilter({ availableYears }: { availableYears: number[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentYear = searchParams.get('year') || 'Todos os Anos'

  const handleYearChange = (val: string | null) => {
    if (!val) return
    const params = new URLSearchParams(searchParams)
    if (val === 'Todos os Anos') {
      params.delete('year')
    } else {
      params.set('year', val)
    }
    router.push(`/dashboard?${params.toString()}`)
  }

  return (
    <Select value={currentYear} onValueChange={handleYearChange}>
      <SelectTrigger className="w-[180px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-[#00AEDB]">
        <SelectValue placeholder="Selecione..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Todos os Anos">Todos os Anos</SelectItem>
        {availableYears.map(year => (
          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
