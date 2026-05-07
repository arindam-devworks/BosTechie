import { useQuery } from '@tanstack/react-query';
import { Users, Send, MessageSquareText, ThumbsUp, Activity, BarChart3 } from 'lucide-react';
import Button from '../components/ui/Button';
import { analyticsApi } from '../services/analyticsApi';
import { queryKeys } from '../config/queryKeys';

export default function Dashboard() {
    const { data: stats, isLoading: loading, error } = useQuery({
        queryKey: queryKeys.analytics.overview(),
        queryFn: () => analyticsApi.getOverview()
    });

    const cards = [
        { title: 'Total Messages Sent', value: stats?.totalTransmissions, icon: Send, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
        { title: 'Total Replies', value: 0, icon: MessageSquareText, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
        { title: 'Interested Leads', value: stats?.interactionRate, icon: ThumbsUp, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
        { title: 'Total Contacts', value: stats?.activeEntities, icon: Users, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Terminal Dashboard</h1>
                    <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-1">Satellite System Analysis</p>
                </div>
                <Button variant="secondary" icon={Activity} className="orbit-glow-inner">
                    View Analytics Report
                </Button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/30">
                    {error?.message || 'Failed to load dashboard data'}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <div 
                            key={idx} 
                            className="glass-card rounded-2xl p-6 flex flex-col hover:scale-[1.02] transition-all duration-500 group animate-in fade-in zoom-in-95 duration-500 fill-mode-both"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{card.title}</span>
                                <div className={`p-3 rounded-xl ${card.bg} ${card.color} transition-all duration-500 group-hover:orbit-glow`}>
                                    <Icon size={18} />
                                </div>
                            </div>
                            <div className="mt-auto">
                                {loading ? (
                                    <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
                                ) : (
                                    <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors duration-200">
                                        {card.value !== undefined ? card.value : '--'}
                                    </span>
                                )}
                            </div>
                            {/* Decorative line */}
                            <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
                {/* Placeholder for Analytics Chart 1 */}
                <div className="glass-card rounded-2xl p-6 min-h-[400px] flex flex-col group relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Delivery Performance</h2>
                        <div className="h-1.5 w-1.5 rounded-full bg-primary-500 orbit-glow animate-pulse" />
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center border border-white/5 dark:border-white/5 rounded-2xl bg-slate-50/50 dark:bg-slate-950/30 transition-all duration-500 group-hover:bg-slate-50 dark:group-hover:bg-slate-950/50">
                        {loading ? (
                            <div className="flex flex-col items-center gap-4 text-slate-400 dark:text-slate-500">
                                <div className="w-12 h-12 rounded-full border-2 border-primary-500/20 border-t-primary-500 animate-spin" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Scanning Data...</span>
                            </div>
                        ) : (
                            <div className="text-center space-y-4">
                                <div className="relative inline-block">
                                    <Activity size={48} className="text-slate-200 dark:text-slate-800 transition-colors group-hover:text-primary-500/20" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <BarChart3 size={20} className="text-slate-400 dark:text-slate-600 group-hover:text-primary-400 group-hover:orbit-glow" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">No signals detected</p>
                                    <p className="text-[9px] font-bold text-slate-500 dark:text-slate-600 uppercase tracking-widest mt-1">Start broadcasting to establish link</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Placeholder for Recent Activity */}
                <div className="glass-card rounded-2xl p-6 min-h-[400px] flex flex-col group relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Recent Activity</h2>
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 orbit-glow animate-pulse" />
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center border border-white/5 dark:border-white/5 rounded-2xl bg-slate-50/50 dark:bg-slate-950/30 transition-all duration-500 group-hover:bg-slate-50 dark:group-hover:bg-slate-950/50">
                        {loading ? (
                            <div className="flex flex-col items-center gap-4 text-slate-400 dark:text-slate-500">
                                <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Retrieving Logs...</span>
                            </div>
                        ) : (
                            <div className="text-center space-y-4">
                                <div className="relative inline-block">
                                    <MessageSquareText size={48} className="text-slate-200 dark:text-slate-800 transition-colors group-hover:text-indigo-500/20" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-slate-400 dark:text-slate-600 group-hover:bg-indigo-400 group-hover:orbit-glow" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Frequency is silent</p>
                                    <p className="text-[9px] font-bold text-slate-500 dark:text-slate-600 uppercase tracking-widest mt-1">Your recent activity feed is empty</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
