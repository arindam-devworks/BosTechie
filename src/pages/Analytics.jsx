import { useState, useEffect } from 'react';
import {
    BarChart3, TrendingUp, Users, Target,
    ArrowUpRight, ArrowDownRight, Globe, Zap,
    Activity, MousePointer2, Mail, MessageSquare,
    RefreshCw
} from 'lucide-react';
import { fetchOrbitalTelemetry } from '../services/analyticsService';

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
            setError('Failed to sync with orbital telemetry');
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

    if (loading && !telemetry) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <RefreshCw size={48} className="text-primary-500 animate-spin" />
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Establishing Uplink...</p>
            </div>
        );
    }

    if (error && !telemetry) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-bold uppercase text-[11px] tracking-widest text-center">
                    {error}
                </div>
                <button
                    onClick={loadTelemetry}
                    className="flex items-center gap-2 px-6 py-3 bg-orbit text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary-500/20"
                >
                    Retry Protocol
                </button>
            </div>
        );
    }

    const STAT_CARDS = [
        { label: 'Total Transmissions', value: telemetry?.totalTransmissions.toLocaleString(), change: '+12.5%', isUp: true, icon: Zap, color: 'text-primary-500' },
        { label: 'Active Entities', value: telemetry?.activeEntities.toLocaleString(), change: '+3.2%', isUp: true, icon: Users, color: 'text-emerald-500' },
        { label: 'Interaction Rate', value: `${telemetry?.interactionRate}%`, change: '-0.4%', isUp: false, icon: MousePointer2, color: 'text-violet-500' },
        { label: 'Global Reach', value: telemetry?.globalReach, change: '+8', isUp: true, icon: Globe, color: 'text-amber-500' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2 text-[28px]">Orbital Telemetry</h1>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                        <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Sector Analytics / Real-time Data Stream</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={loadTelemetry}
                        className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary-500 transition-all hover:rotate-180 duration-500"
                        disabled={loading}
                    >
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-primary-500/10 transition-all">
                        <option>Last 24 Hours</option>
                        <option>Last 7 Cycles</option>
                        <option>Last 30 Cycles</option>
                    </select>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-orbit text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        <TrendingUp size={14} />
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {STAT_CARDS.map((stat, i) => (
                    <div key={i} className="glass-card rounded-[32px] p-6 group hover:border-primary-200/50 transition-all border border-transparent">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl bg-white shadow-sm border border-slate-100 ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                {stat.isUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                                {stat.change}
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{stat.value}</h3>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Main Charts area (Visual representation) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card rounded-[40px] p-8 min-h-[400px]">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Transmission Volume</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Cross-channel performance stream</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">WhatsApp</span>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder for chart - now using telemetry.chartData */}
                    <div className="h-64 flex items-end gap-2 px-4 mt-8">
                        {telemetry?.chartData.map((h, i) => (
                            <div key={i} className="flex-1 space-y-2 group">
                                <div className="flex gap-1 h-48 items-end">
                                    <div className="flex-1 bg-primary-50 group-hover:bg-primary-500 transition-all rounded-t-lg" style={{ height: `${h}%` }}></div>
                                    <div className="flex-1 bg-emerald-50 group-hover:bg-emerald-500 transition-all rounded-t-lg" style={{ height: `${Math.max(0, h - 15)}%` }}></div>
                                </div>
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter text-center">T-{12 - i}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1 glass-card rounded-[40px] p-8">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-1">Global Sector Index</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">Engagement distribution by locale</p>

                    <div className="space-y-6">
                        {[
                            { name: 'North America', value: '42%', color: 'bg-blue-500' },
                            { name: 'Europe', value: '28%', color: 'bg-violet-500' },
                            { name: 'Asia Pacific', value: '18%', color: 'bg-emerald-500' },
                            { name: 'LATAM', value: '7%', color: 'bg-amber-500' },
                            { name: 'Others', value: '5%', color: 'bg-slate-300' },
                        ].map((sector, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-wider text-slate-700">
                                    <span>{sector.name}</span>
                                    <span>{sector.value}</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${sector.color} rounded-full transition-all duration-1000`} style={{ width: sector.value }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Activity Stream */}
            <div className="glass-card rounded-[40px] p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Live Ops Stream</h2>
                    <button className="text-[10px] font-black text-primary-500 uppercase tracking-widest hover:text-primary-600 transition-colors">
                        View System Logs
                    </button>
                </div>

                <div className="space-y-4">
                    {telemetry?.activityStream.length > 0 ? (
                        telemetry.activityStream.map((log, i) => (
                            <div key={i} className="flex items-center gap-6 p-4 hover:bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-100 transition-all animate-in slide-in-from-left duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                                <div className={`p-3 rounded-xl ${log.color}`}>
                                    {log.title.includes('Campaign') ? (log.desc.includes('email') ? <Mail size={18} /> : <MessageSquare size={18} />) : <Activity size={18} />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-[13px] font-black text-slate-900 uppercase tracking-tighter">{log.title}</p>
                                    <p className="text-[11px] font-bold text-slate-400 mt-0.5">{log.desc}</p>
                                </div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest shrink-0">{log.time}</span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <Activity size={32} className="mx-auto mb-4 text-slate-300" />
                            <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em]">No Transmission Logs Found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
