import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#f8f9fa] overflow-hidden">
            {/* Sidebar - Orbit Style */}
            <div className="relative h-full shrink-0">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Orbital Background Elements */}
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px] -z-10"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[100px] -z-10"></div>

                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 pt-2">
                    <Outlet />
                </main>

                <footer className="h-12 px-10 flex items-center justify-between border-t border-gray-100 bg-white/50 backdrop-blur-md">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© 2026 Bostechei Technologies</p>
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest">Bostechei Orbit</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">All Rights Reserved</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}
