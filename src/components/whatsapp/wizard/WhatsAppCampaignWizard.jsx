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
        <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-900 animate-in fade-in duration-500 w-full overflow-hidden">
            {/* Stepper Header (Edge-To-Edge) */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 px-4 md:px-10 py-3 z-30 relative shadow-sm">
                <div className="w-full flex items-center justify-between relative">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 dark:bg-slate-700 -translate-y-1/2 z-0 hidden md:block"></div>

                    {STEPS.map((step) => {
                        const isCompleted = step.id < currentStep;
                        const isActive = step.id === currentStep;

                        return (
                            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                                <button
                                    onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                                    disabled={step.id > currentStep}
                                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-[11px] transition-all duration-300 ${isActive
                                        ? 'bg-orbit text-white shadow-lg shadow-primary-500/30 scale-110'
                                        : isCompleted
                                            ? 'bg-emerald-500 text-white shadow-md cursor-pointer hover:scale-105'
                                            : 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                                        }`}
                                >
                                    {isCompleted ? '✓' : step.id}
                                </button>
                                <div className="hidden md:flex flex-col items-center">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${isActive || isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                                        {step.label}
                                    </span>
                                    <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                        {step.desc}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Step Content Outer Container */}
            <div className="flex-1 overflow-y-auto w-full relative bg-slate-50/50 dark:bg-slate-900/50">
                <div className="w-full h-full flex flex-col transition-all duration-500">

                    <div className="flex-1 overflow-y-auto custom-scrollbar px-1 pb-4">
                        {currentStep === 1 && <Step1TemplateSetup data={wizardData} updateData={updateData} />}
                        {currentStep === 2 && <Step2MessageDesign data={wizardData} updateData={updateData} />}
                        {currentStep === 3 && <Step3VariableMapping data={wizardData} updateData={updateData} />}
                        {currentStep === 4 && <Step4PreviewSend data={wizardData} onSend={onSend} />}
                    </div>

                    {/* Navigation Footer */}
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50 flex flex-wrap items-center justify-between gap-3 shrink-0">
                        <button
                            onClick={prevStep}
                            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${currentStep === 1
                                ? 'opacity-0 pointer-events-none'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
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
