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
    const [isSaving, setIsSaving] = useState(false);
    const [activeView, setActiveView] = useState('edit'); // 'edit', 'preview'
    const [lastSaved, setLastSaved] = useState(null);

    const { success } = useToast();

    const isDirty = useMemo(() => {
        return JSON.stringify(templateData) !== JSON.stringify(INITIAL_TEMPLATE_DATA);
    }, [templateData]);

    useUnsavedChanges(isDirty);

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1500));
        setIsSaving(false);
        setLastSaved(new Date());
        success('Template configuration synchronized');
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
        <div className="h-[calc(100vh-2rem)] flex flex-col -m-6 bg-[#fcfcfd] dark:bg-[#0b0f19] overflow-hidden font-outfit">
            {/* Header / Toolbar */}
            <div className="h-auto min-h-20 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800/50 flex flex-col lg:flex-row items-start lg:items-center justify-between px-6 lg:px-10 gap-6 shrink-0 z-50">
                <div className="flex items-center gap-6">
                    <Link to="/whatsapp-templates" className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:white transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Template Forge</h1>
                            {lastSaved && (
                                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-full animate-in fade-in slide-in-from-left duration-500">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Saved • {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            )}
                        </div>
                        <p className="text-[10px] font-black text-slate-500 mt-1 uppercase tracking-widest">WhatsApp Business Protocol</p>
                    </div>
                </div>

                {/* View Switcher for smaller screens */}
                <div className="xl:hidden flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveView('edit')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'edit' ? 'bg-white dark:bg-slate-700 text-primary-600 shadow-sm' : 'text-slate-500'}`}
                    >
                        <FileText size={14} /> Editor
                    </button>
                    <button
                        onClick={() => setActiveView('preview')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeView === 'preview' ? 'bg-white dark:bg-slate-700 text-primary-600 shadow-sm' : 'text-slate-500'}`}
                    >
                        <Eye size={14} /> Preview
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant="primary"
                        icon={Save}
                        onClick={handleSave}
                        isLoading={isSaving}
                        disabled={!isDirty}
                    >
                        Save Template
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 relative">

                {/* Left Panel: Editor */}
                <div className={`w-full xl:w-[600px] 2xl:w-[700px] bg-white dark:bg-slate-950 xl:border-r border-slate-100 dark:border-slate-800 p-6 lg:p-10 flex flex-col shrink-0 overflow-y-auto custom-scrollbar transition-all duration-500 ${activeView === 'edit' ? 'block' : 'hidden xl:block'}`}>

                    {/* 1. Template Settings */}
                    <div className="mb-10 space-y-6">
                        <div className="flex items-center justify-between group">
                            <h3 className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary-500 group-hover:animate-ping"></div> Settings
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Template Name</label>
                                <input
                                    type="text"
                                    value={templateData.name}
                                    onChange={(e) => setTemplateData({ ...templateData, name: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_') })}
                                    placeholder="e.g. seasonal_promo_01"
                                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl px-5 py-3.5 text-[13px] font-bold text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 outline-none transition-all placeholder:text-slate-400 shadow-inner"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                                    <select
                                        value={templateData.category}
                                        onChange={(e) => setTemplateData({ ...templateData, category: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl px-5 py-3.5 text-[12px] font-bold text-slate-900 dark:text-white outline-none cursor-pointer shadow-inner"
                                    >
                                        <option>Marketing</option>
                                        <option>Utility</option>
                                        <option>Authentication</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Language</label>
                                    <select
                                        value={templateData.language}
                                        onChange={(e) => setTemplateData({ ...templateData, language: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl px-5 py-3.5 text-[12px] font-bold text-slate-900 dark:text-white outline-none cursor-pointer shadow-inner"
                                    >
                                        <option>English (US)</option>
                                        <option>English (UK)</option>
                                        <option>Spanish</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-slate-100 dark:border-slate-800/50 mb-10" />

                    {/* 2. Header Section */}
                    <div className="mb-10 space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div> Header <span className="text-[9px] text-slate-400 tracking-normal ml-2">(Optional)</span>
                            </h3>
                            <select
                                value={templateData.headerType}
                                onChange={(e) => setTemplateData({ ...templateData, headerType: e.target.value, headerMediaUrl: null })}
                                className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-xl px-4 py-2 text-[11px] font-bold text-slate-900 dark:text-white cursor-pointer outline-none shadow-sm"
                            >
                                <option>None</option>
                                <option>Text</option>
                                <option>Image</option>
                                <option>Video</option>
                                <option>Document</option>
                            </select>
                        </div>

                        {templateData.headerType !== 'None' && templateData.headerType !== 'Text' && (
                            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-8 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-slate-900/20 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer group">
                                <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform shadow-sm">
                                    {templateData.headerType === 'Image' && <ImageIcon size={20} />}
                                    {templateData.headerType === 'Video' && <Video size={20} />}
                                    {templateData.headerType === 'Document' && <FileText size={20} />}
                                </div>
                                <p className="text-[12px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-1">Upload {templateData.headerType}</p>
                                <p className="text-[10px] font-bold text-slate-400">Drag & drop or click to browse</p>
                            </div>
                        )}
                        {templateData.headerType === 'Text' && (
                            <input
                                type="text"
                                placeholder="Header text (max 60 chars)"
                                maxLength={60}
                                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl px-5 py-3.5 text-[13px] font-bold text-slate-900 dark:text-white outline-none shadow-inner"
                            />
                        )}
                    </div>

                    <hr className="border-slate-100 dark:border-slate-800/50 mb-10" />

                    {/* 3. Body Section */}
                    <div className="mb-10 space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-purple-500"></div> Body
                            </h3>
                            <button onClick={addVariable} className="text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase hover:text-primary-700 bg-primary-50 dark:bg-primary-900/30 px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                                + Add Variable {'{{x}}'}
                            </button>
                        </div>
                        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                            Provide the main text. Use variables like <strong className="text-slate-800 dark:text-slate-200">{'{{1}}'}</strong> to insert personal data.
                        </p>
                        <textarea
                            value={templateData.bodyText}
                            onChange={(e) => setTemplateData({ ...templateData, bodyText: e.target.value })}
                            placeholder="Hello {{1}}, welcome to our platform!"
                            className="w-full h-40 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 text-[13px] font-bold text-slate-900 dark:text-white outline-none focus:border-primary-500 transition-all resize-none shadow-inner"
                        ></textarea>
                    </div>

                    <hr className="border-slate-100 dark:border-slate-800/50 mb-10" />

                    {/* 4. Footer Section */}
                    <div className="mb-10 space-y-6">
                        <h3 className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 rounded-full bg-slate-400"></div> Footer <span className="text-[9px] text-slate-400 tracking-normal ml-2">(Optional)</span>
                        </h3>
                        <input
                            type="text"
                            value={templateData.footerText}
                            onChange={(e) => setTemplateData({ ...templateData, footerText: e.target.value })}
                            maxLength={60}
                            placeholder="e.g. Reply STOP to unsubscribe"
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl px-5 py-3.5 text-[13px] font-bold text-slate-900 dark:text-white outline-none shadow-inner"
                        />
                        <div className="flex justify-end">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{templateData.footerText.length} / 60</p>
                        </div>
                    </div>

                    <hr className="border-slate-100 dark:border-slate-800/50 mb-10" />

                    {/* 5. Buttons Section */}
                    <div className="mb-10 space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Buttons <span className="text-[9px] text-slate-400 tracking-normal ml-2">(Max 3)</span>
                            </h3>
                            <button
                                onClick={handleButtonAdd}
                                disabled={templateData.buttons.length >= 3}
                                className="text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase hover:text-primary-700 bg-primary-50 dark:bg-primary-900/30 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 shadow-sm"
                            >
                                + Add Button
                            </button>
                        </div>

                        <div className="space-y-4">
                            {templateData.buttons.map((btn, idx) => (
                                <div key={idx} className="p-5 bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 rounded-2xl flex flex-col md:flex-row gap-4 relative group shadow-sm transition-all hover:shadow-md">
                                    <button
                                        onClick={() => removeButton(idx)}
                                        className="absolute -top-2 -right-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-red-500 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
                                    >
                                        <X size={12} />
                                    </button>
                                    <div className="w-full md:w-1/3">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Type</label>
                                        <select
                                            value={btn.type}
                                            onChange={(e) => updateButton(idx, 'type', e.target.value)}
                                            className="w-full bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 rounded-xl px-3 py-2 text-[11px] font-bold text-slate-900 dark:text-white outline-none cursor-pointer shadow-inner"
                                        >
                                            <option>Quick Reply</option>
                                            <option>Visit Website</option>
                                            <option>Call Phone Number</option>
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Button Text</label>
                                        <input
                                            value={btn.text}
                                            onChange={(e) => updateButton(idx, 'text', e.target.value)}
                                            placeholder="Text..."
                                            maxLength={25}
                                            className="w-full bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 rounded-xl px-4 py-2 text-[12px] font-bold text-slate-900 dark:text-white outline-none shadow-inner"
                                        />
                                    </div>
                                    {btn.type !== 'Quick Reply' && (
                                        <div className="flex-1">
                                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Value</label>
                                            <input
                                                value={btn.value}
                                                onChange={(e) => updateButton(idx, 'value', e.target.value)}
                                                placeholder={btn.type === 'Visit Website' ? 'https://...' : '+123456789'}
                                                className="w-full bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 rounded-xl px-4 py-2 text-[12px] font-bold text-slate-900 dark:text-white outline-none shadow-inner"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {templateData.buttons.length === 0 && (
                                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/30 dark:bg-slate-900/10">
                                    <MessageSquare size={32} className="text-slate-300 dark:text-slate-700 mb-3" />
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">No buttons added yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Phone Preview */}
                <div className={`flex-1 bg-slate-50/50 dark:bg-[#0b0f19] flex items-center justify-center p-6 lg:p-12 overflow-y-auto xl:overflow-hidden perspective-1000 transition-all duration-500 ${activeView === 'preview' ? 'block' : 'hidden xl:flex'}`}>
                    <div className="w-[300px] sm:w-[340px] md:w-[360px] h-auto min-h-[600px] lg:h-[740px] bg-[#1a1a1a] rounded-[52px] lg:rounded-[64px] p-2.5 lg:p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative border-[4px] lg:border-[6px] border-[#333] transform group-hover:rotate-x-1 group-hover:rotate-y-1 transition-transform duration-700 scale-90 md:scale-100 lg:scale-95 xl:scale-100">
                        {/* iPhone Notch */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-end px-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></div>
                        </div>

                        <div className="w-full h-full bg-[#f0f2f5] dark:bg-slate-900 rounded-[52px] overflow-hidden flex flex-col relative shadow-inner">
                            {/* App Header */}
                            <div className="h-24 lg:h-28 bg-[#008069] pt-10 lg:pt-12 px-6 flex items-center justify-between shrink-0 shadow-lg relative z-20">
                                <div className="flex items-center gap-4">
                                    <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shadow-inner">
                                        <div className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-orbit"></div>
                                    </div>
                                    <div>
                                        <div className="text-white text-[13px] lg:text-sm font-black tracking-tight uppercase">Bostechie Orbit</div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.5)]"></span>
                                            <span className="text-emerald-100 text-[9px] font-bold uppercase tracking-widest">Preview Mode</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Message Area */}
                            <div className="flex-1 p-5 flex flex-col pt-8 bg-repeat relative overflow-y-auto custom-scrollbar" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '400px' }}>
                                <div className="absolute inset-0 bg-[#efeae2]/90 dark:bg-[#0b141a]/95"></div>

                                <div className="relative z-10 flex flex-col gap-2 w-full max-w-[95%]">
                                    <div className="bg-white dark:bg-[#202c33] p-3 rounded-2xl rounded-tl-none shadow-md relative border border-slate-100 dark:border-slate-800">

                                        {/* Header Preview */}
                                        {templateData.headerType === 'Image' && (
                                            <div className="w-full h-32 bg-slate-200 dark:bg-slate-700/50 rounded-xl mb-3 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 overflow-hidden">
                                                <ImageIcon size={32} className="mb-2 opacity-50" />
                                                <span className="text-[10px] uppercase font-black tracking-widest opacity-50">Image Header</span>
                                            </div>
                                        )}
                                        {templateData.headerType === 'Video' && (
                                            <div className="w-full h-32 bg-slate-200 dark:bg-slate-700/50 rounded-xl mb-3 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 overflow-hidden">
                                                <Video size={32} className="mb-2 opacity-50" />
                                                <span className="text-[10px] uppercase font-black tracking-widest opacity-50">Video Header</span>
                                            </div>
                                        )}
                                        {templateData.headerType === 'Document' && (
                                            <div className="w-full h-16 bg-slate-200 dark:bg-slate-700/50 rounded-xl mb-3 flex items-center justify-center text-slate-400 dark:text-slate-500 gap-2 overflow-hidden">
                                                <FileText size={24} className="opacity-50" />
                                                <span className="text-[10px] uppercase font-black tracking-widest opacity-50">Document</span>
                                            </div>
                                        )}
                                        {templateData.headerType === 'Text' && (
                                            <h4 className="font-bold text-slate-900 dark:text-white text-[14px] mb-2 leading-tight">Example Header Text</h4>
                                        )}

                                        {/* Body Preview */}
                                        <div className="text-[14px] text-slate-800 dark:text-slate-200 leading-relaxed font-normal whitespace-pre-wrap flex flex-col">
                                            <span>
                                                {templateData.bodyText ? (
                                                    templateData.bodyText.split(/({{\d+}})/).map((part, i) => {
                                                        if (part.match(/^{{\d+}}$/)) {
                                                            return <span key={i} className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-400 px-1 rounded font-mono text-[11px] ring-1 ring-emerald-200 dark:ring-emerald-800">{part}</span>;
                                                        }
                                                        return part;
                                                    })
                                                ) : (
                                                    <span className="text-slate-400 dark:text-slate-500 italic opacity-50">Body text will appear here...</span>
                                                )}
                                            </span>

                                            {/* Footer Preview */}
                                            {templateData.footerText && (
                                                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 block font-medium opacity-80">{templateData.footerText}</span>
                                            )}
                                        </div>

                                        {/* Status / Time */}
                                        <div className="flex items-center justify-end gap-1 mt-1 -mr-1">
                                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">12:34 PM</span>
                                        </div>

                                        {/* Tail */}
                                        <div className="absolute left-[-8px] top-0 w-0 h-0 border-t-[12px] border-t-white dark:border-t-[#202c33] border-l-[12px] border-l-transparent"></div>
                                    </div>

                                    {/* Buttons Preview */}
                                    {templateData.buttons.length > 0 && (
                                        <div className="flex flex-col gap-1 w-full mt-0.5">
                                            {templateData.buttons.map((btn, i) => (
                                                <div key={i} className="bg-white dark:bg-[#202c33] px-4 py-2.5 rounded-xl shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-transparent flex items-center justify-center text-[#00a884] dark:text-[#00a884] text-[13px] font-bold cursor-pointer w-full text-center hover:bg-slate-50 dark:hover:bg-[#2a3942] transition-colors shadow-sm">
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
            </div>
        </div>
    );
}
