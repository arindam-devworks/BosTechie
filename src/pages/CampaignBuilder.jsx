import React, { useState } from 'react';
import {
    Mail, Smartphone, Send, Save, Eye, Users,
    Paperclip, X, FileText, CheckCircle2, ChevronRight,
    MessageSquare, AlertCircle, Info, Sparkles, ShieldCheck,
    Globe, Phone as PhoneIcon, User, Layers, MoreHorizontal, Plus
} from 'lucide-react';
import EmailDesigner from '../components/EmailDesigner';

const WHATSAPP_TEMPLATES = [
    { id: 'welcome', name: 'Welcome Message', body: 'Hello {{1}}, welcome to BosTechie! We are excited to have you on board.' },
    { id: 'promo', name: 'Seasonal Promo', body: 'Hey {{1}}, don\'t miss out on our special 50% discount this weekend! Use code: {{2}}' },
    { id: 'update', name: 'Service Update', body: 'Important update for {{1}}: Our systems will be undergoing maintenance on {{2}}.' }
];

export default function CampaignBuilder() {
    const [activeTab, setActiveTab] = useState('email'); // 'email', 'whatsapp'
    const [successMessage, setSuccessMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    // Email Campaign State
    const [emailData, setEmailData] = useState({
        senderName: 'BosTechie Orbit Ops',
        from: 'ops@orbit.bostechei.io',
        replyTo: 'support@orbit.bostechei.io',
        subject: '',
        previewText: 'Incoming Transmission from Sector 7G',
        contacts: [],
        attachments: [],
        blocks: []
    });
    const [activeBlockId, setActiveBlockId] = useState(null);

    // WhatsApp Campaign State
    const [whatsAppData, setWhatsAppData] = useState({
        templateId: '',
        contacts: [],
        variables: {
            '1': '', // Customer Name
            '2': '', // Extra Variable
        }
    });

    const handleSendCampaign = async () => {
        setIsSending(true);
        // Simulate Launch Sequence
        await new Promise(r => setTimeout(r, 2000));
        setSuccessMessage(`${activeTab === 'email' ? 'Orbital' : 'Direct'} Transmission Initialized!`);
        setIsSending(false);
        setTimeout(() => setSuccessMessage(''), 5000);
    };

    return (
        <div className="h-[calc(100vh-2rem)] flex flex-col -m-6 bg-[#fcfcfd] overflow-hidden font-outfit">
            {/* Header: Orbital Command Center */}
            <div className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-10 shrink-0 z-40">
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-orbit rounded-2xl flex items-center justify-center shadow-xl shadow-primary-500/20 rotate-3">
                            <Send className="text-white -rotate-12" size={20} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">Campaign Forge</h1>
                            <div className="flex items-center gap-1.5 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol: Multi-Channel Sync</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex bg-slate-100/50 p-1.5 rounded-2xl border border-slate-100">
                        <button
                            onClick={() => setActiveTab('email')}
                            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'email' ? 'bg-white shadow-lg text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Mail size={14} /> Orbital Email
                        </button>
                        <button
                            onClick={() => setActiveTab('whatsapp')}
                            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'whatsapp' ? 'bg-white shadow-lg text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Smartphone size={14} /> Direct WhatsApp
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-5 py-3 text-slate-500 hover:text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] transition-all">
                        <Save size={14} /> Save Sequence
                    </button>
                    <button
                        onClick={handleSendCampaign}
                        disabled={isSending}
                        className="flex items-center gap-3 px-8 py-3 bg-orbit text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-primary-500/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                    >
                        {isSending ? (
                            <>
                                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Launching...
                            </>
                        ) : (
                            <>
                                <Send size={14} /> Ignition
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Transmission Alert */}
            {successMessage && (
                <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-slate-900 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-xl">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                            <CheckCircle2 size={16} className="text-white" />
                        </div>
                        <span className="text-[12px] font-black uppercase tracking-widest">{successMessage}</span>
                        <button onClick={() => setSuccessMessage('')} className="ml-4 p-1 hover:bg-white/10 rounded-lg transition-colors">
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}

            <div className="flex-1 flex overflow-hidden">
                {activeTab === 'email' ? (
                    <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in slide-in-from-left duration-700">
                        {/* Sender Protocol Panel */}
                        <div className="bg-white border-b border-slate-100 p-8 shrink-0 grid grid-cols-1 xl:grid-cols-5 gap-8 z-30 shadow-sm overflow-x-auto custom-scrollbar">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                    <User size={12} className="text-primary-500" />
                                    Sender Identity
                                </label>
                                <input
                                    type="text"
                                    value={emailData.senderName}
                                    onChange={(e) => setEmailData({ ...emailData, senderName: e.target.value })}
                                    className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-3.5 text-[13px] font-bold text-slate-900 focus:bg-white focus:border-primary-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                    <ShieldCheck size={12} className="text-primary-500" />
                                    Terminal ID (Email)
                                </label>
                                <input
                                    type="email"
                                    value={emailData.from}
                                    onChange={(e) => setEmailData({ ...emailData, from: e.target.value })}
                                    className="w-full bg-slate-50 border border-transparent rounded-2xl px-5 py-3.5 text-[13px] font-bold text-slate-900 focus:bg-white focus:border-primary-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2 xl:col-span-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                    <Sparkles size={12} className="text-primary-500" />
                                    Transmission Subject
                                </label>
                                <input
                                    type="text"
                                    value={emailData.subject}
                                    onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                                    className="w-full bg-white border-2 border-slate-100 rounded-2xl px-5 py-3.5 text-[13px] font-black text-slate-900 focus:border-primary-500 outline-none transition-all placeholder:text-slate-400"
                                    placeholder="The future of SaaS is here..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                    <Layers size={12} className="text-primary-500" />
                                    Fleet Segments
                                </label>
                                <div className="relative">
                                    <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                                    <select className="w-full bg-slate-50 border border-transparent rounded-2xl pl-12 pr-6 py-3.5 text-[11px] font-black text-slate-900 appearance-none outline-none focus:bg-white focus:border-primary-500 transition-all cursor-pointer">
                                        <option value="all">Universal Fleet</option>
                                        <option value="leads">Priority Leads</option>
                                        <option value="customers">Core Entities</option>
                                    </select>
                                    <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 rotate-90" size={14} />
                                </div>
                            </div>
                        </div>

                        {/* Orbital Designer Interface */}
                        <EmailDesigner
                            blocks={emailData.blocks}
                            setBlocks={(blocks) => setEmailData({ ...emailData, blocks })}
                            activeBlockId={activeBlockId}
                            setActiveBlockId={setActiveBlockId}
                        />
                    </div>
                ) : (
                    <div className="flex-1 flex overflow-hidden animate-in fade-in slide-in-from-right duration-700 bg-slate-50/50">
                        {/* WhatsApp Core Configuration */}
                        <div className="w-[480px] bg-white border-r border-slate-100 p-10 flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
                            <div className="mb-10">
                                <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                    WhatsApp Sync Ops
                                </h3>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 ml-5">Establish direct terminal links</p>
                            </div>

                            <div className="space-y-10">
                                <section>
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4 flex items-center gap-2">
                                        <FileText size={12} />
                                        Approved Sequences
                                    </label>
                                    <div className="space-y-3">
                                        {WHATSAPP_TEMPLATES.map(template => (
                                            <button
                                                key={template.id}
                                                onClick={() => setWhatsAppData({ ...whatsAppData, templateId: template.id })}
                                                className={`w-full p-5 border-2 rounded-[24px] text-left transition-all relative group ${whatsAppData.templateId === template.id ? 'border-primary-500 bg-primary-50/20 shadow-lg shadow-primary-500/5' : 'border-slate-50 bg-slate-50/50 hover:bg-white hover:border-slate-100'}`}
                                            >
                                                <div className="font-black text-[13px] text-slate-900 uppercase tracking-tighter mb-1">{template.name}</div>
                                                <div className="text-[11px] font-medium text-slate-500 line-clamp-1">{template.body}</div>
                                                {whatsAppData.templateId === template.id && (
                                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 bg-primary-600 text-white p-1 rounded-lg">
                                                        <CheckCircle2 size={14} />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4 flex items-center gap-2">
                                        <Globe size={12} />
                                        Target Sector
                                    </label>
                                    <div className="relative group">
                                        <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-500 transition-colors" size={16} />
                                        <select className="w-full bg-slate-50 border border-transparent rounded-2xl pl-12 pr-6 py-4 text-[12px] font-black text-slate-900 appearance-none outline-none focus:bg-white focus:border-primary-500 transition-all cursor-pointer">
                                            <option>All WhatsApp Handsets</option>
                                            <option>Mobile Leads</option>
                                            <option>Handheld Clusters</option>
                                        </select>
                                        <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 rotate-90" size={14} />
                                    </div>
                                </section>

                                {whatsAppData.templateId && (
                                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4 flex items-center gap-2">
                                            <Sparkles size={12} />
                                            Dynamic Parameters
                                        </label>
                                        <div className="space-y-4">
                                            <div className="p-5 bg-slate-50 rounded-[24px] border border-slate-100/50">
                                                <span className="text-[10px] font-black text-slate-500 uppercase block mb-3">Parameter: {'{{1}}'} (Entity Name)</span>
                                                <input
                                                    value={whatsAppData.variables['1']}
                                                    onChange={(e) => setWhatsAppData({
                                                        ...whatsAppData,
                                                        variables: { ...whatsAppData.variables, '1': e.target.value }
                                                    })}
                                                    className="w-full p-4 bg-white border border-slate-100 rounded-xl text-[13px] font-bold focus:border-primary-500 outline-none transition-all shadow-sm"
                                                    placeholder="Fallback identifier..."
                                                />
                                            </div>
                                            <div className="p-5 bg-slate-50 rounded-[24px] border border-slate-100/50">
                                                <span className="text-[10px] font-black text-slate-500 uppercase block mb-3">Parameter: {'{{2}}'} (Unique Key)</span>
                                                <input
                                                    value={whatsAppData.variables['2']}
                                                    onChange={(e) => setWhatsAppData({
                                                        ...whatsAppData,
                                                        variables: { ...whatsAppData.variables, '2': e.target.value }
                                                    })}
                                                    className="w-full p-4 bg-white border border-slate-100 rounded-xl text-[13px] font-bold focus:border-primary-500 outline-none transition-all shadow-sm"
                                                    placeholder="Default value..."
                                                />
                                            </div>
                                        </div>
                                    </section>
                                )}
                            </div>

                            <div className="mt-auto pt-10">
                                <div className="p-4 bg-primary-50/50 rounded-2xl border border-primary-100 flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                                        <Info className="text-primary-600" size={16} />
                                    </div>
                                    <p className="text-[10px] text-primary-800 font-bold leading-relaxed uppercase tracking-tighter">
                                        WhatsApp synchronization uses Meta-authorized templates. All transmissions are encrypted through the Orbit gateway.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp Orbital Preview (iPhone Pro) */}
                        <div className="flex-1 flex items-center justify-center p-12 overflow-hidden perspective-1000">
                            <div className="w-[360px] h-[740px] bg-[#1a1a1a] rounded-[64px] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative border-[6px] border-[#333] transform hover:rotate-y-2 transition-transform duration-700">
                                {/* iPhone Hardware Details */}
                                <div className="absolute left-[-6px] top-32 w-1.5 h-14 bg-[#444] rounded-l-lg border-y border-l border-white/5"></div>
                                <div className="absolute right-[-6px] top-40 w-1.5 h-24 bg-[#444] rounded-r-lg border-y border-r border-white/5"></div>

                                <div className="w-full h-full bg-[#f0f2f5] rounded-[52px] overflow-hidden flex flex-col relative shadow-inner">
                                    {/* Dynamic Island */}
                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-end px-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></div>
                                    </div>

                                    {/* App Header */}
                                    <div className="h-28 bg-[#008069] pt-12 px-6 flex items-center justify-between shrink-0 shadow-lg relative z-20">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shadow-inner">
                                                <div className="w-7 h-7 rounded-full bg-orbit"></div>
                                            </div>
                                            <div>
                                                <div className="text-white text-sm font-black tracking-tight uppercase">Bostechei Orbit</div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.5)]"></span>
                                                    <span className="text-emerald-100 text-[10px] font-bold uppercase tracking-widest">Active Link</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 text-white/80">
                                            <PhoneIcon size={18} />
                                            <MoreHorizontal size={18} />
                                        </div>
                                    </div>

                                    {/* Message Stream */}
                                    <div className="flex-1 p-6 flex flex-col justify-end bg-repeat relative" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '400px' }}>
                                        <div className="absolute inset-0 bg-[#efeae2]/90"></div>

                                        {whatsAppData.templateId ? (
                                            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-xl max-w-[90%] relative animate-in zoom-in-95 slide-in-from-bottom-2 duration-500 z-10 border border-slate-100">
                                                <div className="text-[13px] text-slate-800 font-medium leading-relaxed">
                                                    {WHATSAPP_TEMPLATES.find(t => t.id === whatsAppData.templateId).body
                                                        .replace('{{1}}', whatsAppData.variables['1'] || '{{1}}')
                                                        .replace('{{2}}', whatsAppData.variables['2'] || '{{2}}')}
                                                </div>
                                                <div className="flex items-center justify-end gap-1 mt-2">
                                                    <span className="text-[9px] font-bold text-slate-400">12:34</span>
                                                    <CheckCircle2 size={10} className="text-blue-500" />
                                                </div>
                                                {/* Whatsapp bubble tail */}
                                                <div className="absolute left-[-10px] top-0 w-0 h-0 border-t-[15px] border-t-white border-l-[15px] border-l-transparent"></div>
                                            </div>
                                        ) : (
                                            <div className="m-auto text-center px-10 relative z-10">
                                                <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-6 transform -rotate-6">
                                                    <MessageSquare className="text-slate-200" size={40} />
                                                </div>
                                                <p className="text-xs text-slate-400 font-black uppercase tracking-widest leading-relaxed">Wait-list: Select Sequence to Preview</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Messenger Controls */}
                                    <div className="h-24 bg-[#f0f2f5] px-6 flex items-center gap-4 shrink-0 border-t border-slate-200/50">
                                        <Plus className="text-slate-400" size={24} />
                                        <div className="flex-1 h-12 bg-white rounded-2xl flex items-center px-5 text-slate-300 text-xs font-bold border border-slate-200">
                                            Terminal input...
                                        </div>
                                        <div className="w-12 h-12 bg-[#00a884] rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                            <Send className="text-white ml-0.5" size={20} />
                                        </div>
                                    </div>

                                    {/* iPhone Home Bar */}
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/10 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
