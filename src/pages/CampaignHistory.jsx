import { useState } from 'react';
import { useCampaigns } from '../hooks/useCampaigns';
import {
    History, Search, Filter, Mail, MessageSquare,
    ChevronLeft, ChevronRight, Eye, RefreshCw,
    CheckCircle2, Clock, AlertCircle, BarChart2,
    Info
} from 'lucide-react';
import Button from '../components/ui/Button';
import TableSkeleton from '../components/ui/TableSkeleton';

export default function CampaignHistory() {
    const [searchTerm, setSearchTerm] = useState('');
    const { campaigns: history, isLoading: loading, refresh } = useCampaigns();

    const filteredHistory = history.filter(h =>
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'sending': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'scheduled': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'failed': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle2 size={12} />;
            case 'sending': return <RefreshCw size={12} className="animate-spin" />;
            case 'scheduled': return <Clock size={12} />;
            case 'failed': return <AlertCircle size={12} />;
            default: return null;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2 text-[28px]">Transmission Ledger</h1>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Sector Archive / {history.length} Sequences Recorded</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <Button
                        variant="secondary"
                        icon={RefreshCw}
                        onClick={() => refresh()}
                    >
                        Sync Logs
                    </Button>
                    <Button
                        variant="primary"
                        icon={BarChart2}
                        onClick={() => {}}
                    >
                        Global Ops View
                    </Button>
                </div>
            </div>

            {/* Action Bar */}
            <div className="glass-card rounded-[32px] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-96 group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Sequence ID or Name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl text-[13px] font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-primary-500/10 focus:border-primary-500/50 transition-all font-outfit"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="flex items-center gap-2 px-4 py-3 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Filter size={16} />
                        Filter Protocols
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="glass-card rounded-[32px] overflow-hidden border border-white/40 dark:border-white/10 min-h-[400px]">
                {loading ? (
                    <TableSkeleton columns={6} rows={6} />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-[rgba(255,255,255,0.03)] border-b border-slate-100 dark:border-slate-800/50">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-300 uppercase tracking-widest">Sequence Identity</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-300 uppercase tracking-widest">Protocol Type</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-300 uppercase tracking-widest">Sync Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-300 uppercase tracking-widest">Telemetry Metrics</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-300 uppercase tracking-widest">Timestamp</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 dark:text-slate-300 uppercase tracking-widest text-right">Ops</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/20">
                                {filteredHistory.map((campaign) => (
                                    <tr key={campaign.id} className="group hover:bg-slate-50/30 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-8 py-5">
                                            <div>
                                                <p className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-tighter">{campaign.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">ID: {campaign.id}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full w-fit">
                                                {campaign.type === 'email' ? (
                                                    <Mail size={12} className="text-primary-500" />
                                                ) : (
                                                    <MessageSquare size={12} className="text-emerald-500" />
                                                )}
                                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{campaign.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="space-y-2">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(campaign.status)}`}>
                                                    {getStatusIcon(campaign.status)}
                                                    {campaign.status}
                                                </div>
                                                {campaign.status === 'failed' && campaign.failureReason && (
                                                    <div className="flex items-start gap-2 max-w-[200px] animate-in slide-in-from-top-1 duration-300">
                                                        <Info size={10} className="text-red-400 shrink-0 mt-0.5" />
                                                        <p className="text-[9px] font-bold text-red-500 uppercase leading-tight tracking-wider">
                                                            {campaign.failureReason}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-6">
                                                <div className="text-center">
                                                    <p className="text-[12px] font-black text-slate-900 dark:text-white">{campaign.metrics?.sent || 0}</p>
                                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Sent</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-[12px] font-black text-slate-900 dark:text-white">{campaign.metrics?.openRate || 0}%</p>
                                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Open</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-[12px] font-black text-slate-900 dark:text-white">{campaign.metrics?.clickRate || 0}%</p>
                                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Click</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">
                                                {campaign.scheduleDate ? new Date(campaign.scheduleDate).toLocaleDateString() : 'N/A'}
                                            </p>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                                                    <BarChart2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-4 mt-6">
                <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                    Showing <span className="text-slate-900 dark:text-white">1 - {filteredHistory.length}</span> of {filteredHistory.length} Sequences
                </p>
                <div className="flex items-center gap-2">
                    <button className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm">
                        <ChevronLeft size={18} />
                    </button>
                    <button className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
