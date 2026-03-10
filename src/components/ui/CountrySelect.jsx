import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

const COUNTRIES = [
    { code: 'US', label: 'United States' },
    { code: 'GB', label: 'United Kingdom' },
    { code: 'CA', label: 'Canada' },
    { code: 'AU', label: 'Australia' },
    { code: 'IN', label: 'India' },
    { code: 'DE', label: 'Germany' },
    { code: 'FR', label: 'France' },
    { code: 'JP', label: 'Japan' },
    { code: 'CN', label: 'China' },
    { code: 'BR', label: 'Brazil' },
    { code: 'IT', label: 'Italy' },
    { code: 'ES', label: 'Spain' },
    { code: 'MX', label: 'Mexico' },
    { code: 'ZA', label: 'South Africa' },
    { code: 'AE', label: 'United Arab Emirates' },
    { code: 'SG', label: 'Singapore' },
    // Add more as needed for the SaaS scale
];

export default function CountrySelect({ value, onChange, error, placeholder }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredCountries = COUNTRIES.filter(country =>
        country.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (country) => {
        onChange(country);
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-5 py-4 bg-slate-50 dark:bg-slate-900/50 border ${error ? 'border-red-300 dark:border-red-500/50' : 'border-transparent hover:border-slate-200 dark:hover:border-slate-800'} focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 rounded-2xl text-[13px] font-bold outline-none transition-all text-left ${value ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}
            >
                <span className="truncate">{value ? value.label : (placeholder || 'Select Country')}</span>
                <ChevronDown size={16} className={`text-slate-400 dark:text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-900/5 dark:shadow-slate-900/20 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                    <div className="p-2 border-b border-slate-50 dark:border-slate-900">
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                            <input
                                type="text"
                                autoFocus
                                placeholder="Search countries..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-[12px] font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="max-h-60 overflow-y-auto custom-scrollbar p-1">
                        {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                                <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => handleSelect(country)}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 text-left text-[12px] font-bold rounded-xl transition-colors ${value?.code === country.code ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/50'}`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 w-6">{country.code}</span>
                                        {country.label}
                                    </span>
                                    {value?.code === country.code && <Check size={14} className="text-primary-500" />}
                                </button>
                            ))
                        ) : (
                            <div className="px-3 py-4 text-center text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                No sectors found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
