import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({ 
    children, 
    className = '', 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    disabled = false, 
    icon: Icon,
    ...props 
}) {
    const variants = {
        primary: 'bg-orbit text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 hover:scale-[1.02]',
        secondary: 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm',
        outline: 'bg-transparent border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50',
        ghost: 'bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
        danger: 'bg-red-500 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:scale-[1.02]'
    };

    const sizes = {
        xs: 'px-3 py-1.5 text-[9px]',
        sm: 'px-4 py-2 text-[10px]',
        md: 'px-6 py-3 text-[11px]',
        lg: 'px-8 py-4 text-[12px]'
    };

    const isDisabled = disabled || isLoading;

    return (
        <button
            className={`
                inline-flex items-center justify-center gap-2 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-[0.98]
                disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100
                ${variants[variant]} 
                ${sizes[size]} 
                ${className}
            `}
            disabled={isDisabled}
            {...props}
        >
            {isLoading ? (
                <Loader2 className="animate-spin" size={14} />
            ) : Icon ? (
                <Icon size={14} />
            ) : null}
            {children}
        </button>
    );
}
