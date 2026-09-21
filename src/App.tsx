/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import { Header } from './components/common/Header';
import { ProductIntroductionHero } from './components/home/ProductIntroductionHero';
import { ToastContainer } from './components/common/ToastContainer';
import { LoginModal } from './components/auth/LoginModal';
import { MockupLoginPage } from './components/auth/MockupLoginPage';
import { RequisitionPortal } from './components/requisition/RequisitionPortal';
import { FleetMapTracker } from './components/tracker/FleetMapTracker';
import { MaritimeEconomy } from './components/economy/MaritimeEconomy';
import { FreightAnalytics } from './components/analytics/FreightAnalytics';
import { PlantInventoryLogs } from './components/inventory/PlantInventoryLogs';
import { LogoPlaceholder, SihLogoBadge } from './components/common/Logos';
import { 
  ShieldCheck, 
  ArrowUp, 
  FileText, 
  Compass, 
  Radio, 
  TrendingUp, 
  Warehouse,
  Lock
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab,
    toasts, 
    dismissToast 
  } = useSimulation();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // If activeTab is 'login', display the dedicated Mockup Login Page
  if (activeTab === 'login') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <MockupLoginPage 
          onBackToLanding={() => setActiveTab('requisition')}
          onLoginSuccess={() => setActiveTab('requisition')}
        />
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </div>
    );
  }

  const operationalTools = [
    { id: 'requisition' as const, label: 'Landed Cost Engine', icon: FileText },
    { id: 'tracker' as const, label: 'Live Fleet AIS Map', icon: Compass },
    { id: 'economy' as const, label: 'Maritime Economy', icon: Radio },
    { id: 'analytics' as const, label: 'AI Rate Curves', icon: TrendingUp },
    { id: 'inventory' as const, label: 'Plant Reserves', icon: Warehouse }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-[#002147] selection:text-white">
      
      {/* Role selector portal modal if user logged out or explicitly opens it */}
      {(!currentUser || isLoginModalOpen) && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}

      {/* Top Sticky Header with Prototype Banner & All Navigation Sections */}
      <Header onOpenLoginModal={() => setIsLoginModalOpen(true)} />

      {/* 1. INTRODUCTION PAGE / HERO (Major White and Dark Blue #002147 with Logo Placeholder) */}
      <ProductIntroductionHero 
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* 2. LIVE OPERATIONAL GRID & DECISION SUPPORT SYSTEM */}
      <div id="operational-workspace" className="relative z-20 bg-slate-50 text-slate-900 border-t-2 border-slate-200">
        
        {/* Operational Grid Sub-Header & Live Tool Switcher: Dark Blue (#002147) Ribbon */}
        <div className="bg-[#002147] text-white py-3.5 px-4 border-b border-sky-950 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Title & Live Status */}
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div>
                <span className="font-mono text-[10px] text-sky-300 uppercase tracking-widest block font-bold">
                  LIVE MARITIME DECISION GRID
                </span>
                <span className="text-white font-black text-sm sm:text-base">
                  {activeTab === 'requisition' && 'Procurement Requisition & Lowest Landed Cost Engine'}
                  {activeTab === 'tracker' && 'Live Maritime Satellite AIS Fleet Tracker & Port Corridors'}
                  {activeTab === 'economy' && 'Global Maritime Economy, Baltic Indices & Intelligence Ticker'}
                  {activeTab === 'analytics' && 'Freight 30/60/90-Day AI Predictive Curves (Prophet & XGBoost)'}
                  {activeTab === 'inventory' && 'Steel Plant Coking Coal Reserves & Historical Voyage Audit Logs'}
                </span>
              </div>
            </div>

            {/* Quick Switcher Tool Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-sky-900/60">
              {operationalTools.map((tool) => {
                const Icon = tool.icon;
                const isSelected = activeTab === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTab(tool.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#002147] shadow-md ring-2 ring-sky-300 font-black'
                        : 'text-sky-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#002147]' : 'text-sky-300'}`} />
                    <span>{tool.label}</span>
                  </button>
                );
              })}

              {/* Quick Link to Mockup Login Page */}
              <button
                onClick={() => setActiveTab('login')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all cursor-pointer ml-1 shadow-sm"
                title="Open Mockup Government Authentication Gateway"
              >
                <Lock className="w-3.5 h-3.5 text-slate-950" />
                <span>Mockup Login</span>
              </button>

              {/* Return to Top Button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-1 text-xs font-bold text-sky-200 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-xl border border-white/20 transition-all cursor-pointer ml-1"
                title="Scroll back to introduction hero"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Top</span>
              </button>
            </div>

          </div>
        </div>

        {/* Main Operational Tool Content (Clean Major White and High Contrast Dark Blue) */}
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'requisition' && <RequisitionPortal />}
          {activeTab === 'tracker' && <FleetMapTracker />}
          {activeTab === 'economy' && <MaritimeEconomy />}
          {activeTab === 'analytics' && <FreightAnalytics />}
          {activeTab === 'inventory' && <PlantInventoryLogs />}
        </main>
      </div>

      {/* Reactive System Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Enterprise Major White and Dark Blue Footer */}
      <footer className="mt-auto bg-white text-slate-700 border-t-2 border-slate-200 py-10 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <LogoPlaceholder size={44} showText={false} allowUpload={true} />
            <div>
              <div className="flex items-center gap-2">
                <p className="font-black text-[#002147] text-base tracking-wide font-sans">
                  ISPAT-LOG
                </p>
                <span className="text-[#0284C7]">•</span>
                <span className="text-xs text-[#002147] font-extrabold tracking-tight">
                  Integrated Steel Procurement And Transportation - Logistics Optimization Grid
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-1 max-w-xl font-medium">
                AI-Driven Landed Cost Optimization for Steel Public Sector Logistics (SAIL & RINL)
              </p>
              <p className="text-[11px] text-slate-500 mt-1 font-semibold">
                Developed for Smart India Hackathon (SIH) 2026 | Problem Statement: SIH26006 | Ministry of Steel
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-slate-700 font-medium">
            <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl border-2 border-slate-200 font-bold text-slate-800 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>CVC & GFR 2017 Procurement Compliant</span>
            </div>
            <SihLogoBadge compact={false} theme="light" className="bg-white shadow-sm border-2 border-slate-200" />
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <SimulationProvider>
      <MainAppContent />
    </SimulationProvider>
  );
}
