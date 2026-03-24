import React from 'react';
import { Layout, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

export const TEMPLATES = [
    {
        id: 'ecommerce',
        name: 'Flash Sale',
        description: 'Perfect for promotions',
        color: 'from-orange-500 to-red-600',
        glow: 'group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]'
    },
    {
        id: 'newsletter',
        name: 'Weekly Digest',
        description: 'Articles and updates',
        color: 'from-blue-500 to-indigo-600',
        glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]'
    },
    {
        id: 'festival',
        name: 'Holiday Special',
        description: 'Seasonal celebratory',
        color: 'from-emerald-500 to-teal-600',
        glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]'
    },
    {
        id: 'minimal',
        name: 'Pure Minimal',
        description: 'Clean and focus',
        color: 'from-slate-600 to-slate-800',
        glow: 'group-hover:shadow-[0_0_20px_rgba(148,163,184,0.2)]'
    }
];

export default function TemplateGallery({ onLoadTemplate, activeTemplateId }) {
    return (
        <div className="h-48 bg-white/90 dark:bg-[#0b0f19]/90 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] relative">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"></div>
            
            <div className="px-8 py-3.5 border-b border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/30">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                    <span className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-[0.2em]">Base Layouts</span>
                    <span className="px-2 py-0.5 bg-primary-500/10 border border-primary-500/20 text-[9px] font-black text-primary-400 tracking-widest rounded-full uppercase">v2.0 Default Themes</span>
                </div>
                <button className="text-[10px] font-black text-primary-500 uppercase tracking-widest flex items-center gap-1 hover:gap-2 hover:text-primary-400 transition-all">
                    Explore Directory <ChevronRight size={12} />
                </button>
            </div>

            <div className="flex-1 flex items-center gap-6 px-8 overflow-x-auto custom-scrollbar py-4">
                {TEMPLATES.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => onLoadTemplate(template.id)}
                        className={`group relative flex items-center gap-4 min-w-[280px] p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                            activeTemplateId === template.id 
                            ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                    >
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center text-white shadow-lg overflow-hidden relative transition-all duration-500 ${template.glow}`}>
                            <Layout size={24} className="opacity-20 absolute -right-2 -bottom-2 scale-150 rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-125" />
                            <Layout size={24} className="relative z-10" />
                        </div>

                        <div className="flex-1 text-left">
                            <h4 className="text-[13px] font-black text-slate-900 dark:text-white mb-0.5 tracking-tight group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">{template.name}</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{template.description}</p>
                        </div>

                        {activeTemplateId === template.id && (
                            <div className="absolute top-3 right-3 text-primary-500 scale-110 animate-in zoom-in duration-300">
                                <CheckCircle2 size={16} fill="currentColor" className="text-primary-100" />
                            </div>
                        )}
                        {activeTemplateId !== template.id && (
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-600">
                                <Zap size={14} />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
