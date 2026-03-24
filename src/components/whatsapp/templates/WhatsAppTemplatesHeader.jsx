import React from 'react';
import { MessageSquare, Globe, Plus } from 'lucide-react';

export default function WhatsAppTemplatesHeader() {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <div className="absolute -right-10 -top-10 text-primary-500/5 rotate-12 pointer-events-none">
                <MessageSquare size={200} />
            </div>

            <div className="relative z-10 flex-1">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">WhatsApp Templates</h1>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse shrink-0"></span>
                    <p className="text-[11px] md:text-[12px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-relaxed">
                        Manage message templates for WhatsApp campaigns. Templates must be approved by Meta before broadcasts.
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto relative z-10">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm shrink-0">
                    <Globe size={14} /> Language Packs
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-orbit text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0">
                    <Plus size={16} /> Create Template
                </button>
            </div>
        </div>
    );
}
