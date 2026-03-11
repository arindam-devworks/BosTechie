import React from 'react';
import { useModal } from '../../context/ModalContext';
import { X, AlertTriangle } from 'lucide-react';

export default function ConfirmationModal() {
    const { modalConfig, closeModal } = useModal();

    if (!modalConfig) return null;

    const { 
        title, 
        message, 
        confirmText = 'Confirm', 
        cancelText = 'Cancel', 
        onConfirm, 
        onCancel,
        type = 'danger' // danger, primary, info
    } = modalConfig;

    const colors = {
        danger: 'bg-red-500 shadow-red-500/20',
        primary: 'bg-primary-500 shadow-primary-500/20',
        info: 'bg-blue-500 shadow-blue-500/20'
    };

    const iconColors = {
        danger: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
        primary: 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400',
        info: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
    };

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm" onClick={onCancel || closeModal}></div>
            <div className="w-full max-w-md bg-white dark:bg-slate-950 rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-500 border border-slate-100 dark:border-slate-800">
                <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div className={`p-3 rounded-2xl ${iconColors[type]}`}>
                            <AlertTriangle size={24} />
                        </div>
                        <button onClick={onCancel || closeModal} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-colors text-slate-400">
                            <X size={20} />
                        </button>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">{title}</h3>
                    <p className="text-[13px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed mb-8">{message}</p>

                    <div className="flex gap-4">
                        <button 
                            onClick={onCancel || closeModal}
                            className="flex-1 py-4 border border-slate-100 dark:border-slate-800 rounded-2xl text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
                        >
                            {cancelText}
                        </button>
                        <button 
                            onClick={onConfirm}
                            className={`flex-[1.5] py-4 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg active:scale-[0.98] transition-all ${colors[type]}`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
