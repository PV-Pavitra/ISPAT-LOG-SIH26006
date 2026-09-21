import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { FREIGHT_FORECAST_DATA } from '../../data/mockData';
import { 
  TrendingUp, 
  Calendar, 
  Layers, 
  Sliders, 
  Info, 
  BrainCircuit, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const FreightAnalytics: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<'baseline' | 'bullish' | 'disruption'>('baseline');

  const scenarioMeta = {
    baseline: {
      name: 'Baseline Market (Equilibrium)',
      description: 'Model assumes steady bulk fleet additions, normal Chinese coking coal demand, and regular seasonal port turnarounds in India.',
      rate30d: '$15.10 / MT',
      rate60d: '$15.60 / MT',
      rate90d: '$16.20 / MT',
      strategy: 'Mix of 60% Spot Charter and 40% 3-Month Time Charter contracts.',
      color: '#0284C7'
    },
    bullish: {
      name: 'Bullish Demand Surge (+14%)',
      description: 'Infrastructure stimulus in India & Asia accelerates post-monsoon blast furnace capacity utilization above 92%, soaking up available Panamax and Capesize tonnage.',
      rate30d: '$16.40 / MT',
      rate60d: '$17.50 / MT',
      rate90d: '$18.80 / MT',
      strategy: 'Lock in 6-Month Period Time Charters immediately before Q3 fixture prices appreciate further.',
      color: '#D97706'
    },
    disruption: {
      name: 'Supply Chain & Weather Disruption (+28%)',
      description: 'Simulates cyclone groundings in Bay of Bengal coupled with geopolitical reroutings around Cape of Good Hope, adding 12-14 ton-mile voyage days.',
      rate30d: '$17.80 / MT',
      rate60d: '$19.40 / MT',
      rate90d: '$21.10 / MT',
      strategy: 'Hedge aggressively via forward freight agreements (FFA) and reserve pre-berthing windows at private deep-water terminals (Dhamra/Krishnapatnam).',
      color: '#E11D48'
    }
  }[activeScenario];

  // Custom tooltip for multi-curve chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 text-white p-3.5 rounded-xl shadow-2xl border border-slate-700 text-xs space-y-1.5 backdrop-blur-md">
          <p className="font-bold text-sky-300 border-b border-slate-700 pb-1">{label}</p>
          {payload.map((entry: any, index: number) => {
            if (entry.dataKey === 'lowerBound' || entry.dataKey === 'upperBound') return null;
            return (
              <div key={index} className="flex items-center justify-between gap-4 font-mono">
                <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="font-sans text-slate-300">{entry.name}:</span>
                </span>
                <span className="font-bold">${entry.value?.toFixed(2)}/MT</span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-[#002147]">
            <BrainCircuit className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-[#002147]">
                Freight Analytics & 30 / 60 / 90-Day Predictive Curves
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-mono uppercase">
                Prophet + XGBoost Model
              </span>
            </div>
            <p className="text-xs text-slate-500">
              AI-driven multi-horizon freight rate forecasting trained on 10-year Baltic Capesize and vessel AIS histories
            </p>
          </div>
        </div>

        {/* 95% Confidence Interval Tag */}
        <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>95% Confidence Interval (P10 - P90 Band)</span>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-sky-600" /> Select Macro Scenario to Simulate Predictive Path:
          </span>

          <span className="text-[11px] text-slate-400">
            Click scenario below to evaluate cost exposure
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { id: 'baseline' as const, title: 'Baseline Market', sub: 'Equilibrium (±2%)' },
            { id: 'bullish' as const, title: 'Bullish Demand Surge', sub: 'High Production (+14%)' },
            { id: 'disruption' as const, title: 'Supply Chain Disruption', sub: 'Weather / Chokepoint (+28%)' }
          ].map((sc) => {
            const isSelected = activeScenario === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => setActiveScenario(sc.id)}
                className={`p-3 rounded-xl text-left border-2 transition-all ${
                  isSelected
                    ? 'border-[#002147] bg-blue-50/50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{sc.title}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                </div>
                <span className="text-[11px] text-slate-500 block mt-0.5">{sc.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Multi-Curve Recharts Graph */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Capesize Australia/South Africa → India Ocean Freight ($/MT)
            </h3>
            <p className="text-xs text-slate-500">
              Solid line represents recorded historical fixtures; dotted & colored bands represent forward predictive horizons.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-slate-900" />
              <span className="text-slate-600">Historical Fixture</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#0284C7] stroke-dasharray" />
              <span className="text-slate-600">Model Forecast</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-2 bg-sky-200 opacity-60 rounded" />
              <span className="text-slate-600">95% CI Range</span>
            </div>
          </div>
        </div>

        {/* Chart Viewport */}
        <div className="w-full h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={FREIGHT_FORECAST_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="ciGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284C7" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0284C7" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 11, fill: '#64748B' }} 
                tickLine={false} 
                axisLine={{ stroke: '#CBD5E1' }}
              />
              <YAxis 
                domain={[10, 24]} 
                tick={{ fontSize: 11, fill: '#64748B' }} 
                tickLine={false} 
                axisLine={{ stroke: '#CBD5E1' }}
                tickFormatter={(val) => `$${val}`}
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Confidence Interval Shaded Band */}
              <Area 
                type="monotone" 
                dataKey="upperBound" 
                stroke="transparent" 
                fill="url(#ciGradient)" 
                name="Upper Bound (P90)" 
              />
              <Area 
                type="monotone" 
                dataKey="lowerBound" 
                stroke="transparent" 
                fill="#FFFFFF" 
                name="Lower Bound (P10)" 
              />

              {/* Historical Trend */}
              <Line 
                type="monotone" 
                dataKey="historical" 
                stroke="#0F172A" 
                strokeWidth={3} 
                dot={{ r: 3, fill: '#0F172A' }} 
                name="Historical Rate" 
              />

              {/* Baseline Scenario */}
              {activeScenario === 'baseline' && (
                <Line 
                  type="monotone" 
                  dataKey="baseline" 
                  stroke="#0284C7" 
                  strokeWidth={3} 
                  strokeDasharray="5 5" 
                  dot={{ r: 4, fill: '#0284C7' }} 
                  name="Baseline Forecast" 
                />
              )}

              {/* Bullish Scenario */}
              {activeScenario === 'bullish' && (
                <Line 
                  type="monotone" 
                  dataKey="bullish" 
                  stroke="#D97706" 
                  strokeWidth={3} 
                  strokeDasharray="5 5" 
                  dot={{ r: 4, fill: '#D97706' }} 
                  name="Bullish Surge Curve" 
                />
              )}

              {/* Disruption Scenario */}
              {activeScenario === 'disruption' && (
                <Line 
                  type="monotone" 
                  dataKey="disruption" 
                  stroke="#E11D48" 
                  strokeWidth={3} 
                  strokeDasharray="5 5" 
                  dot={{ r: 4, fill: '#E11D48' }} 
                  name="Disruption Shock Curve" 
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Horizon Impact Cards (30D, 60D, 90D) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-bold">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-600" /> 30-Day Outlook
            </span>
            <span className="font-mono text-slate-700">Oct 2025</span>
          </div>
          <div className="text-2xl font-black text-[#002147] font-mono">
            {scenarioMeta.rate30d}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Short-term fixtures show mild post-monsoon firming. Spot vessels available at Gladstone & Richards Bay.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-bold">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-600" /> 60-Day Outlook
            </span>
            <span className="font-mono text-slate-700">Nov 2025</span>
          </div>
          <div className="text-2xl font-black text-[#002147] font-mono">
            {scenarioMeta.rate60d}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Peak quarterly procurement window for SAIL & RINL. Early forward cover recommended.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-bold">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-600" /> 90-Day Outlook
            </span>
            <span className="font-mono text-slate-700">Dec 2025</span>
          </div>
          <div className="text-2xl font-black text-[#002147] font-mono">
            {scenarioMeta.rate90d}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Year-end congestion expected at Paradip & Haldia. Multi-port discharge hedging required.
          </p>
        </div>
      </div>

      {/* Strategic Recommendation Callout */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950 via-[#002147] to-slate-900 text-white shadow-lg space-y-2">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> AI Decision Support Engine • Chartering Directive
        </div>
        <h4 className="text-base font-bold text-white">
          Active Recommendation for {scenarioMeta.name}
        </h4>
        <p className="text-xs text-sky-100 leading-relaxed max-w-4xl">
          {scenarioMeta.strategy} {scenarioMeta.description}
        </p>
      </div>

    </div>
  );
};
