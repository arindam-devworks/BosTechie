import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import EmailDesigner from '../components/EmailDesigner';
import { useCampaignContext } from '../context/CampaignContext';
import Button from '../components/ui/Button';

export default function EmailEditorFullPage() {
    const navigate = useNavigate();
    const { templateId } = useParams();
    const { emailData, setEmailData, activeBlockId, setActiveBlockId } = useCampaignContext();

    // Bonus: Keyboard shortcut to go back (or other actions)
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Ctrl + Shift + E doesn't exactly map to an action here since we're already in it,
            // but we could use it to save or return to campaign.
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
                e.preventDefault();
                navigate('/campaigns');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);

    return (
        <div className="h-full flex flex-col bg-white dark:bg-slate-800 overflow-hidden font-outfit">
            {/* Header: Full Editor Navigation */}
            <div className="h-12 bg-white/95 dark:bg-slate-700/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-600/60 flex items-center justify-between px-4 lg:px-6 shrink-0 z-40">
                <div className="flex items-center gap-3">
                    <Button 
                        variant="ghost" 
                        icon={ArrowLeft} 
                        onClick={() => navigate('/campaigns')} 
                        className="!py-1 !px-3 !text-[10px]"
                    >
                        Back to Campaign
                    </Button>
                    <div className="hidden md:block w-px h-4 bg-slate-200 dark:bg-slate-600"></div>
                    <div className="hidden md:flex items-center gap-2">
                        <div className="w-6 h-6 bg-orbit rounded-lg flex items-center justify-center shadow-md shadow-primary-500/20">
                            <Send className="text-white" size={11} />
                        </div>
                        <h1 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
                            {emailData.subject || "Draft Transmission"}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-block text-[9px] font-bold text-slate-400 uppercase tracking-widest mr-2">
                        Ctrl + Shift + E to return
                    </span>
                    <Button 
                        variant="primary" 
                        onClick={() => navigate('/campaigns')} 
                        className="!py-1 !px-3 !text-[10px]"
                    >
                        Done Editing
                    </Button>
                </div>
            </div>

            {/* Full Canvas Container */}
            <div className="flex-1 min-h-0 flex overflow-hidden">
                <EmailDesigner
                    blocks={emailData.blocks}
                    setBlocks={(blocks) => setEmailData({ ...emailData, blocks })}
                    activeBlockId={activeBlockId}
                    setActiveBlockId={setActiveBlockId}
                />
            </div>
        </div>
    );
}
