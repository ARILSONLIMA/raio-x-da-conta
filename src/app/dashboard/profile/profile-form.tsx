'use client'

import { useActionState, useEffect, useState } from 'react'
import { updateGoals } from '@/app/actions/user'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
    <Card>
      <CardHeader>
        <CardTitle>Metas Mensais</CardTitle>
        <CardDescription>
          Defina um teto de gastos e receba alertas caso comece a ultrapassá-lo.
          Deixe em branco caso não queira estipular metas.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="waterGoal">Meta de Água (R$)</Label>
            <Input 
              id="waterGoal" 
              name="waterGoal" 
              type="text" 
              placeholder="Ex: 80,00" 
              value={waterGoal}
              onChange={(e) => setWaterGoal(e.target.value)}
              pattern="[0-9]+([,\.][0-9]{1,2})?"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="energyGoal">Meta de Energia (R$)</Label>
            <Input 
              id="energyGoal" 
              name="energyGoal" 
              type="text" 
              placeholder="Ex: 150,00" 
              value={energyGoal}
              onChange={(e) => setEnergyGoal(e.target.value)}
              pattern="[0-9]+([,\.][0-9]{1,2})?"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={pending} className="bg-[#00AEDB] hover:bg-[#00AEDB]/90 text-white">
            {pending ? 'Salvando...' : 'Salvar Metas'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
