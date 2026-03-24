import React from 'react';
import { Rocket, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ROUTES } from '../constants/routes';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
                <div className="text-[150px] font-black text-slate-900/50 leading-none select-none drop-shadow-2xl mb-8 flex items-center gap-4">
                    4<Rocket className="text-primary-500 w-24 h-24 -rotate-45 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />4
                </div>

                <div className="glass-card px-10 py-12 rounded-[40px] border border-white/5 backdrop-blur-2xl text-center max-w-lg">
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
                        Signal <span className="text-primary-400">Lost</span>
                    </h1>
                    
                    <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
                        The designated coordinates could not be located in the current workspace. The module may have been renamed, removed, or is beyond authorized access.
                    </p>

                    <div className="flex justify-center">
                        <Button 
                            variant="primary" 
                            icon={Home} 
                            onClick={() => navigate(ROUTES.DASHBOARD)}
                            className="shadow-xl shadow-primary-500/20"
                        >
                            Return to Dashboard
                        </Button>
                    </div>
                </div>
            </div>
            
            {/* Footer branding */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Bostechie Orbit</span>
                <span className="w-1 h-1 bg-slate-600 rounded-full" />
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">System Error</span>
            </div>
        </div>
    );
}
