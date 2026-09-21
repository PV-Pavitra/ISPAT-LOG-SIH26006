import React, { useState, useRef, useEffect } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { LogoPlaceholder, SihLogoBadge } from './Logos';
import { 
  FileText, 
  Compass, 
  TrendingUp, 
  Warehouse, 
  ChevronDown, 
  LogOut, 
  ShieldCheck, 
  UserCheck, 
  Radio, 
  Pause, 
  Play,
  RotateCcw,
  Sparkles,
  Lock,
  Layers,
  Home
} from 'lucide-react';
import { USER_PROFILES } from '../../data/mockData';
import { UserRole } from '../../types';

interface HeaderProps {
  onOpenLoginModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenLoginModal }) => {
  const { 
    currentUser, 
    setCurrentUserRole, 
    logout, 
    activeTab, 
    setActiveTab,
    isSimulationRunning,
    setIsSimulationRunning,
    resetSimulation
  } = useSimulation();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    {
      id: 'overview' as const,
      isScroll: true,
      targetId: 'hero-section',
      label: 'Home & Overview',
      sublabel: 'Product Purpose',
      icon: Home
    },
    {
      id: 'pillars' as const,
      isScroll: true,
      targetId: 'core-features',
      label: 'Core Features',
      sublabel: '5 Strategic Pillars',
      icon: Layers
    },
    {
      id: 'requisition' as const,
      label: 'Procurement & Requisitions',
      sublabel: 'Landed Cost Engine',
      icon: FileText
    },
    {
      id: 'tracker' as const,
      label: 'Live Maritime & Fleet Map',
      sublabel: 'Global Ocean Corridors',
      icon: Compass
    },
    {
      id: 'economy' as const,
      label: 'Maritime Economy & News',
      sublabel: 'Baltic Indices & Ticker',
      icon: Radio
    },
    {
      id: 'analytics' as const,
      label: 'Freight 30/60/90D Forecast',
      sublabel: 'Prophet / AI Curves',
      icon: TrendingUp
    },
    {
      id: 'inventory' as const,
      label: 'Plant Stock & Voyage Logs',
      sublabel: 'SAIL / RINL Reserves',
      icon: Warehouse
    },
    {
      id: 'login' as const,
      label: 'Mockup Login Portal',
      sublabel: 'National SSO & MFA',
      icon: Lock
    }
  ];

  const handleNavClick = (item: typeof navItems[number]) => {
    if ('isScroll' in item && item.isScroll) {
      if (activeTab === 'login') {
        setActiveTab('requisition');
      }
      setTimeout(() => {
        const el = document.getElementById(item.targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    setActiveTab(item.id as any);
    if (item.id !== 'login') {
      setTimeout(() => {
        const el = document.getElementById('operational-workspace');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-md bg-white border-b border-slate-200">
      
      {/* 1. Top Compliance & Live Satellite Simulation Banner (Dark Blue for official prominence) */}
      <div 
        id="sih-compliance-banner"
        className="bg-[#001733] text-white py-1.5 px-4 text-xs font-semibold tracking-wide flex items-center justify-between border-b border-sky-950"
      >
        <div className="flex items-center gap-2.5 mx-auto sm:mx-0">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-amber-400 text-slate-950 uppercase tracking-wider">
            Concept Prototype
          </span>
          <span className="text-slate-100 text-[11px] sm:text-xs">
            Developed for <strong className="text-white font-bold">Smart India Hackathon (SIH) 2026</strong> | Ministry of Steel (Problem Statement <span className="font-mono text-amber-300 font-bold">SIH26006</span>)
          </span>
        </div>

        {/* Live Simulation Indicator */}
        <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-200">
          <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-0.5 rounded-full border border-sky-400/40">
            <span className={`w-2 h-2 rounded-full ${isSimulationRunning ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="font-mono text-[10px] text-sky-200 font-bold">
              {isSimulationRunning ? 'SAT-AIS FEED: ACTIVE' : 'FEED PAUSED'}
            </span>
          </div>

          <button
            onClick={() => setIsSimulationRunning(p => !p)}
            className="hover:text-white transition-colors flex items-center gap-1 p-0.5 cursor-pointer text-slate-300 hover:text-white"
            title={isSimulationRunning ? 'Pause live satellite simulation' : 'Resume live simulation'}
          >
            {isSimulationRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* 2. Main Header Bar: Major White with Dark Blue (#002147) Branding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Left: Customizable Logo Placeholder + Bold Dark Blue Title */}
          <div className="flex items-center gap-4">
            <div 
              onClick={() => {
                if (activeTab === 'login') setActiveTab('requisition');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left focus:outline-none transition-transform hover:scale-[1.01] cursor-pointer flex items-center gap-3"
              id="header-brand-logo"
              title="ISPAT-LOG: Integrated Steel Procurement And Transportation - Logistics Optimization Grid"
            >
              {/* Logo */}
              <LogoPlaceholder size={44} showText={false} allowUpload={true} />
              
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-[#002147] font-sans">
                    ISPAT-LOG
                  </span>
                  <span className="text-xs font-bold text-slate-700 hidden 2xl:inline">
                    : Integrated Steel Procurement And Transportation - Logistics Optimization Grid
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#0284C7] tracking-tight -mt-0.5 hidden sm:inline 2xl:hidden">
                  Integrated Steel Procurement And Transportation - Logistics Optimization Grid
                </span>
              </div>
            </div>

            {/* Ministry Divider & Clear Text */}
            <div className="hidden md:flex flex-col border-l-2 border-slate-200 pl-4 py-0.5">
              <span className="text-[11px] font-black tracking-wider text-[#002147] uppercase">
                Ministry of Steel
              </span>
              <span className="text-[10px] text-slate-600 font-bold">
                Govt. of India • Public Sector Logistics
              </span>
            </div>
          </div>

          {/* Right Controls: SIH Badge & Profile Dropdown */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* SIH 2026 Logo Badge */}
            <div className="hidden sm:block">
              <SihLogoBadge compact={true} theme="light" />
            </div>

            {/* Active User Profile Dropdown (Major White & Dark Blue) */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="user-profile-dropdown-btn"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 hover:border-[#002147] text-left transition-all focus:outline-none cursor-pointer"
                aria-expanded={isProfileOpen}
              >
                {/* Avatar Icon */}
                <div className="w-8 h-8 rounded-lg bg-[#002147] text-white flex items-center justify-center font-bold">
                  <UserCheck className="w-4 h-4" />
                </div>

                {/* User Info */}
                <div className="hidden md:flex flex-col leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-[#002147] max-w-[140px] truncate">
                      {currentUser?.name || 'Authorized Official'}
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-blue-100 text-[#002147] border border-blue-200">
                      {currentUser?.badge || 'OFFICIAL'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-600 font-semibold truncate max-w-[150px]">
                    {currentUser?.designation || 'Ministry of Steel'}
                  </span>
                </div>

                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isProfileOpen ? 'rotate-180 text-[#002147]' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border-2 border-slate-200 shadow-2xl py-2 z-50 text-slate-800 divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Current Active Persona Info */}
                  <div className="px-4 py-3 bg-slate-50">
                    <span className="text-[10px] font-black text-[#002147] uppercase tracking-wider block mb-1">
                      Active Authorized Identity
                    </span>
                    <p className="text-xs font-extrabold text-[#002147]">{currentUser?.name}</p>
                    <p className="text-[11px] text-slate-600 font-medium">{currentUser?.designation}</p>
                    <p className="text-[10px] text-sky-700 font-bold mt-0.5">{currentUser?.organization}</p>
                  </div>

                  {/* Switch Role Quick Section */}
                  <div className="py-2 px-2">
                    <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                      <span>Switch Persona:</span>
                      <Sparkles className="w-3 h-3 text-amber-500" />
                    </div>

                    <div className="space-y-1 mt-1">
                      {(['ministry_director', 'plant_officer', 'carrier_manager'] as UserRole[]).map((roleKey) => {
                        const prof = USER_PROFILES[roleKey];
                        const isSelected = currentUser?.role === roleKey;
                        return (
                          <button
                            key={roleKey}
                            onClick={() => {
                              setCurrentUserRole(roleKey);
                              setIsProfileOpen(false);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                              isSelected 
                                ? 'bg-[#002147] text-white font-bold' 
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <div>
                              <p className="font-bold text-[11px]">{prof.name}</p>
                              <p className={`text-[10px] ${isSelected ? 'text-sky-200' : 'text-slate-500'}`}>{prof.designation.split(',')[0]}</p>
                            </div>
                            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                              {prof.badge}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mockup Login Portal Link */}
                  <div className="py-1 px-2">
                    <button
                      onClick={() => {
                        setActiveTab('login');
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-[#002147] hover:bg-slate-100 rounded-lg font-bold transition-colors cursor-pointer"
                    >
                      <Lock className="w-4 h-4 text-[#002147]" />
                      <span>Open Mockup Login Portal (SSO)</span>
                    </button>
                  </div>

                  {/* Reset Simulation & Sign Out */}
                  <div className="py-1 px-2">
                    <button
                      onClick={() => {
                        resetSimulation();
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                      <span>Reset Simulation Telemetry</span>
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                        if (onOpenLoginModal) onOpenLoginModal();
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-bold transition-colors cursor-pointer mt-0.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out / Lock Session</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* 3. Navigation Ribbon: Dark Blue (#002147) Ribbon with High Contrast White & Active Pills */}
      <div className="bg-[#002147] text-white border-t border-sky-900 shadow-inner">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-2" aria-label="Tabs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isScrollItem = 'isScroll' in item && item.isScroll;
              const isActive = !isScrollItem && activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl text-xs whitespace-nowrap transition-all select-none relative cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#002147] font-black shadow-lg shadow-black/20 ring-2 ring-amber-400'
                      : isScrollItem
                      ? 'text-sky-100 hover:text-white hover:bg-white/10 font-bold'
                      : 'text-sky-100 hover:text-white hover:bg-white/10 font-bold'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#002147]' : 'text-sky-300'}`} />
                  <div className="flex flex-col items-start leading-tight">
                    <span>{item.label}</span>
                    <span className={`text-[10px] hidden xl:block font-medium ${isActive ? 'text-slate-600 font-bold' : 'text-sky-200'}`}>
                      {item.sublabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
