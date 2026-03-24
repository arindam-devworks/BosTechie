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
import { useCampaigns } from '../hooks/useCampaigns';

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

    const [isAutosaving, setIsAutosaving] = useState(false);

    // Dirtiness Logic
    const isDirty = useMemo(() => {
        if (activeTab === 'email') {
            return JSON.stringify(emailData) !== JSON.stringify(INITIAL_EMAIL_DATA);
        }
        return JSON.stringify(whatsAppData) !== JSON.stringify(INITIAL_WHATSAPP_DATA);
    }, [emailData, whatsAppData, activeTab]);

    useUnsavedChanges(isDirty);

    // Autosave UI Feedback Effect
    useEffect(() => {
        if (!isDirty) return;
        setIsAutosaving(true);
        const timer = setTimeout(() => {
            setIsAutosaving(false);
            setLastSaved(new Date());
        }, 1500);
        return () => clearTimeout(timer);
    }, [emailData, whatsAppData, isDirty]);

    const { createCampaign } = useCampaigns();

    const handleSendCampaign = async () => {
        setIsSending(true);
        try {
            await createCampaign(activeTab === 'email' ? emailData : whatsAppData);
            success(`${activeTab === 'email' ? 'Orbital' : 'Direct'} Transmission Initialized!`);
            setLastSaved(new Date());
        } catch (err) {
            // Handle error globally
        } finally {
            setIsSending(false);
        }
    };

    const handleSave = () => {
        success('Sequence synchronized with orbital cache');
        setLastSaved(new Date());
    };

    return (
        <div className="h-full flex flex-col bg-white dark:bg-slate-800 overflow-hidden font-outfit">
            {/* Header: Orbital Command Center (Compact) */}
            <div className="h-12 bg-white/95 dark:bg-slate-700/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-600/60 flex items-center justify-between px-4 lg:px-6 shrink-0 z-40">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-orbit rounded-lg flex items-center justify-center shadow-md shadow-primary-500/20">
                        <Send className="text-white" size={13} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Campaign Forge</h1>
                            {isAutosaving ? (
                                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-700/50 rounded-full">
                                    <Loader2 size={9} className="text-amber-500 animate-spin" />
                                    <span className="text-[8px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">Saving...</span>
                                </div>
                            ) : lastSaved ? (
                                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-700/50 rounded-full">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                                    <span className="text-[8px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Saved • {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            ) : null}
                        </div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Multi-Channel Sync</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-auto bg-slate-100/50 dark:bg-slate-700/50 p-1 rounded-xl border border-slate-100 dark:border-slate-600/50">
                    <button onClick={() => setActiveTab('email')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'email' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
                        <Mail size={11} /> Orbital Email
                    </button>
                    <button onClick={() => setActiveTab('whatsapp')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'whatsapp' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
                        <Smartphone size={11} /> Direct WhatsApp
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" icon={Save} onClick={handleSave} disabled={!isDirty} className="!py-1 !px-3 !text-[9px]">
                        Save
                    </Button>
                    <Button variant="primary" icon={Send} onClick={handleSendCampaign} isLoading={isSending} className="!py-1 !px-3 !text-[9px]">
                        Ignition
                    </Button>
                </div>
            </div>

            {/* Transmission Alert: Replaced by Global Toast */}

            <div className="flex-1 min-h-0 flex overflow-hidden">
                {activeTab === 'email' ? (
                    <div className="flex-1 min-h-0 flex flex-col overflow-hidden animate-in fade-in slide-in-from-left duration-500">
                        {/* Sender Protocol Panel — Compact */}
                        <div className="bg-white dark:bg-slate-700 border-b border-slate-100 dark:border-slate-600 px-4 py-2 shrink-0 z-30 shadow-sm">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                <div className="space-y-0.5">
                                    <label className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        <User size={10} className="text-primary-500" /> Sender Identity
                                    </label>
                                    <input type="text" value={emailData.senderName}
                                        onChange={(e) => setEmailData({ ...emailData, senderName: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-transparent rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 outline-none transition-all" />
                                </div>
                                <div className="space-y-0.5">
                                    <label className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        <ShieldCheck size={10} className="text-primary-500" /> Terminal ID
                                    </label>
                                    <input type="email" value={emailData.from}
                                        onChange={(e) => setEmailData({ ...emailData, from: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-transparent rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 outline-none transition-all" />
                                </div>
                                <div className="space-y-0.5 col-span-2 md:col-span-1">
                                    <label className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        <Sparkles size={10} className="text-primary-500" /> Subject
                                    </label>
                                    <input type="text" value={emailData.subject}
                                        onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-2.5 py-1.5 text-[11px] font-black text-slate-900 dark:text-white focus:border-primary-500 outline-none transition-all placeholder:text-slate-400"
                                        placeholder="The future of SaaS is here..." />
                                </div>
                                <div className="space-y-0.5">
                                    <label className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        <Layers size={10} className="text-primary-500" /> Segment
                                    </label>
                                    <div className="relative">
                                        <Users className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                                        <select className="w-full bg-slate-50 dark:bg-slate-800/50 border border-transparent dark:border-slate-600 rounded-lg pl-7 pr-4 py-1.5 text-[11px] font-black text-slate-900 dark:text-white appearance-none outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 transition-all cursor-pointer">
                                            <option value="all">Universal Fleet</option>
                                            <option value="leads">Priority Leads</option>
                                            <option value="customers">Core Entities</option>
                                        </select>
                                        <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" size={12} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-3 mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-600/50">
                                <label className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg cursor-pointer transition-all">
                                    <Paperclip size={12} className="text-slate-400" />
                                    <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">Attach Files</span>
                                    <input type="file" multiple className="hidden" onChange={(e) => {
                                        if (e.target.files?.length) {
                                            const newFiles = Array.from(e.target.files).map(f => f.name);
                                            setEmailData(prev => ({ ...prev, attachments: [...(prev.attachments || []), ...newFiles] }));
                                        }
                                    }} />
                                </label>
                                {(emailData.attachments || []).length > 0 && (
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {emailData.attachments.map((att, idx) => (
                                            <span key={idx} className="flex items-center gap-1.5 px-2 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-md text-[9px] font-bold">
                                                {att}
                                                <button onClick={() => setEmailData(prev => ({ ...prev, attachments: prev.attachments.filter((_, i) => i !== idx) }))}><X size={10} className="hover:text-red-500" /></button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <label className="ml-auto flex items-center gap-1.5 px-2.5 py-1 bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-800/40 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-400 rounded-lg cursor-pointer transition-all">
                                    <FileText size={11} className="shrink-0" />
                                    <span className="text-[8px] font-black uppercase tracking-widest mt-0.5">Import</span>
                                    <input type="file" accept=".html,.htm" className="hidden" />
                                </label>
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
                    <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden animate-in fade-in slide-in-from-right duration-700 bg-slate-50/50 dark:bg-slate-800">
                        <WhatsAppCampaignWizard onSend={handleSendCampaign} />
                    </div>
                )}
            </div>
        </div>
    );
}
