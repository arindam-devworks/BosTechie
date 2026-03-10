import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Step1TemplateSetup from './Step1TemplateSetup';
import Step2MessageDesign from './Step2MessageDesign';
import Step3VariableMapping from './Step3VariableMapping';
import Step4PreviewSend from './Step4PreviewSend';

const STEPS = [
    { id: 1, label: 'Setup', desc: 'Template' },
    { id: 2, label: 'Design', desc: 'Message' },
    { id: 3, label: 'Mapping', desc: 'Variables' },
    { id: 4, label: 'Preview', desc: 'Launch' }
];

export default function WhatsAppCampaignWizard({ onSend }) {
    const [currentStep, setCurrentStep] = useState(1);

    // Core Template Data
    const [wizardData, setWizardData] = useState({
        templateName: '',
        category: 'Marketing',
        language: 'English (US)',
        targetAudience: '', // New Field
        headerType: ['None'], // Array: None, Text, Image, Video, Document (multi-select)
        headerMediaUrl: null,
        headerMedia: {}, // { Image: {file, name, size, preview}, Video: {...}, Document: {...} }
        bodyText: '',
        footerText: '',
        buttons: [], // { type, text, value }
        variables: {}, // mapped from bodyText {{1}} -> 'Contact Name'
        sampleData: {} // used for preview
    });

    const updateData = (newData) => {
        setWizardData(prev => ({ ...prev, ...newData }));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    return (
        <div className="flex flex-col h-full bg-slate-50/50 dark:bg-[#0b0f19] animate-in fade-in duration-500 w-full overflow-hidden">
            {/* Stepper Header */}
            <div className="bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 shrink-0 px-4 md:px-10 py-5">
                <div className="max-w-4xl mx-auto flex items-center justify-between relative">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0 hidden md:block"></div>

                    {STEPS.map((step) => {
                        const isCompleted = step.id < currentStep;
                        const isActive = step.id === currentStep;

                        return (
                            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                                <button
                                    onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                                    disabled={step.id > currentStep}
                                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-[13px] transition-all duration-300 ${isActive
                                        ? 'bg-orbit text-white shadow-lg shadow-primary-500/30 scale-110'
                                        : isCompleted
                                            ? 'bg-emerald-500 text-white shadow-md cursor-pointer hover:scale-105'
                                            : 'bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500'
                                        }`}
                                >
                                    {isCompleted ? '✓' : step.id}
                                </button>
                                <div className="hidden md:flex flex-col items-center">
                                    <span className={`text-[11px] font-black uppercase tracking-widest ${isActive || isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                                        {step.label}
                                    </span>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                        {step.desc}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Step Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative">
                <div className="max-w-4xl mx-auto h-full rounded-3xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm p-6 md:p-10 flex flex-col transition-all duration-500">

                    <div className="flex-1 overflow-y-auto custom-scrollbar px-1 pb-4">
                        {currentStep === 1 && <Step1TemplateSetup data={wizardData} updateData={updateData} />}
                        {currentStep === 2 && <Step2MessageDesign data={wizardData} updateData={updateData} />}
                        {currentStep === 3 && <Step3VariableMapping data={wizardData} updateData={updateData} />}
                        {currentStep === 4 && <Step4PreviewSend data={wizardData} onSend={onSend} />}
                    </div>

                    {/* Navigation Footer */}
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/50 flex flex-wrap items-center justify-between gap-3 shrink-0">
                        <button
                            onClick={prevStep}
                            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${currentStep === 1
                                ? 'opacity-0 pointer-events-none'
                                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                                }`}
                        >
                            <ChevronLeft size={16} /> Back
                        </button>

                        {currentStep < 4 && (
                            <button
                                onClick={nextStep}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl active:scale-95"
                            >
                                Next Step <ChevronRight size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
