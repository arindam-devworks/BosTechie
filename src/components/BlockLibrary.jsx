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
    Zap,
    Repeat,
    X
} from 'lucide-react';

export const CATEGORIES = [
    {
        title: 'Basic Dynamics',
        blocks: [
            { type: 'text', icon: Type, label: 'Text Transmission' },
            { type: 'image', icon: ImageIcon, label: 'Visual Capture' },
            { type: 'button', icon: MousePointer2, label: 'C.T.A. Module' },
            { type: 'spacer', icon: Maximize, label: 'Vacuum Gap' }
        ]
    },
    {
        title: 'Structural Layout',
        blocks: [
            { type: 'columns', icon: Columns, label: 'Dual Pillars' },
            { type: 'sector_split', icon: Repeat, label: 'Sector Split' },
            { type: 'divider', icon: Minus, label: 'Sector Line' }
        ]
    },
    {
        title: 'Advanced Modules',
        blocks: [
            { type: 'navbar', icon: Box, label: 'Orbital Header' },
            { type: 'products', icon: Grid, label: 'Entity Grid' },
            { type: 'social', icon: Share2, label: 'Social Uplink' },
            { type: 'footer', icon: Layout, label: 'Terminal Footer' }
        ]
    }
];

export default function BlockLibrary({ onAddBlock, isCollapsed, onToggle }) {
    return (
        <div className={`transition-all duration-300 ease-in-out shrink-0 ${isCollapsed ? 'w-0 xl:w-[60px]' : 'w-[320px]'} h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col xl:overflow-visible z-20 font-outfit relative ${isCollapsed ? 'overflow-hidden' : ''}`}>

            {/* Collapse Toggle */}
            <button
                onClick={onToggle}
                className="hidden xl:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-10 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full items-center justify-center text-slate-400 hover:text-primary-500 hover:scale-110 shadow-md z-[100] transition-all"
                title={isCollapsed ? "Expand BlockForge" : "Collapse BlockForge"}
            >
                {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
            </button>

            {isCollapsed ? (
                /* Collapsed Slim Rail (xl only) */
                <div className="hidden xl:flex flex-col items-center h-full py-4 space-y-4 w-full animate-in fade-in duration-300">
                    <button onClick={onToggle} title="Open BlockForge" className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-primary-500 hover:bg-white dark:hover:bg-slate-700 shadow-sm transition-all group active:scale-95">
                        <Sparkles size={16} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <div className="w-6 h-px bg-slate-200 dark:bg-slate-700"></div>
                </div>
            ) : (
                /* Full Expanded Panel */
                <div className="flex flex-col h-full w-[320px] animate-in fade-in duration-300">
                    {/* Panel Header */}
                    <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 shrink-0 bg-slate-50 dark:bg-slate-900">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Sparkles className="text-primary-500 shrink-0" size={13} />
                                <div>
                                    <h3 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] leading-none">Block Forge</h3>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Deployment Units</p>
                                </div>
                            </div>
                            <button onClick={onToggle} className="xl:hidden p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-400 transition-colors">
                                <X size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Block List */}
                    <div className="flex-1 overflow-y-auto px-3 py-3 custom-scrollbar space-y-4">
                        {CATEGORIES.map((category, catIdx) => (
                            <div key={catIdx}>
                                <div className="flex items-center gap-1.5 mb-2 px-1">
                                    <div className="w-1 h-1 rounded-full bg-primary-500 shrink-0"></div>
                                    <h4 className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{category.title}</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {category.blocks.map((block) => (
                                        <button
                                            key={block.type}
                                            onClick={() => onAddBlock(block.type)}
                                            title={block.label}
                                            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-transparent hover:border-primary-200 dark:hover:border-primary-900 hover:bg-white dark:hover:bg-slate-700 hover:shadow-md transition-all duration-200 group active:scale-95"
                                        >
                                            <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 flex items-center justify-center group-hover:text-primary-600 group-hover:border-primary-100 dark:group-hover:border-primary-800 shadow-sm transition-all group-hover:-rotate-3 mb-2 shrink-0">
                                                <block.icon size={16} strokeWidth={1.5} className="text-slate-500 dark:text-slate-400" />
                                            </div>
                                            <span className="text-[8.5px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-tight group-hover:text-slate-800 dark:group-hover:text-white text-center leading-tight">{block.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Tip Card - Compact */}
                        <div className="p-3 bg-gradient-to-br from-primary-600 to-violet-600 rounded-xl border border-white/10 shadow-md shadow-primary-500/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8 blur-xl"></div>
                            <div className="relative z-10 flex items-start gap-2.5">
                                <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                                    <Zap className="text-white" size={12} />
                                </div>
                                <div>
                                    <p className="text-[8px] text-white font-black uppercase tracking-widest mb-1 leading-none">Tip</p>
                                    <p className="text-[8px] text-white/80 font-bold leading-relaxed uppercase tracking-tighter">
                                        Click blocks to add them to your canvas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
