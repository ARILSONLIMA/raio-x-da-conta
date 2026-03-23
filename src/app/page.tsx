import type { Metadata } from 'next'
import LandingClient from './landing-client'

export const metadata: Metadata = {
  title: 'Raio-X da Conta • Início',
  description: 'Pare de perder dinheiro e controle seu consumo de água e energia elétrica',
}

export default function LandingPage() {
  return <LandingClient />
}
