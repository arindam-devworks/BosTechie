import React from 'react';
import Skeleton from './Skeleton';

/**
 * TableSkeleton Component
 * Renders a skeleton state for tables with configurable columns and rows.
 */
export default function TableSkeleton({ columns = 5, rows = 5 }) {
    return (
        <div className="w-full space-y-4 animate-pulse">
            <div className="flex gap-4 px-6 py-4 border-b border-gray-100 dark:border-slate-800">
                {[...Array(columns)].map((_, i) => (
                    <div key={i} className="flex-1">
                        <Skeleton className="h-4 w-24" />
                    </div>
                ))}
            </div>
            {[...Array(rows)].map((_, rowIndex) => (
                <div key={rowIndex} className="flex gap-4 px-6 py-4 border-b border-gray-100 dark:border-slate-800 last:border-0">
                    {[...Array(columns)].map((_, colIndex) => (
                        <div key={colIndex} className="flex-1">
                            <Skeleton className="h-4 w-full" />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
