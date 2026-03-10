import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard, Users, Megaphone, Inbox,
    Settings, LayoutGrid, BarChart3, History,
    MessageSquare, Globe, X
} from 'lucide-react';

export default function Sidebar({ isOpen, closeSidebar, isCollapsed }) {
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
        <aside className={`${isCollapsed ? 'w-20' : 'w-64 lg:w-72'} bg-slate-900/95 backdrop-blur-xl text-white flex flex-col h-full border-r border-white/5 relative z-40 transition-all duration-500 ease-in-out`}>
            {/* Orbit Branding */}
            <div className={`p-6 ${isCollapsed ? 'lg:p-4' : 'lg:p-8'} flex items-center justify-between lg:justify-start`}>
                <div className="relative group cursor-pointer">
                    {/* Inner BO */}
                    <div className="w-12 h-12 rounded-full bg-orbit orbit-glow flex items-center justify-center text-white font-black text-xl z-20 relative transition-transform duration-500 group-hover:scale-110">
                        BO
                    </div>
                    {/* Orbital Ring */}
                    <div className="absolute inset-[-8px] border-2 border-primary-500/30 rounded-full animate-[spin_10s_linear_infinite] group-hover:border-primary-400/50"></div>
                </div>
                {!isCollapsed && (
                    <div className="ml-4 overflow-hidden hidden lg:block animate-in fade-in slide-in-from-left-4 duration-500">
                        <h1 className="text-xl font-black tracking-tighter text-white leading-none uppercase">Bostechie</h1>
                        <span className="text-[10px] font-bold text-primary-400 uppercase tracking-[0.3em] block mt-1">Orbit</span>
                    </div>
                )}

                <button
                    onClick={closeSidebar}
                    className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className={`flex-1 ${isCollapsed ? 'px-2' : 'px-4 lg:px-6'} space-y-2 mt-8 overflow-y-auto custom-scrollbar`}>
                {links.map((link) => {
                    const Icon = link.icon;
                    return (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            title={link.label}
                            className={({ isActive }) =>
                                `flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-4 p-3 ${!isCollapsed ? 'lg:px-4 lg:py-3' : ''} rounded-2xl transition-all duration-300 relative group overflow-hidden ${isActive
                                    ? 'bg-primary-600/20 text-white orbit-glow border border-primary-500/30'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            <Icon size={20} className={`shrink-0 transition-transform duration-300 group-hover:scale-110`} />
                            {!isCollapsed && (
                                <span className="hidden lg:block font-bold text-[13px] uppercase tracking-wider truncate animate-in fade-in slide-in-from-left-2 duration-300">
                                    {link.label}
                                </span>
                            )}

                            {/* Mobile Label */}
                            {isOpen && !isCollapsed && (
                                <span className="block lg:hidden font-bold text-[13px] uppercase tracking-wider truncate">
                                    {link.label}
                                </span>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            <div className={`p-6 ${isCollapsed ? 'lg:p-4' : 'lg:p-8'} border-t border-white/5 mt-auto`}>
                <div className={`flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5 ${isCollapsed ? 'justify-center' : ''}`}>
                    <Globe size={14} className="text-primary-400 shrink-0" />
                    {!isCollapsed && <span className="hidden lg:block text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Global Ready</span>}
                </div>
                {!isCollapsed && <p className="hidden lg:block text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-4">© 2026 Bostechie</p>}
            </div>
        </aside>
    );
}
