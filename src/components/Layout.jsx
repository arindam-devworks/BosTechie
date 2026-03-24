import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const location = useLocation();

    // Auto-collapse sidebar on navigation
    useEffect(() => {
        setIsSidebarCollapsed(true);
        setSidebarOpen(false);
    }, [location.pathname]);

    // Unified toggle function for all breakpoints
    const toggleSidebar = () => {
        if (window.innerWidth >= 1024) { // matching Tailwind's lg breakpoint
            setIsSidebarCollapsed(!isSidebarCollapsed);
        } else {
            setSidebarOpen(!sidebarOpen);
        }
    };

    // Check if we are on a builder page to potentially enable focus mode or special layout
    const isBuilderPage = location.pathname.includes('campaigns') ||
        location.pathname.includes('whatsapp-templates') ||
        location.pathname.includes('broadcast');

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-[#0b0f19] overflow-hidden transition-colors duration-500">
            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Orbit Style */}
            <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-all duration-500 ease-in-out z-50 lg:z-40 h-full shrink-0`}>
                <Sidebar
                    isOpen={sidebarOpen}
                    closeSidebar={() => setSidebarOpen(false)}
                    isCollapsed={isSidebarCollapsed}
                />
            </div>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Orbital Background Elements */}
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px] -z-10"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[100px] -z-10"></div>

                <Header toggleSidebar={toggleSidebar} isBuilderPage={isBuilderPage} />
                <main className={`flex-1 min-h-0 transition-all duration-500 ${isBuilderPage ? 'flex flex-col overflow-hidden p-0' : 'overflow-y-auto p-6 lg:p-10 pt-2 custom-scrollbar'}`}>
                    <Outlet />
                </main>

                {!isBuilderPage && (
                    <footer className="h-12 px-10 flex items-center justify-between border-t border-gray-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">© 2026 Bostechie Technologies</p>
                        <div className="flex items-center gap-6">
                            <span className="text-[10px] font-black text-primary-500 uppercase tracking-widest">Bostechie Orbit</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">All Rights Reserved</span>
                        </div>
                    </footer>
                )}
            </div>
        </div>
    );
}
