import React from 'react';
import { motion } from 'motion/react';
import { LogoPlaceholder, SihLogoBadge } from '../common/Logos';
import { MaritimeHeroVideo } from '../common/MaritimeHeroVideo';
import { 
  ArrowDown, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  Compass, 
  FileText, 
  BarChart3, 
  Anchor, 
  Clock, 
  Building2, 
  Factory, 
  Ship
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { UserRole } from '../../types';

interface ProductIntroductionHeroProps {
  onExploreClick?: () => void;
  onNavigateTab?: (tab: 'requisition' | 'tracker' | 'economy' | 'analytics' | 'inventory' | 'login') => void;
}

export const ProductIntroductionHero: React.FC<ProductIntroductionHeroProps> = ({
  onNavigateTab
}) => {
  const { currentUser, setCurrentUserRole } = useSimulation();

  const handleScrollToWorkspace = (tab?: 'requisition' | 'tracker' | 'economy' | 'analytics' | 'inventory' | 'login') => {
    if (tab && onNavigateTab) {
      onNavigateTab(tab);
    }
    if (tab !== 'login') {
      setTimeout(() => {
        const target = document.getElementById('operational-workspace');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-white text-slate-900">
      
      {/* 1. ATMOSPHERIC MARITIME BACKGROUND WITH HIGH-CONTRAST LIGHT SCRIM */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <MaritimeHeroVideo className="w-full h-full" />
      </div>

      {/* Clean Major White Ambient Overlay guaranteeing 100% text clarity */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/95 via-sky-50/70 to-white/95 pointer-events-none" />

      {/* Subtle technical grid overlay */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[radial-gradient(#002147_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* 2. OPENING HERO VIEWPORT: Major White and Dark Blue (#002147) */}
      <section id="hero-section" className="relative z-10 min-h-[88vh] flex flex-col justify-between max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        
        {/* Top Floating Badge Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          {/* SIH 2026 Official Logo Badge */}
          <SihLogoBadge theme="light" compact={false} className="shadow-sm" />

          {/* Ministry of Steel Official Pill */}
          <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-xl border-2 border-slate-200 text-xs font-bold text-slate-800 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#002147] font-black">Ministry of Steel</span>
            <span className="text-slate-300">•</span>
            <span className="text-[#0284C7] font-mono">SIH 2026 (PS: SIH26006)</span>
          </div>
        </motion.div>

        {/* Center: Customizable Logo Placeholder & Bold High-Contrast Value Proposition */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="my-auto text-center flex flex-col items-center justify-center max-w-4xl mx-auto py-8"
        >
          
          {/* LOGO BOX (Official ISPAT-LOG Emblem / Logo) */}
          <div className="mb-6 inline-flex flex-col items-center">
            <div className="bg-white p-3 rounded-3xl shadow-xl border-2 border-[#002147] transition-all">
              <LogoPlaceholder size={96} showText={false} allowUpload={true} />
            </div>

            {/* Bold Brand Name in High-Contrast Dark Blue */}
            <div className="mt-3 flex items-center justify-center">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#002147] font-sans">
                ISPAT-LOG
              </span>
            </div>
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#0284C7] mt-1.5 max-w-2xl text-center">
              Integrated Steel Procurement And Transportation - Logistics Optimization Grid
            </span>
          </div>

          {/* Core Purpose Statement in Bold Dark Blue and Slate (High Contrast) */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#002147] tracking-tight leading-tight max-w-3xl">
            Predict ocean freight. Eliminate port delays. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002147] via-[#0284C7] to-[#0A2540]">
              Save crores on coking coal imports.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-700 font-medium max-w-2xl leading-relaxed">
            The national maritime intelligence grid built for <strong className="text-[#002147] font-bold">SAIL & RINL</strong>. 
            Calculate the exact cheapest landed cost, track bulk cargo ships live, and prevent vessel demurrage queues at Indian ports.
          </p>

          {/* Direct, High-Contrast Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            
            {/* Primary Action Button: Dark Blue */}
            <button
              onClick={() => handleScrollToWorkspace('requisition')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#002147] hover:bg-[#003366] text-white font-black text-sm sm:text-base shadow-xl shadow-sky-950/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Launch Cost Optimizer</span>
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Secondary Action: Major White with Dark Blue Outline */}
            <button
              onClick={() => handleScrollToWorkspace('tracker')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-[#002147] font-extrabold text-sm sm:text-base border-2 border-[#002147] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-5 h-5 text-[#0284C7]" />
              <span>Explore Live Fleet Map</span>
            </button>

            {/* Mockup Login Portal Button */}
            <button
              onClick={() => handleScrollToWorkspace('login')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm sm:text-base border-2 border-amber-600 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              title="Open Mockup Government & Single-Window Login Portal"
            >
              <ShieldCheck className="w-5 h-5 text-slate-950" />
              <span>Mockup Login Portal</span>
            </button>
          </div>

          {/* Quick Shortcuts to All Core Navigation Sections on Landing Page */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-slate-700">
            <span className="text-[#002147] text-[11px] uppercase tracking-wider font-black mr-1">Direct Jump:</span>
            <button
              onClick={() => handleScrollToWorkspace('requisition')}
              className="px-3 py-1.5 rounded-xl bg-white border-2 border-slate-200 hover:border-[#002147] text-[#002147] font-bold transition-all cursor-pointer shadow-sm"
            >
              Landed Cost Engine
            </button>
            <button
              onClick={() => handleScrollToWorkspace('tracker')}
              className="px-3 py-1.5 rounded-xl bg-white border-2 border-slate-200 hover:border-[#002147] text-[#002147] font-bold transition-all cursor-pointer shadow-sm"
            >
              SAT-AIS Fleet Map
            </button>
            <button
              onClick={() => handleScrollToWorkspace('economy')}
              className="px-3 py-1.5 rounded-xl bg-white border-2 border-slate-200 hover:border-[#002147] text-[#002147] font-bold transition-all cursor-pointer shadow-sm"
            >
              Baltic Indices
            </button>
            <button
              onClick={() => handleScrollToWorkspace('analytics')}
              className="px-3 py-1.5 rounded-xl bg-white border-2 border-slate-200 hover:border-[#002147] text-[#002147] font-bold transition-all cursor-pointer shadow-sm"
            >
              AI Rate Curves
            </button>
            <button
              onClick={() => handleScrollToWorkspace('inventory')}
              className="px-3 py-1.5 rounded-xl bg-white border-2 border-slate-200 hover:border-[#002147] text-[#002147] font-bold transition-all cursor-pointer shadow-sm"
            >
              Plant Coal Reserves
            </button>
          </div>

          {/* Active Persona Pill with 1-Click Role Switch */}
          <div className="mt-6 flex items-center gap-2.5 bg-white px-4 py-2 rounded-xl border-2 border-slate-200 text-xs text-slate-700 shadow-sm">
            <span className="text-slate-500 font-medium">Current Role:</span>
            <span className="font-extrabold text-[#002147] flex items-center gap-1.5">
              {currentUser?.role === 'ministry_director' && <Building2 className="w-3.5 h-3.5 text-sky-600" />}
              {currentUser?.role === 'plant_officer' && <Factory className="w-3.5 h-3.5 text-amber-600" />}
              {currentUser?.role === 'carrier_manager' && <Ship className="w-3.5 h-3.5 text-emerald-600" />}
              {currentUser?.name || 'Director (Ministry of Steel)'}
            </span>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => {
                const nextRole: UserRole = 
                  currentUser?.role === 'ministry_director' ? 'plant_officer' :
                  currentUser?.role === 'plant_officer' ? 'carrier_manager' : 'ministry_director';
                setCurrentUserRole(nextRole);
              }}
              className="text-[#0284C7] hover:text-[#002147] font-extrabold underline transition-colors cursor-pointer"
            >
              Switch Persona
            </button>
          </div>

        </motion.div>

        {/* Bottom Easing Cue */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center flex flex-col items-center"
        >
          <button
            onClick={() => handleScrollToWorkspace()}
            className="group flex flex-col items-center gap-2 text-xs font-bold text-[#002147] hover:text-[#0284C7] transition-colors cursor-pointer"
          >
            <span>Scroll down for 5 core feature pillars & live operational grid</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="p-2 rounded-full bg-white group-hover:bg-slate-100 border-2 border-[#002147] text-[#002147] shadow-sm"
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </button>
        </motion.div>

      </section>

      {/* 3. SCROLL DOWN SECTION: 5 CORE PILLARS (Major White & Dark Blue, High Contrast) */}
      <section id="core-features" className="relative z-10 bg-slate-50 border-t-2 border-slate-200 py-16 px-4 sm:px-6 lg:px-8 text-slate-900">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-[#002147] border border-blue-200 uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#002147]" />
              Enterprise Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#002147] tracking-tight">
              5 Pillars of Maritime Cost Optimization
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base font-medium">
              Everything the Ministry of Steel and plant logistics managers need to safeguard raw material supply and eliminate wasteful spending.
            </p>
          </div>

          {/* 5 High-Contrast White Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Pillar 1: Landed Cost Engine */}
            <div 
              onClick={() => handleScrollToWorkspace('requisition')}
              className="bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#002147] rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#002147] text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#002147] group-hover:text-[#0284C7] transition-colors">
                  1. Lowest Landed Cost Engine
                </h3>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed font-normal">
                  Calculates total delivered cost ($/MT and ₹/MT) by factoring coal FOB mine prices, ocean freight contracts, port discharge tariffs, and Indian Railways rakes.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#002147]">
                <span>Launch Calculator</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 2: Demurrage Shield */}
            <div 
              onClick={() => handleScrollToWorkspace('tracker')}
              className="bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#002147] rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#002147] group-hover:text-amber-700 transition-colors">
                  2. Port Demurrage Shield
                </h3>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed font-normal">
                  Detects vessel congestion at Paradip and Haldia in advance. Recommends dynamic rerouting to save up to <strong>₹1.2 Crore per ship</strong> in idle demurrage penalties.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-700">
                <span>View Congestion Shield</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 3: 30/60/90D AI Forecast */}
            <div 
              onClick={() => handleScrollToWorkspace('analytics')}
              className="bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#002147] rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#002147] group-hover:text-emerald-700 transition-colors">
                  3. 30/60/90D AI Rate Forecast
                </h3>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed font-normal">
                  Machine learning predictive curves for Baltic Capesize (BCI) and Panamax (BPI) rates, guiding tender release timing ahead of market surges.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-700">
                <span>Explore Forecast Curves</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 4: Live AIS Satellite Fleet Tracking */}
            <div 
              onClick={() => handleScrollToWorkspace('tracker')}
              className="bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#002147] rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0284C7] text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#002147] group-hover:text-[#0284C7] transition-colors">
                  4. Live Satellite AIS Fleet Map
                </h3>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed font-normal">
                  Real-time interactive tracking across global coal corridors from Australia (Hay Point), Indonesia, and South Africa to East Coast Indian ports.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#0284C7]">
                <span>Open Interactive Map</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Pillar 5: Plant Stock Gauges & Railway Evacuation */}
            <div 
              onClick={() => handleScrollToWorkspace('inventory')}
              className="bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#002147] rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer group flex flex-col justify-between md:col-span-2 lg:col-span-2"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#002147] text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <Anchor className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#002147] group-hover:text-blue-900 transition-colors">
                  5. Plant Stock Gauges & Emergency Rake Evacuation
                </h3>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed font-normal">
                  Continuous coking coal inventory buffer tracking across 6 SAIL & RINL steel complexes (Bhilai, Bokaro, Rourkela, Durgapur, IISCO, and Vizag). 
                  Automatically raises emergency FOIS rake requests when plant stockpiles drop below safe 14-day operational thresholds.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#002147]">
                <span>Check Steel Mill Reserves</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
