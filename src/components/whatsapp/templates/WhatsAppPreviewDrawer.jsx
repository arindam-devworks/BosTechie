import React from 'react';
import { X, Eye } from 'lucide-react';
import WhatsAppPhonePreview from '../WhatsAppPhonePreview';

/**
 * Mobile/tablet preview drawer — slides up from the bottom.
 * Only rendered on screens smaller than xl (1280px).
 * Used ONLY by WhatsAppTemplates page.
 */
export default function WhatsAppPreviewDrawer({ template, onClose }) {
    if (!template) return null;

    return (
        /* Overlay */
        <div
            className="fixed inset-0 z-40 flex flex-col justify-end xl:hidden bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            {/* Drawer panel */}
            <div
                className="bg-white dark:bg-slate-900 rounded-t-[32px] p-5 pt-4 border-t border-slate-100 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Handle + header row */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                        <div>
                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Live Preview</p>
                            <h4 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-tighter truncate max-w-[200px]">
                                {template.name}
                            </h4>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Phone preview */}
                <div className="w-full max-h-[60vh] overflow-hidden">
                    <WhatsAppPhonePreview data={template} forceRender={true} />
                </div>
            </div>
        </div>
    );
}
