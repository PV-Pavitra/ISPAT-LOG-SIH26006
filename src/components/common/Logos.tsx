import React, { useState } from 'react';

export interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
  subtextColor?: string;
  layout?: 'horizontal' | 'vertical';
  allowUpload?: boolean;
}

/**
 * Hardcoded ISPAT-LOG Logo Component
 */
export const LogoPlaceholder: React.FC<LogoProps> = ({
  className = '',
  size = 48,
  showText = true,
  textColor = '#002147',
  subtextColor = '#475569',
  layout = 'horizontal',
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`flex ${layout === 'vertical' ? 'flex-col items-center text-center' : 'items-center'} gap-3.5 select-none ${className}`}>
      {/* Hardcoded Logo Container */}
      <div 
        style={{ width: size, height: size }}
        className="relative shrink-0 rounded-2xl flex items-center justify-center p-1 bg-white border-2 border-[#002147] shadow-sm overflow-hidden"
      >
        {!imgError ? (
          <img 
            src="/logo2.png" 
            alt="ISPAT-LOG Logo" 
            onError={() => setImgError(true)}
            className="w-full h-full object-contain rounded-xl"
          />
        ) : (
          /* Built-in Fallback Emblem (Anchor & Steel Grid Crest) */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#002147] to-[#001733] rounded-xl text-white shadow-inner p-1">
            <svg 
              viewBox="0 0 48 48" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <rect width="48" height="48" rx="10" fill="#002147" />
              <path d="M12 14 L36 14 L32 20 L8 20 Z" fill="#F59E0B" />
              <path d="M8 20 L32 20 L32 23 L8 23 Z" fill="#D97706" />
              <circle cx="24" cy="23" r="3" stroke="#38BDF8" strokeWidth="2" fill="none" />
              <line x1="24" y1="26" x2="24" y2="40" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M14 32 C14 39, 34 39, 34 32" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <line x1="17" y1="28" x2="31" y2="28" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>

      {/* Brand Typography: Clean, Bold "ISPAT-LOG" with High Contrast Visibility */}
      {showText && (
        <div className={`flex flex-col ${layout === 'vertical' ? 'items-center text-center' : 'items-start text-left'} leading-tight`}>
          <div 
            className="tracking-tight font-black text-2xl lg:text-3xl font-sans"
            style={{ color: textColor }}
          >
            ISPAT-LOG
          </div>
          <span 
            className="text-[10px] font-extrabold tracking-wider uppercase mt-0.5"
            style={{ color: subtextColor }}
          >
            Integrated Steel Procurement And Transportation - Logistics Optimization Grid
          </span>
        </div>
      )}
    </div>
  );
};

// Also export as IspatLogLogo so existing imports continue working seamlessly
export const IspatLogLogo = LogoPlaceholder;

interface SihLogoBadgeProps {
  className?: string;
  compact?: boolean;
  theme?: 'light' | 'dark';
}

export const SihLogoBadge: React.FC<SihLogoBadgeProps> = ({
  className = '',
  compact = false,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 ${
        compact ? 'text-[10px]' : 'text-xs'
      } ${
        isDark
          ? 'border-sky-800 bg-slate-900/80 text-white'
          : 'border-slate-200 bg-white text-[#002147]'
      } ${className}`}
      aria-label="Smart India Hackathon 2026"
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#002147] text-[9px] font-black leading-none text-white">
        SIH
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-black tracking-wide">SMART INDIA</span>
        <span className={isDark ? 'text-sky-300' : 'text-[#0284C7]'}>HACKATHON 2026</span>
      </div>
    </div>
  );
};