import React, { useState, useCallback, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
    Monitor, Smartphone, Save, Play, Undo2, Redo2,
    Mail, Layout as LayoutIcon, Download, Trash2, Eye
} from 'lucide-react';

import EmailDesigner from '../components/EmailDesigner';
import TemplateGallery, { TEMPLATES } from '../components/TemplateGallery';

export default function EmailTemplates() {
    const [templateName, setTemplateName] = useState('New Campaign Template');
    const [blocks, setBlocks] = useState([]);
    const [activeBlockId, setActiveBlockId] = useState(null);
    const [activeTemplateId, setActiveTemplateId] = useState(null);

    const loadTemplate = (templateId) => {
        setActiveTemplateId(templateId);
        // Mock template loading
        let newBlocks = [];
        if (templateId === 'ecommerce') {
            newBlocks = [
                { id: '1', type: 'navbar', content: { logo: 'https://images.unsplash.com/photo-1633409302862-20516fc98b1b?w=100&h=100&fit=crop' }, style: { bgColor: '#ffffff', textColor: '#000000', paddingY: 20, fontSize: 14 } },
                { id: '2', type: 'image', content: { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&height=400&fit=crop' }, style: { bgColor: '#ffffff', paddingY: 0, borderRadius: 0 } },
                { id: '3', type: 'text', content: { text: "SEASONAL RESET: UP TO 50% OFF" }, style: { bgColor: '#ffffff', textColor: '#1a1a1a', paddingY: 30, fontSize: 24, textAlign: 'center' } },
            ];
        } else {
            newBlocks = [
                { id: '1', type: 'navbar', content: { logo: 'https://images.unsplash.com/photo-1633409302862-20516fc98b1b?w=100&h=100&fit=crop' }, style: { bgColor: '#ffffff', textColor: '#000000', paddingY: 20, fontSize: 14 } },
                { id: '2', type: 'text', content: { text: "Newsletter Draft Started" }, style: { bgColor: '#ffffff', textColor: '#1a1a1a', paddingY: 30, fontSize: 16 } },
                { id: '3', type: 'footer', content: { address: 'Greater Noida, India', whatsapp: '9560027839' }, style: { bgColor: '#111111', textColor: '#ffffff', paddingY: 60, fontSize: 10 } },
            ];
        }
        setBlocks(newBlocks);
    };

    const exportAsJson = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ name: templateName, sections: blocks }));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", templateName.toLowerCase().replace(/ /g, "_") + ".json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="h-[calc(100vh-2rem)] flex flex-col -m-6 bg-[#f8f9fa] overflow-hidden">
            {/* Context Navigation Top Bar */}
            <div className="h-16 bg-white border-b border-gray-100 px-8 flex items-center justify-between shrink-0 shadow-sm z-30">
                <div className="flex items-center gap-5">
                    <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                        <Mail className="text-white" size={20} />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                                className="text-lg font-black text-gray-900 border-none bg-transparent focus:ring-0 p-0 w-80 placeholder-gray-300 uppercase tracking-tighter"
                                placeholder="Untitled Template"
                            />
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Template Management</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={exportAsJson}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-black font-bold text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-gray-900/10"
                    >
                        <Download size={14} /> Export JSON
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-bold text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-primary-600/20 active:scale-95">
                        <Play size={14} /> Save Template
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <EmailDesigner
                    blocks={blocks}
                    setBlocks={setBlocks}
                    activeBlockId={activeBlockId}
                    setActiveBlockId={setActiveBlockId}
                />

                <TemplateGallery
                    onLoadTemplate={loadTemplate}
                    activeTemplateId={activeTemplateId}
                />
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                    height: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </div>
    );
}
