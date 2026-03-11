import React from 'react';
import { useToast } from '../../context/ToastContext';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ id, message, type, duration }) => {
    const { removeToast } = useToast();

    const icons = {
        success: <CheckCircle2 className="text-emerald-500" size={18} />,
        error: <AlertCircle className="text-red-500" size={18} />,
        info: <Info className="text-blue-500" size={18} />,
        warning: <AlertTriangle className="text-amber-500" size={18} />,
    };

    const colors = {
        success: 'border-emerald-100 dark:border-emerald-900/30 bg-white/90 dark:bg-slate-900/90 shadow-emerald-500/10',
        error: 'border-red-100 dark:border-red-900/30 bg-white/90 dark:bg-slate-900/90 shadow-red-500/10',
        info: 'border-blue-100 dark:border-blue-900/30 bg-white/90 dark:bg-slate-900/90 shadow-blue-500/10',
        warning: 'border-amber-100 dark:border-amber-900/30 bg-white/90 dark:bg-slate-900/90 shadow-amber-500/10',
    };

    return (
        <div 
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border backdrop-blur-xl shadow-lg animate-in slide-in-from-right duration-300 pointer-events-auto ${colors[type]}`}
        >
            <div className="shrink-0">{icons[type]}</div>
            <p className="text-[12px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">{message}</p>
            <button 
                onClick={() => removeToast(id)}
                className="ml-2 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400"
            >
                <X size={14} />
            </button>
            {duration !== Infinity && (
                <div className="absolute bottom-0 left-0 h-1 bg-current opacity-20 transition-all duration-linear" style={{ width: '0%', animation: `shrink ${duration}ms linear forwards` }}></div>
            )}
        </div>
    );
};

export default function ToastContainer() {
    const { toasts } = useToast();

    return (
        <div className="fixed top-24 right-6 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full">
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} />
            ))}
        </div>
    );
}
