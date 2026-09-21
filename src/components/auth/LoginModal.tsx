import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { USER_PROFILES } from '../../data/mockData';
import { UserRole } from '../../types';
import { LogoPlaceholder, SihLogoBadge } from '../common/Logos';
import { 
  Building2, 
  Factory, 
  Ship, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  X,
  Upload
} from 'lucide-react';

interface LoginModalProps {
  onClose?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { currentUser, setCurrentUserRole, addToast } = useSimulation();

  const handleSelectRole = (role: UserRole) => {
    setCurrentUserRole(role);
    const profile = USER_PROFILES[role];
    addToast(
      `Switched to ${profile.name}`,
      `Logged in as ${profile.designation} (${profile.organization}).`,
      'success'
    );
    if (onClose) onClose();
  };

  const roleOptions: {
    role: UserRole;
    title: string;
    department: string;
    organization: string;
    description: string;
    icon: any;
    accentColor: string;
    primaryAction: string;
    metrics: string;
  }[] = [
    {
      role: 'ministry_director',
      title: 'Director of Raw Materials & Shipping',
      department: 'Logistics Monitoring Cell',
      organization: 'Ministry of Steel (Govt. of India)',
      description: 'Reviews macro import requirements across steel PSUs, monitors landed freight benchmarks, and evaluates strategic demurrage risk at major ports.',
      icon: Building2,
      accentColor: 'border-blue-600 text-[#002147]',
      primaryAction: 'Enter as Ministry Director',
      metrics: 'Govt. Oversight & CVC Compliance'
    },
    {
      role: 'plant_officer',
      title: 'Head of Plant Logistics & Procurement',
      department: 'Blast Furnace Raw Materials Handling',
      organization: 'SAIL Bhilai & Bokaro Steel Plants',
      description: 'Calculates lowest landed cost ($/MT and ₹/MT) across competing coal blend tenders, tracks coking coal plant stock, and requisitions rakes.',
      icon: Factory,
      accentColor: 'border-amber-500 text-amber-900',
      primaryAction: 'Enter as Plant Officer',
      metrics: 'Landed Cost Optimizer & Plant Reserves'
    },
    {
      role: 'carrier_manager',
      title: 'Maritime Chartering & Fleet Coordinator',
      department: 'Ocean Freight Operations',
      organization: 'Bulk Ocean Carrier Agency',
      description: 'Monitors real-time SAT-AIS vessel locations, port queue delays at Paradip/Haldia, and responds to demurrage rerouting directives.',
      icon: Ship,
      accentColor: 'border-emerald-600 text-emerald-900',
      primaryAction: 'Enter as Carrier Agent',
      metrics: 'AIS Telemetry & Vessel Tracking'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden">
        
        {/* Close button if optional */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Top Dark Blue (#002147) Banner */}
        <div className="bg-[#002147] px-8 py-7 text-white relative overflow-hidden border-b-2 border-sky-950">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <LogoPlaceholder size={52} showText={false} allowUpload={true} />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight text-white font-sans">ISPAT-LOG</h1>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded tracking-wide uppercase">
                    SIH 2026
                  </span>
                </div>
                <p className="text-xs text-sky-200 mt-1 max-w-xl font-semibold">
                  AI-Driven Maritime Decision Support & Landed Cost Optimization Grid for Indian Steel Logistics
                </p>
                <div className="text-[11px] text-slate-300 mt-0.5 flex items-center gap-2 font-medium">
                  <span>Ministry of Steel (PS: SIH26006)</span>
                  <span>•</span>
                  <span>SAIL & RINL Logistics Grid</span>
                </div>
              </div>
            </div>

            <SihLogoBadge className="shrink-0 bg-white shadow-sm" theme="light" />
          </div>
        </div>

        {/* Modal Body: Role Profiles in Major White and Dark Blue */}
        <div className="p-6 sm:p-8 bg-slate-50">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#002147] text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#002147]" /> One-Click Role Access For Evaluators
            </span>
            <h2 className="text-xl font-black text-[#002147]">
              Select Demo Persona to Enter the Decision Grid
            </h2>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Test role-specific views without typing credentials. Each persona activates tailored workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {roleOptions.map((opt) => {
              const Icon = opt.icon;
              const isCurrent = currentUser?.role === opt.role;

              return (
                <div
                  key={opt.role}
                  className={`flex flex-col justify-between p-5 rounded-2xl bg-white border-2 transition-all duration-200 hover:shadow-lg ${
                    isCurrent 
                      ? 'border-[#002147] ring-2 ring-[#002147]/20 shadow-md' 
                      : 'border-slate-200 hover:border-[#002147]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-slate-100 text-[#002147] border border-slate-200">
                        <Icon className="w-6 h-6" />
                      </div>
                      {isCurrent ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3" /> Active Now
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Persona
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-black text-[#002147] leading-snug">
                      {opt.title}
                    </h3>
                    <p className="text-xs font-bold text-[#0284C7] mt-0.5">
                      {opt.organization}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {opt.department}
                    </p>

                    <p className="text-xs text-slate-600 mt-3 leading-relaxed font-normal">
                      {opt.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Key Focus: <span className="text-slate-800 font-bold">{opt.metrics}</span>
                    </div>

                    <button
                      onClick={() => handleSelectRole(opt.role)}
                      className={`w-full py-2.5 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#002147] text-white hover:bg-[#003366]'
                          : 'bg-slate-100 text-[#002147] hover:bg-[#002147] hover:text-white border border-slate-300'
                      }`}
                    >
                      <span>{opt.primaryAction}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted local session simulation for Smart India Hackathon evaluation.</span>
          </div>
        </div>

      </div>
    </div>
  );
};
