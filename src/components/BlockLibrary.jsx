import {
    ChevronLeft,
    ChevronRight,
    Box,
    Type,
    Image as ImageIcon,
    MousePointer2,
    Minus,
    Grid,
    Share2,
    Maximize,
    Layout,
    Columns,
    Sparkles,
    Zap
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

export default function BlockLibrary({ onAddBlock, isCollapsed, onToggle }) {
    return (
        <div className={`transition-all duration-500 ${isCollapsed ? 'w-0 lg:w-20' : 'w-full lg:w-80'} lg:shrink-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 flex flex-col lg:h-full z-20 font-outfit max-h-[300px] lg:max-h-none overflow-hidden relative`}>

            {/* Collapse Toggle */}
            <button
                onClick={onToggle}
                className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-12 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full items-center justify-center text-slate-400 hover:text-primary-500 shadow-lg z-50 transition-all"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            <div className={`p-4 lg:p-8 border-b border-slate-50 dark:border-slate-800/50 shrink-0 ${isCollapsed ? 'lg:px-4' : ''}`}>
                <div className={`flex items-center gap-3 mb-1 lg:mb-2 ${isCollapsed ? 'justify-center' : ''}`}>
                    <Sparkles className="text-primary-500 shrink-0" size={16} />
                    {!isCollapsed && <h3 className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] whitespace-nowrap">Block Forge</h3>}
                </div>
                {!isCollapsed && <p className="hidden lg:block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-7">Deployment Units</p>}
            </div>

            <div className={`flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar space-y-6 lg:space-y-8 ${isCollapsed ? 'lg:p-3' : ''}`}>
                <div className={`grid ${isCollapsed ? 'grid-cols-1' : 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-2'} gap-3 lg:gap-4`}>
                    {BLOCKS.map((block) => (
                        <button
                            key={block.type}
                            onClick={() => onAddBlock(block.type)}
                            title={block.label}
                            className={`flex flex-col items-center justify-center p-5 rounded-[24px] bg-slate-50/50 dark:bg-slate-800/50 border border-transparent hover:border-primary-200 dark:hover:border-primary-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-[0_15px_30px_-5px_rgba(37,99,235,0.1)] transition-all duration-300 group active:scale-95 ${isCollapsed ? 'lg:p-3' : ''}`}
                        >
                            <div className={`${isCollapsed ? 'w-10 h-10 rounded-xl mb-0' : 'w-12 h-12 rounded-[20px] mb-4'} bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 flex items-center justify-center group-hover:text-primary-600 group-hover:border-primary-100 dark:group-hover:border-primary-800 shadow-sm transition-all group-hover:rotate-6 shrink-0`}>
                                <block.icon size={isCollapsed ? 18 : 22} strokeWidth={1.5} className="text-slate-600 dark:text-slate-400" />
                            </div>
                            {!isCollapsed && <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter group-hover:text-slate-900 dark:group-hover:text-white text-center leading-tight">{block.label}</span>}
                        </button>
                    ))}
                </div>

                {!isCollapsed && (
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
                )}
            </div>
        </div>);
}
