import React, { useState, useMemo } from 'react';
import {
    Save, Eye, Image as ImageIcon, Video, FileText,
    Type, Smartphone, ChevronRight, MessageSquare, Plus, CheckCircle2,
    ArrowLeft, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import useUnsavedChanges from '../services/useUnsavedChanges';
import { useTemplates } from '../hooks/useTemplates';

const INITIAL_TEMPLATE_DATA = {
    name: '',
    category: 'Marketing',
    language: 'English (US)',
    headerType: 'None', // None, Text, Image, Video, Document
    headerMediaUrl: null,
    bodyText: '',
    footerText: '',
    buttons: [] // { type: 'Quick Reply'|'Visit Website'|'Call Phone Number', text: '', value: '' }
};

export default function WhatsAppTemplateBuilder() {
    const [templateData, setTemplateData] = useState(INITIAL_TEMPLATE_DATA);
    const { saveTemplate, isSaving } = useTemplates('whatsapp');
    const [lastSaved, setLastSaved] = useState(null);

    const { success } = useToast();

    const isDirty = useMemo(() => {
        return JSON.stringify(templateData) !== JSON.stringify(INITIAL_TEMPLATE_DATA);
    }, [templateData]);

    useUnsavedChanges(isDirty);

    const handleSave = async () => {
        try {
            await saveTemplate(templateData);
            setLastSaved(new Date());
            success('Template configuration synchronized');
        } catch (err) {
            // handle error
        }
    };

    const addVariable = () => {
        // Simple logic to append {{v}} to bodyText
        const matches = templateData.bodyText.match(/{{(\d+)}}/g) || [];
        const nextVar = matches.length + 1;
        setTemplateData({ ...templateData, bodyText: templateData.bodyText + ` {{${nextVar}}}` });
    };

    const handleButtonAdd = () => {
        if (templateData.buttons.length >= 3) return;
        setTemplateData({
            ...templateData,
            buttons: [...templateData.buttons, { type: 'Quick Reply', text: '', value: '' }]
        });
    };

    const updateButton = (index, field, value) => {
        const newButtons = [...templateData.buttons];
        newButtons[index][field] = value;
        setTemplateData({ ...templateData, buttons: newButtons });
    };

    const removeButton = (index) => {
        const newButtons = [...templateData.buttons];
        newButtons.splice(index, 1);
        setTemplateData({ ...templateData, buttons: newButtons });
    };

    return (
        <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900 overflow-hidden font-outfit">
            {/* Header / Toolbar */}
            <div className="h-16 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between px-4 lg:px-6 shrink-0 z-50 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link to="/whatsapp-templates" className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <ArrowLeft size={16} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Template Forge</h1>
                            {lastSaved && (
                                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-700/50 rounded-full animate-in fade-in slide-in-from-left duration-500">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Saved • {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            )}
                        </div>
                        <p className="text-[9px] font-black text-slate-400 mt-1 uppercase tracking-widest">WhatsApp Business</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="primary"
                        icon={Save}
                        onClick={handleSave}
                        isLoading={isSaving}
                        disabled={!isDirty}
                        className="!py-1.5 !px-4 !text-[11px]"
                    >
                        Save Template
                    </Button>
                </div>
            </div>

            <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden custom-scrollbar animate-in fade-in">
                
                {/* Panel 1: Template Settings (Left) */}
                <div className="w-full lg:w-[320px] bg-white dark:bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 lg:overflow-hidden transition-all duration-500 z-10">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50 dark:bg-slate-900">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Template Info</h3>
                    </div>
                    <div className="p-4 space-y-6 lg:overflow-y-auto custom-scrollbar flex-1">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Template Name</label>
                                <input
                                    type="text"
                                    value={templateData.name}
                                    onChange={(e) => setTemplateData({ ...templateData, name: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_') })}
                                    placeholder="e.g. seasonal_promo_01"
                                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-xl px-4 py-3 text-[12px] font-bold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 outline-none transition-all placeholder:text-slate-400 shadow-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                                <div className="relative">
                                    <select
                                        value={templateData.category}
                                        onChange={(e) => setTemplateData({ ...templateData, category: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-xl px-4 py-3 text-[12px] font-bold text-slate-900 dark:text-white outline-none appearance-none cursor-pointer focus:border-primary-500 shadow-sm"
                                    >
                                        <option>Marketing</option>
                                        <option>Utility</option>
                                        <option>Authentication</option>
                                    </select>
                                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" size={14} />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Language</label>
                                <div className="relative">
                                    <select
                                        value={templateData.language}
                                        onChange={(e) => setTemplateData({ ...templateData, language: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-xl px-4 py-3 text-[12px] font-bold text-slate-900 dark:text-white outline-none appearance-none cursor-pointer focus:border-primary-500 shadow-sm"
                                    >
                                        <option>English (US)</option>
                                        <option>English (UK)</option>
                                        <option>Spanish</option>
                                    </select>
                                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" size={14} />
                                </div>
                            </div>
                        </div>

                         <div className="p-4 bg-primary-50/50 dark:bg-primary-900/10 rounded-2xl border border-primary-100 dark:border-primary-900/30 flex gap-3 items-start mt-6">
                            <CheckCircle2 className="text-primary-500 shrink-0" size={16} />
                            <p className="text-[10px] text-primary-800 dark:text-primary-400 font-medium leading-relaxed">
                                Ensure template names strictly follow WhatsApp guidelines (lowercase and underscores only).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Panel 2: Center Canvas (Preview) */}
                <div className="flex-1 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center p-4 lg:p-6 relative lg:overflow-hidden min-h-[600px] lg:min-h-0">
                    {/* Grid Background */}
                    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                    
                    <div className="w-full max-w-[340px] lg:max-w-[400px] aspect-[9/19] h-auto max-h-[90vh] bg-[#1a1a1a] rounded-[48px] lg:rounded-[56px] p-2.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-none relative border-[6px] border-[#333] flex flex-col shrink-0 z-10 transition-transform duration-500">
                        {/* iPhone Notch */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-30 flex items-center justify-end px-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 shadow-[0_0_5px_rgba(59,130,246,0.5)]"></div>
                        </div>

                        <div className="w-full h-full bg-[#f0f2f5] dark:bg-slate-800 rounded-[44px] overflow-hidden flex flex-col relative shadow-inner">
                            {/* App Header */}
                            <div className="min-h-24 bg-[#008069] pt-12 px-4 flex items-center justify-between shrink-0 shadow-lg relative z-20">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shadow-inner">
                                        <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center"><Smartphone size={12} className="text-white"/></div>
                                    </div>
                                    <div>
                                        <div className="text-white text-[13px] font-black tracking-tight uppercase">Bostechie Orbit</div>
                                        <div className="text-emerald-100 text-[9px] font-bold uppercase tracking-widest mt-0.5">Preview Mode</div>
                                    </div>
                                </div>
                            </div>

                            {/* Message Area */}
                            <div className="flex-1 p-4 flex flex-col pt-6 bg-repeat relative overflow-y-auto custom-scrollbar" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '400px' }}>
                                <div className="absolute inset-0 bg-[#efeae2]/90 dark:bg-[#0b141a]/95"></div>

                                <div className="relative z-10 flex flex-col gap-2 w-full max-w-[95%]">
                                    <div className="bg-white dark:bg-[#202c33] p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-700/50 relative">

                                        {/* Header Preview */}
                                        {templateData.headerType === 'Image' && (
                                            <div className="w-full h-32 bg-slate-100 dark:bg-slate-700/50 rounded-xl mb-3 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                                                <ImageIcon size={24} className="mb-2 opacity-50" />
                                                <span className="text-[9px] uppercase font-black tracking-widest opacity-50">Image Header</span>
                                            </div>
                                        )}
                                        {templateData.headerType === 'Video' && (
                                            <div className="w-full h-32 bg-slate-100 dark:bg-slate-700/50 rounded-xl mb-3 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                                                <Video size={24} className="mb-2 opacity-50" />
                                                <span className="text-[9px] uppercase font-black tracking-widest opacity-50">Video Header</span>
                                            </div>
                                        )}
                                        {templateData.headerType === 'Document' && (
                                            <div className="w-full h-16 bg-slate-100 dark:bg-slate-700/50 rounded-xl mb-3 flex items-center justify-center text-slate-400 dark:text-slate-500 gap-2">
                                                <FileText size={20} className="opacity-50" />
                                                <span className="text-[9px] uppercase font-black tracking-widest opacity-50">Document</span>
                                            </div>
                                        )}
                                        {templateData.headerType === 'Text' && (
                                            <h4 className="font-bold text-slate-900 dark:text-white text-[13px] mb-2 leading-tight">Example Header Text</h4>
                                        )}

                                        {/* Body Preview */}
                                        <div className="text-[13px] text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap flex flex-col">
                                            <span>
                                                {templateData.bodyText ? (
                                                    templateData.bodyText.split(/({{\d+}})/).map((part, i) => {
                                                        if (part.match(/^{{\d+}}$/)) {
                                                            return <span key={i} className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-400 px-1 rounded-md font-mono text-[11px] font-bold mx-0.5">{part}</span>;
                                                        }
                                                        return part;
                                                    })
                                                ) : (
                                                    <span className="text-slate-400 dark:text-slate-500 italic opacity-60">Message body text...</span>
                                                )}
                                            </span>

                                            {/* Footer Preview */}
                                            {templateData.footerText && (
                                                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 block opacity-80">{templateData.footerText}</span>
                                            )}
                                        </div>

                                        {/* Status / Time */}
                                        <div className="flex items-center justify-end gap-1 mt-1 -mr-1">
                                            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500">12:34 PM</span>
                                        </div>

                                        {/* Tail */}
                                        <div className="absolute left-[-6px] top-0 w-0 h-0 border-t-[10px] border-t-white dark:border-t-[#202c33] border-l-[10px] border-l-transparent"></div>
                                    </div>

                                    {/* Buttons Preview */}
                                    {templateData.buttons.length > 0 && (
                                        <div className="flex flex-col gap-1 w-full mt-1">
                                            {templateData.buttons.map((btn, i) => (
                                                <div key={i} className="bg-white dark:bg-[#202c33] px-4 py-2.5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex items-center justify-center text-[#00a884] dark:text-[#00a884] text-[12px] font-bold">
                                                    {btn.text || 'Button'}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Panel 3: Content Editor (Right Desktop / Middle Mobile) */}
                <div className="w-full lg:w-[360px] lg:order-last bg-white dark:bg-slate-900 border-b lg:border-b-0 lg:border-l border-slate-200 dark:border-slate-800 flex flex-col shrink-0 lg:overflow-hidden transition-all duration-500 z-20 shadow-none">
                     <div className="p-4 border-b border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50 dark:bg-slate-900">
                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Message Content</h3>
                    </div>
                    <div className="p-4 lg:p-6 space-y-8 flex-1 lg:overflow-y-auto custom-scrollbar">
                        
                        {/* 2. Header Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Header
                                </h3>
                                <select
                                    value={templateData.headerType}
                                    onChange={(e) => setTemplateData({ ...templateData, headerType: e.target.value, headerMediaUrl: null })}
                                    className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-lg px-2 py-1.5 text-[10px] font-bold text-slate-900 dark:text-white cursor-pointer outline-none shadow-sm"
                                >
                                    <option>None</option>
                                    <option>Text</option>
                                    <option>Image</option>
                                    <option>Video</option>
                                    <option>Document</option>
                                </select>
                            </div>

                            {templateData.headerType !== 'None' && templateData.headerType !== 'Text' && (
                                <div className="border border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                                        {templateData.headerType === 'Image' && <ImageIcon size={18} />}
                                        {templateData.headerType === 'Video' && <Video size={18} />}
                                        {templateData.headerType === 'Document' && <FileText size={18} />}
                                    </div>
                                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-1">Upload {templateData.headerType}</p>
                                    <p className="text-[9px] font-medium text-slate-400">Drag & drop media here</p>
                                </div>
                            )}
                            {templateData.headerType === 'Text' && (
                                <input
                                    type="text"
                                    placeholder="Header text (max 60 chars)"
                                    maxLength={60}
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-[12px] font-bold text-slate-900 dark:text-white outline-none focus:border-primary-500 shadow-sm transition-colors placeholder:text-slate-400"
                                />
                            )}
                        </div>

                        <hr className="border-slate-100 dark:border-slate-700/50" />

                        {/* 3. Body Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Body
                                </h3>
                                <button onClick={addVariable} className="text-[9px] font-black text-primary-600 dark:text-primary-400 uppercase hover:text-primary-700 bg-primary-50 dark:bg-primary-900/30 px-2.5 py-1.5 rounded-lg transition-colors">
                                    + Variable
                                </button>
                            </div>
                            <textarea
                                value={templateData.bodyText}
                                onChange={(e) => setTemplateData({ ...templateData, bodyText: e.target.value })}
                                placeholder="Hello {{1}}..."
                                className="w-full h-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-[12px] font-bold text-slate-900 dark:text-white outline-none focus:border-primary-500 shadow-sm transition-colors placeholder:text-slate-400 resize-none"
                            ></textarea>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">
                                Variables map to data placeholders. Ensure formatting complies with Meta policies.
                            </p>
                        </div>

                        <hr className="border-slate-100 dark:border-slate-700/50" />

                        {/* 4. Footer Section */}
                        <div className="space-y-4">
                            <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Footer
                            </h3>
                            <input
                                type="text"
                                value={templateData.footerText}
                                onChange={(e) => setTemplateData({ ...templateData, footerText: e.target.value })}
                                maxLength={60}
                                placeholder="e.g. Reply STOP to unsubscribe"
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-[12px] font-bold text-slate-900 dark:text-white outline-none focus:border-primary-500 shadow-sm transition-colors placeholder:text-slate-400"
                            />
                        </div>

                        <hr className="border-slate-100 dark:border-slate-700/50" />

                        {/* 5. Buttons Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Buttons
                                </h3>
                                <button
                                    onClick={handleButtonAdd}
                                    disabled={templateData.buttons.length >= 3}
                                    className="text-[9px] font-black text-primary-600 dark:text-primary-400 uppercase hover:text-primary-700 bg-primary-50 dark:bg-primary-900/30 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    + Add
                                </button>
                            </div>

                            <div className="space-y-3">
                                {templateData.buttons.map((btn, idx) => (
                                    <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 rounded-xl flex flex-col gap-3 relative group">
                                        <button
                                            onClick={() => removeButton(idx)}
                                            className="absolute -top-2 -right-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-red-500 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10"
                                        >
                                            <X size={10} />
                                        </button>
                                        <div className="flex gap-2">
                                            <select
                                                value={btn.type}
                                                onChange={(e) => updateButton(idx, 'type', e.target.value)}
                                                className="w-1/3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 text-[10px] font-bold text-slate-900 dark:text-white outline-none shadow-sm"
                                            >
                                                <option>Quick Reply</option>
                                                <option>Visit Website</option>
                                                <option>Call Phone Number</option>
                                            </select>
                                            <input
                                                value={btn.text}
                                                onChange={(e) => updateButton(idx, 'text', e.target.value)}
                                                placeholder="Label..."
                                                maxLength={25}
                                                className="w-2/3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-[11px] font-bold text-slate-900 dark:text-white outline-none shadow-sm placeholder:text-slate-400"
                                            />
                                        </div>
                                        {btn.type !== 'Quick Reply' && (
                                            <input
                                                value={btn.value}
                                                onChange={(e) => updateButton(idx, 'value', e.target.value)}
                                                placeholder={btn.type === 'Visit Website' ? 'https://...' : '+123456789'}
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-[11px] font-bold text-slate-900 dark:text-white outline-none shadow-sm placeholder:text-slate-400"
                                            />
                                        )}
                                    </div>
                                ))}
                                {templateData.buttons.length === 0 && (
                                    <div className="flex flex-col items-center justify-center p-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl">
                                        <p className="text-[10px] font-medium text-slate-400">No buttons configured</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
