import { useState, useEffect } from 'react';
import { Users, Send, MessageSquareText, ThumbsUp, Activity, BarChart3 } from 'lucide-react';
import Button from '../components/ui/Button';

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                // Simulating delay for empty state demonstration
                await new Promise(resolve => setTimeout(resolve, 1500));

                setStats({
                    totalMessagesSent: 0,
                    totalReplies: 0,
                    interestedLeads: 0,
                    totalContacts: 0
                });
            } catch (err) {
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const cards = [
        { title: 'Total Messages Sent', value: stats?.totalMessagesSent, icon: Send, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
        { title: 'Total Replies', value: stats?.totalReplies, icon: MessageSquareText, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
        { title: 'Interested Leads', value: stats?.interestedLeads, icon: ThumbsUp, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
        { title: 'Total Contacts', value: stats?.totalContacts, icon: Users, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Terminal Dashboard</h1>
                    <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-1">Satellite System Analysis</p>
                </div>
                <Button variant="secondary" icon={Activity}>
                    View Analytics Report
                </Button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/30">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 flex flex-col hover:border-gray-200 dark:hover:border-slate-700 transition-colors">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</span>
                                <div className={`p-2 rounded-lg ${card.bg} ${card.color} transition-colors duration-200`}>
                                    <Icon size={20} />
                                </div>
                            </div>
                            <div className="mt-auto">
                                {loading ? (
                                    <div className="h-8 w-24 bg-gray-200 dark:bg-slate-800 rounded animate-pulse"></div>
                                ) : (
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
                                        {card.value !== undefined ? card.value : '--'}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Placeholder for Analytics Chart 1 */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 min-h-[400px] flex flex-col transition-colors duration-200">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Delivery Performance</h2>
                    <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-950/50 transition-colors duration-200">
                        {loading ? (
                            <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500">
                                <svg className="animate-spin h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Loading chart data...</span>
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 dark:text-gray-400">
                                <Activity size={32} className="mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                                <p>No analytics data available yet</p>
                                <p className="text-sm">Start broadcasting to see performance metrics</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Placeholder for Recent Activity */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 min-h-[400px] flex flex-col transition-colors duration-200">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Recent Activity</h2>
                    <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-950/50 transition-colors duration-200">
                        {loading ? (
                            <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500">
                                <svg className="animate-spin h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Loading activity feed...</span>
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 dark:text-gray-400">
                                <MessageSquareText size={32} className="mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                                <p>Your recent activity feed is empty</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
