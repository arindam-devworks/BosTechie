import React from 'react';
import { FileText, Plus } from 'lucide-react';

export default function WhatsAppTemplatesEmptyState({ isSearchEmpty, clearSearch }) {
    return (
        <div className="w-full py-16 px-6 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 flex flex-col items-center justify-center animate-in fade-in">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 text-slate-300">
                <FileText size={32} />
            </div>

            <h3 className="text-[14px] font-black text-slate-700 uppercase tracking-widest mb-2">
                {isSearchEmpty ? 'No matching templates' : 'No templates found'}
            </h3>

            <p className="text-[12px] text-slate-500 font-medium max-w-[280px] mb-6 leading-relaxed">
                {isSearchEmpty
                    ? 'Try adjusting your search criteria or clear active filters to see all results.'
                    : 'Create your first message template to begin orchestrating WhatsApp campaigns.'}
            </p>

            {isSearchEmpty ? (
                <button
                    onClick={clearSearch}
                    className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] font-black text-slate-600 uppercase tracking-widest hover:border-slate-300 transition-colors shadow-sm"
                >
                    Clear Filters
                </button>
            ) : (
                <button className="flex items-center gap-2 px-6 py-2.5 bg-orbit text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    <Plus size={14} /> New Template
                </button>
            )}
        </div>
    );
}
