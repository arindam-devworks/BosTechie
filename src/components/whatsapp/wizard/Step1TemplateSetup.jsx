import React from 'react';
import { Settings, Globe, LayoutTemplate } from 'lucide-react';

export default function Step1TemplateSetup({ data, updateData }) {
    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Template Initialization</h2>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-2">Establish Core Parameters for WhatsApp Campaign</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                        <Settings size={14} className="text-primary-500" /> Template Name
                    </label>
                    <input
                        type="text"
                        value={data.templateName}
                        onChange={(e) => updateData({ templateName: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_') })}
                        placeholder="e.g. seasonal_promo_01"
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl px-5 py-4 text-[13px] font-bold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm"
                    />
                    <p className="text-[10px] text-slate-400 ml-2 font-medium">Lowercase letters, numbers, and underscores only.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                            <LayoutTemplate size={14} className="text-primary-500" /> Category
                        </label>
                        <select
                            value={data.category}
                            onChange={(e) => updateData({ category: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl px-5 py-4 text-[13px] font-bold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 outline-none transition-all cursor-pointer shadow-sm"
                        >
                            <option>Marketing</option>
                            <option>Utility</option>
                            <option>Authentication</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                            <Globe size={14} className="text-primary-500" /> Language
                        </label>
                        <select
                            value={data.language}
                            onChange={(e) => updateData({ language: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl px-5 py-4 text-[13px] font-bold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 outline-none transition-all cursor-pointer shadow-sm"
                        >
                            <option>English (US)</option>
                            <option>English (UK)</option>
                            <option>Spanish</option>
                            <option>French</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                        <LayoutTemplate size={14} className="text-primary-500" /> Target Audience
                    </label>
                    <div className="relative group">
                        <select
                            value={data.targetAudience}
                            onChange={(e) => updateData({ targetAudience: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl px-5 py-4 text-[13px] font-bold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 outline-none transition-all cursor-pointer shadow-sm appearance-none"
                        >
                            <option value="" disabled>Select Audience Fleet...</option>
                            <option value="all_contacts">Universal Fleet (All Contacts)</option>
                            <option value="test_list">Alpha Testers</option>
                            <option value="priority_leads">Priority Leads Cluster</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <Settings size={14} className="rotate-90" />
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                        <Settings size={14} className="text-primary-500" /> Header Type
                    </label>
                    <p className="text-[10px] text-slate-400 ml-2 font-medium -mt-1">Select one or more header types.</p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {['None', 'Text', 'Image', 'Video', 'Document'].map((type) => {
                            const selectedTypes = Array.isArray(data.headerType) ? data.headerType : [data.headerType];
                            const isSelected = selectedTypes.includes(type);

                            const handleToggle = () => {
                                if (type === 'None') {
                                    // Selecting "None" clears everything else
                                    updateData({ headerType: ['None'] });
                                } else {
                                    let next = selectedTypes.filter(t => t !== 'None'); // Remove "None" if present
                                    if (isSelected) {
                                        next = next.filter(t => t !== type);
                                        if (next.length === 0) next = ['None']; // fallback to None
                                    } else {
                                        next = [...next, type];
                                    }
                                    updateData({ headerType: next });
                                }
                            };

                            return (
                                <button
                                    key={type}
                                    onClick={handleToggle}
                                    className={`px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${isSelected
                                        ? 'bg-primary-500 dark:bg-primary-600 text-white shadow-lg shadow-primary-500/20 scale-[1.02]'
                                        : 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    {type}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
