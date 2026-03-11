import { useState, useEffect } from 'react';
import {
    BarChart3, TrendingUp, Users, Target,
    ArrowUpRight, ArrowDownRight, Globe, Zap,
    Activity, MousePointer2, Mail, MessageSquare,
    RefreshCw, AlertCircle
} from 'lucide-react';
import { fetchOrbitalTelemetry } from '../services/analyticsService';
import Skeleton from '../components/ui/Skeleton';
import Button from '../components/ui/Button';

export default function Analytics() {
    const [telemetry, setTelemetry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadTelemetry = async () => {
        try {
            setLoading(true);
            const data = await fetchOrbitalTelemetry();
            setTelemetry(data);
            setError(null);
        } catch (err) {
            setError('Failed to synchronize with orbital telemetry. Signal lost in transmission.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTelemetry();
        // Auto-refresh every 60 seconds for real-time feel
        const interval = setInterval(loadTelemetry, 60000);
        return () => clearInterval(interval);
    }, []);

    const ErrorFallback = () => (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-3xl flex items-center justify-center text-red-500 shadow-xl shadow-red-500/10 border border-red-100 dark:border-red-800/30">
                <AlertCircle size={40} />
            </div>
            <div className="text-center space-y-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Telemetry Uplink Failed</h3>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest max-w-[280px] leading-relaxed">
                    {error || 'The connection to the orbital data stream was interrupted.'}
                </p>
            </div>
            <Button 
                variant="primary" 
                icon={RefreshCw} 
                onClick={loadTelemetry}
                className="bg-red-500 hover:bg-red-600 shadow-red-500/20"
            >
                Initialize Reconnect
            </Button>
        </div>
    );

    if (error && !telemetry) return <ErrorFallback />;

    const STAT_CARDS = [
        { label: 'Total Transmissions', value: telemetry?.totalTransmissions?.toLocaleString() || '0', change: '+12.5%', isUp: true, icon: Zap, color: 'text-primary-500' },
        { label: 'Active Entities', value: telemetry?.activeEntities?.toLocaleString() || '0', change: '+3.2%', isUp: true, icon: Users, color: 'text-emerald-500' },
        { label: 'Interaction Rate', value: `${telemetry?.interactionRate || 0}%`, change: '-0.4%', isUp: false, icon: MousePointer2, color: 'text-violet-500' },
        { label: 'Global Reach', value: telemetry?.globalReach || '0', change: '+8', isUp: true, icon: Globe, color: 'text-amber-500' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2 text-[28px]">Orbital Telemetry</h1>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        <p className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em]">Sector Analytics / Real-time Data Stream</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={loadTelemetry}
                        className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 hover:text-primary-500 transition-all hover:rotate-180 duration-500"
                        disabled={loading}
                    >
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <select className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-primary-500/10 transition-all text-slate-900 dark:text-white cursor-pointer">
                        <option>Last 24 Hours</option>
                        <option>Last 7 Cycles</option>
                        <option>Last 30 Cycles</option>
                    </select>
                    <Button
                        variant="primary"
                        icon={TrendingUp}
                        onClick={() => {}}
                    >
                        Generate Report
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {(loading && !telemetry ? Array(4).fill(0) : STAT_CARDS).map((stat, i) => (
                    <div key={i} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[32px] p-6 group hover:border-primary-200/50 transition-all border border-slate-100 dark:border-slate-800/50 shadow-xl shadow-slate-200/20 dark:shadow-none">
                        {loading && !telemetry ? (
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <Skeleton className="w-11 h-11 rounded-2xl" />
                                    <Skeleton className="w-16 h-4 rounded-full" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-10 w-24" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700/50 ${stat.color}`}>
                                        <stat.icon size={20} />
                                    </div>
                                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${stat.isUp ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'}`}>
                                        {stat.isUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                                        {stat.change}
                                    </div>
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">{stat.value}</h3>
                                <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Main Charts area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[40px] p-8 min-h-[400px] border border-slate-100 dark:border-slate-800/50 shadow-xl shadow-slate-200/20 dark:shadow-none">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Transmission Volume</h2>
                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Cross-channel performance stream</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Email</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">WhatsApp</span>
                            </div>
                        </div>
                    </div>

                    {loading && !telemetry ? (
                        <div className="h-64 flex items-end gap-2 px-4 mt-8">
                            {Array(12).fill(0).map((_, i) => (
                                <div key={i} className="flex-1 space-y-2">
                                    <div className="flex gap-1 h-48 items-end">
                                        <Skeleton className="flex-1 rounded-t-lg h-[40%]" />
                                        <Skeleton className="flex-1 rounded-t-lg h-[25%]" />
                                    </div>
                                    <Skeleton className="h-2 w-full" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-64 flex items-end gap-2 px-4 mt-8">
                            {telemetry?.chartData.map((h, i) => (
                                <div key={i} className="flex-1 space-y-2 group">
                                    <div className="flex gap-1 h-48 items-end">
                                        <div className="flex-1 bg-primary-50 dark:bg-primary-900/10 group-hover:bg-primary-500 transition-all rounded-t-lg" style={{ height: `${h}%` }}></div>
                                        <div className="flex-1 bg-emerald-50 dark:bg-emerald-900/10 group-hover:bg-emerald-500 transition-all rounded-t-lg" style={{ height: `${Math.max(0, h - 15)}%` }}></div>
                                    </div>
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter text-center">T-{12 - i}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="lg:col-span-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[40px] p-8 border border-slate-100 dark:border-slate-800/50 shadow-xl shadow-slate-200/20 dark:shadow-none">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-1">Global Sector Index</h2>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">Engagement distribution by locale</p>

                    <div className="space-y-6">
                        {loading && !telemetry ? (
                            Array(5).fill(0).map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between">
                                        <Skeleton className="w-24 h-3" />
                                        <Skeleton className="w-8 h-3" />
                                    </div>
                                    <Skeleton className="h-2 w-full rounded-full" />
                                </div>
                            ))
                        ) : (
                            [
                                { name: 'North America', value: '42%', color: 'bg-blue-500' },
                                { name: 'Europe', value: '28%', color: 'bg-violet-500' },
                                { name: 'Asia Pacific', value: '18%', color: 'bg-emerald-500' },
                                { name: 'LATAM', value: '7%', color: 'bg-amber-500' },
                                { name: 'Others', value: '5%', color: 'bg-slate-300' },
                            ].map((sector, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                        <span>{sector.name}</span>
                                        <span>{sector.value}</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className={`h-full ${sector.color} rounded-full transition-all duration-1000`} style={{ width: sector.value }}></div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Activity Stream */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[40px] p-8 border border-slate-100 dark:border-slate-800/50 shadow-xl shadow-slate-200/20 dark:shadow-none">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Live Ops Stream</h2>
                    <button className="text-[10px] font-black text-primary-500 uppercase tracking-widest hover:text-primary-600 transition-colors">
                        View System Logs
                    </button>
                </div>

                <div className="space-y-4">
                    {loading && !telemetry ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="flex items-center gap-6 p-4">
                                <Skeleton className="w-12 h-12 rounded-xl" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-1/3" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                                <Skeleton className="w-16 h-2" />
                            </div>
                        ))
                    ) : telemetry?.activityStream.length > 0 ? (
                        telemetry.activityStream.map((log, i) => (
                            <div key={i} className="flex items-center gap-6 p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 rounded-2xl border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all animate-in slide-in-from-left duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                                <div className={`p-3 rounded-xl ${log.color} dark:bg-opacity-20`}>
                                    {log.title.includes('Campaign') ? (log.desc.includes('email') ? <Mail size={18} /> : <MessageSquare size={18} />) : <Activity size={18} />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-tighter">{log.title}</p>
                                    <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-0.5">{log.desc}</p>
                                </div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest shrink-0">{log.time}</span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <Activity size={32} className="mx-auto mb-4 text-slate-300 dark:text-slate-700" />
                            <p className="text-[11px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.3em]">No Transmission Logs Found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
