'use client'

import { useActionState, useState } from 'react'
import { login } from '@/app/actions/auth'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight, AlertCircle, ScanLine, Mail, Lock } from 'lucide-react'
import { AuthLeftPanel } from '@/components/auth/AuthLeftPanel'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50 text-gray-800 antialiased font-sans">
      {/* ── Left panel ── */}
      <AuthLeftPanel />

      {/* ── Right panel — form ── */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white relative z-30 overflow-y-auto overflow-x-hidden">
        <div className="w-full max-w-md auth-animate-fade-in">

          {/* Logo + brand */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4 text-[#0d9488]">
              <div className="w-12 h-12 bg-[#f0fdfa] rounded-xl flex items-center justify-center border border-[#ccfbf1] shadow-sm shrink-0">
                <ScanLine size={28} />
              </div>
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">RaioX da Conta</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-2">
              Bem-vindo de volta!
            </h2>
            <p className="text-gray-500 text-lg">Insira seus dados para acessar seu painel.</p>
          </div>

          {/* Form */}
          <form action={formAction} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#14b8a6] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="demo@raiox.com"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] text-sm transition-all outline-none bg-white text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#14b8a6] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] text-sm transition-all outline-none bg-white text-gray-900 placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#0d9488] focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {state?.error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-3 auth-animate-fade-in">
                <AlertCircle size={20} className="shrink-0" />
                <span className="text-sm font-medium text-red-700">{state.error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              id="btn-login"
              disabled={pending}
              className="w-full flex justify-center items-center py-3.5 px-4 mt-2 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-[#0d9488] hover:bg-[#14b8a6] focus:outline-none transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              <span>{pending ? 'Entrando...' : 'Entrar na plataforma'}</span>
              {!pending && <ArrowRight size={18} className="ml-2" />}
            </button>
          </form>

          {/* Footer link */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-600">
              Ainda não tem conta?{' '}
              <Link
                href="/register"
                className="font-bold text-[#0d9488] hover:text-[#14b8a6] hover:underline ml-1 transition-all"
              >
                Criar uma conta grátis
              </Link>
            </p>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-gray-400">&copy; 2026 RaioX da Conta. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
