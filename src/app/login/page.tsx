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
              <div className="flex justify-start mt-2">
                <Link href="#" className="text-xs font-medium text-white/70 hover:text-white transition-colors ml-1 mt-1">
                  Esqueceu a senha?
                </Link>
              </div>
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

          <div className="mt-8 flex items-center justify-center space-x-3">
            <div className="h-[1px] bg-white/20 flex-1"></div>
            <span className="text-[11px] font-semibold text-white/60 uppercase tracking-widest">ou continue com</span>
            <div className="h-[1px] bg-white/20 flex-1"></div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button type="button" className="flex items-center justify-center p-3 bg-white/95 rounded-xl hover:bg-white transition-colors shadow-md active:scale-95 text-slate-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
            <button type="button" className="flex items-center justify-center p-3 bg-white/95 rounded-xl hover:bg-white transition-colors shadow-md active:scale-95 text-slate-900">
              <Github className="w-5 h-5" />
            </button>
            <button type="button" className="flex items-center justify-center p-3 bg-white/95 rounded-xl hover:bg-white transition-colors shadow-md active:scale-95 text-[#1877F2]">
              <Facebook className="w-5 h-5 fill-current" />
            </button>
          </div>

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
