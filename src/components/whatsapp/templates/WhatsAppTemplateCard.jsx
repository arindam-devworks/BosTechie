import React from 'react';
import { MessageSquare, Eye, Edit, Trash2, CheckCircle2, Clock, XCircle } from 'lucide-react';

/**
 * WhatsApp Template Card — page-scoped enhancements:
 * - Accepts onEdit and onDelete callbacks (new props, no breaking change for callers that omit them)
 * - Active/selected visual ring
 * - Error-safe rendering for all fields
 * - Touch-friendly actions
 */

const STATUS_STYLE = {
    approved: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/30',
    pending: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-800/30',
    rejected: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/30',
};

const STATUS_ICON = {
    approved: <CheckCircle2 size={10} />,
    pending: <Clock size={10} />,
    rejected: <XCircle size={10} />,
};

export default function WhatsAppTemplateCard({
    template,
    isSelected = false,
    isMultiSelected = false,
    onSelect,
    onToggleSelection,
    onEdit,
    onDelete,
}) {
    if (!template) return null;

    const status = template.status || 'pending';
    const name = template.name || 'Untitled Protocol';
    const id = template.id || '—';
    const category = template.category || '—';
    const language = template.language || '—';

    const handleEdit = (e) => {
        e.stopPropagation();
        if (onEdit) onEdit(template);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (onDelete) onDelete(template);
    };

    const handleSelect = () => {
        if (onSelect) onSelect(template);
    };

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label={`Select template: ${name}`}
            onKeyDown={(e) => e.key === 'Enter' && handleSelect()}
            onClick={handleSelect}
            className={`glass-card rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 group cursor-pointer border-2 flex flex-col h-full transition-all duration-200 outline-none focus-visible:ring-4 focus-visible:ring-primary-500/20
                ${isSelected
                    ? 'border-primary-500 dark:border-primary-500 ring-4 ring-primary-500/10 shadow-lg shadow-primary-500/10'
                    : 'border-transparent hover:border-primary-200/50 dark:hover:border-primary-500/30 hover:shadow-md'
                }`}
        >
            {/* Top: icon + status badge */}
            <div className="flex justify-between items-start mb-5 relative">
                <div className="flex items-center gap-3">
                    <div 
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onToggleSelection) onToggleSelection(template.id);
                        }}
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer
                            ${isMultiSelected 
                                ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/20' 
                                : 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-primary-400 group-hover:scale-110'
                            }`}
                    >
                        {isMultiSelected && <div className="w-2.5 h-2.5 bg-white rounded-sm animate-in zoom-in duration-200" />}
                    </div>
                    <div className={`p-2.5 rounded-2xl border transition-colors
                        ${isSelected
                            ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-800/30 text-primary-600 dark:text-primary-400'
                            : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30 text-emerald-600 dark:text-emerald-400'
                        }`}
                    >
                        <MessageSquare size={18} />
                    </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1 ${STATUS_STYLE[status] || STATUS_STYLE.pending}`}>
                    {STATUS_ICON[status]}
                    {status}
                </span>
            </div>

            {/* Body: name + meta */}
            <div className="flex-1 min-w-0">
                <h3
                    className="text-[15px] sm:text-[16px] font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-1 truncate"
                    title={name}
                >
                    {name}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">
                    ID: {id} • {category}
                </p>
            </div>

            {/* Footer: language + actions */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest truncate flex-1">
                    {isSelected ? (
                        <span className="text-primary-500 dark:text-primary-400">● Live Preview</span>
                    ) : (
                        language
                    )}
                </span>

                <div className="flex items-center gap-1 shrink-0">
                    {/* View / Preview button — visible on non-xl for mobile trigger */}
                    <button
                        onClick={(e) => { e.stopPropagation(); handleSelect(); }}
                        className="p-2 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-colors xl:hidden"
                        title="Preview"
                    >
                        <Eye size={15} />
                    </button>

                    {/* Edit */}
                    <button
                        onClick={handleEdit}
                        className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors"
                        title="Edit Protocol"
                    >
                        <Edit size={15} />
                    </button>

                    {/* Delete */}
                    <button
                        onClick={handleDelete}
                        className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                        title="Delete Protocol"
                    >
                        <Trash2 size={15} />
                    </button>
                </div>
            </div>
        </div>
    );
}
