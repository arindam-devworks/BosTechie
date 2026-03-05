import React from 'react';
import { Layout, CheckCircle2, ChevronRight } from 'lucide-react';

export const TEMPLATES = [
    {
        id: 'ecommerce',
        name: 'Flash Sale',
        description: 'Perfect for promotions',
        color: 'from-orange-400 to-red-500'
    },
    {
        id: 'newsletter',
        name: 'Weekly Digest',
        description: 'Articles and updates',
        color: 'from-blue-400 to-indigo-500'
    },
    {
        id: 'festival',
        name: 'Holiday Special',
        description: 'Seasonal celebratory',
        color: 'from-emerald-400 to-teal-500'
    },
    {
        id: 'minimal',
        name: 'Pure Minimal',
        description: 'Clean and focus',
        color: 'from-slate-700 to-slate-900'
    }
];

export default function TemplateGallery({ onLoadTemplate, activeTemplateId }) {
    return (
        <div className="h-48 bg-white border-t border-gray-100 flex flex-col z-20 shadow-[0_-1px_10px_rgba(0,0,0,0.02)]">
            <div className="px-8 py-3 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Base Layouts</span>
                    <span className="px-2 py-0.5 bg-primary-50 text-[9px] font-bold text-primary-600 rounded-full">v2.0</span>
                </div>
                <button className="text-[10px] font-bold text-primary-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                    View All Themes <ChevronRight size={12} />
                </button>
            </div>

            <div className="flex-1 flex items-center gap-6 px-8 overflow-x-auto custom-scrollbar">
                {TEMPLATES.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => onLoadTemplate(template.id)}
                        className={`group relative flex items-center gap-4 min-w-[280px] p-4 rounded-2xl border-2 transition-all hover:scale-[1.02] active:scale-[0.98] ${activeTemplateId === template.id ? 'border-primary-500 bg-primary-50/20' : 'border-gray-50 bg-gray-50/50 hover:bg-white hover:border-primary-100'}`}
                    >
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center text-white shadow-lg overflow-hidden relative`}>
                            <Layout size={24} className="opacity-20 absolute -right-2 -bottom-2 scale-150 rotate-12" />
                            <Layout size={24} />
                        </div>

                        <div className="flex-1 text-left">
                            <h4 className="text-sm font-bold text-gray-900 mb-0.5">{template.name}</h4>
                            <p className="text-[10px] text-gray-400 font-medium">{template.description}</p>
                        </div>

                        {activeTemplateId === template.id && (
                            <div className="absolute top-3 right-3 text-primary-600 scale-110 animate-in zoom-in duration-300">
                                <CheckCircle2 size={16} fill="currentColor" className="text-white" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
