export default function DashboardLoading() {
  return (
    <div className="flex-1 flex flex-col h-full relative animate-pulse">
      {/* Skeleton do TopHeader */}
      <header className="min-h-20 py-3 md:py-0 flex items-center px-4 md:px-8 bg-white/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30 flex-shrink-0 justify-between">
        <div>
          <div className="h-7 w-36 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
          <div className="h-4 w-80 bg-slate-200/60 dark:bg-slate-700/60 rounded"></div>
        </div>
      </header>

      {/* Skeleton do Conteúdo */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 hide-scrollbar pb-24">
        {/* Metas e Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Metas */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700/50 h-[160px]">
            <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
            <div className="space-y-3">
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-700/50 rounded"></div>
              <div className="h-3 w-5/6 bg-slate-100 dark:bg-slate-700/50 rounded"></div>
            </div>
          </div>

          {/* Insights Inteligentes */}
          <div className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/10 dark:to-teal-950/10 rounded-3xl p-6 border border-emerald-100/50 dark:border-emerald-900/30 h-[160px]">
            <div className="h-5 w-36 bg-emerald-100 dark:bg-emerald-900/50 rounded mb-4"></div>
            <div className="space-y-3">
              <div className="h-3 w-full bg-emerald-100/50 dark:bg-emerald-900/30 rounded"></div>
              <div className="h-3 w-2/3 bg-emerald-100/50 dark:bg-emerald-900/30 rounded"></div>
            </div>
          </div>
        </div>

        {/* Gráficos de Água e Energia */}
        <div className="space-y-6">
          {/* Água */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700/50 h-[310px]">
            <div className="h-5 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
            <div className="h-[210px] bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200/50 dark:border-slate-800/80"></div>
          </div>
          {/* Energia */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700/50 h-[310px]">
            <div className="h-5 w-44 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
            <div className="h-[210px] bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200/50 dark:border-slate-800/80"></div>
          </div>
        </div>

        {/* Históricos Duplicados (Tabelas de Água/Energia) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700/50 h-[200px]">
            <div className="h-5 w-36 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-slate-100/50 dark:bg-slate-700/50 rounded"></div>
              <div className="h-4 w-full bg-slate-100/50 dark:bg-slate-700/50 rounded"></div>
              <div className="h-4 w-4/5 bg-slate-100/50 dark:bg-slate-700/50 rounded"></div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700/50 h-[200px]">
            <div className="h-5 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-slate-100/50 dark:bg-slate-700/50 rounded"></div>
              <div className="h-4 w-full bg-slate-100/50 dark:bg-slate-700/50 rounded"></div>
              <div className="h-4 w-4/5 bg-slate-100/50 dark:bg-slate-700/50 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
