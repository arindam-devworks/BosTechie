import React from 'react';
import { Sparkles, Info } from 'lucide-react';

export default function WhatsAppEditorForm({ templateId, variables, onChangeVariable }) {
    if (!templateId) {
        return (
            <div className="flex-1 flex items-center justify-center p-8 bg-slate-50/30 rounded-3xl border-2 border-dashed border-slate-100 h-full">
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="text-primary-300" size={28} />
                    </div>
                    <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-2">Configure Campaign</h4>
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed">Select an approved sequence from the list to map its variables and prepare for transmission.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                Variable Mapping
            </h3>

            <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-1">
                <div className="p-4 md:p-5 bg-slate-50 rounded-[24px] border border-slate-100/50 transition-all hover:bg-white hover:border-slate-200 hover:shadow-sm">
                    <span className="text-[10px] font-black text-slate-500 uppercase block mb-3 flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-slate-200 text-slate-600 flex items-center justify-center text-[9px]">{"{{1}}"}</span>
                        Entity Name
                    </span>
                    <input
                        value={variables['1'] || ''}
                        onChange={(e) => onChangeVariable('1', e.target.value)}
                        className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-[12px] md:text-[13px] font-bold focus:border-primary-500 outline-none transition-all shadow-sm placeholder:text-slate-300"
                        placeholder="Fallback identifier (e.g., Customer)..."
                    />
                </div>
                <div className="p-4 md:p-5 bg-slate-50 rounded-[24px] border border-slate-100/50 transition-all hover:bg-white hover:border-slate-200 hover:shadow-sm">
                    <span className="text-[10px] font-black text-slate-500 uppercase block mb-3 flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-slate-200 text-slate-600 flex items-center justify-center text-[9px]">{"{{2}}"}</span>
                        Unique Key / Custom Value
                    </span>
                    <input
                        value={variables['2'] || ''}
                        onChange={(e) => onChangeVariable('2', e.target.value)}
                        className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-[12px] md:text-[13px] font-bold focus:border-primary-500 outline-none transition-all shadow-sm placeholder:text-slate-300"
                        placeholder="Default value (e.g., PROMO50)..."
                    />
                </div>
            </div>

            <div className="mt-8 shrink-0">
                <div className="p-4 bg-primary-50/50 rounded-2xl border border-primary-100 flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                        <Info className="text-primary-600" size={16} />
                    </div>
                    <p className="text-[10px] text-primary-800 font-bold leading-relaxed uppercase tracking-tighter">
                        Variables map to Meta-approved template parameters. Ensure placeholder data is representative of actual values to maintain template health.
                    </p>
                </div>
            </div>
        </div>
    );
}
