'use client'

export function AuthLeftPanel() {
  return (
    <div className="hidden md:flex md:w-1/2 bg-[#134e4a] relative overflow-hidden flex-col justify-center px-8 lg:px-12 xl:px-20 h-full">
      {/* Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#115e59] rounded-full opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-[#115e59] rounded-full opacity-40 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-3 text-white">
          O controle inteligente das suas contas.
        </h1>
        <p className="text-[#ccfbf1] mb-6 text-base font-light leading-relaxed">
          Entenda seu consumo de água e luz, defina metas mensais, use nosso
          simulador de gastos e receba dicas práticas para economizar de verdade.
        </p>

        {/* Animated cards */}
        <div className="relative mt-8">
          {/* Card 1 — "sem acompanhamento" */}
          <div className="bg-gray-900/90 border border-gray-700/50 backdrop-blur-md rounded-2xl p-5 w-11/12 relative z-10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] auth-animate-card-1 origin-left">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 bg-gray-500/20 text-gray-300 text-xs font-bold rounded uppercase tracking-wider">
                Sem acompanhamento
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor" className="text-gray-400"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a16,16,0,1,1,16,16A16,16,0,0,1,112,84Z"/></svg>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-500/10 flex items-center justify-center border border-gray-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 256 256" fill="currentColor" className="text-gray-400"><path d="M213.85,125.46l-112-80A8,8,0,0,0,88,48V88H40a8,8,0,0,0-8,8v64a8,8,0,0,0,8,8H88v40a8,8,0,0,0,12.82,6.36l-1.56-2.26,1.56,2.26,112-80a8,8,0,0,0,0-13.06ZM104,176.36V160a8,8,0,0,0-8-8H48V104H96a8,8,0,0,0,8-8V79.64L187.6,136Z"/></svg>
              </div>
              <div>
                <div className="text-sm text-gray-400 font-medium">Consumo Mensal Estimado</div>
                <div className="font-bold text-2xl text-white">R$ 385,40</div>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Gasto vs. Ideal</span>
                  <span className="text-orange-400 font-medium">Acima do esperado</span>
                </div>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-400 rounded-full auth-animate-bar shadow-[0_0_10px_rgba(251,146,60,0.6)]"
                    style={{ width: '85%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Potencial Desperdício</span>
                  <span className="text-gray-300 font-medium">Não calculado</span>
                </div>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-500 rounded-full auth-animate-bar shadow-[0_0_10px_rgba(107,114,128,0.5)]"
                    style={{ width: '40%', animationDelay: '200ms' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 — "com RaioX da Conta" */}
          <div className="bg-white border border-[#ccfbf1] rounded-2xl p-6 w-11/12 ml-auto relative z-20 -mt-20 shadow-[0_25px_50px_-12px_rgba(20,184,166,0.7)] auth-animate-card-2 origin-bottom">
            {/* Badge */}
            <div className="absolute -top-4 -right-4 bg-[#14b8a6] text-white text-sm font-bold px-4 py-2 rounded-full shadow-[0_15px_25px_-5px_rgba(20,184,166,0.8)] flex items-center gap-1 border-2 border-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M220,48H168a28,28,0,0,0-24,13.49A28,28,0,0,0,120,48H36A12,12,0,0,0,24,60V196a12,12,0,0,0,12,12H120a4,4,0,0,0,4-4V120h24V204a4,4,0,0,0,4,4H220a12,12,0,0,0,12-12V60A12,12,0,0,0,220,48Z"/></svg>
              Meta Atingida
            </div>

            <div className="flex justify-between items-center mb-5">
              <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 text-xs font-bold rounded uppercase tracking-wider">
                Com RaioX da Conta
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor" className="text-green-500"><path d="M237.14,165.62a8,8,0,0,1-6.86,3.9,7.9,7.9,0,0,1-4.12-1.14l-42.72-25.89-40.68,48.8A8,8,0,0,1,137,194a7.93,7.93,0,0,1-6-2.7L96,152.28,52.92,181.58A8,8,0,0,1,40.14,178l.86-1.41a8,8,0,0,1,11.08-2.64l48-32a8,8,0,0,1,9.79,1.22L144,182.36l39.32-47.18a8,8,0,0,1,10.5-1.82l48,29.09A8,8,0,0,1,237.14,165.62ZM232,72a32,32,0,1,1-32-32A32,32,0,0,1,232,72Z"/></svg>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#f0fdfa] flex items-center justify-center border border-[#ccfbf1]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor" className="text-[#0d9488]"><path d="M208,136a8,8,0,0,1-8,8H168v32h32a8,8,0,0,1,0,16H168v16a8,8,0,0,1-16,0V80a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H168v32h32A8,8,0,0,1,208,136ZM104,72H56a8,8,0,0,0-8,8V208a8,8,0,0,0,16,0V152H96a8,8,0,0,0,0-16H64V88h40a28,28,0,0,1,0,56H96a8,8,0,0,0,0,16h8a44,44,0,0,0,0-88Z"/></svg>
              </div>
              <div>
                <div className="text-sm text-gray-500 font-medium">Consumo com Dicas</div>
                <div className="font-bold text-3xl text-gray-900">R$ 295,00</div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1 font-medium">
                  <span>Progresso da Meta Mensal</span>
                  <span className="text-[#0d9488] font-bold">100%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#14b8a6] rounded-full auth-animate-bar shadow-[0_0_12px_rgba(20,184,166,0.7)]"
                    style={{ width: '100%', animationDelay: '1800ms' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1 font-medium">
                  <span>Economia Alcançada</span>
                  <span className="text-green-500 font-bold">R$ 90,40</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full auth-animate-bar shadow-[0_0_12px_rgba(34,197,94,0.7)]"
                    style={{ width: '23%', animationDelay: '2000ms' }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap gap-3">
              <span className="text-xs bg-[#f0fdfa] text-[#0f766e] px-3 py-1.5 rounded-md border border-[#ccfbf1] flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" fill="currentColor"><path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104a88,88,0,0,1,176,0Z"/></svg>
                Dicas Aplicadas
              </span>
              <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md border border-blue-200 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" fill="currentColor"><path d="M232,200a8,8,0,0,1-16,0V48a8,8,0,0,1,16,0ZM40,120v80a8,8,0,0,0,16,0V120a8,8,0,0,0-16,0Zm52-24V200a8,8,0,0,0,16,0V96a8,8,0,0,0-16,0Zm52,40V200a8,8,0,0,0,16,0V136a8,8,0,0,0-16,0Z"/></svg>
                Simulador Ativo
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
