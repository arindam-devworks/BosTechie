import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, Bell, Sun, Moon } from 'lucide-react';

export default function Header({ toggleSidebar }) {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="h-20 glass-card mx-6 my-4 rounded-3xl flex items-center justify-between px-8 z-30 transition-all duration-500 ease-in-out">
            <div className="flex items-center">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-primary-500 uppercase tracking-[0.3em] leading-none mb-1">Orbit Terminal</span>
                    <h2 className="text-lg font-black text-gray-900 uppercase tracking-tighter leading-none">Console Overview</h2>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-gray-50/50 p-1.5 rounded-2xl border border-gray-100">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl text-gray-400 hover:bg-white hover:text-gray-900 transition-all duration-300"
                        title="Toggle System Theme"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <div className="w-px h-4 bg-gray-200 mx-1"></div>
                    <button className="p-2 rounded-xl text-gray-400 hover:bg-white hover:text-gray-900 relative transition-all duration-300">
                        <Bell size={18} />
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary-500 orbit-glow"></span>
                    </button>
                </div>

                <div className="flex items-center gap-4 border-l pl-6 border-gray-100">
                    <div className="hidden md:block text-right">
                        <div className="text-sm font-black text-gray-900 uppercase tracking-wider">{user?.name || 'Authorized User'}</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{user?.email || 'Premium Tier'}</div>
                    </div>

                    <div className="relative group p-1 bg-white rounded-2xl border border-gray-100 shadow-sm transition-transform duration-300 hover:scale-105">
                        <div className="h-10 w-10 rounded-xl bg-orbit flex items-center justify-center font-black text-white text-sm">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
                        title="Secure Logout"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </header>
    );
}
