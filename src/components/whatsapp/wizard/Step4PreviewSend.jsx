import React, { useState } from 'react';
import { Send, Save, Phone, MoreHorizontal, MessageSquare, Image as ImageIcon, Video, FileText, CheckCircle2, Play } from 'lucide-react';

export default function Step4PreviewSend({ data, onSend }) {
    const [isSaving, setIsSaving] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSaveTemplate = async () => {
        setIsSaving(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsSaving(false);
        setSuccessMessage('Template Saved Securely.');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleSendAction = async () => {
        setIsSending(true);
        await new Promise(r => setTimeout(r, 2000));
        setIsSending(false);
        if (onSend) onSend();
    };

    // Replace variables in body text with sample data for preview
    const getPreviewBody = () => {
        let text = data.bodyText || '';
        if (!text) return text;

        const parts = text.split(/({{\d+}})/);
        return parts.map((part, i) => {
            const match = part.match(/^{{(\d+)}}$/);
            if (match) {
                const varNum = match[1];
                const sampleText = data.sampleData[varNum];
                if (sampleText) {
                    return <strong key={i} className="text-slate-900 dark:text-white">{sampleText}</strong>;
                }
                return <span key={i} className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-400 px-1 rounded font-mono text-[11px]">{part}</span>;
            }
            return part;
        });
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Left Panel: Final Actions & Overview */}
            <div className="flex-1 space-y-10">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Transmission Preflight</h2>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-2">Review final payload before orbital launch</p>
                </div>

                <div className="space-y-4">
                    <div className="p-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl flex justify-between items-center shadow-sm">
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Template Core</span>
                        <span className="text-[13px] font-bold text-slate-900 dark:text-white">{data.templateName || 'Untitled'}</span>
                    </div>
                    <div className="p-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl flex justify-between items-center shadow-sm">
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Category</span>
                        <span className="text-[13px] font-bold text-slate-900 dark:text-white">{data.category}</span>
                    </div>
                    <div className="p-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl flex justify-between items-center shadow-sm">
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Language</span>
                        <span className="text-[13px] font-bold text-slate-900 dark:text-white">{data.language}</span>
                    </div>
                </div>

                {successMessage && (
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in-95">
                        <div className="bg-emerald-500 rounded-full p-1"><CheckCircle2 size={16} className="text-white" /></div>
                        <span className="text-[11px] font-black uppercase text-emerald-800 dark:text-emerald-400 tracking-widest">{successMessage}</span>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                        onClick={handleSaveTemplate}
                        disabled={isSaving || isSending}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-slate-300 dark:hover:border-slate-700 transition-all disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : <><Save size={16} /> Save Template</>}
                    </button>
                    <button
                        onClick={handleSendAction}
                        disabled={isSaving || isSending}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-orbit text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {isSending ? (
                            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Launching...</>
                        ) : (
                            <><Play size={16} /> Launch Campaign</>
                        )}
                    </button>
                </div>
            </div>

            {/* Right Panel: Holographic Device Preview */}
            <div className="flex-1 flex items-center justify-center pt-8 lg:pt-0 perspective-1000">
                <div className="w-[320px] sm:w-[350px] bg-[#1a1a1a] rounded-[52px] p-2.5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative border-[4px] border-[#333] transform lg:hover:rotate-y-2 lg:hover:-rotate-x-2 transition-transform duration-700">
                    {/* iPhone Notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-end px-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></div>
                    </div>

                    <div className="w-full h-[660px] bg-[#f0f2f5] dark:bg-slate-900 rounded-[44px] overflow-hidden flex flex-col relative shadow-inner">
                        {/* App Header */}
                        <div className="h-24 bg-[#008069] pt-10 px-6 flex items-center justify-between shrink-0 shadow-lg relative z-20">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shadow-inner">
                                    <div className="w-6 h-6 rounded-full bg-orbit"></div>
                                </div>
                                <div className="text-white text-[13px] font-black tracking-tight uppercase">Bostechie Orbit</div>
                            </div>
                            <div className="flex gap-4 text-white/80">
                                <Phone size={16} />
                                <MoreHorizontal size={16} />
                            </div>
                        </div>

                        {/* Chat Context */}
                        <div className="flex-1 p-5 flex flex-col pt-6 bg-repeat relative overflow-y-auto custom-scrollbar" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '400px' }}>
                            <div className="absolute inset-0 bg-[#efeae2]/90 dark:bg-[#0b141a]/95"></div>

                            <div className="relative z-10 flex flex-col gap-2 w-full max-w-[95%]">
                                {(() => {
                                    const selectedTypes = Array.isArray(data.headerType) ? data.headerType : [data.headerType];
                                    const hasType = (t) => selectedTypes.includes(t);
                                    const isNone = hasType('None') || selectedTypes.length === 0;
                                    if (!data.bodyText && isNone) return (
                                        <div className="bg-white/50 backdrop-blur text-slate-500 text-xs text-center p-4 rounded-xl font-medium border border-white/20">
                                            Template is empty.
                                        </div>
                                    );
                                    return (
                                        <div className="bg-white dark:bg-[#202c33] p-3 rounded-2xl rounded-tl-none shadow-md relative border border-slate-100 dark:border-slate-800">

                                            {/* Header Media / Text */}
                                            {hasType('Image') && (
                                                <div className="w-full h-32 bg-slate-200 dark:bg-slate-700/50 rounded-xl mb-3 overflow-hidden flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                                                    {data.headerMedia?.Image?.preview
                                                        ? <img src={data.headerMedia.Image.preview} alt="header" className="w-full h-full object-cover" />
                                                        : <ImageIcon size={32} className="mb-2" />}
                                                </div>
                                            )}
                                            {hasType('Video') && (
                                                <div className="w-full h-32 bg-slate-200 dark:bg-slate-700/50 rounded-xl mb-3 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                                                    <Video size={32} className="mb-2" />
                                                    {data.headerMedia?.Video?.name && <p className="text-[10px] font-bold truncate px-2">{data.headerMedia.Video.name}</p>}
                                                </div>
                                            )}
                                            {hasType('Document') && (
                                                <div className="w-full h-16 bg-slate-200 dark:bg-slate-700/50 rounded-xl mb-3 flex items-center justify-center text-slate-400 dark:text-slate-500 gap-2">
                                                    <FileText size={24} />
                                                    <span className="text-[11px] font-bold truncate">{data.headerMedia?.Document?.name || 'Document File'}</span>
                                                </div>
                                            )}
                                            {hasType('Text') && data.headerText && (
                                                <h4 className="font-bold text-slate-900 dark:text-white text-[14px] mb-2">{data.headerText}</h4>
                                            )}

                                            {/* Body */}
                                            {data.bodyText && (
                                                <div className="text-[14px] text-slate-800 dark:text-slate-200 leading-relaxed font-normal whitespace-pre-wrap flex flex-col">
                                                    <span>{getPreviewBody()}</span>
                                                </div>
                                            )}

                                            {/* Footer */}
                                            {data.footerText && (
                                                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 block opacity-70">{data.footerText}</span>
                                            )}

                                            {/* Status / Time */}
                                            <div className="flex items-center justify-end gap-1 mt-1 -mr-1">
                                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">12:34 PM</span>
                                                <CheckCircle2 size={12} className="text-blue-500" />
                                            </div>

                                            {/* Tail */}
                                            <div className="absolute left-[-8px] top-0 w-0 h-0 border-t-[12px] border-t-white dark:border-t-[#202c33] border-l-[12px] border-l-transparent"></div>
                                        </div>
                                    );
                                })()}

                                {/* Buttons */}
                                {data.buttons && data.buttons.length > 0 && (
                                    <div className="flex flex-col gap-1 w-full mt-0.5">
                                        {data.buttons.map((btn, i) => (
                                            <div key={i} className="bg-white dark:bg-[#202c33] px-4 py-3 rounded-xl shadow-[0_1px_1px_rgba(0,0,0,0.1)] border border-slate-100/50 dark:border-transparent flex items-center justify-center text-[#00a884] text-[14px] font-medium w-full text-center">
                                                {btn.text || <span className="text-slate-400 italic">Button {i + 1}</span>}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Input bar visual (fake) */}
                        <div className="h-16 bg-[#f0f2f5] dark:bg-[#202c33] px-4 flex items-center gap-3 shrink-0 border-t border-slate-200/50 dark:border-slate-800/50">
                            <div className="flex-1 h-10 bg-white dark:bg-[#2a3942] rounded-full flex items-center px-4"></div>
                            <div className="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center text-white"><Send size={16} className="ml-1" /></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
