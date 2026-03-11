import React, { useState, useMemo, useEffect } from 'react';
import {
    Mail, Smartphone, Send, Save, Eye, Users,
    Paperclip, X, FileText, CheckCircle2, ChevronRight,
    MessageSquare, AlertCircle, Info, Sparkles, ShieldCheck,
    Globe, Phone as PhoneIcon, User, Layers, MoreHorizontal, Plus, Loader2
} from 'lucide-react';
import EmailDesigner from '../components/EmailDesigner';
import WhatsAppCampaignWizard from '../components/whatsapp/wizard/WhatsAppCampaignWizard';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import useUnsavedChanges from '../services/useUnsavedChanges';

const INITIAL_EMAIL_DATA = {
    senderName: 'BosTechie Orbit Ops',
    from: 'ops@orbit.bostechie.io',
    replyTo: 'support@orbit.bostechie.io',
    subject: '',
    previewText: 'Incoming Transmission from Sector 7G',
    contacts: [],
    attachments: [],
    blocks: []
};

const INITIAL_WHATSAPP_DATA = {
    templateId: '',
    contacts: [],
    variables: { '1': '', '2': '' }
};

export default function CampaignBuilder() {
    const [activeTab, setActiveTab] = useState('email'); // 'email', 'whatsapp'
    const [isSending, setIsSending] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);

    const { success } = useToast();

    // Email Campaign State
    const [emailData, setEmailData] = useState(INITIAL_EMAIL_DATA);
    const [activeBlockId, setActiveBlockId] = useState(null);

    // WhatsApp Campaign State
    const [whatsAppData, setWhatsAppData] = useState(INITIAL_WHATSAPP_DATA);

    // Dirtiness Logic
    const isDirty = useMemo(() => {
        if (activeTab === 'email') {
            return JSON.stringify(emailData) !== JSON.stringify(INITIAL_EMAIL_DATA);
        }
        return JSON.stringify(whatsAppData) !== JSON.stringify(INITIAL_WHATSAPP_DATA);
    }, [emailData, whatsAppData, activeTab]);

    useUnsavedChanges(isDirty);

    const handleSendCampaign = async () => {
        setIsSending(true);
        // Simulate Launch Sequence
        await new Promise(r => setTimeout(r, 2000));
        success(`${activeTab === 'email' ? 'Orbital' : 'Direct'} Transmission Initialized!`);
        setIsSending(false);
        setLastSaved(new Date());
    };

    const handleSave = () => {
        success('Sequence synchronized with orbital cache');
        setLastSaved(new Date());
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
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Campaign Forge</h1>
                                {lastSaved && (
                                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-full animate-in fade-in slide-in-from-left duration-500">
                                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Saved • {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                )}
                            </div>
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
                    <Button 
                        variant="ghost" 
                        icon={Save} 
                        onClick={handleSave}
                        disabled={!isDirty}
                    >
                        Save Sequence
                    </Button>
                    <Button
                        variant="primary"
                        icon={Send}
                        onClick={handleSendCampaign}
                        isLoading={isSending}
                    >
                        Ignition
                    </Button>
                </div>
            </div>

            {/* Transmission Alert: Replaced by Global Toast */}

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
