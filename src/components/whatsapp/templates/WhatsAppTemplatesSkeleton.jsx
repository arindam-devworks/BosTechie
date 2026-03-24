import React from 'react';

export default function WhatsAppTemplatesSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm animate-pulse flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100"></div>
                        <div className="w-20 h-6 rounded-lg bg-slate-100"></div>
                    </div>
                    <div className="flex-1 mb-6">
                        <div className="w-3/4 h-5 bg-slate-100 rounded mb-3"></div>
                        <div className="flex gap-2">
                            <div className="w-16 h-4 bg-slate-50 rounded"></div>
                            <div className="w-16 h-4 bg-slate-50 rounded"></div>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                        <div className="w-24 h-3 bg-slate-50 rounded"></div>
                        <div className="flex gap-2">
                            <div className="w-8 h-8 rounded-lg bg-slate-50"></div>
                            <div className="w-8 h-8 rounded-lg bg-slate-50"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
