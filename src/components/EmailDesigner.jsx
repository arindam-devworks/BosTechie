import React, { useState, useCallback, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Undo2, Redo2, Monitor, Smartphone, Download, Sparkles, Layers, ShieldCheck } from 'lucide-react';

import BlockLibrary from './BlockLibrary';
import PropertyEditor from './PropertyEditor';
import EmailCanvas from './EmailCanvas';

export const DEFAULT_STYLES = {
    navbar: { bgColor: '#ffffff', textColor: '#0f172a', paddingY: 30, fontSize: 14 },
    text: { bgColor: '#ffffff', textColor: '#475569', paddingY: 40, fontSize: 15, textAlign: 'left' },
    image: { bgColor: '#ffffff', paddingY: 0, borderRadius: 0 },
    button: { bgColor: '#ffffff', textColor: '#ffffff', paddingY: 40, fontSize: 14 },
    divider: { bgColor: '#ffffff', paddingY: 30 },
    products: { bgColor: '#f8fafc', textColor: '#0f172a', paddingY: 60 },
    social: { bgColor: '#ffffff', paddingY: 30 },
    spacer: { bgColor: '#ffffff', paddingY: 60 },
    footer: { bgColor: '#0f172a', textColor: '#94a3b8', paddingY: 80, fontSize: 11 },
    columns: { bgColor: '#ffffff', paddingY: 60 }
};

export const DEFAULT_CONTENT = {
    navbar: {
        logoText: 'BO',
        companyName: 'Bostechie Orbit',
        links: [
            { label: 'DEVICES', url: '#' },
            { label: 'FLEET', url: '#' },
            { label: 'UPLINK', url: '#' }
        ]
    },
    text: { text: "The future belongs to those who prepare for it today. This transmission contains vital coordinates for your next orbital objective. Ensure clarity and impact in every sector of your message." },
    image: { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200' },
    button: { label: 'Initialize Objective', url: '#' },
    products: { title: 'Fleet Inventory' },
    footer: {
        address: 'Orbit Sector 7G | Bostechie Terminal',
        message: 'You are synchronized with this sequence because you are a verified Bostechie Entity.',
        copyright: '© 2026 BOSTECHIE ORBIT COMMAND',
        socialLinks: {
            facebook: '#',
            instagram: '#',
            twitter: '#'
        },
        showUnsubscribe: true,
        unsubscribeText: 'Unsubscribe from this frequency'
    }
};

export default function EmailDesigner({ blocks, setBlocks, activeBlockId, setActiveBlockId }) {
    const [previewMode, setPreviewMode] = useState('desktop');
    const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
    const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
    const [focusMode, setFocusMode] = useState(false);

    // History for Undo/Redo
    const [history, setHistory] = useState([]);
    const [historyStep, setHistoryStep] = useState(-1);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    // Handle responsive auto-collapse
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1200) {
                setLeftPanelCollapsed(true);
                setRightPanelCollapsed(true);
            } else {
                setLeftPanelCollapsed(false);
                setRightPanelCollapsed(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Ensure only one side panel is open on medium screens
    const toggleLeftPanel = () => {
        if (!leftPanelCollapsed) {
            setLeftPanelCollapsed(true);
        } else {
            setLeftPanelCollapsed(false);
            if (window.innerWidth < 1200) {
                setRightPanelCollapsed(true);
            }
        }
    };

    const toggleRightPanel = () => {
        if (!rightPanelCollapsed) {
            setRightPanelCollapsed(true);
        } else {
            setRightPanelCollapsed(false);
            if (window.innerWidth < 1200) {
                setLeftPanelCollapsed(true);
            }
        }
    };

    const saveToHistory = useCallback((currentBlocks) => {
        const newHistory = history.slice(0, historyStep + 1);
        newHistory.push(JSON.stringify(currentBlocks));
        if (newHistory.length > 20) newHistory.shift();
        setHistory(newHistory);
        setHistoryStep(newHistory.length - 1);
    }, [history, historyStep]);

    const undo = () => {
        if (historyStep > 0) {
            const nextStep = historyStep - 1;
            setBlocks(JSON.parse(history[nextStep]));
            setHistoryStep(nextStep);
        }
    };

    const redo = () => {
        if (historyStep < history.length - 1) {
            const nextStep = historyStep + 1;
            setBlocks(JSON.parse(history[nextStep]));
            setHistoryStep(nextStep);
        }
    };

    const addBlock = (type) => {
        const newBlock = {
            id: `block-${Date.now()}`,
            type,
            content: { ...DEFAULT_CONTENT[type] },
            style: { ...DEFAULT_STYLES[type] }
        };
        const newBlocks = [...blocks, newBlock];
        setBlocks(newBlocks);
        setActiveBlockId(newBlock.id);
        saveToHistory(newBlocks);

        // Auto-open right panel when a block is added
        setRightPanelCollapsed(false);
        if (window.innerWidth < 1200) setLeftPanelCollapsed(true);
    };

    // Auto-open property editor when a block is selected
    useEffect(() => {
        if (activeBlockId) {
            setRightPanelCollapsed(false);
            if (window.innerWidth < 1200) setLeftPanelCollapsed(true);
        }
    }, [activeBlockId]);

    const updateBlock = (id, updates) => {
        const newBlocks = blocks.map(b => b.id === id ? {
            ...b,
            content: updates.content ? { ...b.content, ...updates.content } : b.content,
            style: updates.style ? { ...b.style, ...updates.style } : b.style
        } : b);
        setBlocks(newBlocks);
        saveToHistory(newBlocks);
    };

    const removeBlock = (id) => {
        const newBlocks = blocks.filter(b => b.id !== id);
        setBlocks(newBlocks);
        if (activeBlockId === id) setActiveBlockId(null);
        saveToHistory(newBlocks);
    };

    const duplicateBlock = (id) => {
        const index = blocks.findIndex(b => b.id === id);
        if (index === -1) return;
        const blockToCopy = blocks[index];
        const newBlock = {
            ...JSON.parse(JSON.stringify(blockToCopy)),
            id: `block-${Date.now()}`
        };
        const newBlocks = [...blocks];
        newBlocks.splice(index + 1, 0, newBlock);
        setBlocks(newBlocks);
        setActiveBlockId(newBlock.id);
        saveToHistory(newBlocks);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setBlocks((items) => {
                const oldIndex = items.findIndex(i => i.id === active.id);
                const newIndex = items.findIndex(i => i.id === over.id);
                if (oldIndex === -1 || newIndex === -1) return items;
                const newItems = arrayMove(items, oldIndex, newIndex);
                saveToHistory(newItems);
                return newItems;
            });
        }
    };

    const handleSaveTemplate = async () => {
        // Mock save sequence
        alert('Transmission sequence cached to orbital database!');
    };

    return (
        <div className={`flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#fcfcfd] dark:bg-[#0b0f19] font-outfit min-h-0 relative ${focusMode ? 'z-50' : ''}`}>

            {/* Sidebar Toggles (Visible on medium/small screens) */}
            <div className="lg:hidden absolute top-20 left-4 z-40 flex flex-col gap-3">
                <button
                    onClick={toggleLeftPanel}
                    className="w-10 h-10 bg-white dark:bg-slate-800 shadow-xl rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 border border-slate-100 dark:border-slate-700 transition-all hover:scale-110"
                >
                    <Layers size={18} />
                </button>
            </div>

            <div className="lg:hidden absolute top-20 right-4 z-40 flex flex-col gap-3">
                <button
                    onClick={toggleRightPanel}
                    className="w-10 h-10 bg-white dark:bg-slate-800 shadow-xl rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 border border-slate-100 dark:border-slate-700 transition-all hover:scale-110"
                >
                    <Monitor size={18} />
                </button>
            </div>

            <BlockLibrary onAddBlock={addBlock} isCollapsed={leftPanelCollapsed} onToggle={() => setLeftPanelCollapsed(!leftPanelCollapsed)} />

            <div className="flex-1 flex flex-col min-h-[600px] lg:min-h-0 min-w-0 relative border-y lg:border-y-0 lg:border-x border-slate-100 dark:border-slate-800 transition-all duration-500">
                {/* Designer Toolbar: Command Strip */}
                <div className="h-auto min-h-14 py-3 lg:py-0 border-b border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md flex flex-wrap items-center justify-between px-4 lg:px-8 shrink-0 z-30 shadow-sm gap-4">
                    <div className="flex items-center gap-4 lg:gap-6 flex-wrap">
                        <div className="flex items-center gap-1.5 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl p-1 border border-slate-100 dark:border-slate-700/50">
                            <button
                                onClick={undo}
                                disabled={historyStep <= 0}
                                title="Undo Transmission"
                                className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all disabled:opacity-20"
                            >
                                <Undo2 size={16} />
                            </button>
                            <button
                                onClick={redo}
                                disabled={historyStep >= history.length - 1}
                                title="Redo Transmission"
                                className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all disabled:opacity-20"
                            >
                                <Redo2 size={16} />
                            </button>
                        </div>

                        <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

                        <div className="flex items-center gap-1.5 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl p-1 border border-slate-100 dark:border-slate-700/50">
                            <button
                                onClick={() => setPreviewMode('desktop')}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${previewMode === 'desktop' ? 'bg-white dark:bg-slate-700 shadow-md text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                            >
                                <Monitor size={16} />
                            </button>
                            <button
                                onClick={() => setPreviewMode('mobile')}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${previewMode === 'mobile' ? 'bg-white dark:bg-slate-700 shadow-md text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                            >
                                <Smartphone size={16} />
                            </button>
                        </div>

                        <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

                        <button
                            onClick={() => setFocusMode(!focusMode)}
                            className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border transition-all text-[10px] font-black uppercase tracking-widest ${focusMode ? 'bg-primary-600 text-white border-primary-500 shadow-lg shadow-primary-500/20' : 'bg-slate-100/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-700 hover:text-primary-600 dark:hover:text-primary-400'}`}
                        >
                            <Sparkles size={14} className={focusMode ? 'animate-pulse' : ''} />
                            {focusMode ? 'Exit Command Mode' : 'Focus Mode'}
                        </button>
                    </div>

                    <div className="flex items-center gap-3 ml-auto lg:ml-0">
                        <button
                            onClick={handleSaveTemplate}
                            className="hidden lg:flex items-center gap-2.5 px-5 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl border border-primary-100 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-800/40 transition-all text-[10px] font-black uppercase tracking-widest shadow-sm hover:shadow-primary-500/10"
                        >
                            <Download size={14} /> Sync Template
                        </button>
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Transmission Protocol</span>
                            <span className="text-[8px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5">V4.0.2-BETA</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden relative flex flex-col min-h-0">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={blocks.map(b => b.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <EmailCanvas
                                blocks={blocks}
                                activeBlockId={activeBlockId}
                                setActiveBlockId={setActiveBlockId}
                                onRemoveBlock={removeBlock}
                                onDuplicateBlock={duplicateBlock}
                                previewMode={previewMode}
                            />
                        </SortableContext>
                    </DndContext>
                </div>
            </div>

            <PropertyEditor
                activeBlock={blocks.find(b => b.id === activeBlockId)}
                updateBlock={updateBlock}
                removeBlock={removeBlock}
                duplicateBlock={duplicateBlock}
                onClose={() => setActiveBlockId(null)}
                isCollapsed={rightPanelCollapsed}
                onToggle={() => setRightPanelCollapsed(!rightPanelCollapsed)}
            />
        </div>
    );
}
