import React from 'react';
import WhatsAppTemplateCard from './WhatsAppTemplateCard';
import WhatsAppTemplatesSkeleton from './WhatsAppTemplatesSkeleton';
import WhatsAppTemplatesEmptyState from './WhatsAppTemplatesEmptyState';

/**
 * WhatsApp Template List — passes through onEdit/onDelete to each card.
 * Grid is 1-col on mobile, 2-col on md+.
 */
export default function WhatsAppTemplateList({
    templates,
    isLoading,
    error,
    selectedTemplate,
    selectedIds = [],
    onToggleSelection,
    onSelect,
    onEdit,
    onDelete,
    isSearchEmpty,
    clearSearch,
}) {
    if (isLoading) return <WhatsAppTemplatesSkeleton />;

    if (error) {
        return (
            <div className="w-full py-16 px-6 text-center border-2 border-red-200 dark:border-red-800/30 rounded-3xl bg-red-50/50 dark:bg-red-900/10">
                <p className="text-[14px] font-black text-red-700 dark:text-red-400 uppercase tracking-widest mb-2">Failed to load templates</p>
                <p className="text-[12px] text-red-500 dark:text-red-500 font-medium">{error}</p>
            </div>
        );
    }

    if (!templates || templates.length === 0) {
        return <WhatsAppTemplatesEmptyState isSearchEmpty={isSearchEmpty} clearSearch={clearSearch} />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 animate-in fade-in duration-500">
            {templates.map((template) => (
                <WhatsAppTemplateCard
                    key={template.id}
                    template={template}
                    isSelected={selectedTemplate?.id === template.id}
                    isMultiSelected={selectedIds.includes(template.id)}
                    onToggleSelection={onToggleSelection}
                    onSelect={onSelect}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
