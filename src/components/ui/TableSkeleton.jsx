import React from 'react';
import Skeleton from './Skeleton';

/**
 * TableSkeleton Component
 * Renders a skeleton state for tables with configurable columns and rows.
 */
export default function TableSkeleton({ columns = 5, rows = 5 }) {
    return (
        <>
            {[...Array(rows)].map((_, rowIndex) => (
                <tr key={rowIndex} className="animate-pulse">
                    {[...Array(columns)].map((_, colIndex) => (
                        <td key={colIndex} className="px-8 py-5">
                            <Skeleton className="h-4 w-full" />
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}
