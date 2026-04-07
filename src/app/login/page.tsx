'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions/auth'
import Link from 'next/link'
import { Github, Facebook } from 'lucide-react'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null)

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0f4c81] via-[#053059] to-[#011426] flex items-center justify-center p-4 font-sans">
      {/* Decorative Background Shapes */}
      <div className="absolute top-[10%] left-[20%] w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[20%] w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Additional 3D-like floating abstract elements CSS-based */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border-[12px] border-blue-400/20 rounded-full blur-[2px] animate-[bounce_8s_infinite] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-20 bg-gradient-to-tr from-cyan-400/10 to-blue-400/20 backdrop-blur-md rounded-full rotate-45 border border-white/5 animate-[pulse_6s_infinite] pointer-events-none shadow-xl"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-300/20 rounded-full blur-[3px] animate-[ping_10s_infinite] pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/3 w-24 h-24 border-[8px] border-cyan-400/10 rounded-full blur-[1px] animate-[bounce_12s_infinite] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-[2rem] p-8 sm:p-10 font-sans">

          <div className="flex justify-center mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">Raio-X da Conta</h1>
          </div>

          <h2 className="text-xl font-semibold text-white mb-6 drop-shadow-sm">Entrar</h2>

          <form action={formAction} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-white/90 ml-1">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="nome@exemplo.com"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/95 border-0 focus:ring-4 focus:ring-blue-400/30 text-slate-900 placeholder:text-slate-400 transition-all font-medium text-sm shadow-inner"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-white/90 ml-1">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/95 border-0 focus:ring-4 focus:ring-blue-400/30 text-slate-900 placeholder:text-slate-400 transition-all font-medium text-sm shadow-inner"
              />

            </div>

            {state?.error && (
              <p className="text-sm font-medium text-red-200 bg-red-500/20 p-3 rounded-xl border border-red-500/30 backdrop-blur-sm">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full mt-2 py-3.5 px-4 bg-[#0a274c] hover:bg-[#061933] text-white font-semibold rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed border border-white/10"
            >
              {pending ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-white/70">Não tem uma conta ainda? </span>
            <Link href="/register" className="text-white font-bold hover:underline">
              Cadastre-se grátis
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
