import React, { useState } from 'react';
import { Search, ChevronDown, Trash2, CheckSquare, Square, MoreVertical } from 'lucide-react';
import Skeleton from './ui/Skeleton';
import TableSkeleton from './ui/TableSkeleton';

export default function Table({
    columns,
    data = [],
    searchPlaceholder,
    searchValue,
    onSearchChange,
    actions,
    emptyStateMessage,
    emptyStateIcon,
    isLoading = false,
    enableSelection = false,
    selectedIds = [],
    onSelectionChange,
    bulkActions
}) {
    const handleToggleAll = () => {
        if (selectedIds.length === data.length) {
            onSelectionChange([]);
        } else {
            onSelectionChange(data.map(item => item.id));
        }
    };

    const handleToggleOne = (id) => {
        if (selectedIds.includes(id)) {
            onSelectionChange(selectedIds.filter(i => i !== id));
        } else {
            onSelectionChange([...selectedIds, id]);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 relative">
            {/* Bulk Actions Bar */}
            {selectedIds.length > 0 && bulkActions && (
                <div className="absolute top-0 inset-x-0 h-16 bg-primary-600 z-30 flex items-center justify-between px-8 animate-in slide-in-from-top duration-300">
                    <div className="flex items-center gap-4">
                        <span className="text-white text-[12px] font-black uppercase tracking-widest">{selectedIds.length} Entities Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {bulkActions}
                    </div>
                </div>
            )}

            {/* Table Toolbar */}
            <div className={`p-6 border-b border-slate-50 dark:border-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-opacity ${selectedIds.length > 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                {onSearchChange !== undefined && (
                    <div className="relative max-w-sm w-full group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder={searchPlaceholder || 'Search Terminal...'}
                            value={searchValue}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50/50 dark:bg-slate-900/50 text-[13px] font-bold text-slate-900 dark:text-white border border-transparent dark:border-slate-800 rounded-2xl focus:bg-white dark:focus:bg-slate-900 focus:border-primary-500 outline-none transition-all shadow-inner"
                        />
                    </div>
                )}
                {actions && (
                    <div className="flex items-center gap-2">
                        {actions}
                    </div>
                )}
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                    <thead className="bg-slate-50/50 dark:bg-slate-950/50 text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 transition-colors duration-200">
                        <tr>
                            {enableSelection && (
                                <th className="px-8 py-5 w-10">
                                    <button onClick={handleToggleAll} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
                                        {selectedIds.length === data.length && data.length > 0 ? (
                                            <CheckSquare size={18} className="text-primary-500" />
                                        ) : (
                                            <Square size={18} />
                                        )}
                                    </button>
                                </th>
                            )}
                            {columns.map((col, idx) => (
                                <th key={idx} className={`px-8 py-5 ${col.className || ''}`}>
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50 transition-colors duration-200">
                        {isLoading ? (
                            <TableSkeleton columns={columns.length + (enableSelection ? 1 : 0)} rows={5} />
                        ) : data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr key={rowIndex} className={`hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-colors duration-200 ${selectedIds.includes(row.id) ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''}`}>
                                    {enableSelection && (
                                        <td className="px-8 py-5">
                                            <button onClick={() => handleToggleOne(row.id)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
                                                {selectedIds.includes(row.id) ? (
                                                    <CheckSquare size={18} className="text-primary-500" />
                                                ) : (
                                                    <Square size={18} />
                                                )}
                                            </button>
                                        </td>
                                    )}
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className={`px-8 py-5 whitespace-nowrap ${col.cellClassName || ''}`}>
                                            {col.accessor ? row[col.accessor] : col.render ? col.render(row) : null}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + (enableSelection ? 1 : 0)} className="px-8 py-20 text-center">
                                    <div className="flex flex-col items-center justify-center opacity-40">
                                        {emptyStateIcon || <Search size={48} className="mb-4 text-slate-300" />}
                                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">{emptyStateMessage || 'No data discovered in this sector'}</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
