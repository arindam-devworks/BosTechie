import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

/**
 * Page-scoped delete confirmation modal.
 * Used ONLY by WhatsAppTemplates page.
 */
export default function WhatsAppDeleteModal({ template, onConfirm, onCancel }) {
    if (!template) return null;

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onCancel}
        >
            {/* Panel */}
            <div
                className="bg-white dark:bg-slate-900 rounded-[28px] p-8 w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 flex items-center justify-center mb-6 mx-auto">
                    <AlertTriangle size={24} className="text-red-500" />
                </div>

                {/* Text */}
                <div className="text-center mb-8">
                    <h3 className="text-[16px] font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">
                        Delete Protocol
                    </h3>
                    <p className="text-[12px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
                        Are you sure you want to delete
                    </p>
                    <p className="text-[14px] font-black text-red-600 dark:text-red-400 uppercase tracking-tight mt-1 truncate px-4">
                        "{template.name}"
                    </p>
                    <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-3">
                        This action cannot be undone.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                    >
                        <X size={13} /> Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(template.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-red-500/25 active:scale-[0.97] transition-all"
                    >
                        <Trash2 size={13} /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
