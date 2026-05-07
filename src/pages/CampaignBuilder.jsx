import React, { useState, useMemo, useEffect } from 'react';
import {
    Mail, Smartphone, Send, Save, Eye, Users,
    Paperclip, X, FileText, CheckCircle2, ChevronRight,
    MessageSquare, AlertCircle, Info, Sparkles, ShieldCheck, Monitor,
    Globe, Phone as PhoneIcon, User, Layers, MoreHorizontal, Plus, Loader2
} from 'lucide-react';
import WhatsAppCampaignWizard from '../components/whatsapp/wizard/WhatsAppCampaignWizard';
import { useToast } from '../context/ToastContext';
import { useCampaignContext } from '../context/CampaignContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import EmailDesigner from '../components/EmailDesigner';
import useUnsavedChanges from '../services/useUnsavedChanges';
import { useCampaigns } from '../hooks/useCampaigns';

export default function CampaignBuilder() {
    const navigate = useNavigate();
    const {
        activeTab, setActiveTab,
        emailData, setEmailData,
        whatsAppData, setWhatsAppData,
        activeBlockId, setActiveBlockId,
        isDirty
    } = useCampaignContext();

    const [isSending, setIsSending] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);

    const { success } = useToast();
    const [isAutosaving, setIsAutosaving] = useState(false);

    useUnsavedChanges(isDirty);

    // Keyboard shortcut to open full editor
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
                e.preventDefault();
                navigate('/campaigns/email-editor/draft');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);

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
            <div className="h-12 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 lg:px-6 shrink-0 z-40 scanline">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orbit rounded-xl flex items-center justify-center shadow-lg orbit-glow group-hover:rotate-6 transition-transform">
                        <Send className="text-white group-hover:scale-110 transition-transform" size={14} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Campaign Forge</h1>
                            {isAutosaving ? (
                                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 rounded-full">
                                    <Loader2 size={9} className="text-amber-500 animate-spin" />
                                    <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest">Syncing</span>
                                </div>
                            ) : lastSaved ? (
                                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 orbit-glow shadow-[0_0_5px_#10b981]"></div>
                                    <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest leading-none">Safe</span>
                                </div>
                            ) : null}
                        </div>
                        <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">Multi-Channel Sync</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-auto bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-200/50 dark:border-white/5">
                    <button onClick={() => setActiveTab('email')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'email' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400 orbit-glow' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
                        <Mail size={11} /> Orbital Email
                    </button>
                    <button onClick={() => setActiveTab('whatsapp')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'whatsapp' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400 orbit-glow' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
                        <Smartphone size={11} /> Direct WhatsApp
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-slate-900/50 border border-white/5 rounded-lg">
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">Protocol</span>
                        <span className="text-[8px] font-black text-primary-400 uppercase tracking-widest leading-none transmission-pulse">V4.0.2</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" icon={Save} onClick={handleSave} disabled={!isDirty} className="!py-1.5 !px-4 !text-[9px] !rounded-xl">
                            Save
                        </Button>
                        <Button variant="primary" icon={Send} onClick={handleSendCampaign} isLoading={isSending} className="!py-1.5 !px-4 !text-[9px] !rounded-xl orbit-glow shadow-primary-500/40">
                            Ignition
                        </Button>
                    </div>
                </div>
            </div>

            {/* Transmission Alert: Replaced by Global Toast */}

            <div className="flex-1 min-h-0 flex overflow-hidden">
                {activeTab === 'email' ? (
                    <div className="flex-1 min-h-0 flex flex-col overflow-hidden animate-in fade-in slide-in-from-left duration-500">
                        {/* Sender Protocol Panel — Compact */}
                        <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/5 px-4 py-3 shrink-0 z-30 shadow-sm relative overflow-hidden">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        <User size={10} className="text-primary-500" /> Sender Identity
                                    </label>
                                    <input type="text" value={emailData.senderName}
                                        onChange={(e) => setEmailData({ ...emailData, senderName: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-transparent rounded-xl px-3 py-2 text-[11px] font-bold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500/50 focus:orbit-glow-inner outline-none transition-all shadow-inner" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        <ShieldCheck size={10} className="text-primary-500" /> Terminal ID
                                    </label>
                                    <input type="email" value={emailData.from}
                                        onChange={(e) => setEmailData({ ...emailData, from: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-transparent rounded-xl px-3 py-2 text-[11px] font-bold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500/50 focus:orbit-glow-inner outline-none transition-all shadow-inner" />
                                </div>
                                <div className="space-y-1.5 col-span-2 md:col-span-1">
                                    <label className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        <Sparkles size={10} className="text-primary-500" /> Subject
                                    </label>
                                    <input type="text" value={emailData.subject}
                                        onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-transparent rounded-xl px-3 py-2 text-[11px] font-black text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500/50 focus:orbit-glow-inner outline-none transition-all placeholder:text-slate-500"
                                        placeholder="The future of SaaS is here..." />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        <Layers size={10} className="text-primary-500" /> Segment
                                    </label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                                        <select className="w-full bg-slate-50 dark:bg-slate-950/50 border border-transparent dark:border-white/5 rounded-xl pl-8 pr-4 py-2 text-[11px] font-black text-slate-900 dark:text-white appearance-none outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500/50 transition-all cursor-pointer shadow-inner">
                                            <option value="all">Universal Fleet</option>
                                            <option value="leads">Priority Leads</option>
                                            <option value="customers">Core Entities</option>
                                        </select>
                                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" size={12} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100 dark:border-white/5">
                                <label className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-950/50 hover:bg-slate-100 dark:hover:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-xl cursor-pointer transition-all">
                                    <Paperclip size={12} className="text-slate-400" />
                                    <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Attach Files</span>
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
                                            <span key={idx} className="flex items-center gap-2 px-2.5 py-1 bg-primary-500/10 text-primary-400 rounded-lg text-[9px] font-bold border border-primary-500/20">
                                                {att}
                                                <button onClick={() => setEmailData(prev => ({ ...prev, attachments: prev.attachments.filter((_, i) => i !== idx) }))}><X size={10} className="hover:text-red-500 transition-colors" /></button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <label className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/30 text-primary-400 rounded-xl cursor-pointer transition-all orbit-glow-inner">
                                    <FileText size={12} className="shrink-0" />
                                    <span className="text-[9px] font-black uppercase tracking-widest mt-0.5">Import</span>
                                    <input type="file" accept=".html,.htm" className="hidden" />
                                </label>
                            </div>
                        </div>

                        {/* Email Designer Top Actions */}
                        <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/5 px-4 py-2 shrink-0 z-30 flex items-center justify-between scanline">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-primary-500/10 rounded-lg">
                                    <Monitor size={14} className="text-primary-500" />
                                </div>
                                <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Design Message</span>
                            </div>
                            <Button variant="outline" onClick={() => navigate('/campaigns/email-editor/draft')} icon={Plus} className="!py-1.5 !px-4 !text-[9px] !rounded-xl">
                                Open Full Editor
                            </Button>
                        </div>

                        {/* Orbital Designer Interface */}
                        <EmailDesigner
                            blocks={emailData.blocks}
                            setBlocks={(blocks) => setEmailData({ ...emailData, blocks })}
                            activeBlockId={activeBlockId}
                            setActiveBlockId={setActiveBlockId}
                            isEmbedded={true}
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
