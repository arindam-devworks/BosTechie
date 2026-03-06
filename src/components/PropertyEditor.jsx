import React from 'react';
import {
    X, Type, Palette, AlignLeft, AlignCenter,
    AlignRight, Maximize, Trash2, Copy, Settings,
    Sparkles, Info, CheckCircle2, Sliders,
    Facebook, Instagram, Twitter, Upload
} from 'lucide-react';

export default function PropertyEditor({ activeBlock, updateBlock, removeBlock, duplicateBlock, onClose }) {
    if (!activeBlock) {
        return (
            <div className="w-full lg:w-80 lg:shrink-0 bg-white/70 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col items-center justify-center p-8 lg:p-12 text-center font-outfit min-h-[200px] lg:min-h-0 lg:h-full">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-400 mb-4 lg:mb-6 shadow-inner border border-slate-100">
                    <Sliders size={32} strokeWidth={1.5} />
                </div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-4">Orbit Offline</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest font-bold">Select a component on the command canvas to calibrate its output parameters.</p>
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
        <div className="w-full lg:w-80 lg:shrink-0 bg-white/70 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col lg:h-full animate-in slide-in-from-bottom lg:slide-in-from-right duration-500 font-outfit min-h-[400px] lg:min-h-0">
            <div className="p-6 lg:p-8 border-b border-slate-50 flex items-center justify-between bg-white/50 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-primary-600 rounded-xl text-white shadow-lg shadow-primary-500/20">
                        <Settings size={18} />
                    </div>
                    <div>
                        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">{type} Module</h3>
                        <p className="text-[8px] text-primary-500 font-black uppercase tracking-[0.2em] mt-0.5">Calibration Mode</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-all hover:rotate-90">
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                {/* Common Actions: Logic Core */}
                <section className="space-y-4">
                    <div className="flex gap-3">
                        <button
                            onClick={() => duplicateBlock(activeBlock.id)}
                            className="flex-1 flex items-center justify-center gap-2.5 py-3 bg-slate-50 hover:bg-white border border-slate-100 rounded-[18px] text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 transition-all hover:shadow-xl active:scale-95"
                        >
                            <Copy size={14} /> Duplicate
                        </button>
                        <button
                            onClick={() => removeBlock(activeBlock.id)}
                            className="flex-1 flex items-center justify-center gap-2.5 py-3 bg-red-50/50 hover:bg-red-50 border border-red-100 rounded-[18px] text-[9px] font-black uppercase tracking-[0.2em] text-red-500 transition-all active:scale-95"
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
                            <label className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Transmission Body</label>
                        </div>

                        {type === 'text' && (
                            <textarea
                                value={content.text}
                                onChange={(e) => handleContentChange({ text: e.target.value })}
                                className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-[24px] text-[11px] font-bold text-slate-700 focus:ring-1 focus:ring-primary-500 focus:bg-white outline-none min-h-[140px] resize-none transition-all leading-relaxed shadow-inner"
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
                                    className="w-full p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-[11px] font-black text-slate-900 shadow-inner"
                                />
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Spectrum</span>
                                <div className="flex items-center gap-3 p-2 bg-slate-50/50 border border-slate-100 rounded-xl shadow-inner">
                                    <input
                                        type="color"
                                        value={style.textColor || '#000000'}
                                        onChange={(e) => handleStyleChange({ textColor: e.target.value })}
                                        className="w-6 h-6 rounded-lg cursor-pointer border-none p-0 bg-transparent overflow-hidden"
                                    />
                                    <span className="text-[9px] uppercase font-mono font-black text-slate-600 whitespace-nowrap">{style.textColor || '#000000'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Alignment Orientation</span>
                            <div className="flex gap-1.5 p-1.5 bg-slate-100 rounded-[18px] border border-slate-100 shadow-inner">
                                {['left', 'center', 'right'].map((align) => (
                                    <button
                                        key={align}
                                        onClick={() => handleStyleChange({ textAlign: align })}
                                        className={`flex-1 flex items-center justify-center p-2.5 rounded-xl transition-all ${style.textAlign === align ? 'bg-white shadow-md text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
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
                    <section className="space-y-6 pt-4 border-t border-slate-50 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-primary-500" />
                            <label className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Header Config</label>
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Logo Text</span>
                                <input
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-black text-slate-900 shadow-inner"
                                    value={content.logoText || ''}
                                    onChange={(e) => handleContentChange({ logoText: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Company Name</span>
                                <input
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-black text-slate-900 shadow-inner"
                                    value={content.companyName || ''}
                                    onChange={(e) => handleContentChange({ companyName: e.target.value })}
                                />
                            </div>

                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Navigation Links</span>
                                {(content.links || []).map((link, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            className="w-1/2 p-2 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-700 shadow-inner"
                                            value={link.label}
                                            placeholder="Label"
                                            onChange={(e) => {
                                                const newLinks = [...(content.links || [])];
                                                newLinks[index] = { ...newLinks[index], label: e.target.value };
                                                handleContentChange({ links: newLinks });
                                            }}
                                        />
                                        <input
                                            className="w-1/2 p-2 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-700 shadow-inner"
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
                    <section className="space-y-6 pt-4 border-t border-slate-50 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-primary-500" />
                            <label className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Terminal Config</label>
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Location / Address</span>
                                <input
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-black text-slate-900 shadow-inner"
                                    value={content.address || ''}
                                    onChange={(e) => handleContentChange({ address: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Disclaimer Message</span>
                                <textarea
                                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-700 shadow-inner min-h-[80px] resize-none"
                                    value={content.message || ''}
                                    onChange={(e) => handleContentChange({ message: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Copyright Text</span>
                                <input
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-black text-slate-900 shadow-inner"
                                    value={content.copyright || ''}
                                    onChange={(e) => handleContentChange({ copyright: e.target.value })}
                                />
                            </div>

                            <div className="space-y-3 pt-4 border-t border-slate-50">
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Unsubscribe Link</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={content.showUnsubscribe !== false}
                                            onChange={(e) => handleContentChange({ showUnsubscribe: e.target.checked })}
                                        />
                                        <div className="w-7 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary-500"></div>
                                    </label>
                                </div>
                                {content.showUnsubscribe !== false && (
                                    <input
                                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-black text-slate-900 shadow-inner"
                                        value={content.unsubscribeText !== undefined ? content.unsubscribeText : 'Unsubscribe from this frequency'}
                                        onChange={(e) => handleContentChange({ unsubscribeText: e.target.value })}
                                        placeholder="Unsubscribe Text"
                                    />
                                )}
                            </div>

                            <div className="space-y-3 pt-4 border-t border-slate-50">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Social Links</span>
                                <div className="space-y-3">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-6 text-slate-400"><Facebook size={14} /></div>
                                        <input
                                            className="flex-1 p-2 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-700 shadow-inner"
                                            value={(content.socialLinks || {}).facebook || ''}
                                            placeholder="Facebook URL"
                                            onChange={(e) => handleContentChange({ socialLinks: { ...(content.socialLinks || {}), facebook: e.target.value } })}
                                        />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <div className="w-6 text-slate-400"><Instagram size={14} /></div>
                                        <input
                                            className="flex-1 p-2 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-700 shadow-inner"
                                            value={(content.socialLinks || {}).instagram || ''}
                                            placeholder="Instagram URL"
                                            onChange={(e) => handleContentChange({ socialLinks: { ...(content.socialLinks || {}), instagram: e.target.value } })}
                                        />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <div className="w-6 text-slate-400"><Twitter size={14} /></div>
                                        <input
                                            className="flex-1 p-2 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-700 shadow-inner"
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
                <section className="space-y-6 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                        <Palette size={14} className="text-primary-500" />
                        <label className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Atmosphere</label>
                    </div>

                    <div className="space-y-3">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Backdrop Hue</span>
                        <div className="flex items-center gap-3 p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl shadow-inner">
                            <input
                                type="color"
                                value={style.bgColor || '#ffffff'}
                                onChange={(e) => handleStyleChange({ bgColor: e.target.value })}
                                className="w-8 h-8 rounded-lg cursor-pointer border-none p-0 bg-transparent overflow-hidden"
                            />
                            <span className="text-[10px] uppercase font-mono font-black text-slate-700">{style.bgColor || '#ffffff'}</span>
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
                    <section className="space-y-6 pt-4 border-t border-slate-50 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-primary-500" />
                            <label className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Optics Config</label>
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Source Uplink</span>
                                <input
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold text-slate-600 shadow-inner"
                                    value={content.src}
                                    placeholder="Enter image URL"
                                    onChange={(e) => handleContentChange({ src: e.target.value })}
                                />
                                <div className="flex items-center gap-3 py-1">
                                    <div className="h-px bg-slate-200 flex-1"></div>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">OR</span>
                                    <div className="h-px bg-slate-200 flex-1"></div>
                                </div>
                                <label className="flex items-center justify-center gap-2 w-full p-3 bg-white border border-primary-200 text-primary-600 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-primary-50 hover:border-primary-300 transition-all shadow-sm">
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
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-black text-slate-900 shadow-inner"
                                    value={style.borderRadius || 0}
                                    onChange={(e) => handleStyleChange({ borderRadius: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>
                    </section>
                )}

                {/* Button Specific: Command Portal */}
                {type === 'button' && (
                    <section className="space-y-6 pt-4 border-t border-slate-50 animate-in fade-in duration-500">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-primary-500" />
                            <label className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Portal Config</label>
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Callsign</span>
                                <input
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-black text-slate-900 shadow-inner"
                                    value={content.label}
                                    onChange={(e) => handleContentChange({ label: e.target.value })}
                                />
                            </div>
                            <div className="space-y-3">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Target Coordinates</span>
                                <input
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold text-slate-600 shadow-inner"
                                    value={content.url}
                                    onChange={(e) => handleContentChange({ url: e.target.value })}
                                />
                            </div>
                        </div>
                    </section>
                )}
            </div>

            <div className="p-8 border-t border-slate-50 bg-white/50 backdrop-blur-md shrink-0">
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
