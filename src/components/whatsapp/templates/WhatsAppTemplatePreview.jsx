import React from 'react';
import { Eye } from 'lucide-react';
import WhatsAppPhonePreview from '../WhatsAppPhonePreview';

export default function WhatsAppTemplatePreview({ selectedTemplate }) {
    if (!selectedTemplate) {
        return (
            <div className="sticky top-8 bg-slate-50 rounded-[40px] p-6 border-2 border-slate-100 shadow-inner h-[700px] flex flex-col items-center justify-center text-slate-400">
                <Eye size={48} className="mb-4 opacity-50 text-slate-300" />
                <span className="text-[12px] font-black uppercase tracking-widest text-slate-500 text-center px-6">
                    Select a template from the list to preview how it will appear in WhatsApp
                </span>
            </div>
        );
    }

    return (
        <div className="sticky top-8 bg-slate-50 rounded-[40px] p-6 border-2 border-slate-100 shadow-inner h-[700px] flex flex-col items-center animate-in fade-in duration-500">
            <div className="w-full flex items-center gap-3 mb-6 bg-white py-3 px-5 rounded-2xl border border-slate-200">
                <Eye size={18} className="text-primary-500" />
                <div>
                    <h4 className="text-[11px] font-black uppercase text-slate-800 tracking-widest">Live Rendering</h4>
                    <p className="text-[9px] font-bold uppercase text-slate-400 tracking-widest truncate">{selectedTemplate.name}</p>
                </div>
            </div>

            <div className="flex-1 w-full max-h-[600px] overflow-hidden">
                <WhatsAppPhonePreview
                    data={selectedTemplate}
                    forceRender={true}
                />
            </div>
        </div>
    );
}
