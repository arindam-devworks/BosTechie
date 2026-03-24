import React from 'react';
import { Construction, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ROUTES } from '../constants/routes';

export default function ComingSoon() {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-24 h-24 mb-8 relative">
                <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full animate-pulse" />
                <div className="relative w-full h-full bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Construction size={40} className="text-primary-500" />
                </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4 text-center">
                Module in <span className="text-primary-500">Orbit</span>
            </h1>
            
            <p className="max-w-md text-slate-500 dark:text-slate-400 text-center text-sm font-medium leading-relaxed mb-10">
                This sector of the Bostechie Orbit platform is currently undergoing development integration. It will be available in an upcoming deployment sequence.
            </p>

            <Button 
                variant="secondary" 
                icon={ArrowLeft} 
                onClick={() => navigate(ROUTES.DASHBOARD)}
                className="hover:scale-105 transition-transform"
            >
                Return to Command Center
            </Button>
        </div>
    );
}
