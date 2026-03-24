import { useNavigate } from 'react-router-dom';
import { FileText, Plus } from 'lucide-react';
import Button from '../../ui/Button';
import { ROUTES } from '../../../constants/routes';

export default function WhatsAppTemplatesEmptyState({ isSearchEmpty, clearSearch }) {
    const navigate = useNavigate();
    
    return (
        <div className="w-full py-16 px-6 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[40px] bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-500">
            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-100 dark:border-slate-700/50 flex items-center justify-center mb-6 text-primary-500">
                <FileText size={40} className="animate-pulse" />
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">
                {isSearchEmpty ? 'No Protocols Discovered' : 'Blueprint Archive Empty'}
            </h3>

            <p className="text-[12px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest max-w-[320px] mb-8 leading-relaxed">
                {isSearchEmpty
                    ? 'Adjust your uplink filters or clear the search criteria to re-establish connection with the blueprints.'
                    : 'Initialize your first messaging protocol to begin orchestrating orbital WhatsApp campaigns across the sector.'}
            </p>

            {isSearchEmpty ? (
                <Button
                    variant="secondary"
                    onClick={clearSearch}
                >
                    Clear Search Protocol
                </Button>
            ) : (
                <Button 
                    variant="primary" 
                    icon={Plus}
                    onClick={() => navigate(ROUTES.WHATSAPP_TEMPLATE_CREATE)}
                >
                    Forge New Blueprint
                </Button>
            )}
        </div>
    );
}
