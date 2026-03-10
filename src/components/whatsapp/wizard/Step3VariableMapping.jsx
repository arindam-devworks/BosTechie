import React, { useEffect, useState } from 'react';
import { Database, Link2 } from 'lucide-react';

export default function Step3VariableMapping({ data, updateData }) {
    const [variables, setVariables] = useState([]);

    useEffect(() => {
        // Extract variables {{1}}, {{2}} from body text
        const matches = data.bodyText.match(/{{(\d+)}}/g) || [];
        const uniqueVars = [...new Set(matches.map(v => v.replace(/\D/g, '')))].sort((a, b) => a - b);
        setVariables(uniqueVars);
    }, [data.bodyText]);

    const handleMappingChange = (variableNum, field) => {
        updateData({
            variables: { ...data.variables, [variableNum]: field }
        });
    };

    const handleSampleChange = (variableNum, val) => {
        updateData({
            sampleData: { ...data.sampleData, [variableNum]: val }
        });
    };

    return (
        <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Dynamic Variable Mapping</h2>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-2">Link Template Parameters to Contact Data</p>
            </div>

            {variables.length === 0 ? (
                <div className="p-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-center bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                        <Link2 size={32} />
                    </div>
                    <h3 className="text-[14px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2">No Variables Detected</h3>
                    <p className="text-[12px] font-bold text-slate-400">Return to Step 2 and add {'{{1}}'} to the message body to map dynamic data.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {variables.map((vNum) => (
                        <div key={vNum} className="p-6 bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 rounded-3xl flex flex-col md:flex-row gap-6 items-start md:items-center shadow-sm">
                            <div className="shrink-0 flex items-center gap-4 w-full md:w-auto">
                                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 font-mono font-bold text-[16px] flex items-center justify-center shadow-sm">
                                    {`{{${vNum}}}`}
                                </div>
                                <div className="h-0.5 w-8 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
                            </div>

                            <div className="flex-1 w-full space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    <Database size={12} className="text-primary-500" /> Database Field
                                </label>
                                <select
                                    value={data.variables[vNum] || ''}
                                    onChange={(e) => handleMappingChange(vNum, e.target.value)}
                                    className="w-full bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 rounded-xl px-4 py-3 text-[13px] font-bold text-slate-900 dark:text-white outline-none focus:border-primary-500 cursor-pointer shadow-sm"
                                >
                                    <option value="" disabled>Select Field...</option>
                                    <option value="firstName">Contact First Name</option>
                                    <option value="lastName">Contact Last Name</option>
                                    <option value="companyName">Company Name</option>
                                    <option value="email">Email Address</option>
                                    <option value="custom">Custom System Variable</option>
                                </select>
                            </div>

                            <div className="flex-1 w-full space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    Sample Data (Preview)
                                </label>
                                <input
                                    type="text"
                                    value={data.sampleData[vNum] || ''}
                                    onChange={(e) => handleSampleChange(vNum, e.target.value)}
                                    placeholder="e.g. John Doe"
                                    className="w-full bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 rounded-xl px-4 py-3 text-[13px] font-bold text-slate-900 dark:text-white outline-none focus:border-primary-500 shadow-sm placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
