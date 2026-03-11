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
    CheckCircle2
} from 'lucide-react';

export default function PropertyEditor({ activeBlock, updateBlock, removeBlock, duplicateBlock, onClose, isCollapsed, onToggle }) {
    if (!activeBlock) {
        return (
            <div className={`transition-all duration-500 ${isCollapsed ? 'w-0 lg:w-20' : 'w-full lg:w-80'} lg:shrink-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center p-8 lg:p-12 text-center font-outfit min-h-[200px] lg:min-h-0 lg:h-full relative overflow-hidden`}>
                {!isCollapsed && (
                    <>
                        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-slate-50 dark:bg-slate-800 rounded-[32px] flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4 lg:mb-6 shadow-inner border border-slate-100 dark:border-slate-700">
                            <Sliders size={32} strokeWidth={1.5} />
                        </div>
                        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-4">Orbit Offline</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-widest font-bold">Select a component on the command canvas to calibrate its output parameters.</p>
                    </>
                )}

                {/* Collapse Toggle */}
                <button
                    onClick={onToggle}
                    className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-12 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full items-center justify-center text-slate-400 hover:text-primary-500 shadow-lg z-50 transition-all"
                >
                    {isCollapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
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
        <div className={`transition-all duration-500 ${isCollapsed ? 'w-0 lg:w-20' : 'w-full lg:w-80'} lg:shrink-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 flex flex-col lg:h-full animate-in slide-in-from-bottom lg:slide-in-from-right duration-500 font-outfit min-h-[400px] lg:min-h-0 relative overflow-hidden`}>

            {/* Collapse Toggle */}
            <button
                onClick={onToggle}
                className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-12 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full items-center justify-center text-slate-400 hover:text-primary-500 shadow-lg z-50 transition-all"
            >
                {isCollapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
            </button>

            <div className={`p-6 lg:p-8 border-b border-slate-50 dark:border-slate-800/50 flex items-center justify-between bg-white/50 dark:bg-slate-900/50 shrink-0 ${isCollapsed ? 'lg:px-4 lg:justify-center' : ''}`}>
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-primary-600 rounded-xl text-white shadow-lg shadow-primary-500/20 shrink-0">
                        <Settings size={18} />
                    </div>
                    {!isCollapsed && (
                        <div>
                            <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">{type} Module</h3>
                            <p className="text-[8px] text-primary-500 font-black uppercase tracking-[0.2em] mt-0.5">Calibration Mode</p>
                        </div>
                    )}
                </div>
                {!isCollapsed && (
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 transition-all hover:rotate-90">
                        <X size={20} />
                    </button>
                )}
            </div>

            <div className={`flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar ${isCollapsed ? 'lg:hidden' : ''}`}>
                {/* Common Actions: Logic Core */}
                <section className="space-y-4">
                    <div className="flex gap-3">
                        <button
                            onClick={() => duplicateBlock(activeBlock.id)}
                            className="flex-1 flex items-center justify-center gap-2.5 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700 rounded-[18px] text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300 transition-all hover:shadow-xl active:scale-95"
                        >
                            <Copy size={14} /> Duplicate
                        </button>
                        <button
                            onClick={() => removeBlock(activeBlock.id)}
                            className="flex-1 flex items-center justify-center gap-2.5 py-3 bg-red-50/50 dark:bg-red-900/20 hover:bg-red-50 dark:hover:bg-red-900/30 border border-red-100 dark:border-red-900/50 rounded-[18px] text-[9px] font-black uppercase tracking-[0.2em] text-red-500 transition-all active:scale-95"
                        >
                            <Trash2 size={14} /> Eject
                        </button>
                    </div>
                </section>

                {/* Typography Settings: Text Engine */}
                {(type === 'text' || type === 'button' || type === 'footer' || type === 'navbar') && (
                    <section className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Type size={14} className="text-primary-500 opacity-70" />
                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Transmission Body</label>
                        </div>

                        {type === 'text' && (
                            <textarea
                                value={content.text}
                                onChange={(e) => handleContentChange({ text: e.target.value })}
                                className="w-full p-5 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-[24px] text-[11px] font-bold text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-primary-500 focus:bg-white dark:focus:bg-slate-800 outline-none min-h-[140px] resize-none transition-all leading-relaxed shadow-inner"
                                placeholder="Enter transmission data..."
                            />
                        )}

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest px-1">Scale (px)</span>
                                <input
                                    type="number"
                                    value={style.fontSize || 16}
                                    onChange={(e) => handleStyleChange({ fontSize: parseInt(e.target.value) })}
                                    className="w-full p-3 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-xl text-[11px] font-black text-slate-900 dark:text-white shadow-inner"
                                />
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Spectrum</span>
                                <div className="flex items-center gap-3 p-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-xl shadow-inner">
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
                            <div className="flex gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-[18px] border border-slate-100 dark:border-slate-700 shadow-inner">
                                {['left', 'center', 'right'].map((align) => (
                                    <button
                                        key={align}
                                        onClick={() => handleStyleChange({ textAlign: align })}
                                        className={`flex-1 flex items-center justify-center p-2.5 rounded-xl transition-all ${style.textAlign === align ? 'bg-white dark:bg-slate-700 shadow-md text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                                    >
                                        {align === 'left' && <AlignLeft size={16} />}
                                        {align === 'center' && <AlignCenter size={16} />}
                                        {align === 'right' && <AlignRight size={16} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Navbar Specific: Header Config */}
                {type === 'navbar' && (
                    <section className="space-y-6 pt-4 border-t border-slate-50 dark:border-slate-800/50 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-primary-500" />
                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Header Config</label>
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Logo Media</span>
                                {content.logoImage ? (
                                    <div className="space-y-4">
                                        <div className="relative group rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
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
                                            <div className="flex gap-1.5 p-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-inner">
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
                                                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-inner"
                                                value={content.logoAlt || ''}
                                                onChange={(e) => handleContentChange({ logoAlt: e.target.value })}
                                                placeholder="Logo alt text"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Link URL (Optional)</span>
                                            <input
                                                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-inner"
                                                value={content.logoUrl || ''}
                                                onChange={(e) => handleContentChange({ logoUrl: e.target.value })}
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center p-6 bg-slate-50/50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-primary-300 dark:hover:border-primary-700 transition-all">
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
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-[11px] font-black text-slate-900 dark:text-white shadow-inner"
                                    value={content.logoText || ''}
                                    onChange={(e) => handleContentChange({ logoText: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Company Name</span>
                                <input
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-[11px] font-black text-slate-900 dark:text-white shadow-inner"
                                    value={content.companyName || ''}
                                    onChange={(e) => handleContentChange({ companyName: e.target.value })}
                                />
                            </div>

                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Navigation Links</span>
                                {(content.links || []).map((link, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            className="w-1/2 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-inner"
                                            value={link.label}
                                            placeholder="Label"
                                            onChange={(e) => {
                                                const newLinks = [...(content.links || [])];
                                                newLinks[index] = { ...newLinks[index], label: e.target.value };
                                                handleContentChange({ links: newLinks });
                                            }}
                                        />
                                        <input
                                            className="w-1/2 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-inner"
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
                    <section className="space-y-6 pt-4 border-t border-slate-50 dark:border-slate-800/50 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-primary-500" />
                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Terminal Config</label>
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Location / Address</span>
                                <input
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-[11px] font-black text-slate-900 dark:text-white shadow-inner"
                                    value={content.address || ''}
                                    onChange={(e) => handleContentChange({ address: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Disclaimer Message</span>
                                <textarea
                                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-inner min-h-[80px] resize-none"
                                    value={content.message || ''}
                                    onChange={(e) => handleContentChange({ message: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Copyright Text</span>
                                <input
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-[11px] font-black text-slate-900 dark:text-white shadow-inner"
                                    value={content.copyright || ''}
                                    onChange={(e) => handleContentChange({ copyright: e.target.value })}
                                />
                            </div>

                            <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-800/50">
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
                                    <input
                                        className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-[11px] font-black text-slate-900 dark:text-white shadow-inner"
                                        value={content.unsubscribeText !== undefined ? content.unsubscribeText : 'Unsubscribe from this frequency'}
                                        onChange={(e) => handleContentChange({ unsubscribeText: e.target.value })}
                                        placeholder="Unsubscribe Text"
                                    />
                                )}
                            </div>

                            <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Social Links</span>
                                <div className="space-y-3">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-6 text-slate-400"><Facebook size={14} /></div>
                                        <input
                                            className="flex-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-inner"
                                            value={(content.socialLinks || {}).facebook || ''}
                                            placeholder="Facebook URL"
                                            onChange={(e) => handleContentChange({ socialLinks: { ...(content.socialLinks || {}), facebook: e.target.value } })}
                                        />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <div className="w-6 text-slate-400"><Instagram size={14} /></div>
                                        <input
                                            className="flex-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-inner"
                                            value={(content.socialLinks || {}).instagram || ''}
                                            placeholder="Instagram URL"
                                            onChange={(e) => handleContentChange({ socialLinks: { ...(content.socialLinks || {}), instagram: e.target.value } })}
                                        />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <div className="w-6 text-slate-400"><Twitter size={14} /></div>
                                        <input
                                            className="flex-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-inner"
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
                <section className="space-y-6 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                    <div className="flex items-center gap-2">
                        <Palette size={14} className="text-primary-500" />
                        <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Atmosphere</label>
                    </div>

                    <div className="space-y-3">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Backdrop Hue</span>
                        <div className="flex items-center gap-3 p-2.5 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-xl shadow-inner">
                            <input
                                type="color"
                                value={style.bgColor || '#ffffff'}
                                onChange={(e) => handleStyleChange({ bgColor: e.target.value })}
                                className="w-8 h-8 rounded-lg cursor-pointer border-none p-0 bg-transparent overflow-hidden"
                            />
                            <span className="text-[10px] uppercase font-mono font-black text-slate-700 dark:text-slate-300">{style.bgColor || '#ffffff'}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between px-1">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Vertical Padding</span>
                            <span className="text-[10px] font-black text-primary-600">{style.paddingY || 20}PX</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="160"
                            value={style.paddingY || 20}
                            onChange={(e) => handleStyleChange({ paddingY: parseInt(e.target.value) })}
                            className="w-full accent-primary-600 h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer"
                        />
                    </div>
                </section>

                {/* Image Specific: Visual Optics */}
                {type === 'image' && (
                    <section className="space-y-6 pt-4 border-t border-slate-50 dark:border-slate-800/50 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-primary-500" />
                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Optics Config</label>
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Source Uplink</span>
                                <input
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-400 shadow-inner"
                                    value={content.src}
                                    placeholder="Enter image URL"
                                    onChange={(e) => handleContentChange({ src: e.target.value })}
                                />
                                <div className="flex items-center gap-3 py-1">
                                    <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">OR</span>
                                    <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
                                </div>
                                <label className="flex items-center justify-center gap-2 w-full p-3 bg-white dark:bg-slate-800 border border-primary-200 dark:border-primary-800/50 text-primary-600 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-primary-50 dark:hover:bg-slate-700 hover:border-primary-300 transition-all shadow-sm">
                                    <Upload size={14} />
                                    Upload Media
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    handleContentChange({ src: reader.result });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                </label>
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Sector Radius</span>
                                <input
                                    type="number"
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-[11px] font-black text-slate-900 dark:text-white shadow-inner"
                                    value={style.borderRadius || 0}
                                    onChange={(e) => handleStyleChange({ borderRadius: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>
                    </section>
                )}

                {/* Button Specific: Command Portal */}
                {type === 'button' && (
                    <section className="space-y-6 pt-4 border-t border-slate-50 dark:border-slate-800/50 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-primary-500" />
                            <label className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Portal Config</label>
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Callsign</span>
                                <input
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-[11px] font-black text-slate-900 dark:text-white shadow-inner"
                                    value={content.label}
                                    onChange={(e) => handleContentChange({ label: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Target Coordinates</span>
                                <input
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-[11px] font-bold text-slate-600 dark:text-slate-400 shadow-inner"
                                    value={content.url}
                                    onChange={(e) => handleContentChange({ url: e.target.value })}
                                />
                            </div>
                        </div>
                    </section>
                )}
            </div>

            <div className={`p-8 border-t border-slate-50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md shrink-0 ${isCollapsed ? 'hidden' : ''}`}>
                <button
                    onClick={onClose}
                    className="w-full py-4 bg-primary-600 text-white rounded-[20px] font-black text-[11px] uppercase tracking-[0.3em] hover:bg-primary-700 shadow-xl shadow-primary-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
                >
                    Initialize Changes
                    <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                </button>
            </div>
        </div>
    );
}
