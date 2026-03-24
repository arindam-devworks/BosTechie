import React, { useState } from 'react';
import { FileText, Globe, Users, ChevronRight, Search } from 'lucide-react';
import WhatsAppTemplateCard from './WhatsAppTemplateCard';

export default function WhatsAppTemplateList({ templates, selectedId, onSelect, activeSector, onSectorChange }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTemplates = templates.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.body.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full space-y-8">
            {/* Target Sector */}
            <section>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
                    <Globe size={12} />
                    Target Sector
                </label>
                <div className="relative group">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-500 transition-colors" size={16} />
                    <select
                        value={activeSector}
                        onChange={(e) => onSectorChange(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-transparent rounded-2xl pl-11 pr-6 py-3.5 text-[12px] font-black text-slate-900 dark:text-white appearance-none outline-none focus:bg-white dark:focus:bg-slate-950 focus:border-primary-500 transition-all cursor-pointer"
                    >
                        <option value="all">All WhatsApp Handsets</option>
                        <option value="leads">Mobile Leads</option>
                        <option value="clusters">Handheld Clusters</option>
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 rotate-90" size={14} />
                </div>
            </section>

            {/* Template Selection */}
            <section className="flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <FileText size={12} />
                        Approved Sequences
                    </label>
                </div>

                <div className="relative mb-4">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                        type="text"
                        placeholder="Search sequences..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-transparent rounded-xl pl-10 pr-4 py-2.5 text-[11px] font-bold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-950 focus:border-primary-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                </div>

                <div className="space-y-3 overflow-y-auto custom-scrollbar flex-1 pb-4 pr-1">
                    {filteredTemplates.length > 0 ? (
                        filteredTemplates.map(template => (
                            <WhatsAppTemplateCard
                                key={template.id}
                                template={template}
                                isSelected={selectedId === template.id}
                                onSelect={onSelect}
                            />
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-[11px] font-bold text-slate-400 uppercase">No sequences found</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
