import React from 'react';

export default function Skeleton({ className, variant = 'rect' }) {
    const variants = {
        circle: 'rounded-full',
        rect: 'rounded-xl',
        text: 'rounded-md h-4 w-full'
    };

    return (
        <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 ${variants[variant]} ${className}`}></div>
    );
}

