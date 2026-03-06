import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard, Users, Megaphone, Inbox,
    Settings, LayoutGrid, BarChart3, History,
    MessageSquare, Globe, X
} from 'lucide-react';

export default function Sidebar({ closeSidebar }) {
    const links = [
        { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/contacts', icon: Users, label: 'Contacts' },
        { to: '/broadcast', icon: Megaphone, label: 'Campaigns' },
        { to: '/templates', icon: LayoutGrid, label: 'Email Templates' },
        { to: '/whatsapp-templates', icon: MessageSquare, label: 'WhatsApp Templates' },
        { to: '/history', icon: History, label: 'Campaign History' },
        { to: '/analytics', icon: BarChart3, label: 'Analytics' },
        { to: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className="w-64 md:w-20 lg:w-72 bg-slate-900/95 backdrop-blur-xl text-white flex flex-col h-full border-r border-white/5 relative z-40 transition-all duration-500 ease-in-out">
            {/* Orbit Branding */}
            <div className="p-6 lg:p-8 flex items-center justify-between lg:justify-start">
                <div className="relative group cursor-pointer">
                    {/* Inner BO */}
                    <div className="w-12 h-12 rounded-full bg-orbit orbit-glow flex items-center justify-center text-white font-black text-xl z-20 relative transition-transform duration-500 group-hover:scale-110">
                        BO
                    </div>
                    {/* Orbital Ring */}
                    <div className="absolute inset-[-8px] border-2 border-primary-500/30 rounded-full animate-[spin_10s_linear_infinite] group-hover:border-primary-400/50"></div>
                    <div className="absolute w-2 h-2 bg-white rounded-full top-[-4px] left-1/2 -translate-x-1/2 animate-[spin_10s_linear_infinite] origin-[50%_32px]"></div>
                </div>
                <div className="ml-4 overflow-hidden block md:hidden lg:block">
                    <h1 className="text-xl font-black tracking-tighter text-white leading-none uppercase">Bostechie</h1>
                    <span className="text-[10px] font-bold text-primary-400 uppercase tracking-[0.3em] block mt-1">Orbit</span>
                </div>

                <button
                    onClick={closeSidebar}
                    className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors block md:hidden"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="flex-1 px-4 lg:px-6 space-y-2 mt-8 overflow-y-auto custom-scrollbar">
                {links.map((link) => {
                    const Icon = link.icon;
                    return (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            title={link.label}
                            className={({ isActive }) =>
                                `flex items-center justify-center lg:justify-start gap-4 p-3 lg:px-4 lg:py-3 rounded-2xl transition-all duration-300 relative group overflow-hidden ${isActive
                                    ? 'bg-primary-600/20 text-white orbit-glow border border-primary-500/30'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            {/* Active indicator */}
                            <NavLink
                                to={link.to}
                                className={({ isActive }) =>
                                    `absolute left-0 top-0 bottom-0 w-1 bg-primary-500 transition-transform duration-500 ${isActive ? 'translate-x-0' : '-translate-x-full'}`
                                }
                            />

                            <Icon size={20} className={`shrink-0 transition-transform duration-300 group-hover:scale-110`} />
                            <span className="block md:hidden lg:block font-bold text-[13px] uppercase tracking-wider truncate">{link.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="p-6 lg:p-8 border-t border-white/5 mt-auto">
                <div className="flex md:hidden lg:flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                    <Globe size={14} className="text-primary-400" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Global Ready</span>
                </div>
                <p className="block md:hidden lg:block text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-4">© 2026 Bostechie</p>
            </div>
        </aside>
    );
}
