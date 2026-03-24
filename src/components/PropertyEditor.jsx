import {
    ChevronLeft,
    ChevronRight,
    Sliders,
    Settings,
    X,
    Copy,
    Trash2,
    Type,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Sparkles,
    Facebook,
    Instagram,
    Twitter,
    Palette,
    Upload,
    CheckCircle2,
    Type as TypeIcon,
    Bold,
    AlignJustify,
    Maximize2,
    MoveHorizontal,
    Layout as LayoutIcon,
    Columns as ColumnsIcon,
    Layers as LayersIcon,
    Zap,
    Repeat,
    Smartphone,
    Minus,
    MousePointer2
} from 'lucide-react';

// Import font families from the designer
import { FONT_FAMILIES } from './EmailDesigner';

export default function PropertyEditor({ activeBlock, updateBlock, removeBlock, duplicateBlock, onClose, isCollapsed, onToggle }) {
    if (!activeBlock) {
        return (
            <div className="relative h-full shrink-0 z-20 font-outfit">
                <div className={`transition-all duration-300 ease-in-out h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center ${isCollapsed ? 'w-0 overflow-hidden border-none' : 'w-[360px] p-6'}`}>
                    {!isCollapsed && (
                        <>
                            <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 shadow-inner border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center text-slate-400 mb-4 shrink-0">
                                <Sliders size={24} strokeWidth={1.5} />
                            </div>
                            <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-2 shrink-0">Properties Panel</h4>
                            <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-widest font-bold max-w-[200px] shrink-0">Click any block on the canvas to edit its content and design.</p>
                        </>
                    )}
                </div>

                {/* Collapse Toggle */}
                <button
                    onClick={onToggle}
                    className="hidden xl:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-10 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full items-center justify-center text-slate-400 hover:text-primary-500 shadow-md z-[100] transition-all"
                >
                    {isCollapsed ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
                </button>
            </div>
        );
    }

    const { type, content, style } = activeBlock;

    const handleStyleChange = (updates) => {
        updateBlock(activeBlock.id, { style: { ...style, ...updates } });
    };

    const handleContentChange = (updates) => {
        updateBlock(activeBlock.id, { content: { ...content, ...updates } });
    };

    return (
        <div className="relative h-full shrink-0 z-20 font-outfit">
            {/* Collapse Toggle */}
            <button
                onClick={onToggle}
                className="hidden xl:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-10 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full items-center justify-center text-slate-400 hover:text-primary-500 shadow-md z-[100] transition-all"
            >
                {isCollapsed ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
            </button>

            <div className={`transition-all duration-300 ease-in-out h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col ${isCollapsed ? 'w-0 overflow-hidden border-none' : 'w-[360px]'}`}>

            {/* Compact Header */}
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700/70 shrink-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-600 rounded-xl text-white shadow-lg shadow-primary-500/20 flex items-center justify-center shrink-0">
                            <Settings size={15} />
                        </div>
                        <div>
                            <h3 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] leading-none">{type} Module</h3>
                            <p className="text-[7px] text-primary-500 font-black uppercase tracking-[0.2em] mt-1">Calibration Mode</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 transition-all">
                        <X size={16} />
                    </button>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => duplicateBlock(activeBlock.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-500 hover:text-primary-600 transition-all"
                    >
                        <Copy size={11} /> Duplicate
                    </button>
                    <button
                        onClick={() => removeBlock(activeBlock.id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-red-50/50 dark:bg-red-900/20 border border-red-100/50 dark:border-red-900/50 rounded-lg text-[8px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-900/40 transition-all"
                    >
                        <Trash2 size={11} /> Eject
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5 custom-scrollbar space-y-8">
                {/* Typography Settings: Text Engine */}
                {(type === 'text' || type === 'button' || type === 'footer' || type === 'navbar') && (
                    <section className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Type size={14} className="text-primary-500 opacity-70" />
                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Transmission Body (Typography)</label>
                        </div>

                        {type === 'text' && (
                            <textarea
                                value={content.text}
                                onChange={(e) => handleContentChange({ text: e.target.value })}
                                className="w-full p-5 bg-slate-50/50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 rounded-[24px] text-[11px] font-bold text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-primary-500 focus:bg-white dark:focus:bg-slate-800 outline-none min-h-[140px] resize-none transition-all leading-relaxed shadow-inner"
                                placeholder="Enter transmission data..."
                            />
                        )}

                        <div className="space-y-4">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Typeface Command</span>
                            <select
                                value={style.fontFamily || 'font-outfit'}
                                onChange={(e) => handleStyleChange({ fontFamily: e.target.value })}
                                className="w-full p-3 bg-slate-50/50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-black text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-primary-500 transition-all appearance-none cursor-pointer"
                            >
                                {FONT_FAMILIES.map(f => (
                                    <option key={f.value} value={f.value}>{f.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest px-1">Weight</span>
                                <select
                                    value={style.fontWeight || '500'}
                                    onChange={(e) => handleStyleChange({ fontWeight: e.target.value })}
                                    className="w-full p-3 bg-slate-50/50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-black text-slate-900 dark:text-white outline-none"
                                >
                                    <option value="300">Light</option>
                                    <option value="400">Regular</option>
                                    <option value="500">Medium</option>
                                    <option value="600">SemiBold</option>
                                    <option value="700">Bold</option>
                                    <option value="900">Black</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest px-1">Leading</span>
                                <input
                                    type="text"
                                    value={style.lineHeight || '1.6'}
                                    onChange={(e) => handleStyleChange({ lineHeight: e.target.value })}
                                    placeholder="1.6"
                                    className="w-full p-3 bg-slate-50/50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-black text-slate-900 dark:text-white shadow-inner"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest px-1">Tracking (Letter Space)</span>
                            <select
                                value={style.letterSpacing || '0em'}
                                onChange={(e) => handleStyleChange({ letterSpacing: e.target.value })}
                                className="w-full p-3 bg-slate-50/50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-black text-slate-900 dark:text-white outline-none"
                            >
                                <option value="-0.05em">Tighter</option>
                                <option value="-0.02em">Tight</option>
                                <option value="0em">Normal</option>
                                <option value="0.05em">Wide</option>
                                <option value="0.1em">Widest</option>
                                <option value="0.2em">Ultra Wide</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest px-1">Scale (px)</span>
                                <input
                                    type="number"
                                    value={style.fontSize || 16}
                                    onChange={(e) => handleStyleChange({ fontSize: parseInt(e.target.value) })}
                                    className="w-full p-3 bg-slate-50/50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-black text-slate-900 dark:text-white shadow-inner"
                                />
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Spectrum</span>
                                <div className="flex items-center gap-3 p-2 bg-slate-50/50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 rounded-xl shadow-inner">
                                    <input
                                        type="color"
                                        value={style.textColor || '#000000'}
                                        onChange={(e) => handleStyleChange({ textColor: e.target.value })}
                                        className="w-6 h-6 rounded-lg cursor-pointer border-none p-0 bg-transparent overflow-hidden"
                                    />
                                    <span className="text-[9px] uppercase font-mono font-black text-slate-600 dark:text-slate-400 whitespace-nowrap">{style.textColor || '#000000'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Alignment Orientation</span>
                            <div className="flex gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-700 rounded-[18px] border border-slate-100 dark:border-slate-600 shadow-inner">
                                {['left', 'center', 'right', 'justify'].map((align) => (
                                    <button
                                        key={align}
                                        onClick={() => handleStyleChange({ textAlign: align })}
                                        className={`flex-1 flex items-center justify-center p-2.5 rounded-xl transition-all ${style.textAlign === align ? 'bg-white dark:bg-slate-700 shadow-md text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                    >
                                        {align === 'left' && <AlignLeft size={16} />}
                                        {align === 'center' && <AlignCenter size={16} />}
                                        {align === 'right' && <AlignRight size={16} />}
                                        {align === 'justify' && <AlignJustify size={16} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Spacing Engine: Geometric Flux */}
                <section className="space-y-8 pt-4 border-t border-slate-50 dark:border-slate-700/50">
                    <div className="flex items-center gap-2">
                        <MoveHorizontal size={14} className="text-primary-500 opacity-70" />
                        <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Geometric Flux (Spacing)</label>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <div className="flex justify-between px-1">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Vertical Padding (px)</span>
                                <span className="text-[10px] font-black text-primary-500">{style.paddingY || 0}</span>
                            </div>
                            <input
                                type="range" min="0" max="160" step="4"
                                value={style.paddingY || 0}
                                onChange={(e) => handleStyleChange({ paddingY: parseInt(e.target.value) })}
                                className="w-full accent-primary-600 h-1 bg-slate-100 dark:bg-slate-700 rounded-full appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between px-1">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Horizontal Buffer (px)</span>
                                <span className="text-[10px] font-black text-primary-500">{style.paddingX || 0}</span>
                            </div>
                            <input
                                type="range" min="0" max="100" step="4"
                                value={style.paddingX || 0}
                                onChange={(e) => handleStyleChange({ paddingX: parseInt(e.target.value) })}
                                className="w-full accent-primary-600 h-1 bg-slate-100 dark:bg-slate-700 rounded-full appearance-none cursor-pointer"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 text-center">
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">Margin Top</span>
                                <input
                                    type="number"
                                    value={style.marginTop || 0}
                                    onChange={(e) => handleStyleChange({ marginTop: parseInt(e.target.value) })}
                                    className="w-full p-2 bg-slate-50/50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 rounded-xl text-[10px] font-black text-center"
                                />
                            </div>
                            <div className="space-y-2 text-center">
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-2">Margin Bottom</span>
                                <input
                                    type="number"
                                    value={style.marginBottom || 0}
                                    onChange={(e) => handleStyleChange({ marginBottom: parseInt(e.target.value) })}
                                    className="w-full p-2 bg-slate-50/50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 rounded-xl text-[10px] font-black text-center"
                                />
                            </div>
                        </div>
                    </div>
                </section>


                {/* Navbar Specific: Header Config */}
                {type === 'navbar' && (
                    <section className="space-y-6 pt-4 border-t border-slate-50 dark:border-slate-700/50 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-primary-500" />
                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Header Config</label>
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Logo Media</span>
                                {content.logoImage ? (
                                    <div className="space-y-4">
                                        <div className="relative group rounded-xl overflow-hidden border border-slate-100 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
                                            <div className="aspect-video w-full flex items-center justify-center p-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]">
                                                <img src={content.logoImage} alt="Logo preview" className="max-h-full max-w-full object-contain" />
                                            </div>
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                                                <label className="p-2 cursor-pointer bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors">
                                                    <Upload size={14} />
                                                    <input
                                                        type="file"
                                                        accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    handleContentChange({ logoImage: reader.result });
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                                <button
                                                    onClick={() => handleContentChange({ logoImage: '' })}
                                                    className="p-2 cursor-pointer bg-red-500/80 hover:bg-red-500 rounded-lg text-white transition-colors"
                                                    title="Remove Logo"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div className="flex justify-between px-1">
                                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Logo Size</span>
                                                <span className="text-[10px] font-black text-primary-600 dark:text-primary-400">{content.logoWidth || 40}PX</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="20"
                                                max="300"
                                                value={content.logoWidth || 40}
                                                onChange={(e) => handleContentChange({ logoWidth: parseInt(e.target.value) })}
                                                className="w-full accent-primary-600 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full appearance-none cursor-pointer"
                                            />
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Alignment</span>
                                            <div className="flex gap-1.5 p-1.5 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-100 dark:border-slate-600 shadow-inner">
                                                {['left', 'center', 'right'].map((align) => (
                                                    <button
                                                        key={align}
                                                        onClick={() => handleContentChange({ logoAlignment: align })}
                                                        className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-all ${
                                                            (content.logoAlignment || 'left') === align 
                                                                ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-primary-400' 
                                                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                                        }`}
                                                    >
                                                        {align === 'left' && <AlignLeft size={14} />}
                                                        {align === 'center' && <AlignCenter size={14} />}
                                                        {align === 'right' && <AlignRight size={14} />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Alt Text (Optional)</span>
                                            <input
                                                className="w-full p-2 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-inner"
                                                value={content.logoAlt || ''}
                                                onChange={(e) => handleContentChange({ logoAlt: e.target.value })}
                                                placeholder="Logo alt text"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Link URL (Optional)</span>
                                            <input
                                                className="w-full p-2 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-inner"
                                                value={content.logoUrl || ''}
                                                onChange={(e) => handleContentChange({ logoUrl: e.target.value })}
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center p-6 bg-slate-50/50 dark:bg-slate-700/50 border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-all">
                                        <div className="w-10 h-10 bg-white dark:bg-slate-700 shadow-sm rounded-full flex items-center justify-center text-primary-500 mb-3">
                                            <Upload size={16} />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">Upload Logo</span>
                                        <span className="text-[9px] text-slate-400 mt-1 uppercase tracking-widest text-center">PNG, JPG, SVG</span>
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        handleContentChange({ logoImage: reader.result });
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </label>
                                )}
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Logo Text (Fallback)</span>
                                <input
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-black text-slate-900 dark:text-white shadow-inner"
                                    value={content.logoText || ''}
                                    onChange={(e) => handleContentChange({ logoText: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Company Name</span>
                                <input
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-black text-slate-900 dark:text-white shadow-inner"
                                    value={content.companyName || ''}
                                    onChange={(e) => handleContentChange({ companyName: e.target.value })}
                                />
                            </div>

                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Navigation Links</span>
                                {(content.links || []).map((link, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            className="w-1/2 p-2 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-inner"
                                            value={link.label}
                                            placeholder="Label"
                                            onChange={(e) => {
                                                const newLinks = [...(content.links || [])];
                                                newLinks[index] = { ...newLinks[index], label: e.target.value };
                                                handleContentChange({ links: newLinks });
                                            }}
                                        />
                                        <input
                                            className="w-1/2 p-2 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-inner"
                                            value={link.url}
                                            placeholder="URL"
                                            onChange={(e) => {
                                                const newLinks = [...(content.links || [])];
                                                newLinks[index] = { ...newLinks[index], url: e.target.value };
                                                handleContentChange({ links: newLinks });
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer Specific: Terminal Config */}
                {type === 'footer' && (
                    <section className="space-y-6 pt-4 border-t border-slate-50 dark:border-slate-700/50 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-primary-500" />
                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Terminal Config</label>
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Location / Address</span>
                                <input
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-black text-slate-900 dark:text-white shadow-inner"
                                    value={content.address || ''}
                                    onChange={(e) => handleContentChange({ address: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Disclaimer Message</span>
                                <textarea
                                    className="w-full p-4 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-inner min-h-[80px] resize-none"
                                    value={content.message || ''}
                                    onChange={(e) => handleContentChange({ message: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Copyright Text</span>
                                <input
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-black text-slate-900 dark:text-white shadow-inner"
                                    value={content.copyright || ''}
                                    onChange={(e) => handleContentChange({ copyright: e.target.value })}
                                />
                            </div>

                            <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-700/50">
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Unsubscribe Link</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={content.showUnsubscribe !== false}
                                            onChange={(e) => handleContentChange({ showUnsubscribe: e.target.checked })}
                                        />
                                        <div className="w-7 h-4 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-slate-300 after:border-slate-300 dark:after:border-slate-500 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary-500"></div>
                                    </label>
                                </div>
                                {content.showUnsubscribe !== false && (
                                    <div className="space-y-3 mt-3">
                                        <input
                                            className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-black text-slate-900 dark:text-white shadow-inner"
                                            value={content.unsubscribeText !== undefined ? content.unsubscribeText : 'Unsubscribe from this frequency'}
                                            onChange={(e) => handleContentChange({ unsubscribeText: e.target.value })}
                                            placeholder="Unsubscribe Text"
                                        />
                                        <input
                                            className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-bold text-slate-700 dark:text-slate-300 shadow-inner"
                                            value={content.unsubscribeUrl || ''}
                                            onChange={(e) => handleContentChange({ unsubscribeUrl: e.target.value })}
                                            placeholder="Target URL (e.g. {{unsubscribe_link}})"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-700/50">
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Preferences Link</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={content.showPreferences !== false}
                                            onChange={(e) => handleContentChange({ showPreferences: e.target.checked })}
                                        />
                                        <div className="w-7 h-4 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-slate-300 after:border-slate-300 dark:after:border-slate-500 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary-500"></div>
                                    </label>
                                </div>
                                {content.showPreferences !== false && (
                                    <div className="space-y-3 mt-3">
                                        <input
                                            className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-black text-slate-900 dark:text-white shadow-inner"
                                            value={content.preferencesText !== undefined ? content.preferencesText : 'Manage Preferences'}
                                            onChange={(e) => handleContentChange({ preferencesText: e.target.value })}
                                            placeholder="Preferences Text"
                                        />
                                        <input
                                            className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-bold text-slate-700 dark:text-slate-300 shadow-inner"
                                            value={content.preferencesUrl || ''}
                                            onChange={(e) => handleContentChange({ preferencesUrl: e.target.value })}
                                            placeholder="Target URL (e.g. {{preferences_link}})"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-700/50">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Social Links</span>
                                <div className="space-y-3">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-6 text-slate-400"><Facebook size={14} /></div>
                                        <input
                                            className="flex-1 p-2 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-inner"
                                            value={(content.socialLinks || {}).facebook || ''}
                                            placeholder="Facebook URL"
                                            onChange={(e) => handleContentChange({ socialLinks: { ...(content.socialLinks || {}), facebook: e.target.value } })}
                                        />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <div className="w-6 text-slate-400"><Instagram size={14} /></div>
                                        <input
                                            className="flex-1 p-2 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-inner"
                                            value={(content.socialLinks || {}).instagram || ''}
                                            placeholder="Instagram URL"
                                            onChange={(e) => handleContentChange({ socialLinks: { ...(content.socialLinks || {}), instagram: e.target.value } })}
                                        />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <div className="w-6 text-slate-400"><Twitter size={14} /></div>
                                        <input
                                            className="flex-1 p-2 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-inner"
                                            value={(content.socialLinks || {}).twitter || ''}
                                            placeholder="Twitter URL"
                                            onChange={(e) => handleContentChange({ socialLinks: { ...(content.socialLinks || {}), twitter: e.target.value } })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Appearance Settings: Visual Frame */}
                <section className="space-y-6 pt-4 border-t border-slate-50 dark:border-slate-700/50">
                    <div className="flex items-center gap-2">
                        <Palette size={14} className="text-primary-500" />
                        <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Atmosphere (Skin)</label>
                    </div>

                    <div className="space-y-3">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Backdrop Hue</span>
                        <div className="flex items-center gap-3 p-2.5 bg-slate-50/50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600 rounded-xl shadow-inner">
                            <input
                                type="color"
                                value={style.bgColor || '#ffffff'}
                                onChange={(e) => handleStyleChange({ bgColor: e.target.value })}
                                className="w-8 h-8 rounded-lg cursor-pointer border-none p-0 bg-transparent overflow-hidden"
                            />
                            <span className="text-[10px] uppercase font-mono font-black text-slate-700 dark:text-slate-300">{style.bgColor || '#ffffff'}</span>
                        </div>
                    </div>
                </section>

                {/* Column Configuration: Pillar Engine */}
                {type === 'columns' && (
                    <section className="space-y-8 pt-4 border-t border-slate-50 dark:border-slate-700/50 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                            <ColumnsIcon size={14} className="text-primary-500" />
                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Pillar Engine (Columns)</label>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Column Count</span>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4].map(num => (
                                        <button
                                            key={num}
                                            onClick={() => handleStyleChange({ columnCount: num })}
                                            className={`flex-1 py-2 rounded-xl text-[10px] font-black border transition-all ${style.columnCount === num ? 'bg-primary-600 border-primary-500 text-white' : 'bg-slate-50 dark:bg-slate-700 border-slate-100 dark:border-slate-600 text-slate-500 hover:bg-white dark:hover:bg-slate-700'}`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between px-1">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Inter-Pillar Gap (px)</span>
                                    <span className="text-[10px] font-black text-primary-500">{style.gap || 0}</span>
                                </div>
                                <input
                                    type="range" min="0" max="80" step="4"
                                    value={style.gap || 0}
                                    onChange={(e) => handleStyleChange({ gap: parseInt(e.target.value) })}
                                    className="w-full accent-primary-600 h-1 bg-slate-100 dark:bg-slate-700 rounded-full appearance-none cursor-pointer"
                                />
                            </div>

                            <label className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-2xl border border-slate-100 dark:border-slate-600 cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <Smartphone size={14} className="text-slate-400 group-hover:text-primary-500 transition-colors" />
                                    <span className="text-[9px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">Stack on Mobile</span>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={style.stackOnMobile !== false}
                                    onChange={(e) => handleStyleChange({ stackOnMobile: e.target.checked })}
                                    className="accent-primary-600 w-4 h-4 cursor-pointer"
                                />
                            </label>
                        </div>
                    </section>
                )}


                {/* Image Specific: Visual Optics */}
                {type === 'image' && (
                    <section className="space-y-8 pt-4 border-t border-slate-50 dark:border-slate-700/50 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-primary-500" />
                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Optics Config</label>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Source Uplink</span>
                                <input
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-400 shadow-inner"
                                    value={content.src}
                                    placeholder="Enter image URL"
                                    onChange={(e) => handleContentChange({ src: e.target.value })}
                                />
                                <label className="flex items-center justify-center gap-2 w-full p-3 bg-white dark:bg-slate-700 border border-primary-200 dark:border-primary-800/50 text-primary-600 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-primary-50 transition-all">
                                    <Upload size={14} /> Upload Media
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => handleContentChange({ src: reader.result });
                                            reader.readAsDataURL(file);
                                        }
                                    }} />
                                </label>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between px-1">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Scaling (%)</span>
                                    <span className="text-[10px] font-black text-primary-600">{style.width || 100}%</span>
                                </div>
                                <input
                                    type="range" min="10" max="100" step="5"
                                    value={style.width || 100}
                                    onChange={(e) => handleStyleChange({ width: parseInt(e.target.value) })}
                                    className="w-full accent-primary-600 h-1 bg-slate-100 dark:bg-slate-700 rounded-full appearance-none cursor-pointer"
                                />
                            </div>

                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Alignment</span>
                                <div className="flex gap-2 p-1.5 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-100 dark:border-slate-600">
                                    {['left', 'center', 'right'].map((align) => (
                                        <button
                                            key={align}
                                            onClick={() => handleStyleChange({ align })}
                                            className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-all ${style.align === align ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600' : 'text-slate-400'}`}
                                        >
                                            {align === 'left' && <AlignLeft size={14} />}
                                            {align === 'center' && <AlignCenter size={14} />}
                                            {align === 'right' && <AlignRight size={14} />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Sector Radius (px)</span>
                                <input
                                    type="number"
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-black text-slate-900 dark:text-white"
                                    value={style.borderRadius || 0}
                                    onChange={(e) => handleStyleChange({ borderRadius: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>
                    </section>
                )}

                {/* Divider Settings: Sector Split (Line) */}
                {type === 'divider' && (
                    <section className="space-y-8 pt-4 border-t border-slate-50 dark:border-slate-700/50 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                            <Minus size={14} className="text-primary-500" />
                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Sector Line (Divider)</label>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Line Pattern</span>
                                <div className="flex gap-2">
                                    {['solid', 'dashed', 'dotted'].map(pattern => (
                                        <button
                                            key={pattern}
                                            onClick={() => handleStyleChange({ lineStyle: pattern })}
                                            className={`flex-1 py-2 rounded-xl text-[9px] font-black border transition-all uppercase tracking-widest ${style.lineStyle === pattern ? 'bg-primary-600 border-primary-500 text-white' : 'bg-slate-50 dark:bg-slate-700 border-slate-100 dark:border-slate-600 text-slate-500'}`}
                                        >
                                            {pattern}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Thickness</span>
                                    <input
                                        type="number"
                                        value={style.thickness || 1}
                                        onChange={(e) => handleStyleChange({ thickness: parseInt(e.target.value) })}
                                        className="w-full p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-black text-center"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Width (%)</span>
                                    <input
                                        type="number"
                                        value={style.width || 100}
                                        onChange={(e) => handleStyleChange({ width: parseInt(e.target.value) })}
                                        className="w-full p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-black text-center"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Line Hue</span>
                                <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl">
                                    <input
                                        type="color"
                                        value={style.lineColor || '#e2e8f0'}
                                        onChange={(e) => handleStyleChange({ lineColor: e.target.value })}
                                        className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent"
                                    />
                                    <span className="text-[10px] font-mono font-black text-slate-600 uppercase">{style.lineColor || '#e2e8f0'}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Sector Split (Ratio Layout) */}
                {type === 'sector_split' && (
                    <section className="space-y-8 pt-4 border-t border-slate-50 dark:border-slate-700/50 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                            <Repeat size={14} className="text-primary-500" />
                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Sector Split (Ratio)</label>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Layout Ratio</span>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { label: '1/3 - 2/3', value: '1-2' },
                                        { label: '1/2 - 1/2', value: '1-1' },
                                        { label: '2/3 - 1/3', value: '2-1' }
                                    ].map(ratio => (
                                        <button
                                            key={ratio.value}
                                            onClick={() => handleStyleChange({ layoutRatio: ratio.value })}
                                            className={`py-2 rounded-xl text-[8px] font-black border transition-all uppercase tracking-widest ${style.layoutRatio === ratio.value ? 'bg-primary-600 border-primary-500 text-white' : 'bg-slate-50 dark:bg-slate-700 border-slate-100 dark:border-slate-600 text-slate-500'}`}
                                        >
                                            {ratio.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Horizontal Orientation</span>
                                <div className="flex gap-2 p-1.5 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-100 dark:border-slate-600 shadow-inner">
                                    {['left', 'center', 'right'].map((align) => (
                                        <button
                                            key={align}
                                            onClick={() => handleStyleChange({ textAlign: align })}
                                            className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-all ${style.textAlign === align ? 'bg-white dark:bg-slate-700 shadow-md text-primary-600' : 'text-slate-500'}`}
                                        >
                                            {align === 'left' && <AlignLeft size={14} />}
                                            {align === 'center' && <AlignCenter size={14} />}
                                            {align === 'right' && <AlignRight size={14} />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Spacer Settings: Vacuum Gap */}
                {type === 'spacer' && (
                    <section className="space-y-6 pt-4 border-t border-slate-50 dark:border-slate-700/50 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                            <Maximize2 size={14} className="text-primary-500" />
                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Vacuum Gap (Spacer)</label>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between px-1">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Void Height (px)</span>
                                <span className="text-[10px] font-black text-primary-500">{style.height || 60}PX</span>
                            </div>
                            <input
                                type="range" min="10" max="200" step="10"
                                value={style.height || 60}
                                onChange={(e) => handleStyleChange({ height: parseInt(e.target.value) })}
                                className="w-full accent-primary-600 h-1 bg-slate-100 dark:bg-slate-700 rounded-full appearance-none cursor-pointer"
                            />
                        </div>
                    </section>
                )}


                {/* Button Specific: Command Portal */}
                {type === 'button' && (
                    <section className="space-y-8 pt-4 border-t border-slate-50 dark:border-slate-700/50 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                            <MousePointer2 size={14} className="text-primary-500" />
                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Portal Config (Button)</label>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Callsign</span>
                                <input
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-black text-slate-900 dark:text-white shadow-inner"
                                    value={content.label}
                                    onChange={(e) => handleContentChange({ label: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Target Coordinates</span>
                                <input
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-400 shadow-inner"
                                    value={content.url}
                                    onChange={(e) => handleContentChange({ url: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Radius</span>
                                    <input
                                        type="number"
                                        value={style.borderRadius || 0}
                                        onChange={(e) => handleStyleChange({ borderRadius: parseInt(e.target.value) })}
                                        className="w-full p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-black text-center"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Hover Glow</span>
                                    <input
                                        type="color"
                                        value={style.hoverBgColor || '#2563eb'}
                                        onChange={(e) => handleStyleChange({ hoverBgColor: e.target.value })}
                                        className="w-full h-10 cursor-pointer p-1 bg-transparent border-none rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Product Inventory Specifics */}
                {type === 'products' && (
                    <section className="space-y-8 pt-4 border-t border-slate-50 dark:border-slate-700/50 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                            <LayersIcon size={14} className="text-primary-500" />
                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Fleet Grid Config</label>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Layout Configuration</span>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Columns</span>
                                        <select
                                            value={style.columnCount || 2}
                                            onChange={(e) => handleStyleChange({ columnCount: parseInt(e.target.value) })}
                                            className="w-full p-2 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-black"
                                        >
                                            <option value="1">1 Column</option>
                                            <option value="2">2 Columns</option>
                                            <option value="3">3 Columns</option>
                                            <option value="4">4 Columns</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Card Count</span>
                                        <input
                                            type="number" min="1" max="12"
                                            value={style.cardCount || 2}
                                            onChange={(e) => handleStyleChange({ cardCount: parseInt(e.target.value) })}
                                            className="w-full p-2 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-[11px] font-black text-center"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Visibility Matrix</span>
                                <div className="space-y-2 p-4 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-2xl">
                                    {['showImage', 'showTitle', 'showPrice', 'showCta'].map(toggle => (
                                        <label key={toggle} className="flex items-center justify-between py-1.5 cursor-pointer group">
                                            <span className="text-[9px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest group-hover:text-primary-500 transition-colors">
                                                {toggle.replace('show', '')} Element
                                            </span>
                                            <input
                                                type="checkbox"
                                                checked={style[toggle] !== false}
                                                onChange={(e) => handleStyleChange({ [toggle]: e.target.checked })}
                                                className="accent-primary-600 w-3 h-3 cursor-pointer"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Social Component Config */}
                {type === 'social' && (
                    <section className="space-y-8 pt-4 border-t border-slate-50 dark:border-slate-700/50 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-primary-500" />
                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Network Grid Config</label>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Platform Toggles</span>
                                {(content.platforms && Object.keys(content.platforms).length > 0) ? Object.entries(content.platforms).map(([platform, data]) => (
                                    <div key={platform} className="p-3 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl space-y-3">
                                        <label className="flex items-center justify-between cursor-pointer group">
                                            <span className="text-[10px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest group-hover:text-primary-500 capitalize">{platform}</span>
                                            <input
                                                type="checkbox"
                                                checked={data.enabled}
                                                onChange={(e) => {
                                                    const updated = { ...content.platforms, [platform]: { ...data, enabled: e.target.checked } };
                                                    handleContentChange({ platforms: updated });
                                                }}
                                                className="accent-primary-600 w-4 h-4 cursor-pointer"
                                            />
                                        </label>
                                        {data.enabled && (
                                            <input
                                                type="text"
                                                value={data.url}
                                                placeholder={`https://${platform}.com/...`}
                                                onChange={(e) => {
                                                    const updated = { ...content.platforms, [platform]: { ...data, url: e.target.value } };
                                                    handleContentChange({ platforms: updated });
                                                }}
                                                className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-400"
                                            />
                                        )}
                                    </div>
                                )) : <div className="text-[10px] text-slate-400">Add default social platforms in component settings to configure.</div>}
                            </div>
                        </div>
                    </section>
                )}
            </div>

            <div className={`p-8 border-t border-slate-50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shrink-0 ${isCollapsed ? 'hidden' : ''}`}>
                <button
                    onClick={onClose}
                    className="w-full py-4 bg-primary-600 text-white rounded-[20px] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-primary-700 shadow-xl shadow-primary-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
                >
                    Initialize Changes
                    <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                </button>
            </div>
        </div>
        </div>
    );
}
