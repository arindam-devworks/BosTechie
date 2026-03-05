import React from 'react';
import { Search } from 'lucide-react';

export default function Table({
    columns,
    data,
    searchPlaceholder,
    searchValue,
    onSearchChange,
    actions,
    emptyStateMessage
}) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden transition-colors duration-200">
            {/* Table Toolbar */}
            <div className="p-4 border-b border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {onSearchChange !== undefined && (
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder={searchPlaceholder || 'Search...'}
                            value={searchValue}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-transparent text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
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
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
                    <thead className="bg-gray-50 dark:bg-slate-950/50 text-gray-700 dark:text-gray-300 font-medium border-b border-gray-200 dark:border-slate-800 transition-colors duration-200">
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={idx} className={`px-6 py-4 ${col.className || ''}`}>
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-slate-800 transition-colors duration-200">
                        {data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors duration-200">
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className={`px-6 py-4 whitespace-nowrap ${col.cellClassName || ''}`}>
                                            {col.accessor ? row[col.accessor] : col.render ? col.render(row) : null}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                    {emptyStateMessage || 'No data available'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
