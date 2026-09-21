import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Radio, 
  Fuel, 
  DollarSign, 
  Clock, 
  Filter, 
  Search, 
  Newspaper, 
  Pause, 
  Play, 
  RotateCcw, 
  AlertCircle, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Flame,
  Zap,
  Globe
} from 'lucide-react';

export const MaritimeEconomy: React.FC = () => {
  const { 
    economicIndicators, 
    news, 
    isSimulationRunning, 
    setIsSimulationRunning,
    triggerBalticSurgeSimulation,
    triggerCycloneSimulation,
    triggerBokaroStockDipSimulation,
    resetSimulation
  } = useSimulation();

  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

  const availableTags = ['ALL', '#BunkerFuel', '#PortCongestion', '#Tariffs', '#WeatherAlerts'];

  const filteredNews = news.filter(item => {
    if (selectedTag !== 'ALL' && !item.tags.includes(selectedTag)) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Banner with Simulation Control */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-[#002147]">
            <Radio className="w-5 h-5 text-sky-600 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-[#002147]">
                Global Maritime Economy & Ocean Intelligence Terminal
              </h1>
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                LIVE TICKER
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Real-time Baltic Exchange spot benchmarks, VLSFO Singapore bunker rates, and global freight dispatches
            </p>
          </div>
        </div>

        {/* Live Simulation Controls Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSimulationRunning(p => !p)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              isSimulationRunning
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-sm'
            }`}
          >
            {isSimulationRunning ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-600" />
                <span>Pause Feed Tick</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Resume Feed Tick</span>
              </>
            )}
          </button>

          <button
            onClick={triggerBalticSurgeSimulation}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#002147] bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-sky-600" />
            <span>Trigger Baltic +12%</span>
          </button>
        </div>
      </div>

      {/* 1. Macroeconomic KPI Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {economicIndicators.map((ind) => {
          const isPositive = ind.change >= 0;
          return (
            <div
              key={ind.id}
              id={`kpi-${ind.id}`}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {ind.symbol}
                  </span>
                  <h3 className="font-bold text-xs text-slate-800 leading-tight">
                    {ind.name}
                  </h3>
                </div>

                <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md font-mono ${
                  isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                }`}>
                  {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {isPositive ? '+' : ''}{ind.changePercent.toFixed(2)}%
                </span>
              </div>

              {/* Metric Value & Unit */}
              <div className="flex items-baseline gap-1.5 font-mono">
                <span className="text-2xl font-black text-[#002147]">
                  {ind.id === 'usdinr' || ind.id === 'bunker' ? ind.value.toFixed(2) : ind.value.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 font-sans font-medium">
                  {ind.unit}
                </span>
              </div>

              {/* Sparkline Visual (SVG) */}
              <div className="pt-1">
                <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 30">
                  <path
                    d={`M 0 ${30 - ((ind.sparkline[0] - Math.min(...ind.sparkline)) / (Math.max(...ind.sparkline) - Math.min(...ind.sparkline) || 1)) * 24}
                       L 16 ${30 - ((ind.sparkline[1] - Math.min(...ind.sparkline)) / (Math.max(...ind.sparkline) - Math.min(...ind.sparkline) || 1)) * 24}
                       L 33 ${30 - ((ind.sparkline[2] - Math.min(...ind.sparkline)) / (Math.max(...ind.sparkline) - Math.min(...ind.sparkline) || 1)) * 24}
                       L 50 ${30 - ((ind.sparkline[3] - Math.min(...ind.sparkline)) / (Math.max(...ind.sparkline) - Math.min(...ind.sparkline) || 1)) * 24}
                       L 66 ${30 - ((ind.sparkline[4] - Math.min(...ind.sparkline)) / (Math.max(...ind.sparkline) - Math.min(...ind.sparkline) || 1)) * 24}
                       L 83 ${30 - ((ind.sparkline[5] - Math.min(...ind.sparkline)) / (Math.max(...ind.sparkline) - Math.min(...ind.sparkline) || 1)) * 24}
                       L 100 ${30 - ((ind.sparkline[6] - Math.min(...ind.sparkline)) / (Math.max(...ind.sparkline) - Math.min(...ind.sparkline) || 1)) * 24}`}
                    fill="none"
                    stroke={isPositive ? '#10B981' : '#F43F5E'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <p className="text-[10px] text-slate-500 leading-tight pt-1 border-t border-slate-100">
                {ind.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* 2. Live News Feed & Intelligence Dispatches */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
        
        {/* News Feed Header & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-sky-600" />
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                Maritime Trade & Operational Risk News Feed
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Curated intelligence dispatches affecting Indian steel raw material shipments
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search news or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
            />
          </div>
        </div>

        {/* Tag Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Filter Topics:
          </span>
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-[#002147] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* News Cards List */}
        <div className="space-y-3">
          {filteredNews.map((item) => {
            const isHighUrgency = item.urgency === 'high';
            const isMedium = item.urgency === 'medium';
            const isExpanded = selectedNewsId === item.id;

            return (
              <div
                key={item.id}
                id={`news-card-${item.id}`}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isHighUrgency
                    ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300'
                    : isMedium
                    ? 'bg-amber-50/40 border-amber-200 hover:border-amber-300'
                    : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
                onClick={() => setSelectedNewsId(isExpanded ? null : item.id)}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {isHighUrgency && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded bg-rose-600 text-white uppercase tracking-wider">
                        <Flame className="w-3 h-3" /> CRITICAL ALERT
                      </span>
                    )}
                    {isMedium && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-600 text-white uppercase tracking-wider">
                        MARKET UPDATE
                      </span>
                    )}
                    <span className="text-xs font-bold text-slate-500">{item.source}</span>
                    <span className="text-[11px] text-slate-400">• {item.timestamp}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {item.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {item.summary}
                </p>

                {/* AI Logistics Impact Callout */}
                <div className="mt-3 p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5 shadow-sm">
                  <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#002147] font-semibold">Logistics Grid Impact: </strong>
                    <span>{item.impact}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
