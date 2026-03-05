import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    Copy, Trash2, GripVertical, Facebook,
    Instagram, Twitter, Mail, ExternalLink,
    Zap, Sparkles, Command, ShieldCheck
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function SortableBlock({ id, block, isActive, onClick, onRemove, onDuplicate }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
    };

    const renderContent = () => {
        const { type, content, style: blockStyle } = block;
        const containerStyle = {
            backgroundColor: blockStyle.bgColor,
            paddingTop: `${blockStyle.paddingY}px`,
            paddingBottom: `${blockStyle.paddingY}px`,
            color: blockStyle.textColor,
            textAlign: blockStyle.textAlign || 'center',
            fontSize: `${blockStyle.fontSize}px`,
            borderRadius: `${blockStyle.borderRadius}px`,
        };

        switch (type) {
            case 'navbar':
                return (
                    <div className="flex items-center justify-between px-12" style={containerStyle}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orbit rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-primary-500/20">
                                {content.logoText || 'BO'}
                            </div>
                            <span className="font-black tracking-tighter text-sm uppercase">
                                {content.companyName || 'BOSTECHEI ORBIT'}
                            </span>
                        </div>
                        <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
                            {(content.links || []).map((link, idx) => (
                                <a key={idx} href={link.url} className="hover:text-primary-600 cursor-pointer transition-colors block">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                );
            case 'text':
                return (
                    <div className="px-16 whitespace-pre-wrap leading-relaxed font-outfit" style={containerStyle}>
                        {content.text}
                    </div>
                );
            case 'image':
                return (
                    <div style={containerStyle} className="p-0 overflow-hidden group/img relative">
                        <img src={content.src} alt="Template" className="w-full h-auto block transition-transform duration-700 group-hover/img:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
                    </div>
                );
            case 'button':
                return (
                    <div className="px-12 py-6" style={containerStyle}>
                        <a
                            href={content.url}
                            className="inline-flex items-center gap-3 px-10 py-4 rounded-[20px] font-black text-[11px] tracking-[0.2em] uppercase transition-all hover:scale-[1.05] active:scale-95 shadow-xl hover:shadow-primary-500/20"
                            style={{ backgroundColor: blockStyle.textColor, color: blockStyle.bgColor }}
                        >
                            {content.label}
                            <ExternalLink size={14} />
                        </a>
                    </div>
                );
            case 'divider':
                return (
                    <div className="px-16" style={{ ...containerStyle, paddingY: blockStyle.paddingY / 2 }}>
                        <div className="h-px bg-slate-200 w-full opacity-30 shadow-[0_1px_2px_rgba(0,0,0,0.05)]" />
                    </div>
                );
            case 'products':
                return (
                    <div className="px-12 py-12" style={containerStyle}>
                        <div className="flex items-center justify-between mb-8 px-4">
                            <h4 className="text-[12px] font-black uppercase tracking-[0.3em]">Core Fleet Units</h4>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-primary-600 uppercase tracking-widest">
                                View Universal <Zap size={12} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            {[1, 2].map(i => (
                                <div key={i} className="group/item">
                                    <div className="aspect-[4/5] bg-slate-100 rounded-[32px] overflow-hidden relative shadow-md group-hover/item:shadow-2xl transition-all duration-500 border border-slate-100">
                                        <div className="absolute inset-0 bg-primary-600/5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                        <img src={`https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=400&fit=crop&q=${i * 10}`} className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110" />
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 opacity-0 group-hover/item:opacity-100 transform translate-y-4 group-hover/item:translate-y-0 transition-all duration-500">
                                            <span className="text-[10px] font-black text-slate-900 uppercase">Deploy Now</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 px-2">
                                        <div className="text-[11px] font-black text-slate-900 uppercase tracking-tight">Orbital Unit Model {i}</div>
                                        <div className="text-[10px] text-primary-500 font-black mt-1">$4,999.00 USD</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'social':
                return (
                    <div className="px-12 flex justify-center gap-10" style={containerStyle}>
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary-600 hover:bg-white hover:shadow-lg transition-all cursor-pointer border border-slate-100/50">
                            <Facebook size={20} strokeWidth={1.5} />
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary-600 hover:bg-white hover:shadow-lg transition-all cursor-pointer border border-slate-100/50">
                            <Instagram size={20} strokeWidth={1.5} />
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary-600 hover:bg-white hover:shadow-lg transition-all cursor-pointer border border-slate-100/50">
                            <Twitter size={20} strokeWidth={1.5} />
                        </div>
                    </div>
                );
            case 'spacer':
                return (
                    <div style={{ height: `${blockStyle.paddingY}px`, backgroundColor: blockStyle.bgColor }} />
                );
            case 'footer':
                return (
                    <div className="px-12 py-16 text-center" style={containerStyle}>
                        <div className="flex justify-center gap-8 mb-12 opacity-40">
                            {content.socialLinks?.facebook && <a href={content.socialLinks.facebook}><Facebook size={20} className="hover:text-primary-500 cursor-pointer transition-colors" /></a>}
                            {content.socialLinks?.instagram && <a href={content.socialLinks.instagram}><Instagram size={20} className="hover:text-primary-500 cursor-pointer transition-colors" /></a>}
                            {content.socialLinks?.twitter && <a href={content.socialLinks.twitter}><Twitter size={20} className="hover:text-primary-500 cursor-pointer transition-colors" /></a>}
                        </div>
                        <div className="space-y-4 text-[10px] tracking-[0.3em] font-black opacity-60 uppercase leading-relaxed max-w-sm mx-auto">
                            <p>{content.address || 'Location Terminal'}</p>
                            <p className="normal-case tracking-normal font-bold">
                                {content.message || 'System transmission verified.'}
                            </p>
                        </div>
                        <div className="mt-12 pt-8 border-t border-slate-100 text-[10px] font-black opacity-40 uppercase tracking-[0.5em]">
                            {content.copyright || '© 2026 ORBIT COMMAND'}
                        </div>
                    </div>
                );
            case 'columns':
                return (
                    <div className="px-16 grid grid-cols-2 gap-12" style={containerStyle}>
                        <div className="space-y-6 group/col">
                            <div className="aspect-video bg-slate-100 rounded-[24px] overflow-hidden border border-slate-100 relative shadow-sm group-hover/col:shadow-xl transition-all duration-500">
                                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" className="w-full h-full object-cover group-hover/col:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="text-left text-[11px] font-bold leading-relaxed text-slate-500 uppercase tracking-tight">Our orbital engineering focuses on seamless, agentic workflows.</div>
                        </div>
                        <div className="space-y-6 group/col">
                            <div className="aspect-video bg-slate-100 rounded-[24px] overflow-hidden border border-slate-100 relative shadow-sm group-hover/col:shadow-xl transition-all duration-500">
                                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop" className="w-full h-full object-cover group-hover/col:scale-105 transition-transform duration-700" />
                            </div>
                            <div className="text-left text-[11px] font-bold leading-relaxed text-slate-500 uppercase tracking-tight">We leverage the latest in AI to deliver orbital user experiences.</div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="p-10 bg-slate-50 text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] rounded-3xl border-2 border-dashed border-slate-100">
                        Unknown Deployment Unit: {type}
                    </div>
                );
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className={cn(
                "relative group/block cursor-default transition-all duration-500 ring-offset-8 bg-white",
                isActive ? "ring-2 ring-primary-500 shadow-[0_40px_80px_-20px_rgba(37,99,235,0.25)] z-20 scale-[1.01]" : "hover:ring-2 hover:ring-primary-100 hover:shadow-xl",
                isDragging && "opacity-50 scale-105"
            )}
        >
            {/* Block Overlays / Controls */}
            <div className={cn(
                "absolute -left-16 top-0 flex flex-col gap-3 transition-all duration-500 opacity-0 group-hover/block:opacity-100",
                isActive && "opacity-100"
            )}>
                <div
                    {...attributes}
                    {...listeners}
                    className="w-11 h-11 bg-white shadow-2xl rounded-2xl text-slate-500 hover:text-primary-600 cursor-grab active:cursor-grabbing border border-slate-100 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                >
                    <GripVertical size={18} />
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
                    className="w-11 h-11 bg-white shadow-2xl rounded-2xl text-slate-500 hover:text-primary-600 border border-slate-100 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                >
                    <Copy size={18} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onRemove(); }}
                    className="w-11 h-11 bg-white shadow-2xl rounded-2xl text-red-400 hover:text-red-500 border border-slate-100 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            {/* Content Rendering */}
            <div className="overflow-hidden">
                {renderContent()}
            </div>

            {/* Selection indicator */}
            {isActive && (
                <div className="absolute top-4 right-4 px-4 py-1.5 bg-primary-600 text-[9px] font-black text-white uppercase tracking-[0.2em] rounded-full shadow-lg shadow-primary-500/30 flex items-center gap-2 animate-in fade-in zoom-in-95 duration-300">
                    <Sparkles size={10} />
                    {block.type} UNIT ACTIVE
                </div>
            )}
        </div>
    );
}

export default function EmailCanvas({ blocks, activeBlockId, setActiveBlockId, onRemoveBlock, onDuplicateBlock, previewMode }) {
    return (
        <div className={cn(
            "flex-1 overflow-y-auto p-12 lg:p-24 flex justify-center bg-[#f8f9fb] transition-all duration-1000 custom-scrollbar perspective-2000 relative",
            previewMode === 'mobile' && "bg-slate-200"
        )}>
            {/* Decorative background elements */}
            <div className="absolute top-20 left-20 w-64 h-64 bg-primary-100/30 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-100/30 rounded-full blur-[120px] pointer-events-none"></div>

            <div
                className={cn(
                    "bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12),0_0_1px_rgba(0,0,0,0.1)] min-h-[calc(100vh-20rem)] relative flex flex-col transition-all duration-1000 origin-top transform-gpu",
                    previewMode === 'mobile' ? "w-[390px] rounded-[48px] border-[12px] border-slate-900 shadow-2xl" : "w-[640px] rounded-[4px]"
                )}
                onClick={() => setActiveBlockId(null)}
            >
                {blocks.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center border-4 border-dashed border-slate-100 m-16 rounded-[40px] group hover:border-primary-200 transition-all duration-500 bg-slate-50/30">
                        <div className="w-24 h-24 bg-white shadow-xl rounded-[32px] flex items-center justify-center text-slate-300 mb-8 group-hover:text-primary-400 group-hover:shadow-primary-500/10 transition-all scale-100 group-hover:scale-110 group-hover:rotate-6">
                            <Mail size={48} strokeWidth={1} />
                        </div>
                        <p className="text-slate-900 font-black text-xs uppercase tracking-[0.4em]">Canvas Offline</p>
                        <p className="text-[10px] text-slate-500 mt-4 uppercase tracking-[0.2em] font-bold">Inject Deployment Units to Begin</p>
                        <div className="mt-8 flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col h-full animate-in fade-in duration-1000">
                        {blocks.map((block) => (
                            <SortableBlock
                                key={block.id}
                                id={block.id}
                                block={block}
                                isActive={activeBlockId === block.id}
                                onClick={() => setActiveBlockId(block.id)}
                                onRemove={() => onRemoveBlock(block.id)}
                                onDuplicate={() => onDuplicateBlock(block.id)}
                            />
                        ))}
                    </div>
                )}

                {/* Canvas End Marker */}
                <div className="h-32 bg-slate-50/30 border-t border-dashed border-slate-100 flex items-center justify-center opacity-60">
                    <div className="flex items-center gap-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.5em]">
                        <Command size={14} className="opacity-70" />
                        TERMINAL END SEQUENCE
                        <ShieldCheck size={14} className="opacity-70" />
                    </div>
                </div>
            </div>
        </div>
    );
}
