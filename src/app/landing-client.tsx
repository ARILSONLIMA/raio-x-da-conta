'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Droplets, Zap, Receipt, Calculator, TrendingUp, 
  Moon, Sparkles, Smartphone, ChevronRight, Menu, X, BarChart3
} from 'lucide-react';

const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); 
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, isVisible] as const;
};

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [ref, isVisible] = useScrollReveal();
  
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function LandingClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Efeito para adicionar estilos globais que o Tailwind sozinho não resolve facilmente
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0px); }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      .animate-float-delayed {
        animation: float 6s ease-in-out infinite;
        animation-delay: 2s;
      }
      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200 shadow-sm top-0 left-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="bg-cyan-500 p-2 rounded-lg text-white flex items-center justify-center">
                <BarChart3 size={24} />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">Raio-X da Conta</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#como-funciona" className="text-slate-600 hover:text-cyan-600 transition-colors font-medium">Como Funciona</a>
              <a href="#recursos" className="text-slate-600 hover:text-cyan-600 transition-colors font-medium">Recursos</a>
              <a href="#impacto" className="text-slate-600 hover:text-cyan-600 transition-colors font-medium">Impacto</a>
              <div className="flex items-center space-x-4 pl-4 border-l border-slate-200">
                <Link href="/login" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Entrar</Link>
                <Link href="/register" className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-md shadow-cyan-500/30 hover:shadow-cyan-500/50 transform hover:-translate-y-0.5 inline-block">
                  Criar Conta
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 absolute w-full px-4 pt-2 pb-4 space-y-1 shadow-lg">
            <a href="#como-funciona" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-cyan-600 hover:bg-slate-50">Como Funciona</a>
            <a href="#recursos" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-cyan-600 hover:bg-slate-50">Recursos</a>
            <a href="#impacto" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-cyan-600 hover:bg-slate-50">Impacto</a>
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
              <Link href="/login" className="w-full block text-center text-slate-700 font-medium py-2 border border-slate-300 rounded-xl hover:bg-slate-50">Entrar</Link>
              <Link href="/register" className="w-full block text-center bg-cyan-500 text-white font-medium py-2 rounded-xl hover:bg-cyan-600 shadow-md">Criar Conta Gratuita</Link>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Reveal>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                Entenda seu consumo,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                  pare de perder dinheiro.
                </span>
              </h1>
            </Reveal>
            
            <Reveal delay={200}>
              <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Registre suas contas de água e luz mensalmente. Visualize seu histórico, identifique desperdícios e receba dicas de economia baseadas nos objetivos de desenvolvimento sustentável da ONU.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/register" className="w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-2xl text-white bg-cyan-500 hover:bg-cyan-600 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  Criar Conta Gratuita <ChevronRight size={20} />
                </Link>
                <Link href="/login" className="w-full sm:w-auto px-8 py-4 text-lg font-medium rounded-2xl text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all flex items-center justify-center">
                  Já tenho conta
                </Link>
              </div>
            </Reveal>
            <Reveal delay={600}>
               <p className="mt-4 text-sm text-slate-400">Totalmente gratuito. Sem necessidade de cartão de crédito.</p>
            </Reveal>
          </div>

          {/* Hero Dashboard Mockup Illustration */}
          <Reveal delay={800} className="mt-20">
            <div className="relative max-w-5xl mx-auto">
              <div className="rounded-2xl border border-slate-200/60 bg-white/50 backdrop-blur-sm shadow-2xl overflow-hidden animate-float">
                <div className="h-10 bg-slate-100/80 border-b border-slate-200/60 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6 h-64 flex flex-col justify-end gap-3">
                    <div className="text-sm font-semibold text-slate-500 mb-auto">Meu Painel de Consumo (kWh)</div>
                    <div className="flex items-end gap-4 h-32">
                      <div className="w-full bg-cyan-100 rounded-t-sm h-[30%] hover:bg-cyan-200 transition-colors"></div>
                      <div className="w-full bg-cyan-200 rounded-t-sm h-[45%] hover:bg-cyan-300 transition-colors"></div>
                      <div className="w-full bg-cyan-300 rounded-t-sm h-[70%] hover:bg-cyan-400 transition-colors"></div>
                      <div className="w-full bg-cyan-500 rounded-t-sm h-[95%] hover:bg-cyan-600 transition-colors relative group cursor-pointer">
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Este mês</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-100 p-6">
                      <div className="text-cyan-800 font-bold text-2xl mb-1">-15%</div>
                      <div className="text-sm text-cyan-600 font-medium">Economia este mês</div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-100 p-6">
                      <div className="text-yellow-800 font-bold text-2xl mb-1">Dica</div>
                      <div className="text-sm text-yellow-600 font-medium leading-snug">Desligue aparelhos em stand-by.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Como Funciona?</h2>
              <p className="mt-4 text-lg text-slate-500">Três passos simples para assumir o controle dos seus gastos.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>

            <Reveal delay={100} className="relative z-10">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-20 h-20 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-500 mb-6 rotate-3">
                  <Receipt size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">1. Pegue sua conta</h3>
                <p className="text-slate-500 leading-relaxed">Reúna suas faturas mensais de água e energia elétrica impressas ou digitais.</p>
              </div>
            </Reveal>

            <Reveal delay={300} className="relative z-10">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6 -rotate-3">
                  <Calculator size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">2. Digite os números</h3>
                <p className="text-slate-500 leading-relaxed">Insira valores como (R$) e consumo (m³ ou kWh) num painel rápido, fácil e intuitivo.</p>
              </div>
            </Reveal>

            <Reveal delay={500} className="relative z-10">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-500 mb-6 rotate-3">
                  <TrendingUp size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">3. Veja os resultados</h3>
                <p className="text-slate-500 leading-relaxed">Acompanhe gráficos detalhados e veja de forma clara como está a eficiência da sua casa.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NOVOS RECURSOS INTELIGENTES */}
      <section id="recursos" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Novos Recursos Inteligentes</h2>
              <p className="mt-4 text-lg text-slate-500">Ferramentas desenhadas para facilitar a sua vida.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Reveal delay={100} className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/50 transition-all h-full group">
                <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                  <Moon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Modo Escuro (Dark Mode)</h3>
                <p className="text-slate-500 leading-relaxed">Alterne para um tema noturno premium no seu painel em apenas um clique, reduzindo o cansaço visual e economizando bateria.</p>
              </div>
            </Reveal>

            <Reveal delay={200} className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-100/50 transition-all h-full group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-bl-full -z-10 transition-transform group-hover:scale-150"></div>
                <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform relative z-10">
                  <Sparkles size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Insights Automáticos</h3>
                <p className="text-slate-500 leading-relaxed relative z-10">O sistema lê suas faturas através de uma lógica inteligente e gera dicas perfeitamente focadas no que mais tira seu dinheiro.</p>
              </div>
            </Reveal>

            <Reveal delay={300} className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/50 transition-all h-full group">
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                  <Smartphone size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">App Instalável (PWA)</h3>
                <p className="text-slate-500 leading-relaxed">Acesse fora do navegador como um aplicativo nativo. Instale na tela inicial do celular em um clique para acesso ultrarrápido.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* IMPACTO SUSTENTÁVEL */}
      <section id="impacto" className="py-24 bg-white border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Impacto Sustentável</h2>
              <p className="mt-4 text-lg text-slate-500">Ao usar a plataforma, você não apenas economiza, mas também contribui ativamente para os Objetivos de Desenvolvimento Sustentável (ODS) da ONU.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* ODS 6 Card */}
            <Reveal delay={200}>
              <div className="group relative bg-[#eef7fa] p-10 lg:p-14 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 h-full border border-cyan-100">
                 {/* Decorative background element */}
                <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-100/50 rounded-full blur-3xl group-hover:bg-cyan-200/50 transition-colors"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 mb-8 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-300">
                    <Droplets className="text-[#00a8cc]" size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-wide mb-2">ODS 6</h3>
                  <h4 className="text-[#00a8cc] font-semibold text-lg mb-6 tracking-wide">Água Potável e Saneamento</h4>
                  <p className="text-slate-600 text-lg leading-relaxed max-w-sm">
                    Incentivamos o uso responsável e a redução do desperdício de nossos preciosos recursos hídricos.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* ODS 7 Card */}
            <Reveal delay={400}>
              <div className="group relative bg-[#fffdf0] p-10 lg:p-14 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 h-full border border-yellow-100">
                {/* Decorative background element */}
                <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-yellow-100/50 rounded-full blur-3xl group-hover:bg-yellow-200/50 transition-colors"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 mb-8 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-300">
                    <Zap className="text-[#eab308]" size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-wide mb-2">ODS 7</h3>
                  <h4 className="text-[#eab308] font-semibold text-lg mb-6 tracking-wide">Energia Limpa</h4>
                  <p className="text-slate-600 text-lg leading-relaxed max-w-sm">
                    Apoiamos a educação para o consumo eficiente de energia elétrica nas residências.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Pare de perder dinheiro e comece a agir.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-xl text-slate-300 mb-10">
              O cadastro é 100% gratuito e leva menos de um minuto.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <Link href="/register" className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 transform hover:-translate-y-1">
              Começar Agora
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6 opacity-80">
            <BarChart3 className="text-slate-400" size={20} />
            <span className="font-bold text-lg text-slate-600">Raio-X da Conta</span>
          </div>
          
          <p className="text-slate-500 text-sm mb-2 text-center">
            Raio-X da Conta &copy; {new Date().getFullYear()}
          </p>
          <p className="text-slate-400 text-sm mb-6 text-center">
            Projeto extensionista universitário desenvolvido por Arilson.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-cyan-600 transition-colors text-sm font-medium">Github</a>
            <Link href="/login" className="text-slate-400 hover:text-cyan-600 transition-colors text-sm font-medium">Entrar</Link>
            <a href="#" className="text-slate-400 hover:text-cyan-600 transition-colors text-sm font-medium">Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
