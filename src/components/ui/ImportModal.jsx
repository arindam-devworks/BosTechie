import React, { useState } from 'react';
import { Upload, X, Check, AlertCircle, FileText, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

export default function ImportModal({ isOpen, onClose, onImport }) {
    const [step, setStep] = useState(1); // 1: Upload, 2: Mapping, 3: Processing
    const [file, setFile] = useState(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
            setStep(2);
        }
    };

    const handleMappingConfirm = () => {
        setStep(3);
        setTimeout(() => {
            onImport({ count: 124, status: 'synced' });
            onClose();
            setStep(1);
            setFile(null);
        }, 2000);
    };

    const steps = [
        { id: 1, label: 'Upload' },
        { id: 2, label: 'Mapping' },
        { id: 3, label: 'Uplink' }
    ];

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="w-full max-w-xl bg-white dark:bg-slate-950 rounded-[40px] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-500">
                {/* Header */}
                <div className="p-8 border-b border-slate-50 dark:border-slate-900 flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Initialize Data Import</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Entity Synchronization Protocol</p>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-2xl transition-colors text-slate-400">
                        <X size={20} />
                    </button>
                </div>

                {/* Progress Steps */}
                <div className="px-8 py-4 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                    {steps.map((s, i) => (
                        <div key={s.id} className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black transition-all
                                ${step >= s.id ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'bg-white dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'}
                            `}>
                                {step > s.id ? <Check size={12} /> : s.id}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s.id ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                                {s.label}
                            </span>
                            {i < steps.length - 1 && <ChevronRight size={12} className="text-slate-300 mx-2" />}
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="p-8">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[32px] p-12 flex flex-col items-center justify-center group hover:border-primary-500/50 transition-all cursor-pointer relative bg-slate-50/30 dark:bg-slate-900/30">
                                <input 
                                    type="file" 
                                    accept=".csv" 
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                />
                                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-4 text-slate-400 group-hover:text-primary-500 transition-colors">
                                    <Upload size={32} />
                                </div>
                                <p className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-tighter">Drop CSV sequence here</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Max capacity: 10MB per transmission</p>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-2xl">
                                <AlertCircle size={16} className="text-blue-500 shrink-0" />
                                <p className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase leading-relaxed tracking-wider">
                                    Ensure CSV headers match orbital requirements (Name, Email, Phone, Tags) for optimal synchronization.
                                </p>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in slide-in-from-right duration-500">
                            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 text-emerald-500">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest">{file?.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{(file?.size / 1024).toFixed(1)} KB Identified</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Parameter Mapping</h4>
                                {['Email', 'Name', 'Phone', 'Tags'].map((field) => (
                                    <div key={field} className="flex items-center justify-between p-4 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl">
                                        <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">{field}</span>
                                        <select className="bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-2 text-[11px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-primary-500/10 text-slate-600 dark:text-slate-400">
                                            <option>{field}</option>
                                            <option>Skip Field</option>
                                        </select>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <Button variant="secondary" onClick={() => setStep(1)} className="flex-1">Back</Button>
                                <Button variant="primary" onClick={handleMappingConfirm} className="flex-[2]">Begin Uplink</Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="py-12 flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-500">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-[32px] border-4 border-slate-100 dark:border-slate-900 flex items-center justify-center">
                                    <Upload size={40} className="text-primary-500 animate-bounce" />
                                </div>
                                <div className="absolute inset-x-[-10px] top-[-10px] bottom-[-10px] border-4 border-primary-500/30 border-t-primary-500 rounded-[40px] animate-spin"></div>
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Synchronizing Fleet</h3>
                                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest animate-pulse italic">Establishing secure data tunnel...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
