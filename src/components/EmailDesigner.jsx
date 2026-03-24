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
import { Undo2, Redo2, Monitor, Smartphone, Tablet, Download, Sparkles, Layers, ShieldCheck } from 'lucide-react';

import BlockLibrary from './BlockLibrary';
import PropertyEditor from './PropertyEditor';
import EmailCanvas from './EmailCanvas';

export const FONT_FAMILIES = [
    { label: 'Outfit (Default)', value: 'font-outfit' },
    { label: 'Inter', value: 'font-inter' },
    { label: 'Roboto Mono', value: 'font-mono' },
    { label: 'Playfair Display', value: 'font-serif' },
    { label: 'System Sans', value: 'font-sans' }
];

export const DEFAULT_STYLES = {
    navbar: { bgColor: '#ffffff', textColor: '#0f172a', paddingY: 30, paddingX: 40, marginTop: 0, marginBottom: 0, fontSize: 14, fontFamily: 'font-outfit', letterSpacing: '0em', borderRadius: 0, borderWidth: 0, borderColor: '#e2e8f0' },
    text: { 
        bgColor: '#ffffff', textColor: '#475569', 
        paddingY: 40, paddingX: 60, 
        marginTop: 0, marginBottom: 0,
        fontSize: 15, fontWeight: '500', lineHeight: '1.6', letterSpacing: '0em',
        textAlign: 'left', fontFamily: 'font-outfit', borderRadius: 0, borderWidth: 0, borderColor: '#e2e8f0'
    },
    image: { bgColor: '#ffffff', paddingY: 0, paddingX: 0, marginTop: 0, marginBottom: 0, borderRadius: 0, borderWidth: 0, borderColor: '#e2e8f0', width: 100, align: 'center' },
    button: { 
        bgColor: '#ffffff', textColor: '#ffffff', 
        paddingY: 40, paddingX: 0, marginTop: 0, marginBottom: 0, 
        fontSize: 13, fontWeight: '900', letterSpacing: '0em',
        borderRadius: 20, btnPaddingX: 40, btnPaddingY: 16,
        borderWidth: 0, borderColor: '#000000',
        hoverBgColor: '#2563eb', textAlign: 'center'
    },
    divider: { bgColor: '#ffffff', paddingY: 30, paddingX: 0, marginTop: 0, marginBottom: 0, thickness: 1, lineStyle: 'solid', lineColor: '#e2e8f0', width: 100 },
    products: { bgColor: '#f8fafc', textColor: '#0f172a', paddingY: 60, paddingX: 40, marginTop: 0, marginBottom: 0, columnCount: 2, cardCount: 2, gap: 32, cardBgColor: '#ffffff', showImage: true, showTitle: true, showPrice: true, showCta: true, borderRadius: 0, borderWidth: 0, borderColor: '#e2e8f0' },
    social: { bgColor: '#ffffff', paddingY: 30, paddingX: 40, marginTop: 0, marginBottom: 0, iconSize: 20, iconColor: '#94a3b8', hoverColor: '#2563eb', align: 'center', gap: 40, borderRadius: 0, borderWidth: 0, borderColor: '#e2e8f0' },
    spacer: { bgColor: '#ffffff', height: 60 },
    footer: { bgColor: '#0f172a', textColor: '#94a3b8', paddingY: 80, paddingX: 40, marginTop: 0, marginBottom: 0, fontSize: 11, letterSpacing: '0em', borderRadius: 0, borderWidth: 0, borderColor: '#e2e8f0' },
    columns: { bgColor: '#ffffff', paddingY: 60, paddingX: 40, marginTop: 0, marginBottom: 0, columnCount: 2, gap: 40, stackOnMobile: true, borderRadius: 0, borderWidth: 0, borderColor: '#e2e8f0' },
    sector_split: { layoutRatio: '1-1', gap: 20, paddingY: 20, paddingX: 40, marginTop: 0, marginBottom: 0, textAlign: 'center', borderRadius: 0, borderWidth: 0, borderColor: '#e2e8f0' }
};

export const DEFAULT_CONTENT = {
    navbar: {
        logoText: 'BO',
        companyName: 'Bostechie Orbit',
        logoAlt: 'Company Logo',
        logoUrl: '#',
        links: [
            { label: 'DEVICES', url: '#' },
            { label: 'FLEET', url: '#' },
            { label: 'UPLINK', url: '#' }
        ]
    },
    text: { text: "The future belongs to those who prepare for it today. This transmission contains vital coordinates for your next orbital objective. Ensure clarity and impact in every sector of your message." },
    image: { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200', alt: 'Feature Image', url: '#' },
    button: { label: 'Initialize Objective', url: '#' },
    products: { 
        heading: 'Fleet Inventory', 
        subheading: 'View Universal Fleet Status',
        items: [
            { title: 'Orbital Unit Model 1', price: '$4,999.00 USD', cta: 'Deploy Now', url: '#' },
            { title: 'Orbital Unit Model 2', price: '$5,999.00 USD', cta: 'Deploy Now', url: '#' },
            { title: 'Orbital Unit Model 3', price: '$6,999.00 USD', cta: 'Deploy Now', url: '#' },
            { title: 'Orbital Unit Model 4', price: '$7,999.00 USD', cta: 'Deploy Now', url: '#' }
        ]
    },
    social: {
        platforms: {
            facebook: { enabled: true, url: '#' },
            instagram: { enabled: true, url: '#' },
            twitter: { enabled: true, url: '#' },
            linkedin: { enabled: false, url: '#' },
            youtube: { enabled: false, url: '#' }
        }
    },
    footer: {
        companyName: 'Bostechie Technologies',
        address: 'Orbit Sector 7G | Bostechie Terminal',
        contactEmail: 'uplink@bostechie.com',
        message: 'You are synchronized with this sequence because you are a verified Bostechie Entity.',
        copyright: '© 2026 BOSTECHIE ORBIT COMMAND',
        socialLinks: {
            facebook: '#',
            instagram: '#',
            twitter: '#'
        },
        showUnsubscribe: true,
        unsubscribeText: 'Unsubscribe from this frequency',
        unsubscribeUrl: '#unsubscribe',
        showPreferences: true,
        preferencesText: 'Manage Preferences',
        preferencesUrl: '#preferences',
        termsUrl: '#terms',
        privacyUrl: '#privacy'
    },
    columns: { },
    spacer: { },
    divider: { },
    sector_split: { 
        columns: [
            [{ id: `sub-${Date.now()}-1`, type: 'text', content: { text: 'Sector Alpha Control' }, style: { fontSize: 14, fontWeight: '700' } }],
            [{ id: `sub-${Date.now()}-2`, type: 'text', content: { text: 'Sector Beta Control' }, style: { fontSize: 14, fontWeight: '700' } }]
        ] 
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
            if (window.innerWidth < 1024) {
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
            if (window.innerWidth < 1024) {
                setRightPanelCollapsed(true);
            }
        }
    };

    const toggleRightPanel = () => {
        if (!rightPanelCollapsed) {
            setRightPanelCollapsed(true);
        } else {
            setRightPanelCollapsed(false);
            if (window.innerWidth < 1024) {
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

    const addBlock = (type, index = null) => {
        const newBlock = {
            id: `block-${Date.now()}`,
            type,
            content: { ...DEFAULT_CONTENT[type] },
            style: { ...DEFAULT_STYLES[type] }
        };
        const newBlocks = [...blocks];
        if (index !== null) {
            newBlocks.splice(index, 0, newBlock);
        } else {
            newBlocks.push(newBlock);
        }
        setBlocks(newBlocks);
        setActiveBlockId(newBlock.id);
        saveToHistory(newBlocks);

        // Auto-open right panel when a block is added
        setRightPanelCollapsed(false);
        if (window.innerWidth < 1024) setLeftPanelCollapsed(true);
    };

    // Auto-open property editor when a block is selected
    useEffect(() => {
        if (activeBlockId) {
            setRightPanelCollapsed(false);
            if (window.innerWidth < 1024) setLeftPanelCollapsed(true);
        }
    }, [activeBlockId]);;

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
        <div className={`h-full flex overflow-hidden bg-white dark:bg-slate-800 font-outfit relative ${focusMode ? 'z-50' : ''}`}>

            {/* Left Panel Toggle - Tablet/Mobile */}
            <button
                onClick={toggleLeftPanel}
                className="xl:hidden absolute top-3 left-3 z-50 w-8 h-8 bg-white dark:bg-slate-700 shadow-lg rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-primary-500 border border-slate-100 dark:border-slate-600 transition-all"
                title="Toggle Block Forge"
            >
                <Layers size={15} />
            </button>

            {/* Right Panel Toggle - Tablet/Mobile */}
            <button
                onClick={toggleRightPanel}
                className="xl:hidden absolute top-3 right-3 z-50 w-8 h-8 bg-white dark:bg-slate-700 shadow-lg rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-primary-500 border border-slate-100 dark:border-slate-600 transition-all"
                title="Toggle Settings"
            >
                <Monitor size={15} />
            </button>

            {/* Left Panel: BlockLibrary */}
            <BlockLibrary
                onAddBlock={addBlock}
                isCollapsed={leftPanelCollapsed}
                onToggle={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
            />

            {/* Center: Canvas + Toolbar */}
            <div className="flex-1 min-w-0 flex flex-col overflow-hidden relative border-x border-slate-100 dark:border-slate-700">

                {/* Compact Toolbar */}
                <div className="h-10 flex items-center justify-between px-3 border-b border-slate-100 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shrink-0 gap-2">
                    <div className="flex items-center gap-2">
                        {/* Undo/Redo */}
                        <div className="flex items-center gap-0.5 bg-slate-100/60 dark:bg-slate-700/60 rounded-lg p-0.5 border border-slate-200/50 dark:border-slate-600/50">
                            <button onClick={undo} disabled={historyStep <= 0} title="Undo"
                                className="w-7 h-7 flex items-center justify-center rounded-md text-slate-500 dark:text-slate-400 hover:text-primary-600 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-25 transition-all">
                                <Undo2 size={13} />
                            </button>
                            <button onClick={redo} disabled={historyStep >= history.length - 1} title="Redo"
                                className="w-7 h-7 flex items-center justify-center rounded-md text-slate-500 dark:text-slate-400 hover:text-primary-600 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-25 transition-all">
                                <Redo2 size={13} />
                            </button>
                        </div>

                        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" />

                        {/* Preview Mode Toggle */}
                        <div className="flex items-center gap-1">
                            <div className="flex items-center gap-0.5 bg-slate-100/60 dark:bg-slate-700/60 rounded-lg p-0.5 border border-slate-200/50 dark:border-slate-600/50">
                                {[{ mode: 'desktop', Icon: Monitor }, { mode: 'tablet', Icon: Tablet }, { mode: 'mobile', Icon: Smartphone }].map(({ mode, Icon }) => (
                                    <button key={mode} 
                                        onClick={() => setPreviewMode(previewMode === mode && mode !== 'desktop' ? 'desktop' : mode)} 
                                        title={mode === 'desktop' ? 'Desktop Edit Mode' : `Preview as ${mode}`}
                                        className={`w-7 h-7 flex items-center justify-center rounded-md transition-all ${
                                            previewMode === mode
                                                ? 'bg-white dark:bg-slate-800 shadow text-primary-600 dark:text-primary-400'
                                                : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
                                        }`}>
                                        <Icon size={13} />
                                    </button>
                                ))}
                            </div>
                            {previewMode !== 'desktop' && (
                                <button
                                    onClick={() => setPreviewMode('desktop')}
                                    className="ml-1 animate-in fade-in slide-in-from-left-2 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-sm shadow-primary-500/30 transition-all flex items-center gap-1"
                                >
                                    Exit Preview
                                </button>
                            )}
                        </div>

                        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" />

                        {/* Focus Mode */}
                        <button onClick={() => setFocusMode(!focusMode)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                                focusMode
                                    ? 'bg-primary-600 text-white shadow-sm shadow-primary-500/30'
                                    : 'bg-slate-100/60 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 hover:text-primary-600 border border-slate-200/50 dark:border-slate-600/50'
                            }`}>
                            <Sparkles size={11} className={focusMode ? 'animate-pulse' : ''} />
                            {focusMode ? 'Exit Focus' : 'Focus Mode'}
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={handleSaveTemplate}
                            className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg border border-primary-100 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-all text-[9px] font-black uppercase tracking-widest">
                            <Download size={12} /> Sync Template
                        </button>
                        <div className="hidden lg:flex flex-col items-end">
                            <span className="text-[8px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-[0.15em] leading-none">Transmission Protocol</span>
                            <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">V4.0.2-Beta</span>
                        </div>
                    </div>
                </div>

                {/* Email Canvas Status Bar (Optional breadcrumb) */}
                {previewMode !== 'desktop' && (
                    <div className="absolute top-10 left-0 right-0 h-6 bg-primary-500/10 border-b border-primary-500/20 z-10 flex items-center justify-center animate-in fade-in">
                         <span className="text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            <Monitor size={10} /> {previewMode} Preview Mode Active — Read Only Viewing
                         </span>
                    </div>
                )}

                {/* Email Canvas Container */}
                <div className="flex-1 min-h-0 flex flex-col overflow-hidden relative">
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                            <EmailCanvas
                                blocks={blocks}
                                activeBlockId={activeBlockId}
                                setActiveBlockId={setActiveBlockId}
                                onRemoveBlock={removeBlock}
                                onDuplicateBlock={duplicateBlock}
                                previewMode={previewMode}
                                onAddBlock={addBlock}
                                onUpdateBlock={updateBlock}
                            />
                        </SortableContext>
                    </DndContext>
                </div>
            </div>

            {/* Right Panel: PropertyEditor */}
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
