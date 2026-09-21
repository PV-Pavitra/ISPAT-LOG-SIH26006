import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'warning' | 'error' | 'info';
  timestamp: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        const bgColors = {
          success: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100',
          warning: 'bg-amber-950/90 border-amber-500/50 text-amber-100',
          error: 'bg-rose-950/90 border-rose-500/50 text-rose-100',
          info: 'bg-slate-900/90 border-sky-500/50 text-slate-100'
        }[toast.type];

        const icon = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
          error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />,
          info: <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
        }[toast.type];

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto flex items-start justify-between gap-3 p-3.5 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 ${bgColors}`}
          >
            <div className="flex items-start gap-3">
              {icon}
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm leading-tight text-white">{toast.title}</h4>
                  <span className="text-[10px] text-slate-400 opacity-80">{toast.timestamp}</span>
                </div>
                {toast.description && (
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{toast.description}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
