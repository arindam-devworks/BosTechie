import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function WhatsAppTemplateCard({ template, isSelected, onSelect }) {
    return (
        <button
            onClick={() => onSelect(template.id)}
            className={`w-full p-4 md:p-5 border-2 rounded-[20px] md:rounded-[24px] text-left transition-all relative group ${isSelected ? 'border-primary-500 bg-primary-50/20 shadow-lg shadow-primary-500/5 dark:bg-primary-900/20' : 'border-slate-50 bg-slate-50/50 hover:bg-white hover:border-slate-100 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800 dark:hover:border-slate-700'}`}
        >
            <div className="font-black text-[12px] md:text-[13px] text-slate-900 dark:text-white uppercase tracking-tighter mb-1.5 pr-6">{template.name}</div>
            <div className="text-[10px] md:text-[11px] font-medium text-slate-500 line-clamp-2 md:line-clamp-1">{template.body}</div>
            {isSelected && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary-600 text-white p-1 rounded-lg animate-in zoom-in duration-200">
                    <CheckCircle2 size={14} />
                </div>
            )}
        </button>
    );
}
