import React from 'react';
import { Phone as PhoneIcon, MoreHorizontal, MessageSquare, Plus, Send, CheckCircle2, Image as ImageIcon, Video, File, ExternalLink, PhoneCall } from 'lucide-react';

export default function WhatsAppPhonePreview({ data, forceRender = false }) {
    // Determine if we should show a prompt to select a template, or start rendering
    const hasContent = forceRender || data?.messageBody?.length > 0 || data?.headerType !== 'none';

    // Parse variables
    let bodyText = data?.messageBody || '';
    if (data?.variableMapping) {
        Object.entries(data.variableMapping).forEach(([key, value]) => {
            const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
            // If value is empty, keep the original placeholder bracket for visual cue, or fallback
            bodyText = bodyText.replace(regex, value ? `[${value}]` : `{{${key}}}`);
        });
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center pt-2 md:pt-4 pb-12 md:pb-4 perspective-1000">
            {/* Phone container scales using relative widths or max-width */}
            <div className="w-full max-w-[320px] sm:max-w-[340px] md:max-w-[360px] aspect-[9/19.5] min-h-[600px] h-auto bg-[#1a1a1a] rounded-[48px] md:rounded-[56px] lg:rounded-[64px] p-2 md:p-2.5 lg:p-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] lg:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative border-[4px] md:border-[5px] lg:border-[6px] border-[#333] transform lg:hover:rotate-y-2 transition-transform duration-700 flex flex-col mx-auto shrink-0">
                {/* iPhone Hardware Details */}
                <div className="hidden sm:block absolute left-[-5px] md:left-[-6px] top-28 md:top-32 w-1.5 h-12 md:h-14 bg-[#444] rounded-l-lg border-y border-l border-white/5"></div>
                <div className="hidden sm:block absolute right-[-5px] md:right-[-6px] top-36 md:top-40 w-1.5 h-20 md:h-24 bg-[#444] rounded-r-lg border-y border-r border-white/5"></div>

                <div className="w-full h-full bg-[#f0f2f5] rounded-[40px] md:rounded-[46px] lg:rounded-[52px] overflow-hidden flex flex-col relative shadow-inner">
                    {/* Dynamic Island */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 md:w-28 h-6 bg-black rounded-full z-30 flex items-center justify-end px-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></div>
                    </div>

                    {/* App Header */}
                    <div className="h-24 md:h-28 bg-[#008069] pt-10 md:pt-12 px-4 md:px-6 flex items-center justify-between shrink-0 shadow-lg relative z-20">
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shadow-inner shrink-0">
                                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-orbit"></div>
                            </div>
                            <div className="min-w-0">
                                <div className="text-white text-[13px] md:text-sm font-black tracking-tight uppercase truncate">Bostechie Orbit</div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.5)]"></span>
                                    <span className="text-emerald-100 text-[9px] md:text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Active Link</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 md:gap-4 text-white/80 shrink-0">
                            <PhoneIcon size={16} className="md:w-[18px] md:h-[18px]" />
                            <MoreHorizontal size={16} className="md:w-[18px] md:h-[18px]" />
                        </div>
                    </div>

                    {/* Message Stream */}
                    <div className="flex-1 p-4 md:p-6 flex flex-col justify-end bg-repeat relative overflow-y-auto custom-scrollbar" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '400px' }}>
                        <div className="absolute inset-0 bg-[#efeae2]/90"></div>

                        {hasContent ? (
                            <div className="flex flex-col gap-1 w-full max-w-[90%] md:max-w-[85%] self-start relative animate-in zoom-in-95 slide-in-from-bottom-2 duration-500 z-10">
                                <div className="bg-white dark:bg-slate-900 p-1 rounded-[16px] md:rounded-[20px] rounded-tl-none shadow-xl border border-slate-100 dark:border-slate-800 relative w-full overflow-hidden flex flex-col">
                                    {/* Whatsapp bubble tail */}
                                    <div className="absolute left-[-6px] top-0 w-0 h-0 border-t-[12px] md:border-t-[15px] border-t-white border-l-[12px] md:border-l-[15px] border-l-transparent"></div>

                                    {/* Header Media / Text */}
                                    {data?.headerType === 'text' && data.headerText && (
                                        <div className="px-3 pt-3 pb-1">
                                            <span className="text-[14px] font-bold text-slate-800 dark:text-slate-200">{data.headerText}</span>
                                        </div>
                                    )}
                                    {data?.headerType === 'image' && (
                                        <div className="w-full h-36 bg-slate-100 rounded-[14px] mb-2 flex flex-col items-center justify-center text-slate-300 relative overflow-hidden">
                                            {data.headerMedia ? (
                                                <div className="absolute inset-0 bg-primary-100 flex items-center justify-center">
                                                    <ImageIcon size={32} className="text-primary-300" />
                                                </div>
                                            ) : (
                                                <>
                                                    <ImageIcon size={24} className="mb-2" />
                                                    <span className="text-[10px] uppercase font-black tracking-widest">Image Header</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                    {data?.headerType === 'video' && (
                                        <div className="w-full h-36 bg-slate-100 rounded-[14px] mb-2 flex flex-col items-center justify-center text-slate-300 relative overflow-hidden">
                                            {data.headerMedia ? (
                                                <div className="absolute inset-0 bg-blue-100 flex items-center justify-center">
                                                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center pl-1">
                                                        <Video size={18} className="text-white" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <Video size={24} className="mb-2" />
                                                    <span className="text-[10px] uppercase font-black tracking-widest">Video Header</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                    {data?.headerType === 'document' && (
                                        <div className="w-full bg-slate-100 rounded-[14px] p-3 mb-2 flex items-center gap-3 text-slate-500">
                                            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                                                <File size={20} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[12px] font-bold text-slate-700 truncate">{data.headerMedia ? data.headerMedia.name : 'document_file.pdf'}</div>
                                                <div className="text-[10px] font-medium text-slate-400">PDF Document</div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Body Text */}
                                    <div className="px-3 pb-2 pt-1 text-[13px] md:text-[14px] text-slate-800 dark:text-slate-200 font-medium leading-relaxed whitespace-pre-wrap break-words">
                                        {bodyText || <span className="text-slate-300 italic">Message body text...</span>}
                                    </div>

                                    {/* Footer Note */}
                                    {data?.footerText && (
                                        <div className="px-3 pb-2 text-[11px] text-slate-500 uppercase tracking-widest font-black opacity-80">
                                            {data.footerText}
                                        </div>
                                    )}

                                    {/* Timestamp & Ticks */}
                                    <div className="flex items-center justify-end gap-1 px-3 pb-1 -mt-1">
                                        <span className="text-[9px] font-bold text-slate-400">12:34</span>
                                        <CheckCircle2 size={10} className="text-blue-500" />
                                    </div>
                                </div>

                                {/* Action Buttons Below Bubble */}
                                {data?.buttons && data.buttons.map((btn, idx) => (
                                    <div key={idx} className="bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl md:rounded-[20px] shadow-md border border-slate-100 dark:border-slate-800 w-full flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                        {btn.type === 'url' && <ExternalLink size={14} className="text-blue-500" />}
                                        {btn.type === 'call' && <PhoneCall size={14} className="text-emerald-500" />}
                                        {btn.type === 'quick_reply' && <MessageSquare size={14} className="text-primary-500" />}
                                        <span className="text-[13px] font-bold text-[#00a884]">{btn.label || `Button ${idx + 1}`}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="m-auto text-center px-6 md:px-10 relative z-10 w-full animate-in zoom-in-95 duration-500">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/80 backdrop-blur-sm rounded-[20px] md:rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-5 md:mb-6 transform rotate-6 border border-white">
                                    <MessageSquare className="text-emerald-200" size={32} />
                                </div>
                                <h4 className="text-[14px] font-black uppercase text-slate-600 tracking-tighter mb-2">Build Layout</h4>
                                <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest leading-relaxed">Begin typing message details in Step 2 to preview.</p>
                            </div>
                        )}
                    </div>

                    {/* Messenger Controls */}
                    <div className="h-16 md:h-20 bg-[#f0f2f5] px-3 md:px-5 flex items-center gap-2 md:gap-3 shrink-0 border-t border-slate-200/50">
                        <Plus className="text-slate-400 shrink-0" size={20} />
                        <div className="flex-1 h-10 md:h-11 bg-white dark:bg-slate-900 rounded-xl md:rounded-2xl flex items-center px-3 md:px-4 text-slate-300 dark:text-slate-600 text-[11px] md:text-xs font-bold border border-slate-200 dark:border-slate-800">
                            Terminal input...
                        </div>
                        <div className="w-10 h-10 md:w-11 md:h-11 bg-[#00a884] rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                            <Send className="text-white ml-0.5" size={16} />
                        </div>
                    </div>

                    {/* iPhone Home Bar */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 md:w-32 h-1 md:h-1.5 bg-black/15 md:bg-black/10 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
