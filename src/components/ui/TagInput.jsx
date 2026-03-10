import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function TagInput({ value = [], onChange, error, placeholder }) {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(inputValue);
        } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
            removeTag(value.length - 1);
        }
    };

    const addTag = (tagText) => {
        const trimmed = tagText.trim();
        if (!trimmed) return;

        // Validation logic matching schema (max 10 tags, max 30 chars per tag, no dupes)
        if (value.length >= 10) return;
        if (trimmed.length > 30) return;

        // Case-insensitive duplicate check
        const isDuplicate = value.some(t => t.toLowerCase() === trimmed.toLowerCase());
        if (isDuplicate) return;

        onChange([...value, trimmed]);
        setInputValue('');
    };

    const removeTag = (indexToRemove) => {
        onChange(value.filter((_, index) => index !== indexToRemove));
    };

    // On blur, attempt to add the remaining typed text as a tag
    const handleBlur = () => {
        if (inputValue.trim()) {
            addTag(inputValue);
        }
    };

    return (
        <div
            className={`w-full min-h-[50px] px-2 py-1.5 bg-slate-50 dark:bg-slate-900/50 border ${error ? 'border-red-300 dark:border-red-500/50' : 'border-transparent focus-within:border-primary-500 hover:border-slate-200 dark:hover:border-slate-800'} focus-within:bg-white dark:focus-within:bg-slate-900 rounded-2xl flex flex-wrap gap-1.5 items-center transition-all cursor-text`}
            onClick={(e) => {
                // Focus the input when clicking anywhere in the container
                if (e.target === e.currentTarget) {
                    const inputElement = e.currentTarget.querySelector('input');
                    if (inputElement) inputElement.focus();
                }
            }}
        >
            {value.map((tag, index) => (
                <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-[11px] font-black uppercase tracking-tighter rounded-xl animate-in zoom-in-95 duration-200"
                >
                    #{tag}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeTag(index);
                        }}
                        className="text-primary-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full p-0.5 transition-colors focus:outline-none"
                    >
                        <X size={12} />
                    </button>
                </span>
            ))}

            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                placeholder={value.length === 0 ? placeholder : ''}
                className="flex-1 min-w-[120px] bg-transparent outline-none text-[13px] font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 px-2 py-1.5"
                disabled={value.length >= 10}
            />
        </div>
    );
}
