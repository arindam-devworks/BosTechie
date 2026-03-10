import React, { useState } from 'react';
import {
    Mail, Smartphone, Send, Save, Eye, Users,
    Paperclip, X, FileText, CheckCircle2, ChevronRight,
    MessageSquare, AlertCircle, Info, Sparkles, ShieldCheck,
    Globe, Phone as PhoneIcon, User, Layers, MoreHorizontal, Plus
} from 'lucide-react';
import EmailDesigner from '../components/EmailDesigner';
import WhatsAppCampaignWizard from '../components/whatsapp/wizard/WhatsAppCampaignWizard';

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
        from: 'ops@orbit.bostechie.io',
        replyTo: 'support@orbit.bostechie.io',
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
        <div className="h-[calc(100vh-2rem)] flex flex-col -m-6 bg-[#fcfcfd] dark:bg-[#0b0f19] overflow-hidden font-outfit">
            {/* Header: Orbital Command Center */}
            <div className="h-auto min-h-20 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800/50 flex flex-col lg:flex-row items-start lg:items-center justify-between px-6 lg:px-10 gap-6 shrink-0 z-40">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-10 w-full lg:w-auto">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-orbit rounded-2xl flex items-center justify-center shadow-xl shadow-primary-500/20 rotate-3">
                            <Send className="text-white -rotate-12" size={20} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Campaign Forge</h1>
                            <div className="flex items-center gap-1.5 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol: Multi-Channel Sync</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full md:w-auto bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-700/50 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('email')}
                            className={`flex flex-1 md:flex-none justify-center items-center gap-2.5 px-4 md:px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${activeTab === 'email' ? 'bg-white dark:bg-slate-700 shadow-lg text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                        >
                            <Mail size={14} /> Orbital Email
                        </button>
                        <button
                            onClick={() => setActiveTab('whatsapp')}
                            className={`flex flex-1 md:flex-none justify-center items-center gap-2.5 px-4 md:px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${activeTab === 'whatsapp' ? 'bg-white dark:bg-slate-700 shadow-lg text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                        >
                            <Smartphone size={14} /> Direct WhatsApp
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                    <button className="flex items-center gap-2 px-5 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all">
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
                    <div className="bg-slate-900 dark:bg-slate-800 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-xl">
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
                        <div className="bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 p-6 lg:p-8 shrink-0 flex flex-col gap-6 z-30 shadow-sm overflow-x-auto custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 lg:gap-8">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                                        <User size={12} className="text-primary-500" />
                                        Sender Identity
                                    </label>
                                    <input
                                        type="text"
                                        value={emailData.senderName}
                                        onChange={(e) => setEmailData({ ...emailData, senderName: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-transparent rounded-2xl px-5 py-3.5 text-[13px] font-bold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 outline-none transition-all"
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
                                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-transparent rounded-2xl px-5 py-3.5 text-[13px] font-bold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 outline-none transition-all"
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
                                        className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-3.5 text-[13px] font-black text-slate-900 dark:text-white focus:border-primary-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder-slate-500"
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
                                        <select className="w-full bg-slate-50 dark:bg-slate-900/50 border border-transparent dark:border-slate-800 rounded-2xl pl-12 pr-6 py-3.5 text-[11px] font-black text-slate-900 dark:text-white appearance-none outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 transition-all cursor-pointer">
                                            <option value="all">Universal Fleet</option>
                                            <option value="leads">Priority Leads</option>
                                            <option value="customers">Core Entities</option>
                                        </select>
                                        <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 rotate-90" size={14} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                                <div className="flex flex-wrap items-center gap-3">
                                    <label className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer transition-all">
                                        <Paperclip size={14} className="text-slate-500" />
                                        <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">Attach Files</span>
                                        <input type="file" multiple className="hidden" onChange={(e) => {
                                            if (e.target.files?.length) {
                                                const newFiles = Array.from(e.target.files).map(f => f.name);
                                                setEmailData(prev => ({ ...prev, attachments: [...(prev.attachments || []), ...newFiles] }));
                                            }
                                        }} />
                                    </label>
                                    {(emailData.attachments || []).length > 0 && (
                                        <div className="flex items-center gap-2 gap-y-1 flex-wrap">
                                            {emailData.attachments.map((att, idx) => (
                                                <span key={idx} className="flex items-center gap-1.5 px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-lg text-[10px] font-bold">
                                                    {att}
                                                    <button onClick={() => setEmailData(prev => ({ ...prev, attachments: prev.attachments.filter((_, i) => i !== idx) }))}>
                                                        <X size={12} className="hover:text-red-500" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-800/40 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-400 rounded-xl cursor-pointer transition-all">
                                        <FileText size={14} className="shrink-0" />
                                        <span className="text-[11px] font-black uppercase tracking-widest">Import Custom Template</span>
                                        <input type="file" accept=".html,.htm" className="hidden" onChange={(e) => {
                                            if (e.target.files?.[0]) {
                                                setSuccessMessage('Custom Template Imported Successfully!');
                                                setTimeout(() => setSuccessMessage(''), 3000);
                                            }
                                        }} />
                                    </label>
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
                    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden animate-in fade-in slide-in-from-right duration-700 bg-slate-50/50 dark:bg-[#0b0f19]">
                        <WhatsAppCampaignWizard onSend={handleSendCampaign} />
                    </div>
                )}
            </div>
        </div>
    );
}
