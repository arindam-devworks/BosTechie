import React, { useState, useRef, useCallback } from 'react';
import { Image as ImageIcon, Video, FileText, X, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

// Accepted MIME types for the <input accept> attribute
const ACCEPT_MAP = {
    Image: '.jpg,.jpeg,.png,.gif,.svg,.tiff,.tif',
    Video: '.mp4,.mov,.avi,.mkv',
    Document: '.pdf,.docx,.txt',
};

// Allowed lowercase extensions for validation
const ALLOWED_EXT = {
    Image: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'tiff', 'tif'],
    Video: ['mp4', 'mov', 'avi', 'mkv'],
    Document: ['pdf', 'docx', 'txt'],
};

// Human-readable label shown in error
const EXT_LABEL = {
    Image: 'JPG, PNG, GIF, SVG, TIFF',
    Video: 'MP4, MOV, AVI, MKV',
    Document: 'PDF, DOCX, TXT',
};

// Icon per media type
function MediaIcon({ type, size = 24 }) {
    if (type === 'Image') return <ImageIcon size={size} />;
    if (type === 'Video') return <Video size={size} />;
    return <FileText size={size} />;
}

// Standalone drag-and-drop upload zone component
function MediaUploadZone({ mediaType, value, onChange }) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef(null);

    const handleFile = useCallback((file) => {
        if (!file) return;
        const ext = file.name.split('.').pop().toLowerCase();
        if (!ALLOWED_EXT[mediaType].includes(ext)) {
            setError(`Invalid file type ".${ext}". Allowed: ${EXT_LABEL[mediaType]}`);
            return;
        }
        setError('');
        const preview = mediaType === 'Image' ? URL.createObjectURL(file) : null;
        onChange({ file, name: file.name, size: file.size, preview });
    }, [mediaType, onChange]);

    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const onDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };
    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };
    const onInputChange = (e) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
        e.target.value = ''; // Reset so same file can be re-selected
    };
    const clearError = () => setError('');

    const formatSize = (bytes) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <div className="space-y-2">
            {/* Hidden file input */}
            <input
                ref={inputRef}
                type="file"
                accept={ACCEPT_MAP[mediaType]}
                className="hidden"
                onChange={onInputChange}
            />

            {value ? (
                /* ── File uploaded state ── */
                <div className="relative flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-300 dark:border-emerald-700 rounded-3xl shadow-sm">
                    {/* Image thumbnail */}
                    {mediaType === 'Image' && value.preview ? (
                        <img
                            src={value.preview}
                            alt="preview"
                            className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-sm border border-emerald-200 dark:border-emerald-800"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 shadow-sm">
                            <MediaIcon type={mediaType} size={28} />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                            <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                            <p className="text-[12px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">Uploaded</p>
                        </div>
                        <p className="text-[13px] font-bold text-slate-800 dark:text-slate-200 truncate">{value.name}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{formatSize(value.size)}</p>
                    </div>
                    {/* Actions */}
                    <div className="flex flex-col gap-2 shrink-0">
                        <button
                            onClick={() => inputRef.current?.click()}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            Change
                        </button>
                        <button
                            onClick={() => onChange(null)}
                            className="px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ) : (
                /* ── Drop zone ── */
                <div
                    role="button"
                    tabIndex={0}
                    onClick={() => inputRef.current?.click()}
                    onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={`border-2 border-dashed rounded-3xl p-5 sm:p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer select-none group
                        ${isDragging
                            ? 'border-primary-500 bg-primary-50/60 dark:bg-primary-900/20 scale-[1.01] shadow-lg shadow-primary-500/10'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/20 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:border-primary-400 dark:hover:border-primary-600'
                        }`}
                >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-sm transition-transform
                        ${isDragging
                            ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 scale-110'
                            : 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:scale-110'
                        }`}
                    >
                        {isDragging ? <Upload size={24} /> : <MediaIcon type={mediaType} size={24} />}
                    </div>
                    <p className={`text-[13px] font-black uppercase tracking-widest mb-1 transition-colors
                        ${isDragging ? 'text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-300'}`}>
                        {isDragging ? `Drop to upload` : `Upload ${mediaType}`}
                    </p>
                    <p className="text-[11px] font-bold text-slate-400">
                        Drag &amp; drop or click to browse
                    </p>
                    <p className="text-[10px] text-slate-300 dark:text-slate-600 mt-2">
                        {EXT_LABEL[mediaType]}
                    </p>
                </div>
            )}

            {/* Validation error banner */}
            {error && (
                <div className="flex items-start gap-2.5 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                    <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-[12px] font-bold text-red-700 dark:text-red-400">{error}</p>
                    </div>
                    <button onClick={clearError} className="text-red-400 hover:text-red-600 transition-colors">
                        <X size={13} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default function Step2MessageDesign({ data, updateData }) {
    const addVariable = () => {
        const matches = data.bodyText.match(/{{\d+}}/g) || [];
        const nextVar = matches.length + 1;
        updateData({ bodyText: data.bodyText + ` {{${nextVar}}}` });
    };

    const handleButtonAdd = () => {
        if (data.buttons.length >= 3) return;
        updateData({
            buttons: [...data.buttons, { type: 'Quick Reply', text: '', value: '' }]
        });
    };

    const updateButton = (index, field, value) => {
        const newButtons = [...data.buttons];
        newButtons[index][field] = value;
        updateData({ buttons: newButtons });
    };

    const removeButton = (index) => {
        const newButtons = [...data.buttons];
        newButtons.splice(index, 1);
        updateData({ buttons: newButtons });
    };

    // Per-type upload handler: stores in data.headerMedia[mediaType]
    const handleMediaChange = (mediaType, fileObj) => {
        const current = data.headerMedia || {};
        updateData({ headerMedia: { ...current, [mediaType]: fileObj } });
    };

    return (
        <div className="max-w-3xl mx-auto mt-2 md:mt-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] md:rounded-[40px] p-6 md:p-10 shadow-sm space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Message Design</h2>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-2">Construct the WhatsApp Payload</p>
            </div>

            {/* Header Design Box */}
            <div className="space-y-4">
                <h3 className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div> Header
                </h3>
                {(() => {
                    const selectedTypes = Array.isArray(data.headerType) ? data.headerType : [data.headerType];
                    const hasType = (t) => selectedTypes.includes(t);

                    if (hasType('None') || selectedTypes.length === 0) {
                        return (
                            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl text-center text-[12px] font-bold text-slate-400">
                                No Header Selected in Step 1.
                            </div>
                        );
                    }

                    return (
                        <div className="space-y-5">
                            {hasType('Text') && (
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Text Header</p>
                                    <input
                                        type="text"
                                        value={data.headerText || ''}
                                        onChange={(e) => updateData({ headerText: e.target.value })}
                                        placeholder="Header text (max 60 chars)"
                                        maxLength={60}
                                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl px-5 py-4 text-[13px] font-bold text-slate-900 dark:text-white outline-none shadow-sm placeholder:text-slate-400"
                                    />
                                </div>
                            )}
                            {['Image', 'Video', 'Document'].filter(hasType).map((mediaType) => (
                                <div key={mediaType} className="space-y-2">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{mediaType} Header</p>
                                    <MediaUploadZone
                                        mediaType={mediaType}
                                        value={(data.headerMedia || {})[mediaType] || null}
                                        onChange={(fileObj) => handleMediaChange(mediaType, fileObj)}
                                    />
                                </div>
                            ))}
                        </div>
                    );
                })()}
            </div>

            {/* Body Design Box */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div> Body
                    </h3>
                    <button onClick={addVariable} className="text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase hover:text-primary-700 bg-primary-50 dark:bg-primary-900/30 px-4 py-2 rounded-xl transition-colors shadow-sm cursor-pointer hover:bg-primary-100 dark:hover:bg-primary-900/50">
                        + Add Variable {'{{x}}'}
                    </button>
                </div>
                <textarea
                    value={data.bodyText}
                    onChange={(e) => updateData({ bodyText: e.target.value })}
                    placeholder="Hello {{1}}, welcome to our platform!"
                    className="w-full h-40 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl px-5 py-5 text-[14px] font-medium text-slate-900 dark:text-white outline-none focus:border-primary-500 focus:bg-white dark:focus:bg-slate-900 transition-all resize-none shadow-sm placeholder:text-slate-400"
                ></textarea>
            </div>

            {/* Footer Design Box */}
            <div className="space-y-4">
                <h3 className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400"></div> Footer
                </h3>
                <input
                    type="text"
                    value={data.footerText}
                    onChange={(e) => updateData({ footerText: e.target.value })}
                    maxLength={60}
                    placeholder="e.g. Reply STOP to unsubscribe"
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl px-5 py-4 text-[13px] font-bold text-slate-900 dark:text-white outline-none shadow-sm placeholder:text-slate-400"
                />
            </div>

            {/* Buttons Design Box */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Buttons
                    </h3>
                    <button
                        onClick={handleButtonAdd}
                        disabled={data.buttons.length >= 3}
                        className="text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase hover:text-primary-700 bg-primary-50 dark:bg-primary-900/30 px-4 py-2 rounded-xl transition-colors disabled:opacity-50 shadow-sm disabled:cursor-not-allowed"
                    >
                        + Add Button
                    </button>
                </div>

                <div className="space-y-4">
                    {data.buttons.map((btn, idx) => (
                        <div key={idx} className="p-5 md:p-6 bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 rounded-2xl flex flex-col md:flex-row gap-4 md:gap-6 relative group shadow-sm transition-all hover:bg-slate-100/50 dark:hover:bg-slate-900/50">
                            <button
                                onClick={() => removeButton(idx)}
                                className="absolute -top-3 -right-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-red-500 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-50 dark:hover:bg-red-900/20 z-10"
                            >
                                <X size={14} />
                            </button>
                            <div className="w-full md:w-1/3 space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Type</label>
                                <select
                                    value={btn.type}
                                    onChange={(e) => updateButton(idx, 'type', e.target.value)}
                                    className="w-full bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 rounded-xl px-4 py-3 text-[12px] font-bold text-slate-900 dark:text-white outline-none cursor-pointer shadow-sm"
                                >
                                    <option>Quick Reply</option>
                                    <option>Visit Website</option>
                                    <option>Call Phone Number</option>
                                </select>
                            </div>
                            <div className="w-full md:flex-1 space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Button Text</label>
                                <input
                                    value={btn.text}
                                    onChange={(e) => updateButton(idx, 'text', e.target.value)}
                                    placeholder="e.g. Visit Website"
                                    maxLength={25}
                                    className="w-full bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 rounded-xl px-4 py-3 text-[13px] font-bold text-slate-900 dark:text-white outline-none shadow-sm placeholder:text-slate-400"
                                />
                            </div>
                            {btn.type !== 'Quick Reply' && (
                                <div className="w-full md:flex-1 space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Value</label>
                                    <input
                                        value={btn.value}
                                        onChange={(e) => updateButton(idx, 'value', e.target.value)}
                                        placeholder={btn.type === 'Visit Website' ? 'https://...' : '+123456789'}
                                        className="w-full bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 rounded-xl px-4 py-3 text-[13px] font-bold text-slate-900 dark:text-white outline-none shadow-sm placeholder:text-slate-400"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                    {data.buttons.length === 0 && (
                        <div className="text-center py-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">No buttons added yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
