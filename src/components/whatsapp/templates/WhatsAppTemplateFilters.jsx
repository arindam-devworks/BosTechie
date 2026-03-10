import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, Clock, XCircle } from 'lucide-react';

export default function WhatsAppTemplateFilters({
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    counts
}) {
    // Debounce internal state for smooth typing without triggering too many renders
    const [localSearch, setLocalSearch] = useState(searchTerm);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTerm(localSearch);
        }, 300); // 300ms debounce
        return () => clearTimeout(timer);
    }, [localSearch, setSearchTerm]);

    const TABS = [
        { id: 'approved', label: 'Approved', count: counts.approved || 0, icon: <CheckCircle2 size={14} className="text-emerald-500" /> },
        { id: 'pending', label: 'Pending', count: counts.pending || 0, icon: <Clock size={14} className="text-amber-500" /> },
        { id: 'rejected', label: 'Rejected', count: counts.rejected || 0, icon: <XCircle size={14} className="text-red-500" /> }
    ];

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-2 md:p-2.5 rounded-2xl border border-slate-100 shadow-sm relative z-10">

            {/* Status Tabs */}
            <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest whitespace-nowrap snap-start transition-all ${activeTab === tab.id
                                ? 'bg-slate-100 text-slate-900'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                            }`}
                    >
                        {tab.icon}
                        {tab.label}
                        <span className="bg-white border md:border-transparent px-1.5 py-0.5 rounded-md text-[9px] min-w-[20px] text-center">
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Debounced Search Input */}
            <div className="relative w-full md:w-64 shrink-0 px-2 md:px-0 pb-2 md:pb-0">
                <Search className="absolute left-5 md:left-4 top-1/2 -translate-y-1/2 md:-translate-y-1/2 -translate-y-[calc(50%+4px)] text-slate-400" size={16} />
                <input
                    type="text"
                    placeholder="Search templates..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[12px] font-bold text-slate-900 outline-none focus:border-primary-500 focus:bg-white transition-colors"
                />
            </div>
        </div>
    );
}
