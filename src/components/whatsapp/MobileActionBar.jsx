import React from 'react';
import { Save, Eye, Send } from 'lucide-react';

export default function MobileActionBar({ onSave, onPreview, onSend, isSending }) {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-[100] flex items-center gap-3">
            <button
                onClick={onSave}
                className="flex flex-col items-center justify-center gap-1.5 p-2 px-4 text-slate-500 hover:text-slate-900 transition-colors"
            >
                <Save size={18} />
                <span className="text-[9px] font-black uppercase tracking-widest">Save</span>
            </button>
            <button
                onClick={onPreview}
                className="flex flex-col items-center justify-center gap-1.5 p-2 px-4 text-slate-500 hover:text-slate-900 transition-colors"
            >
                <Eye size={18} />
                <span className="text-[9px] font-black uppercase tracking-widest">Preview</span>
            </button>
            <button
                onClick={onSend}
                disabled={isSending}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-orbit text-white rounded-xl shadow-lg shadow-primary-500/20 disabled:opacity-50 transition-all font-black uppercase tracking-widest text-[11px]"
            >
                {isSending ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                    <Send size={14} />
                )}
                <span>Launch</span>
            </button>
        </div>
    );
}
