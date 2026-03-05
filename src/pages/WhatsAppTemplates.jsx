import { useState } from 'react';
import {
    MessageSquare, Search, Filter, Plus,
    MoreHorizontal, Edit, Trash2, Eye,
    ChevronRight, CheckCircle2, Clock, Globe
} from 'lucide-react';

const MOCK_WHATSAPP_TEMPLATES = [
    {
        id: 'TPL-WA-001',
        name: 'Welcome Protocol',
        category: 'Marketing',
        status: 'approved',
        language: 'English (US)',
        lastUpdated: '2026-03-01'
    },
    {
        id: 'TPL-WA-002',
        name: 'Flash Sale Alert',
        category: 'Marketing',
        status: 'pending',
        language: 'English (UK)',
        lastUpdated: '2026-03-04'
    },
    {
        id: 'TPL-WA-003',
        name: 'OTP Verification',
        category: 'Utility',
        status: 'approved',
        language: 'Multilingual',
        lastUpdated: '2026-02-20'
    },
    {
        id: 'TPL-WA-004',
        name: 'Service Outage',
        category: 'Alert',
        status: 'rejected',
        language: 'Global',
        lastUpdated: '2026-02-28'
    }
];

export default function WhatsAppTemplates() {
    const [templates] = useState(MOCK_WHATSAPP_TEMPLATES);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTemplates = templates.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2 text-[28px]">Messaging Protocols</h1>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">WhatsApp Meta-Data / {templates.length} Active Blueprints</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[11px] font-black text-slate-600 uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                        <Globe size={14} />
                        Language Packs
                    </button>
                    <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-orbit text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        <Plus size={14} />
                        Forge New Template
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Templates List */}
                <div className="xl:col-span-2 space-y-4">
                    <div className="glass-card rounded-[32px] p-4 flex items-center gap-4 mb-6">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search Protocols..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-200/50 rounded-2xl text-[13px] font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary-500/10 transition-all"
                            />
                        </div>
                        <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-slate-900 transition-all">
                            <Filter size={18} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredTemplates.map((template) => (
                            <div key={template.id} className="glass-card rounded-[32px] p-6 group hover:border-primary-200/50 transition-all border border-transparent flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                                        <MessageSquare size={20} />
                                    </div>
                                    <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest items-center flex gap-1 ${template.status === 'approved' ? 'bg-emerald-50 text-emerald-600' :
                                            template.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                                        }`}>
                                        {template.status === 'approved' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                                        {template.status}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-1 truncate">{template.name}</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {template.id} • {template.category}</p>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{template.language}</span>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
                                            <Edit size={16} />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                        <button className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-primary-600 transition-all">
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* iPhone Preview (Fixed Column) */}
                <div className="xl:col-span-1">
                    <div className="sticky top-8">
                        <div className="relative w-[300px] h-[600px] bg-[#1a1a1a] rounded-[50px] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border-[6px] border-[#333] mx-auto overflow-hidden">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-20"></div>

                            {/* Screen */}
                            <div className="w-full h-full bg-[#efeae2] rounded-[40px] overflow-hidden flex flex-col relative">
                                {/* Header */}
                                <div className="p-4 bg-[#075e54] text-white flex items-center gap-3 pt-8">
                                    <div className="w-8 h-8 rounded-full bg-white/20"></div>
                                    <div>
                                        <p className="text-sm font-bold leading-none">Bostechei Orbit</p>
                                        <p className="text-[10px] opacity-70">Official Business Account</p>
                                    </div>
                                </div>

                                {/* Messages Area */}
                                <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                                    <div className="max-w-[85%] bg-white rounded-2xl rounded-tl-none p-3 shadow-sm relative">
                                        <p className="text-[12px] text-slate-700 leading-relaxed font-outfit">
                                            Hey there! 👋 <br />
                                            Welcome to the **Bostechei Orbit** transmission sector. Your sync is now active.
                                        </p>
                                        <p className="text-[9px] text-slate-400 text-right mt-1">12:00 PM</p>
                                        <div className="absolute top-0 left-[-6px] border-[6px] border-transparent border-t-white"></div>
                                    </div>

                                    <div className="max-w-[85%] bg-white rounded-2xl rounded-tl-none p-3 shadow-sm relative">
                                        <div className="w-full h-24 bg-slate-100 rounded-xl mb-2 flex items-center justify-center">
                                            <Globe className="text-slate-300" size={32} />
                                        </div>
                                        <p className="text-[12px] text-slate-700 leading-relaxed font-outfit">
                                            Protocol established. Preparing for global deployment sequences.
                                        </p>
                                        <p className="text-[9px] text-slate-400 text-right mt-1">12:01 PM</p>
                                        <div className="absolute top-0 left-[-6px] border-[6px] border-transparent border-t-white"></div>
                                    </div>
                                </div>

                                {/* Input Area */}
                                <div className="p-2 bg-[#f0f2f5] flex items-center gap-2">
                                    <div className="flex-1 bg-white rounded-full py-2 px-4 text-xs text-slate-400">
                                        Protocol Locked
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-[#128c7e] flex items-center justify-center text-white">
                                        <Plus size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center mt-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Holographic Preview v1.2</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
