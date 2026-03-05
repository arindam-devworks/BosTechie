import React from 'react';
import {
    Type, Image as ImageIcon, MousePointer2, Minus, Grid,
    Share2, Maximize, Box, Layout, Columns, Sparkles, Zap
} from 'lucide-react';

export const BLOCKS = [
    { type: 'navbar', icon: Box, label: 'Orbital Header' },
    { type: 'text', icon: Type, label: 'Text Transmission' },
    { type: 'image', icon: ImageIcon, label: 'Visual Capture' },
    { type: 'button', icon: MousePointer2, label: 'C.T.A. Module' },
    { type: 'divider', icon: Minus, label: 'Sector Split' },
    { type: 'products', icon: Grid, label: 'Entity Grid' },
    { type: 'social', icon: Share2, label: 'Social Uplink' },
    { type: 'spacer', icon: Maximize, label: 'Vacuum Gap' },
    { type: 'footer', icon: Layout, label: 'Terminal Footer' },
    { type: 'columns', icon: Columns, label: 'Dual Pillars' }
];

export default function BlockLibrary({ onAddBlock }) {
    return (
        <div className="w-80 bg-white/70 backdrop-blur-xl border-r border-slate-100 flex flex-col h-full z-10 font-outfit">
            <div className="p-8 border-b border-slate-50">
                <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="text-primary-500" size={16} />
                    <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.2em]">Block Forge</h3>
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-7">Deployment Units</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
                <div className="grid grid-cols-2 gap-4">
                    {BLOCKS.map((block) => (
                        <button
                            key={block.type}
                            onClick={() => onAddBlock(block.type)}
                            className="flex flex-col items-center justify-center p-5 rounded-[24px] bg-slate-50/50 border border-transparent hover:border-primary-200 hover:bg-white hover:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.1)] transition-all duration-300 group active:scale-95"
                        >
                            <div className="w-12 h-12 rounded-[20px] bg-white border border-slate-100 flex items-center justify-center mb-4 group-hover:text-primary-600 group-hover:border-primary-100 shadow-sm transition-all group-hover:rotate-6">
                                <block.icon size={22} strokeWidth={1.5} className="text-slate-600" />
                            </div>
                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter group-hover:text-slate-900 text-center leading-tight">{block.label}</span>
                        </button>
                    ))}
                </div>

                <div className="p-5 bg-gradient-to-br from-primary-600 to-violet-600 rounded-[28px] border border-white/10 shadow-xl shadow-primary-500/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10 flex items-start gap-4">
                        <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                            <Zap className="text-white" size={16} />
                        </div>
                        <div>
                            <p className="text-[11px] text-white font-black uppercase tracking-widest mb-1.5 leading-none">Transmission Tip</p>
                            <p className="text-[10px] text-white/80 font-bold leading-relaxed uppercase tracking-tighter">
                                Drop units onto the canvas to architect your transmission sequence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
