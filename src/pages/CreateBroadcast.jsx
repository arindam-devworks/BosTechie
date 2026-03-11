import { useState, useRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { broadcastSchema } from '../validations/broadcastSchema';
import { Send, Smartphone, Mail, Users, Paperclip, Image as ImageIcon, X, FileText, CheckCircle2 } from 'lucide-react';
import useUnsavedChanges from '../services/useUnsavedChanges';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';

export default function CreateBroadcast() {
    const { success } = useToast();
    const logoInputRef = useRef(null);
    const attachmentInputRef = useRef(null);

    const { register, handleSubmit, watch, formState: { errors, isSubmitting, isDirty }, reset, setValue } = useForm({
        resolver: zodResolver(broadcastSchema),
        defaultValues: {
            channel: 'whatsapp',
            audience: '',
            attachments: []
        }
    });

    // Integrated Unsaved Changes Guard
    useUnsavedChanges(isDirty);

    const previewTitle = watch('title');
    const previewSalutation = watch('salutation');
    const previewDescription = watch('offerDescription');
    const previewClosing = watch('closing');
    const previewSignature = watch('signature');
    const previewLogo = watch('signatureLogo');
    const previewAttachments = watch('attachments') || [];
    const selectedChannel = watch('channel');

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue('signatureLogo', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAttachmentUpload = (e) => {
        const files = Array.from(e.target.files);
        const currentAttachments = watch('attachments') || [];

        // Simulating file name storage for preview
        const newAttachments = files.map(file => ({
            name: file.name,
            size: (file.size / 1024).toFixed(1) + ' KB',
            type: file.type
        }));

        setValue('attachments', [...currentAttachments, ...newAttachments]);
        if (attachmentInputRef.current) attachmentInputRef.current.value = '';
    };

    const removeAttachment = (index) => {
        const current = watch('attachments');
        const updated = current.filter((_, i) => i !== index);
        setValue('attachments', updated);
    };

    const onSubmit = async (data) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            success('Broadcast transmission queued in orbital buffer');
            reset({
                channel: data.channel,
                audience: '',
                title: '',
                salutation: data.salutation,
                offerDescription: '',
                closing: data.closing,
                signature: data.signature,
                signatureLogo: data.signatureLogo,
                attachments: []
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Broadcast Forge</h1>
                    <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-1">Multi-Channel Transmission Hub</p>
                </div>
                
                {/* Sticky Status Indicator */}
                <div className="flex items-center gap-3 px-4 py-2 bg-slate-900/5 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-white/5 transition-all">
                    {isDirty ? (
                        <>
                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                            <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Unsaved Blueprint</span>
                        </>
                    ) : (
                        <>
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Protocol Stored</span>
                        </>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Section */}
                <div className="lg:col-span-2 glass-card rounded-[40px] p-6 lg:p-8 border border-slate-100 dark:border-slate-800 transition-all">
                    <form id="broadcast-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Select Channel</label>
                                <div className="flex flex-wrap gap-4">
                                    <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all flex-1 ${selectedChannel === 'whatsapp' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 dark:border-primary-500 ring-1 ring-primary-500' : 'border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/50'}`}>
                                        <input type="radio" value="whatsapp" {...register('channel')} className="hidden" />
                                        <Smartphone className={selectedChannel === 'whatsapp' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'} size={24} />
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-gray-100">WhatsApp</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">Direct Message</div>
                                        </div>
                                    </label>

                                    <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all flex-1 ${selectedChannel === 'email' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 dark:border-primary-500 ring-1 ring-primary-500' : 'border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/50'}`}>
                                        <input type="radio" value="email" {...register('channel')} className="hidden" />
                                        <Mail className={selectedChannel === 'email' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'} size={24} />
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-gray-100">Email</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">Formal Campaign</div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {selectedChannel === 'email' ? (
                                <div className="border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-gray-50/50 dark:bg-slate-900/50">
                                    <div className="p-1 bg-slate-100 dark:bg-slate-800 flex items-center gap-2 px-4 py-2 border-b border-gray-200 dark:border-slate-700">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Formal Email Compose</div>
                                    </div>

                                    <div className="p-4 space-y-0.5">
                                        <div className="flex items-center gap-3 py-2 border-b border-gray-200 dark:border-slate-800">
                                            <span className="text-sm font-medium text-slate-400 w-16">To:</span>
                                            <select
                                                {...register('audience')}
                                                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 outline-none appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Select Audience Segment...</option>
                                                <option value="all">All Contacts</option>
                                                <option value="lead">Qualified Leads</option>
                                                <option value="customer">Active Customers</option>
                                                <option value="vip">VIP Members</option>
                                            </select>
                                        </div>
                                        {errors.audience && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.audience.message}</p>}

                                        <div className="flex items-center gap-3 py-2 border-b border-gray-200 dark:border-slate-800">
                                            <span className="text-sm font-medium text-slate-400 w-16">Subject:</span>
                                            <input
                                                {...register('title')}
                                                placeholder="e.g. Monthly Business Update - [Month] [Year]"
                                                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 outline-none placeholder-slate-400 dark:placeholder-slate-500 font-semibold"
                                            />
                                        </div>
                                        {errors.title && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.title.message}</p>}

                                        <div className="flex items-center gap-3 py-2 border-b border-gray-200 dark:border-slate-800">
                                            <span className="text-sm font-medium text-slate-400 w-16">Salutation:</span>
                                            <input
                                                {...register('salutation')}
                                                placeholder="e.g. Dear [Customer Name],"
                                                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 outline-none italic placeholder-slate-400"
                                            />
                                        </div>

                                        <div className="pt-4">
                                            <textarea
                                                {...register('offerDescription')}
                                                rows={8}
                                                placeholder="We are writing to share some important updates regarding our platform and services. Please find the attached documentation for a detailed overview of what's coming next."
                                                className="w-full bg-white dark:bg-slate-950 p-4 min-h-[250px] text-sm text-gray-900 dark:text-gray-100 outline-none border border-gray-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary-500/20 transition-all resize-none leading-relaxed"
                                            />
                                            {errors.offerDescription && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.offerDescription.message}</p>}
                                        </div>

                                        <div className="flex items-center gap-3 py-4 border-t border-gray-200 dark:border-slate-800">
                                            <span className="text-sm font-medium text-slate-400 w-16">Sign-off:</span>
                                            <input
                                                {...register('closing')}
                                                placeholder="e.g. Best regards, The [Company Name] Team"
                                                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 outline-none font-medium placeholder-slate-400"
                                            />
                                        </div>

                                        <div className="pt-4 border-t border-gray-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Logo & Signature Column */}
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between mb-1">
                                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Company Logo & Signature</label>
                                                    <button
                                                        type="button"
                                                        onClick={() => logoInputRef.current?.click()}
                                                        className="flex items-center gap-1.5 text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors"
                                                    >
                                                        <ImageIcon size={14} /> {previewLogo ? 'Change' : 'Add Logo'}
                                                    </button>
                                                    <input
                                                        type="file"
                                                        ref={logoInputRef}
                                                        onChange={handleLogoUpload}
                                                        accept="image/*"
                                                        className="hidden"
                                                    />
                                                </div>

                                                {previewLogo && (
                                                    <div className="relative w-16 h-16 rounded-lg border border-gray-200 dark:border-slate-800 overflow-hidden group bg-white dark:bg-slate-900">
                                                        <img src={previewLogo} className="w-full h-full object-contain" alt="Signature Logo" />
                                                        <button
                                                            type="button"
                                                            onClick={() => setValue('signatureLogo', null)}
                                                            className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </div>
                                                )}

                                                <textarea
                                                    {...register('signature')}
                                                    rows={3}
                                                    placeholder="Enter your professional signature text..."
                                                    className="w-full bg-slate-50 dark:bg-slate-900/80 p-3 text-xs text-gray-700 dark:text-gray-300 outline-none border border-dashed border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500/20 transition-all resize-none italic"
                                                />
                                            </div>

                                            {/* Attachments Column */}
                                            <div className="space-y-4 border-t md:border-t-0 md:border-l border-gray-200 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
                                                <div className="flex items-center justify-between mb-1">
                                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attachments</label>
                                                    <button
                                                        type="button"
                                                        onClick={() => attachmentInputRef.current?.click()}
                                                        className="flex items-center gap-1.5 text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors"
                                                    >
                                                        <Paperclip size={14} /> Add Files
                                                    </button>
                                                    <input
                                                        type="file"
                                                        ref={attachmentInputRef}
                                                        onChange={handleAttachmentUpload}
                                                        className="hidden"
                                                        multiple
                                                    />
                                                </div>

                                                <div className="min-h-[80px] border border-gray-100 dark:border-slate-800/50 rounded-xl p-3 bg-white/30 dark:bg-black/10">
                                                    {previewAttachments.length > 0 ? (
                                                        <div className="grid grid-cols-1 gap-2">
                                                            {previewAttachments.map((file, idx) => (
                                                                <div key={idx} className="flex items-center justify-between gap-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-3 py-1.5 rounded-lg shadow-sm group">
                                                                    <div className="flex items-center gap-2 overflow-hidden">
                                                                        <FileText size={14} className="text-primary-500 shrink-0" />
                                                                        <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 truncate">{file.name}</span>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeAttachment(idx)}
                                                                        className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                                                                    >
                                                                        <X size={14} />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="h-full flex items-center justify-center">
                                                            <div className="text-[10px] text-slate-400 italic">No files attached</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Broadcast Title</label>
                                        <input
                                            {...register('title')}
                                            placeholder="e.g. Summer Sale 2026"
                                            className="w-full px-3 py-2 bg-transparent text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors duration-200"
                                        />
                                        {errors.title && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.title.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Audience</label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                                            <select
                                                {...register('audience')}
                                                className="w-full pl-10 pr-3 py-2 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none appearance-none transition-colors duration-200"
                                            >
                                                <option value="" disabled>Select a segment</option>
                                                <option value="all">All Contacts</option>
                                                <option value="lead">Leads</option>
                                                <option value="customer">Active Customers</option>
                                                <option value="vip">VIP Members</option>
                                            </select>
                                        </div>
                                        {errors.audience && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.audience.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message Detail / Offer Description</label>
                                        <textarea
                                            {...register('offerDescription')}
                                            rows={6}
                                            placeholder="Write your message here..."
                                            className="w-full px-3 py-2 bg-transparent text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-primary-500 focus:border-primary-500 outline-none resize-none transition-colors duration-200"
                                        />
                                        {errors.offerDescription && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.offerDescription.message}</p>}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                icon={Send}
                                className="px-10"
                            >
                                {selectedChannel === 'email' ? 'Ignite Email Flux' : 'Transmit Broadcast'}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Live Preview Section */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6">
                        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Live Preview</h2>
                        <div className={`rounded-3xl border-[8px] border-slate-900 dark:border-black shadow-xl overflow-hidden h-[600px] flex flex-col transition-colors duration-200 ${selectedChannel === 'whatsapp' ? 'bg-[#efeae2] dark:bg-[#0b141a]' : 'bg-[#f3f4f6] dark:bg-slate-950'}`}>

                            {/* Fake Phone Header / Status Bar */}
                            <div className="h-6 bg-slate-900 dark:bg-black w-full flex items-center justify-between px-6 shrink-0">
                                <div className="text-[10px] text-white font-medium">9:41</div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 rounded-full border border-white/20"></div>
                                    <div className="w-4 h-2 bg-white rounded-sm"></div>
                                </div>
                            </div>

                            {selectedChannel === 'whatsapp' ? (
                                <>
                                    {/* WhatsApp Header */}
                                    <div className={`px-4 py-3 flex items-center gap-3 transition-colors duration-200 bg-[#00a884] dark:bg-[#202c33] text-white`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-white/20`}>
                                            <Smartphone size={16} />
                                        </div>
                                        <div className="font-medium truncate flex-1 text-sm">
                                            Business Name
                                        </div>
                                    </div>

                                    {/* Message Body */}
                                    <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-4">
                                        {(!previewTitle && !previewDescription) ? (
                                            <div className="m-auto text-center text-gray-500 dark:text-gray-400 text-sm">
                                                Start typing to see preview...
                                            </div>
                                        ) : (
                                            <div className={`p-3 rounded-lg text-sm whitespace-pre-wrap max-w-[85%] shadow-sm bg-white dark:bg-[#202c33] text-gray-800 dark:text-gray-200 rounded-tl-none`}>
                                                {previewTitle && (
                                                    <div className="font-bold mb-1">*{previewTitle}*</div>
                                                )}
                                                {previewDescription}
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Email App Header */}
                                    <div className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center gap-3 shrink-0">
                                        <div className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                                            <Mail size={16} />
                                        </div>
                                        <div className="font-bold text-slate-800 dark:text-slate-100 text-sm">Inbox</div>
                                    </div>

                                    {/* Email Content Frame */}
                                    <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900 m-2 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 flex flex-col">
                                        {/* Email Headers */}
                                        <div className="p-4 border-b border-gray-50 dark:border-slate-800/50 space-y-2">
                                            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                                                {previewTitle || '(No Subject)'}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-[10px] font-bold text-primary-600 dark:text-primary-400">S</div>
                                                <div className="text-[10px]">
                                                    <div className="font-semibold text-slate-900 dark:text-white">SaaSAdmin <span className="font-normal text-slate-500">&lt;support@saasadmin.io&gt;</span></div>
                                                    <div className="text-slate-500">To: You</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Email Content Body */}
                                        <div className="p-5 flex-1 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed space-y-4">
                                            {/* Salutation */}
                                            {previewSalutation && (
                                                <div className="font-medium text-slate-900 dark:text-white">
                                                    {previewSalutation}
                                                </div>
                                            )}

                                            {/* Main Message Body */}
                                            <div className="min-h-[40px]">
                                                {previewDescription || <span className="text-slate-400 italic">Your email content will appear here...</span>}
                                            </div>

                                            {/* Closing / Sign-off */}
                                            {previewClosing && (
                                                <div className="font-medium text-slate-900 dark:text-white pt-2">
                                                    {previewClosing}
                                                </div>
                                            )}

                                            {/* Preview Footnote Area (Attachments & Signature) */}
                                            {(previewAttachments.length > 0 || previewSignature || previewLogo) && (
                                                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 space-y-6">
                                                    {/* Attachments first */}
                                                    {previewAttachments.length > 0 && (
                                                        <div className="space-y-2">
                                                            <div className="text-[10px] font-bold text-slate-400 uppercase">Attachments ({previewAttachments.length})</div>
                                                            <div className="grid grid-cols-2 gap-2">
                                                                {previewAttachments.map((file, idx) => (
                                                                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                                                                        <FileText size={14} className="text-primary-500" />
                                                                        <div className="min-w-0">
                                                                            <div className="text-[10px] font-medium text-slate-700 dark:text-slate-200 truncate">{file.name}</div>
                                                                            <div className="text-[8px] text-slate-400">{file.size}</div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Signature second */}
                                                    {(previewSignature || previewLogo) && (
                                                        <div className="pt-2">
                                                            {previewLogo && (
                                                                <div className="mb-2 max-w-[100px]">
                                                                    <img src={previewLogo} alt="Logo" className="w-full h-auto object-contain max-h-12" />
                                                                </div>
                                                            )}
                                                            {previewSignature && (
                                                                <div className="font-bold text-primary-600 dark:text-primary-400 mb-1 whitespace-pre-wrap">
                                                                    {previewSignature}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
