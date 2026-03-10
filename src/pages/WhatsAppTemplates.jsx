import { useState, useEffect, useMemo, useCallback } from 'react';
import {
    Search, Filter, Plus, Globe, MessageSquare, Smartphone,
    CheckCircle2, Clock, XCircle, X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Page-scoped data & components  (no impact on other pages)
import { WHATSAPP_TEMPLATE_MOCK, countByStatus } from '../data/whatsappTemplateMockData';
import WhatsAppTemplateList from '../components/whatsapp/templates/WhatsAppTemplateList';
import WhatsAppTemplatePreview from '../components/whatsapp/templates/WhatsAppTemplatePreview';
import WhatsAppDeleteModal from '../components/whatsapp/templates/WhatsAppDeleteModal';
import WhatsAppPreviewDrawer from '../components/whatsapp/templates/WhatsAppPreviewDrawer';

// ─── Status filter tabs config ────────────────────────────────────────────────
const ALL_TAB = 'all';
const STATUS_TABS = [
    { id: ALL_TAB, label: 'All', icon: <MessageSquare size={13} /> },
    { id: 'approved', label: 'Approved', icon: <CheckCircle2 size={13} className="text-emerald-500" /> },
    { id: 'pending', label: 'Pending', icon: <Clock size={13} className="text-amber-500" /> },
    { id: 'rejected', label: 'Rejected', icon: <XCircle size={13} className="text-red-500" /> },
];

// ─── Main page component ──────────────────────────────────────────────────────
export default function WhatsAppTemplates() {
    const navigate = useNavigate();

    // ── Local state ───────────────────────────────────────────────────────────
    const [templates, setTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState(ALL_TAB);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    // Mobile UI state
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [showPreviewDrawer, setShowPreviewDrawer] = useState(false);

    // Delete modal state
    const [pendingDelete, setPendingDelete] = useState(null); // template to delete

    // ── Simulate loading ──────────────────────────────────────────────────────
    useEffect(() => {
        const t = setTimeout(() => {
            setTemplates(WHATSAPP_TEMPLATE_MOCK);
            // Auto-select first for preview
            if (WHATSAPP_TEMPLATE_MOCK.length > 0) {
                setSelectedTemplate(WHATSAPP_TEMPLATE_MOCK[0]);
            }
            setIsLoading(false);
        }, 600); // 600ms skeleton
        return () => clearTimeout(t);
    }, []);

    // ── Filtered templates ────────────────────────────────────────────────────
    const filteredTemplates = useMemo(() => {
        const q = searchTerm.toLowerCase();
        return templates.filter((t) => {
            // Status filter
            if (activeTab !== ALL_TAB && t.status !== activeTab) return false;
            // Text search: name, id, category, language
            if (q) {
                return (
                    (t.name || '').toLowerCase().includes(q) ||
                    (t.id || '').toLowerCase().includes(q) ||
                    (t.category || '').toLowerCase().includes(q) ||
                    (t.language || '').toLowerCase().includes(q)
                );
            }
            return true;
        });
    }, [templates, searchTerm, activeTab]);

    const counts = useMemo(() => countByStatus(templates), [templates]);

    const isSearchOrFilterActive = searchTerm.length > 0 || activeTab !== ALL_TAB;

    // ── Card handlers ─────────────────────────────────────────────────────────
    const handleSelect = useCallback((template) => {
        setSelectedTemplate(template);
        // On small screens, open the preview drawer
        if (window.innerWidth < 1280) {
            setShowPreviewDrawer(true);
        }
    }, []);

    const handleEdit = useCallback((template) => {
        navigate(`/whatsapp-templates/edit/${template.id}`);
    }, [navigate]);

    const handleDeleteRequest = useCallback((template) => {
        setPendingDelete(template);
    }, []);

    const handleDeleteConfirm = useCallback((id) => {
        setTemplates((prev) => {
            const next = prev.filter((t) => t.id !== id);
            // If deleted template was selected, reset or select first remaining
            if (selectedTemplate?.id === id) {
                setSelectedTemplate(next[0] || null);
            }
            return next;
        });
        setPendingDelete(null);
    }, [selectedTemplate]);

    const clearFilters = useCallback(() => {
        setSearchTerm('');
        setActiveTab(ALL_TAB);
    }, []);

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* ── Page Header ─────────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-[24px] sm:text-[28px] font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-1.5">
                        Messaging Protocols
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                        <p className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em]">
                            WhatsApp Meta-Data / {templates.length} Active Blueprints
                        </p>
                    </div>
                </div>

                {/* Header action buttons */}
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                        <Globe size={13} /> Language Packs
                    </button>
                    <Link
                        to="/whatsapp-templates/create"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-orbit text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        <Plus size={13} /> Forge New
                    </Link>
                </div>
            </div>

            {/* ── Content area ─────────────────────────────────────────────── */}
            {/* xl: side-by-side | below xl: single column */}
            <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 items-start">

                {/* ── Left/main column: search + filter + cards ────────────── */}
                <div className="flex-1 min-w-0 space-y-4">

                    {/* Search + filter row */}
                    <div className="glass-card rounded-[28px] sm:rounded-[32px] p-3 sm:p-4 flex items-center gap-3">
                        {/* Search input */}
                        <div className="relative flex-1 group min-w-0">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-primary-500 dark:group-focus-within:text-primary-400 transition-colors"
                                size={16}
                            />
                            <input
                                type="text"
                                placeholder="Search protocols..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl text-[12px] font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500/30 transition-all"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                                >
                                    <X size={13} />
                                </button>
                            )}
                        </div>

                        {/* Filter toggle */}
                        <button
                            onClick={() => setShowFilterPanel((v) => !v)}
                            className={`p-2.5 border rounded-2xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all relative
                                ${showFilterPanel || activeTab !== ALL_TAB
                                    ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800/40 text-primary-600 dark:text-primary-400'
                                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                                }`}
                            title="Filter by status"
                        >
                            <Filter size={16} />
                            {activeTab !== ALL_TAB && (
                                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-primary-500 border-2 border-white dark:border-slate-900" />
                            )}
                        </button>
                    </div>

                    {/* Status filter tabs — collapsible */}
                    {showFilterPanel && (
                        <div className="glass-card rounded-[24px] p-3 animate-in slide-in-from-top-2 duration-200">
                            <div className="flex flex-wrap gap-2">
                                {STATUS_TABS.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            setShowFilterPanel(false);
                                        }}
                                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                                            ${activeTab === tab.id
                                                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                                                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                            }`}
                                    >
                                        {tab.icon} {tab.label}
                                        <span className="ml-0.5 bg-white/20 dark:bg-black/20 px-1.5 py-0.5 rounded-md text-[9px]">
                                            {tab.id === ALL_TAB ? counts.all : counts[tab.id] || 0}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Active filter chip */}
                    {activeTab !== ALL_TAB && !showFilterPanel && (
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Filtering by:</span>
                            <button
                                onClick={() => setActiveTab(ALL_TAB)}
                                className="flex items-center gap-1.5 px-3 py-1 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30 rounded-xl text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase tracking-widest hover:bg-primary-100 transition-colors"
                            >
                                {activeTab} <X size={10} />
                            </button>
                        </div>
                    )}

                    {/* Template cards */}
                    <WhatsAppTemplateList
                        templates={filteredTemplates}
                        isLoading={isLoading}
                        error={null}
                        selectedTemplate={selectedTemplate}
                        onSelect={handleSelect}
                        onEdit={handleEdit}
                        onDelete={handleDeleteRequest}
                        isSearchEmpty={isSearchOrFilterActive && filteredTemplates.length === 0}
                        clearSearch={clearFilters}
                    />
                </div>

                {/* ── Right column: phone preview (xl only) ──────────────── */}
                <div className="hidden xl:block w-[340px] shrink-0">
                    <div className="sticky top-8">
                        <WhatsAppTemplatePreview selectedTemplate={selectedTemplate} />
                        <p className="text-center mt-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">
                            Holographic Preview v1.2
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Floating preview FAB (below xl, when template selected) ── */}
            {selectedTemplate && (
                <button
                    onClick={() => setShowPreviewDrawer(true)}
                    className="xl:hidden fixed bottom-6 right-6 z-30 flex items-center gap-2.5 px-5 py-3.5 bg-orbit text-white rounded-2xl shadow-2xl shadow-primary-500/30 text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                    <Smartphone size={15} /> Preview
                </button>
            )}

            {/* ── Mobile preview drawer ─────────────────────────────────── */}
            {showPreviewDrawer && (
                <WhatsAppPreviewDrawer
                    template={selectedTemplate}
                    onClose={() => setShowPreviewDrawer(false)}
                />
            )}

            {/* ── Delete confirmation modal ─────────────────────────────── */}
            {pendingDelete && (
                <WhatsAppDeleteModal
                    template={pendingDelete}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setPendingDelete(null)}
                />
            )}
        </div>
    );
}
