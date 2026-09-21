import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { USER_PROFILES } from '../../data/mockData';
import { UserRole } from '../../types';
import { LogoPlaceholder, SihLogoBadge } from '../common/Logos';
import { MaritimeHeroVideo } from '../common/MaritimeHeroVideo';
import { 
  Building2, 
  Factory, 
  Ship, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw, 
  ArrowLeft,
  Smartphone,
  ExternalLink,
  FileCheck
} from 'lucide-react';

interface MockupLoginPageProps {
  onBackToLanding?: () => void;
  onLoginSuccess?: (role: UserRole) => void;
}

export const MockupLoginPage: React.FC<MockupLoginPageProps> = ({
  onBackToLanding,
  onLoginSuccess
}) => {
  const { setCurrentUserRole, addToast } = useSimulation();

  // Login Mode State
  const [authMode, setAuthMode] = useState<'credentials' | 'sso'>('credentials');
  const [selectedRole, setSelectedRole] = useState<UserRole>('ministry_director');
  const [username, setUsername] = useState('director.rm@steel.gov.in');
  const [password, setPassword] = useState('GovtSecure@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('7K9M2P');
  const [captchaInput, setCaptchaInput] = useState('7K9M2P');
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectRolePreset = (role: UserRole) => {
    setSelectedRole(role);
    const profile = USER_PROFILES[role];
    if (role === 'ministry_director') {
      setUsername('director.rm@steel.gov.in');
      setPassword('SteelMin@2026!');
    } else if (role === 'plant_officer') {
      setUsername('logistics.head@sail-bokaro.in');
      setPassword('SailPlant#2026');
    } else {
      setUsername('fleet.ops@oceanbulk-charter.com');
      setPassword('MaritimeFleet$2026');
    }
    addToast('Persona Auto-filled', `Form fields pre-filled for ${profile.name}.`, 'info');
  };

  const handleRefreshCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let res = '';
    for (let i = 0; i < 6; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(res);
    setCaptchaInput(res);
  };

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaInput.toUpperCase() !== captchaCode.toUpperCase()) {
      addToast('Invalid Captcha', 'Please enter the verification text shown.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOtpStep(true);
      addToast(
        '2FA Code Dispatched', 
        'Simulated OTP 123456 generated for two-factor verification.', 
        'info'
      );
    }, 400);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentUserRole(selectedRole);
      addToast(
        'Authentication Verified', 
        `Welcome to ISPAT-LOG Decision Grid as ${USER_PROFILES[selectedRole].name}.`, 
        'success'
      );
      if (onLoginSuccess) {
        onLoginSuccess(selectedRole);
      } else if (onBackToLanding) {
        onBackToLanding();
      }
    }, 500);
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-100 text-slate-900 flex flex-col justify-between overflow-x-hidden">
      
      {/* Background Maritime Ship/Port Video Loop & Soft Ambient Scrim */}
      <div className="fixed inset-0 z-0 opacity-15 pointer-events-none">
        <MaritimeHeroVideo className="w-full h-full" />
      </div>

      {/* Top Header Navigation Bar (Dark Blue #002147) */}
      <header className="relative z-10 w-full border-b border-sky-950 bg-[#002147] text-white px-4 sm:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBackToLanding && (
              <button
                onClick={onBackToLanding}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-sky-100 hover:text-white transition-all cursor-pointer mr-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Landing Page</span>
              </button>
            )}

            <LogoPlaceholder size={36} showText={false} allowUpload={true} />
            <div>
              <span className="text-base font-black tracking-wide text-white font-sans">
                ISPAT-LOG
              </span>
              <span className="hidden sm:inline text-xs text-sky-300 font-bold ml-2">
                • National Single-Window Logistics Authentication
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-slate-200 uppercase hidden md:inline">
              Ministry of Steel | SIH26006
            </span>
            <SihLogoBadge compact={true} theme="dark" />
          </div>
        </div>
      </header>

      {/* Main Login Card Container: Major White & Dark Blue */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-4xl bg-white rounded-3xl border-2 border-slate-200 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Panel: Government Single Window Credentials & Overview (5 cols) - Dark Blue #002147 */}
          <div className="lg:col-span-5 bg-[#002147] text-white p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-sky-950 flex flex-col justify-between">
            <div>
              {/* Official Seal / Logo */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 border border-white/20 text-[11px] font-black uppercase tracking-wider mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Single-Window Gateway
              </div>

              <h2 className="text-2xl font-black text-white tracking-tight leading-snug">
                ISPAT-LOG <br />
                <span className="text-amber-300">
                  Secure Access Portal
                </span>
              </h2>

              <p className="text-xs text-slate-200 mt-2.5 leading-relaxed font-normal">
                Restricted access gateway for authorized executives of the Ministry of Steel, SAIL, RINL, Indian Port Authorities, and empaneled shipping carriers.
              </p>

              {/* Security Badges */}
              <div className="mt-6 space-y-2.5 text-xs text-slate-200">
                <div className="flex items-center gap-2.5 bg-black/20 p-2.5 rounded-xl border border-white/10 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>CVC & GFR 2017 Procurement Rules Enforced</span>
                </div>
                <div className="flex items-center gap-2.5 bg-black/20 p-2.5 rounded-xl border border-white/10 font-medium">
                  <Lock className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>256-Bit TLS Satellite Telemetry Encryption</span>
                </div>
                <div className="flex items-center gap-2.5 bg-black/20 p-2.5 rounded-xl border border-white/10 font-medium">
                  <FileCheck className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Immutable Audit Logging for Tender Awards</span>
                </div>
              </div>
            </div>

            {/* Bottom Quick Persona Switcher for Hackathon Evaluators */}
            <div className="mt-8 pt-6 border-t border-sky-900">
              <span className="text-[11px] font-black uppercase text-amber-300 tracking-wider flex items-center gap-1.5 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Quick-Fill Demo Personas:
              </span>

              <div className="space-y-2">
                {[
                  {
                    role: 'ministry_director' as UserRole,
                    title: 'Ministry Director',
                    dept: 'Ministry of Steel (Govt. of India)',
                    icon: Building2,
                  },
                  {
                    role: 'plant_officer' as UserRole,
                    title: 'Plant Logistics Head',
                    dept: 'SAIL Bhilai & Bokaro Steel Plants',
                    icon: Factory,
                  },
                  {
                    role: 'carrier_manager' as UserRole,
                    title: 'Maritime Chartering Agent',
                    dept: 'Capesize / Panamax Bulk Fleet',
                    icon: Ship,
                  }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedRole === item.role;
                  return (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => handleSelectRolePreset(item.role)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-white text-[#002147] font-black shadow-md border-amber-400'
                          : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#002147]' : 'text-sky-300'}`} />
                        <div>
                          <p className="font-bold text-xs">{item.title}</p>
                          <p className={`text-[10px] ${isSelected ? 'text-slate-600 font-semibold' : 'text-slate-300'}`}>{item.dept}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${isSelected ? 'bg-[#002147] text-white' : 'bg-black/30 text-white'}`}>
                        {isSelected ? 'ACTIVE' : 'FILL'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive Form & SSO Options (7 cols) - Clean Major White */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-white text-slate-900 flex flex-col justify-between">
            
            {/* Auth Mode Toggle Tabs */}
            <div>
              <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-100 border border-slate-200 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('credentials');
                    setIsOtpStep(false);
                  }}
                  className={`flex-1 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    authMode === 'credentials'
                      ? 'bg-[#002147] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Official Credentials
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('sso');
                    setIsOtpStep(false);
                  }}
                  className={`flex-1 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    authMode === 'sso'
                      ? 'bg-[#002147] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Jan Parichay / NLP Marine SSO
                </button>
              </div>

              {/* Mode A: Official Credentials Login */}
              {authMode === 'credentials' && !isOtpStep && (
                <form onSubmit={handleSubmitLogin} className="space-y-4">
                  
                  {/* Persona Selected Banner */}
                  <div className="p-3 rounded-xl bg-slate-50 border-2 border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-slate-600 font-semibold">Authorizing Persona:</span>
                      <strong className="text-[#002147] font-black">{USER_PROFILES[selectedRole].name}</strong>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-[#002147]">
                      {USER_PROFILES[selectedRole].badge}
                    </span>
                  </div>

                  {/* Username / Govt Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Government / PSU Email ID or NIC Handle
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#002147] transition-colors"
                        placeholder="e.g. director.rm@steel.gov.in"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-800">
                        Password
                      </label>
                      <button 
                        type="button" 
                        onClick={() => addToast('Password Reset', 'In mock evaluation mode, use the 1-click persona buttons on the left.', 'info')}
                        className="text-[11px] text-[#0284C7] hover:underline font-bold"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#002147] transition-colors pr-10"
                        placeholder="Enter password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(p => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Simulated Security Captcha */}
                  <div className="p-3 bg-slate-50 rounded-xl border-2 border-slate-200">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                      Security Verification Code
                    </label>
                    <div className="flex items-center gap-3">
                      {/* Captcha Display */}
                      <div className="bg-slate-200 px-4 py-2 rounded-lg border border-slate-300 select-none tracking-widest font-mono text-sm font-black text-[#002147] line-through">
                        {captchaCode}
                      </div>
                      <button
                        type="button"
                        onClick={handleRefreshCaptcha}
                        className="p-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                        title="Generate new captcha"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <input
                        type="text"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                        placeholder="Enter code"
                        className="flex-1 bg-white border-2 border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-black text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#002147] uppercase"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#002147] hover:bg-[#003366] text-white font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>Proceed to 2FA Multi-Factor Verification</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </form>
              )}

              {/* Mode A - Step 2: 2FA Simulated OTP Screen */}
              {authMode === 'credentials' && isOtpStep && (
                <form onSubmit={handleVerifyOtp} className="space-y-5 animate-in fade-in duration-200">
                  <div className="text-center py-2">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#002147] flex items-center justify-center mx-auto mb-3">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-black text-[#002147]">Enter Aadhaar / Mobile OTP</h3>
                    <p className="text-xs text-slate-600 mt-1 font-medium">
                      A 6-digit verification code has been dispatched to official registered credentials for <strong className="text-slate-900">{username}</strong>.
                    </p>
                  </div>

                  {/* OTP Input */}
                  <div>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value)}
                      placeholder="• • • • • •"
                      className="w-full text-center tracking-widest font-mono text-xl font-black bg-slate-50 border-2 border-[#002147] rounded-2xl py-3 text-[#002147] focus:outline-none"
                    />
                    
                    {/* Auto-fill test OTP button */}
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setOtpValue('123456')}
                        className="text-[#0284C7] hover:underline font-bold cursor-pointer"
                      >
                        Auto-fill Mock OTP (123456)
                      </button>
                      <span className="text-slate-500 text-[11px] font-medium">Expires in 09:48</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsOtpStep(false)}
                      className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-[2] py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>Authorize & Enter Decision Grid</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* Mode B: National Single Sign-On (SSO / Jan Parichay) */}
              {authMode === 'sso' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      Federated authentication via Government of India National Single Sign-On (NSSO) protocols. 
                      Select your designated agency gateway below:
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {/* Option 1: Jan Parichay */}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentUserRole('ministry_director');
                        addToast('Jan Parichay SSO Authenticated', 'Logged in as Ministry Director.', 'success');
                        if (onLoginSuccess) onLoginSuccess('ministry_director');
                        else if (onBackToLanding) onBackToLanding();
                      }}
                      className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#002147] transition-all text-left group cursor-pointer shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-black text-sm">
                          JP
                        </div>
                        <div>
                          <p className="text-xs font-black text-[#002147] group-hover:text-blue-900 transition-colors">
                            Jan Parichay (National SSO)
                          </p>
                          <p className="text-[10px] text-slate-500 font-medium">Govt. of India e-Gov Portal</p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#002147]" />
                    </button>

                    {/* Option 2: NLP Marine */}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentUserRole('plant_officer');
                        addToast('NLP Marine Authenticated', 'Logged in as SAIL Plant Logistics Officer.', 'success');
                        if (onLoginSuccess) onLoginSuccess('plant_officer');
                        else if (onBackToLanding) onBackToLanding();
                      }}
                      className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#002147] transition-all text-left group cursor-pointer shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-sky-100 text-[#002147] flex items-center justify-center font-black text-sm">
                          NL
                        </div>
                        <div>
                          <p className="text-xs font-black text-[#002147] group-hover:text-blue-900 transition-colors">
                            National Logistics Portal (Marine)
                          </p>
                          <p className="text-[10px] text-slate-500 font-medium">Port Community System & Customs</p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#002147]" />
                    </button>

                    {/* Option 3: PKI Digital Signature Token */}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentUserRole('carrier_manager');
                        addToast('Digital Signature Token Verified', 'Logged in as Maritime Fleet Manager.', 'success');
                        if (onLoginSuccess) onLoginSuccess('carrier_manager');
                        else if (onBackToLanding) onBackToLanding();
                      }}
                      className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#002147] transition-all text-left group cursor-pointer shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
                          PKI
                        </div>
                        <div>
                          <p className="text-xs font-black text-[#002147] group-hover:text-blue-900 transition-colors">
                            Class-3 Digital Signature Token (DSC)
                          </p>
                          <p className="text-[10px] text-slate-500 font-medium">Hardware Crypto Key Authentication</p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#002147]" />
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Footer Notice */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                <Lock className="w-3.5 h-3.5 text-[#002147]" />
                Protected Prototype Environment
              </span>
              <span className="font-mono text-[10px]">SIH26006 • ISO 27001 Certified</span>
            </div>

          </div>

        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-10 w-full py-4 text-center text-xs text-slate-600 border-t border-slate-200 bg-white font-medium">
        <p>
          Ministry of Steel • Steel Authority of India Ltd (SAIL) • Rashtriya Ispat Nigam Ltd (RINL)
        </p>
      </footer>

    </div>
  );
};
