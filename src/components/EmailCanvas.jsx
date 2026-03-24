import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    Copy, Trash2, GripVertical, Facebook,
    Instagram, Twitter, Mail, ExternalLink,
    Zap, Sparkles, Command, ShieldCheck,
    Plus, PenTool, Type, Image, MousePointer2, Play
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function SortableBlock({ id, block, isActive, onClick, onRemove, onDuplicate, onAddBlock, onUpdateBlock, index, isLast }) {
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
            paddingTop: `${blockStyle.paddingY || 0}px`,
            paddingBottom: `${blockStyle.paddingY || 0}px`,
            paddingLeft: `${blockStyle.paddingX || 0}px`,
            paddingRight: `${blockStyle.paddingX || 0}px`,
            marginTop: `${blockStyle.marginTop || 0}px`,
            marginBottom: `${blockStyle.marginBottom || 0}px`,
            color: blockStyle.textColor,
            textAlign: blockStyle.textAlign || 'center',
            fontSize: `${blockStyle.fontSize}px`,
            fontFamily: blockStyle.fontFamily === 'font-outfit' ? 'Outfit, sans-serif' : 
                        blockStyle.fontFamily === 'font-serif' ? 'serif' : 
                        blockStyle.fontFamily === 'font-mono' ? 'monospace' : 'inherit',
            fontWeight: blockStyle.fontWeight || '500',
            lineHeight: blockStyle.lineHeight || '1.6',
            letterSpacing: blockStyle.letterSpacing || '0em',
            borderRadius: `${blockStyle.borderRadius || 0}px`,
            borderWidth: `${blockStyle.borderWidth || 0}px`,
            borderColor: blockStyle.borderColor || 'transparent',
            borderStyle: blockStyle.borderWidth ? 'solid' : 'hidden'
        };

        switch (type) {
            case 'navbar':
                const logoAlignment = content.logoAlignment || 'left';
                
                const logoElement = content.logoImage ? (
                    <img
                        src={content.logoImage}
                        alt={content.logoAlt || 'Logo'}
                        style={{ width: `${content.logoWidth || 40}px`, height: 'auto', objectFit: 'contain' }}
                        className="block"
                    />
                ) : (
                    <div className="w-10 h-10 bg-orbit rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-primary-500/20 shrink-0">
                        {content.logoText || 'BO'}
                    </div>
                );

                const logoWrapper = content.logoUrl ? (
                    <a href={content.logoUrl} target="_blank" rel="noopener noreferrer" className="block cursor-pointer hover:opacity-90 transition-opacity">
                        {logoElement}
                    </a>
                ) : (
                    <div>{logoElement}</div>
                );

                let navLayoutClass = "flex items-center justify-between px-12";
                if (logoAlignment === 'center') {
                    navLayoutClass = "flex flex-col items-center justify-center px-12 gap-6";
                } else if (logoAlignment === 'right') {
                    navLayoutClass = "flex flex-row-reverse items-center justify-between px-12";
                }

                return (
                    <div className={navLayoutClass} style={containerStyle}>
                        <div className="flex items-center gap-3">
                            {logoWrapper}
                            {(!content.logoImage || content.companyName) && (
                                <span className="font-black tracking-tighter text-sm uppercase text-slate-900 dark:text-white">
                                    {content.companyName || (!content.logoImage ? 'BOSTECHIE ORBIT' : '')}
                                </span>
                            )}
                        </div>
                        <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
                            {(content.links || []).map((link, idx) => (
                                <a key={idx} href={link.url} className="hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer transition-colors block text-slate-900 dark:text-white">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                );
            case 'text':
                return (
                    <div 
                        className={cn("px-16 whitespace-pre-wrap leading-relaxed font-outfit", isActive && "outline-none ring-2 ring-primary-500/20 rounded-md cursor-text")} 
                        style={containerStyle}
                        contentEditable={isActive}
                        suppressContentEditableWarning
                        onBlur={(e) => onUpdateBlock && onUpdateBlock(block.id, { content: { ...content, text: e.currentTarget.innerText } })}
                    >
                        {content.text}
                    </div>
                );
            case 'image':
                const imageEl = (
                    <img 
                        src={content.src} 
                        alt={content.alt || "Template"} 
                        style={{ width: `${blockStyle.width || 100}%`, borderRadius: `${blockStyle.borderRadius || 0}px` }}
                        className="inline-block" 
                    />
                );
                return (
                    <div style={containerStyle} className="p-0 overflow-hidden relative">
                        <div style={{ textAlign: blockStyle.align || 'center' }}>
                            {content.url ? (
                                <a href={content.url} target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-90 transition-opacity">
                                    {imageEl}
                                </a>
                            ) : imageEl}
                        </div>
                    </div>
                );
            case 'button':
                return (
                    <div style={containerStyle}>
                        <a
                            href={content.url || '#'}
                            onClick={(e) => e.preventDefault()}
                            className="inline-flex items-center gap-3 transition-colors shadow-md hover:shadow-lg group/btn"
                            style={{ 
                                backgroundColor: blockStyle.textColor || '#000000', 
                                color: blockStyle.bgColor || '#ffffff',
                                borderRadius: `${blockStyle.borderRadius || 20}px`,
                                padding: `${blockStyle.btnPaddingY || 16}px ${blockStyle.btnPaddingX || 40}px`,
                                fontWeight: blockStyle.fontWeight || '900',
                                fontSize: `${blockStyle.fontSize || 13}px`,
                                letterSpacing: blockStyle.letterSpacing || '0em',
                                borderWidth: `${blockStyle.borderWidth || 0}px`,
                                borderColor: blockStyle.borderColor || 'transparent',
                                borderStyle: blockStyle.borderWidth ? 'solid' : 'hidden',
                                textDecoration: 'none'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = blockStyle.hoverBgColor || '#2563eb'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = blockStyle.textColor || '#000000'}
                        >
                            <span 
                                contentEditable={isActive}
                                suppressContentEditableWarning
                                onBlur={(e) => onUpdateBlock && onUpdateBlock(block.id, { content: { ...content, label: e.currentTarget.innerText.trim() } })}
                                className={cn(isActive && "outline-none border-b-2 border-primary-300/50 cursor-text min-w-[50px]")}
                            >
                                {content.label}
                            </span>
                            {content.url && <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform" />}
                        </a>
                    </div>
                );
            case 'divider':
                return (
                    <div style={containerStyle}>
                        <div 
                            style={{ 
                                borderTop: `${blockStyle.thickness || 1}px ${blockStyle.lineStyle || 'solid'} ${blockStyle.lineColor || '#e2e8f0'}`,
                                width: `${blockStyle.width || 100}%`,
                                margin: '0 auto'
                            }} 
                        />
                    </div>
                );
            case 'products':
                const cardCount = blockStyle.cardCount || 2;
                const columnsClass = `grid-cols-${blockStyle.columnCount || 2}`;
                const itemsToRender = (content.items || []).slice(0, cardCount);
                // Fill array if missing data
                while (itemsToRender.length < cardCount) {
                    itemsToRender.push({ title: 'Standard Unit', price: '$0.00', cta: 'Deploy Now', url: '#' });
                }

                return (
                    <div className="px-12" style={containerStyle}>
                        {(content.heading || content.subheading) && (
                            <div className="flex flex-col mb-8 px-4 text-center">
                                {content.heading && <h4 className="text-[16px] font-black uppercase tracking-[0.2em]">{content.heading}</h4>}
                                {content.subheading && <div className="text-[11px] font-bold text-primary-600 uppercase tracking-widest mt-2">{content.subheading}</div>}
                            </div>
                        )}
                        <div className={`grid gap-${Math.floor((blockStyle.gap || 32)/4)} ${columnsClass}`}>
                            {itemsToRender.map((item, i) => (
                                <div key={i} className="flex flex-col">
                                    {blockStyle.showImage !== false && (
                                        <div className="aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden relative shadow-sm border border-slate-200 dark:border-slate-800">
                                            <img src={`https://images.unsplash.com/photo-[INSERT]?w=300&h=400&fit=crop&q=${i * 10}`} style={{ display: 'none' }} />
                                            {/* Mock placeholder */}
                                            <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                                                <Zap className="text-slate-400 opacity-50" size={32} />
                                            </div>
                                        </div>
                                    )}
                                    <div className="mt-4 px-2 text-center flex-1 flex flex-col items-center">
                                        {blockStyle.showTitle !== false && <div className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{item.title}</div>}
                                        {blockStyle.showPrice !== false && <div className="text-[11px] text-primary-500 font-black mt-2">{item.price}</div>}
                                        {blockStyle.showCta !== false && (
                                            <a href={item.url} className="mt-4 px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white transition-colors">
                                                {item.cta}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'social':
                const platformIcons = {
                    facebook: Facebook,
                    instagram: Instagram,
                    twitter: Twitter,
                    linkedin: Command, 
                    youtube: Play
                };
                const activePlatforms = Object.entries(content.platforms || {})
                    .filter(([_, data]) => data.enabled)
                    .map(([key, data]) => ({ key, url: data.url }));

                return (
                    <div className="px-12 flex justify-center flex-wrap" style={{ ...containerStyle, gap: `${blockStyle.gap || 40}px` }}>
                        {activePlatforms.map(platform => {
                            const Icon = platformIcons[platform.key] || Sparkles;
                            return (
                                <a 
                                    key={platform.key}
                                    href={platform.url} 
                                    target="_blank" rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center transition-colors border border-slate-200 dark:border-slate-700"
                                    style={{ color: blockStyle.iconColor || '#94a3b8' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = blockStyle.hoverColor || '#2563eb'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = blockStyle.iconColor || '#94a3b8'}
                                >
                                    <Icon size={blockStyle.iconSize || 20} strokeWidth={1.5} />
                                </a>
                            );
                        })}
                        {activePlatforms.length === 0 && (
                            <div className="text-[10px] uppercase font-bold text-slate-400">No active network grids</div>
                        )}
                    </div>
                );
            case 'spacer':
                return (
                    <div style={{ height: `${blockStyle.paddingY}px`, backgroundColor: blockStyle.bgColor }} />
                );
            case 'footer':
                return (
                    <div className="px-12 text-center" style={containerStyle}>
                        {(content.companyName || content.contactEmail) && (
                            <div className="mb-8 font-black text-[12px] opacity-80 uppercase tracking-widest">
                                {content.companyName}
                                {content.contactEmail && <div className="text-[10px] font-bold text-primary-500 inline-block ml-2 opacity-100 lowercase tracking-normal">({content.contactEmail})</div>}
                            </div>
                        )}
                        <div className="space-y-4 text-[10px] tracking-[0.3em] font-black opacity-60 uppercase leading-relaxed max-w-sm mx-auto">
                            <p>{content.address || 'Location Terminal'}</p>
                            <p className="normal-case tracking-normal font-bold">
                                {content.message || 'System transmission verified.'}
                            </p>
                        </div>
                        <div className="mt-12 pt-8 border-t border-slate-500/20 flex flex-col gap-5 items-center">
                            <div className="flex items-center gap-6">
                                {content.showUnsubscribe !== false && (
                                    <a href={content.unsubscribeUrl || '#'} className="text-[10px] font-bold text-primary-500 hover:text-primary-400 underline decoration-primary-500/30 underline-offset-4 transition-colors">
                                        {content.unsubscribeText || 'Unsubscribe from this frequency'}
                                    </a>
                                )}
                                {content.showPreferences !== false && (
                                    <a href={content.preferencesUrl || '#'} className="text-[10px] font-bold text-primary-500 hover:text-primary-400 underline decoration-primary-500/30 underline-offset-4 transition-colors">
                                        {content.preferencesText || 'Manage Preferences'}
                                    </a>
                                )}
                            </div>
                            <div className="flex gap-4 opacity-40 hover:opacity-100 transition-opacity">
                                {content.termsUrl && <a href={content.termsUrl} className="text-[9px] uppercase font-bold tracking-widest hover:text-primary-500">Terms</a>}
                                {content.privacyUrl && <a href={content.privacyUrl} className="text-[9px] uppercase font-bold tracking-widest hover:text-primary-500">Privacy</a>}
                            </div>
                            <div className="text-[10px] font-black opacity-40 uppercase tracking-[0.5em] mt-2">
                                {content.copyright || '© 2026 ORBIT COMMAND'}
                            </div>
                        </div>
                    </div>
                );
            case 'columns':
                return (
                    <div 
                        className={cn(
                            "px-16 grid",
                            blockStyle.columnCount === 1 ? "grid-cols-1" :
                            blockStyle.columnCount === 2 ? "grid-cols-2" :
                            blockStyle.columnCount === 3 ? "grid-cols-3" : "grid-cols-4",
                            blockStyle.stackOnMobile ? "max-sm:grid-cols-1" : ""
                        )} 
                        style={{ ...containerStyle, gap: `${blockStyle.gap || 20}px` }}
                    >
                        {Array.from({ length: blockStyle.columnCount || 2 }).map((_, idx) => (
                            <div key={idx} className="space-y-6 group/col min-h-[100px] border border-dashed border-slate-100 dark:border-slate-700 rounded-[24px] flex flex-col items-center justify-center p-4">
                                <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">Pillar {idx + 1} Empty</span>
                            </div>
                        ))}
                    </div>
                );
            case 'sector_split':
                const splitRatio = blockStyle.layoutRatio || '1-1';
                const gridClass = splitRatio === '1-2' ? 'grid-cols-[1fr_2fr]' :
                                splitRatio === '2-1' ? 'grid-cols-[2fr_1fr]' : 'grid-cols-2';
                
                return (
                    <div 
                        className={cn("px-16 grid", gridClass, "gap-8")} 
                        style={containerStyle}
                    >
                        <div className="p-6 border border-dashed border-slate-100 dark:border-slate-700 rounded-[24px] flex items-center justify-center min-h-[120px]">
                            <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">Sector Alpha</span>
                        </div>
                        <div className="p-6 border border-dashed border-slate-100 dark:border-slate-700 rounded-[24px] flex items-center justify-center min-h-[120px]">
                            <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">Sector Beta</span>
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
                "relative group/block cursor-default transition-all duration-300 bg-transparent border-2 border-transparent my-1",
                isActive ? "border-primary-500 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.15)] z-20" : "hover:border-dashed hover:border-primary-300 dark:hover:border-primary-700 z-10",
                isDragging && "opacity-60 scale-102 shadow-[0_30px_60px_-15px_rgba(37,99,235,0.3)] border-primary-500 !border-solid z-50 cursor-grabbing"
            )}
        >
            {/* Top Add Divider */}
            <div className="absolute top-0 left-0 right-0 h-4 -translate-y-1/2 flex items-center justify-center z-40 opacity-0 group-hover/block:opacity-100 transition-opacity">
                <button 
                    onClick={(e) => { e.stopPropagation(); onAddBlock && onAddBlock('text', index); }}
                    className="bg-primary-600 text-white rounded-full py-1 shadow-lg border border-white dark:border-slate-800 hover:scale-110 active:scale-95 transition-all text-xs flex items-center gap-1 px-3 z-50 whitespace-nowrap"
                >
                    <Plus size={12} /> Add Section
                </button>
                <div className="absolute left-0 right-0 h-[2px] bg-primary-600 z-40" />
            </div>

            {/* Bottom Add Divider (only on last item) */}
            {isLast && (
                <div className="absolute bottom-0 left-0 right-0 h-4 translate-y-1/2 flex items-center justify-center z-40 opacity-0 group-hover/block:opacity-100 transition-opacity">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onAddBlock && onAddBlock('text', index + 1); }}
                        className="bg-primary-600 text-white rounded-full py-1 shadow-lg border border-white dark:border-slate-800 hover:scale-110 active:scale-95 transition-all text-xs flex items-center gap-1 px-3 z-50 whitespace-nowrap"
                    >
                        <Plus size={12} /> Add Section
                    </button>
                    <div className="absolute left-0 right-0 h-[2px] bg-primary-600 z-40" />
                </div>
            )}
            {/* Block Overlays / Controls */}
            <div className={cn(
                "absolute -top-12 right-0 flex gap-1.5 transition-all duration-300 opacity-0 group-hover/block:opacity-100 z-30",
                isActive && "opacity-100"
            )}>
                <button
                    onClick={(e) => { e.stopPropagation(); onClick(); }}
                    className="w-8 h-8 bg-primary-600 text-white shadow-xl rounded-full hover:bg-primary-500 flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-50"
                    title="Edit Properties"
                >
                    <PenTool size={14} />
                </button>
                <div className="flex bg-white dark:bg-slate-800 shadow-xl rounded-full border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div
                        {...attributes}
                        {...listeners}
                        className="w-8 h-8 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 cursor-grab active:cursor-grabbing hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center transition-all"
                    >
                        <GripVertical size={14} />
                    </div>
                    <div className="w-[1px] h-full bg-slate-200 dark:bg-slate-700" />
                    <button
                        onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
                        className="w-8 h-8 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center transition-all"
                    >
                        <Copy size={13} />
                    </button>
                    <div className="w-[1px] h-full bg-slate-200 dark:bg-slate-700" />
                    <button
                        onClick={(e) => { e.stopPropagation(); onRemove(); }}
                        className="w-8 h-8 text-red-500 hover:text-red-600 dark:text-red-400 flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                    >
                        <Trash2 size={13} />
                    </button>
                </div>
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

export default function EmailCanvas({ blocks, activeBlockId, setActiveBlockId, onRemoveBlock, onDuplicateBlock, previewMode, onAddBlock, onUpdateBlock }) {
    return (
        <div className={cn(
            "flex-1 overflow-y-auto p-4 lg:p-6 flex justify-center bg-[#f8f9fb] dark:bg-slate-900 transition-all duration-1000 custom-scrollbar perspective-2000 relative",
            previewMode === 'mobile' && "bg-slate-200 dark:bg-slate-700/80",
            previewMode === 'tablet' && "bg-slate-100 dark:bg-slate-700/60"
        )}>
            {/* Decorative background elements */}
            <div className="absolute top-20 left-20 w-64 h-64 bg-primary-100/30 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-100/30 rounded-full blur-[120px] pointer-events-none"></div>

            <div
                className={cn(
                    "bg-white dark:bg-slate-800 shadow-lg dark:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] relative flex flex-col transition-all duration-500 origin-top transform-gpu",
                    previewMode === 'mobile' ? "w-full max-w-[390px] rounded-[48px] border-[12px] border-slate-900 dark:border-white/10 shadow-2xl min-h-[800px]" :
                    previewMode === 'tablet' ? "w-full lg:max-w-[768px] rounded-[32px] border-[10px] border-slate-900 dark:border-white/10 shadow-2xl min-h-[900px]" :
                    "w-full max-w-[800px] rounded-2xl min-h-[800px]"
                )}
                onClick={() => setActiveBlockId(null)}
            >
                {blocks.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center border-4 border-dashed border-primary-500/20 m-4 lg:m-8 rounded-[40px] group hover:border-primary-500/50 hover:bg-primary-500/5 transition-all duration-500 bg-slate-50/50 dark:bg-slate-800/30 py-12">
                        <div className="w-24 h-24 bg-white dark:bg-slate-700 shadow-xl rounded-[32px] flex items-center justify-center text-primary-500 mb-6 scale-100 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                            <Zap size={40} strokeWidth={1.5} />
                        </div>
                        <p className="text-slate-900 dark:text-white font-black text-[13px] uppercase tracking-[0.3em] transition-colors">Workspace Ready</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 uppercase tracking-widest font-bold max-w-[280px] text-center leading-relaxed">
                            Initialize a fast layout to start building.
                        </p>
                        <div className="mt-8 flex gap-4 w-full max-w-sm px-6">
                            <button onClick={() => onAddBlock && onAddBlock('text')} className="flex-1 py-3 bg-white dark:bg-slate-700 rounded-xl shadow border border-slate-100 dark:border-slate-600 hover:border-primary-500 hover:text-primary-600 font-black text-[10px] uppercase tracking-widest transition-all text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2">
                                <Type size={14} /> Text
                            </button>
                            <button onClick={() => onAddBlock && onAddBlock('image')} className="flex-1 py-3 bg-white dark:bg-slate-700 rounded-xl shadow border border-slate-100 dark:border-slate-600 hover:border-primary-500 hover:text-primary-600 font-black text-[10px] uppercase tracking-widest transition-all text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2">
                                <Image size={14} /> Image
                            </button>
                            <button onClick={() => onAddBlock && onAddBlock('button')} className="flex-1 py-3 bg-white dark:bg-slate-700 rounded-xl shadow border border-slate-100 dark:border-slate-600 hover:border-primary-500 hover:text-primary-600 font-black text-[10px] uppercase tracking-widest transition-all text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2">
                                <MousePointer2 size={14} /> CTA
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col h-full animate-in fade-in duration-1000">
                        {blocks.map((block, index) => (
                            <SortableBlock
                                key={block.id}
                                id={block.id}
                                block={block}
                                isActive={activeBlockId === block.id}
                                onClick={() => setActiveBlockId(block.id)}
                                onRemove={() => onRemoveBlock(block.id)}
                                onDuplicate={() => onDuplicateBlock(block.id)}
                                onAddBlock={onAddBlock}
                                onUpdateBlock={onUpdateBlock}
                                index={index}
                                isLast={index === blocks.length - 1}
                            />
                        ))}
                    </div>
                )}

                {/* Canvas End Marker */}
                <div className="h-32 bg-slate-50/30 dark:bg-slate-800/30 border-t border-dashed border-slate-100 dark:border-slate-700 flex items-center justify-center opacity-60">
                    <div className="flex items-center gap-4 text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.5em]">
                        <Command size={14} className="opacity-70" />
                        TERMINAL END SEQUENCE
                        <ShieldCheck size={14} className="opacity-70" />
                    </div>
                </div>
            </div>
        </div>
    );
}
