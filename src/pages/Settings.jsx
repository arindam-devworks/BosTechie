import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Save, User, Bell, Shield, Key, Plus } from 'lucide-react';

export default function Settings() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        company: user?.company || 'Your Company',
        notifications: true,
    });

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setSuccess(false);
        await new Promise(resolve => setTimeout(resolve, 800));
        setIsSaving(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    };

    const tabs = [
        { id: 'profile', label: 'Profile Settings', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'api', label: 'API Keys', icon: Key },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Settings Sidebar */}
                <div className="w-full md:w-64 space-y-1">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${activeTab === tab.id
                                        ? 'bg-primary-50 dark:bg-primary-900/10 text-primary-700 dark:text-primary-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-gray-100'
                                    }`}
                            >
                                <Icon size={18} className={activeTab === tab.id ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Settings Content */}
                <div className="flex-1">
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden transition-colors duration-200">
                        <div className="p-6 sm:p-8">
                            {activeTab === 'profile' && (
                                <form onSubmit={handleSave} className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Profile Information</h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Update your account's profile information and email address.</p>
                                    </div>

                                    {success && (
                                        <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg border border-green-100 dark:border-green-900/30 text-sm font-medium">
                                            Settings saved successfully.
                                        </div>
                                    )}

                                    <div className="flex items-center gap-6 mb-6">
                                        <div className="h-20 w-20 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 flex items-center justify-center text-2xl font-bold border-4 border-white dark:border-slate-900 shadow-sm transition-colors duration-200">
                                            {formData.name.charAt(0) || 'A'}
                                        </div>
                                        <div>
                                            <button type="button" className="px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium shadow-sm">
                                                Change Avatar
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-3 py-2 bg-transparent text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors duration-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                                            <input
                                                type="text"
                                                value={formData.company}
                                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                className="w-full px-3 py-2 bg-transparent text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors duration-200"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                readOnly
                                                className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-gray-400 outline-none cursor-not-allowed transition-colors duration-200"
                                            />
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Contact support to change your email address.</p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-100 dark:border-slate-800 flex justify-end transition-colors duration-200">
                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm shadow-sm disabled:opacity-50"
                                        >
                                            <Save size={16} />
                                            {isSaving ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {activeTab === 'security' && (
                                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                    <Shield size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                                    <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">Security Settings</p>
                                    <p className="text-sm">Change password and enable Two-Factor Authentication (2FA).</p>
                                    <button className="mt-6 px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium shadow-sm">
                                        Coming Soon
                                    </button>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                    <Bell size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                                    <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">Notification Preferences</p>
                                    <p className="text-sm">Manage how you receive alerts and summaries.</p>
                                </div>
                            )}

                            {activeTab === 'api' && (
                                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                    <Key size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                                    <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">API Key Management</p>
                                    <p className="text-sm">Generate and manage API keys for integrations.</p>
                                    <button className="mt-6 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm flex items-center gap-2 mx-auto shadow-sm">
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
