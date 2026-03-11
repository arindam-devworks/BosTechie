import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Save, User, Bell, Shield, Key, Plus, CheckCircle2, Settings as SettingsIcon } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import useUnsavedChanges from '../services/useUnsavedChanges';

export default function Settings() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);

    const { success } = useToast();

    const initialState = useMemo(() => ({
        name: user?.name || '',
        email: user?.email || '',
        company: user?.company || 'Your Company',
        notifications: true,
    }), [user]);

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        setFormData(initialState);
    }, [initialState]);

    const isDirty = useMemo(() => {
        return JSON.stringify(formData) !== JSON.stringify(initialState);
    }, [formData, initialState]);

    useUnsavedChanges(isDirty);

    const handleSave = async (e) => {
        if (e) e.preventDefault();
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setIsSaving(false);
        setLastSaved(new Date());
        success('Profile configuration synchronized');
    };

    const tabs = [
        { id: 'profile', label: 'Profile Settings', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'api', label: 'API Keys', icon: Key },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1.5">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800/80 flex items-center justify-center text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                            <SettingsIcon size={20} />
                        </div>
                        Command Center
                    </h1>
                    <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest sm:ml-14">Configure your orbital parameters</p>
                </div>
                {lastSaved && (
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-2xl shadow-sm animate-in fade-in slide-in-from-right duration-500">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20"></div>
                            <div className="relative w-2 h-2 rounded-full bg-emerald-500"></div>
                        </div>
                        <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                            Synced • {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Settings Sidebar */}
                <div className="w-full lg:w-72 shrink-0 space-y-2">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all text-[11px] font-black uppercase tracking-widest group ${
                                    activeTab === tab.id
                                        ? 'bg-white dark:bg-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] text-primary-600 dark:text-primary-400 border border-slate-100 dark:border-slate-700 scale-[1.02]'
                                        : 'text-slate-500 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white border border-transparent hover:scale-[1.01]'
                                }`}
                            >
                                <div className={`p-2.5 rounded-xl transition-colors ${
                                    activeTab === tab.id 
                                        ? 'bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-400' 
                                        : 'bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                                }`}>
                                    <Icon size={18} />
                                </div>
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Settings Content */}
                <div className="flex-1 min-w-0">
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[32px] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)] border border-slate-200/60 dark:border-slate-800 overflow-hidden relative min-h-[500px]">
                        {/* Decorative background flair */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary-500/5 via-transparent to-transparent pointer-events-none"></div>
                        
                        <div className="p-8 sm:p-12 relative z-10">
                            {activeTab === 'profile' && (
                                <form onSubmit={handleSave} className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="space-y-1.5">
                                        <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Profile Protocol</h2>
                                        <p className="text-[12px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Update your identity and organizational data across the orbital fleet.</p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 p-6 sm:p-8 bg-slate-50/50 dark:bg-slate-800/30 rounded-[32px] border border-slate-200/50 dark:border-slate-800/50 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 group/profile">
                                        <div className="relative shrink-0">
                                            <div className="absolute inset-0 bg-primary-500 rounded-[28px] blur-xl opacity-0 group-hover/profile:opacity-30 transition-opacity duration-700"></div>
                                            <div className="relative h-28 w-28 rounded-[28px] bg-gradient-to-br from-primary-500 to-indigo-600 text-white flex items-center justify-center text-4xl font-black border-4 border-white dark:border-slate-800 shadow-xl transition-all duration-500 group-hover/profile:scale-105 group-hover/profile:-rotate-3">
                                                {(formData.name.charAt(0) || 'A').toUpperCase()}
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-700 p-2.5 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-600 text-slate-400 group-hover/profile:text-primary-500 transition-colors cursor-pointer hover:scale-110">
                                                <User size={16} />
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{formData.name || 'Commander'}</h3>
                                                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-2">{formData.company}</p>
                                            </div>
                                            <div className="flex flex-wrap gap-3">
                                                <button type="button" className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-[11px] font-black uppercase tracking-widest shadow-sm hover:shadow-md">
                                                    Update Cipher
                                                </button>
                                                <button type="button" className="px-5 py-2.5 bg-transparent border border-transparent text-slate-500 dark:text-slate-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all text-[11px] font-black uppercase tracking-widest">
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 mt-4">
                                        <div className="space-y-2.5">
                                            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div> Fleet Commander Name
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="peer relative w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white border border-slate-200/70 dark:border-slate-800 rounded-2xl focus:bg-white dark:focus:bg-slate-950 focus:border-primary-500/50 outline-none transition-all text-[14px] font-semibold shadow-sm focus:shadow-md focus:ring-4 focus:ring-primary-500/10 placeholder:text-slate-400 z-10"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-indigo-500/20 rounded-2xl blur-md opacity-0 peer-focus:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2.5">
                                            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Entity / Company
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                    className="peer relative w-full px-5 py-4 bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white border border-slate-200/70 dark:border-slate-800 rounded-2xl focus:bg-white dark:focus:bg-slate-950 focus:border-primary-500/50 outline-none transition-all text-[14px] font-semibold shadow-sm focus:shadow-md focus:ring-4 focus:ring-primary-500/10 placeholder:text-slate-400 z-10"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-indigo-500/20 rounded-2xl blur-md opacity-0 peer-focus:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 space-y-2.5">
                                            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Primary Communication Terminal
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                readOnly
                                                className="w-full px-5 py-4 border border-slate-100 dark:border-slate-800/80 rounded-2xl bg-slate-100/50 dark:bg-slate-800/20 text-slate-500 dark:text-slate-500 outline-none cursor-not-allowed text-[14px] font-semibold shadow-inner"
                                            />
                                            <p className="mt-2.5 ml-1 text-[10px] font-bold text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                                                <Key size={12} className="text-slate-300 dark:text-slate-500" /> Transmission target locked. Contact central ops to reassess.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-10 mt-10 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                                        <div className="text-[11px] font-bold text-slate-400 hidden sm:flex items-center gap-2 uppercase tracking-widest">
                                            {isDirty 
                                                ? <><div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div> Unsaved modifications detected</>
                                                : <><CheckCircle2 size={14} className="text-emerald-500" /> All parameters synchronized</>
                                            }
                                        </div>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            icon={Save}
                                            isLoading={isSaving}
                                            disabled={!isDirty}
                                        >
                                            Sync Protocols
                                        </Button>
                                    </div>
                                </form>
                            )}

                            {activeTab === 'security' && (
                                <div className="text-center py-20 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-100 dark:border-slate-800">
                                        <Shield size={40} className="text-slate-300 dark:text-slate-600" />
                                    </div>
                                    <p className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">Security Settings</p>
                                    <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest max-w-xs mx-auto">Change password and enable Two-Factor Authentication (2FA).</p>
                                    <button className="mt-8 px-6 py-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-[11px] font-black uppercase tracking-widest shadow-sm hover:shadow-md">
                                        Coming Soon
                                    </button>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="text-center py-20 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-100 dark:border-slate-800">
                                        <Bell size={40} className="text-slate-300 dark:text-slate-600" />
                                    </div>
                                    <p className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">Notification Preferences</p>
                                    <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest max-w-xs mx-auto">Manage how you receive alerts and summaries across the global fleet.</p>
                                </div>
                            )}

                            {activeTab === 'api' && (
                                <div className="text-center py-20 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-100 dark:border-slate-800">
                                        <Key size={40} className="text-slate-300 dark:text-slate-600" />
                                    </div>
                                    <p className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">API Key Management</p>
                                    <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest max-w-xs mx-auto mb-8">Generate and manage secure access tokens for external integrations.</p>
                                    <button className="px-6 py-3.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all text-[11px] font-black uppercase tracking-widest flex items-center gap-2 mx-auto shadow-lg shadow-primary-500/20 hover:scale-105 active:scale-95">
                                        <Plus size={16} />
                                        Generate New Key
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

