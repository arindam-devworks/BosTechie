import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

const schema = z.object({
    email: z.string().email('Valid email is required'),
});

export default function ForgotPassword() {
    const [submitted, setSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px]"></div>

            <div className="w-full max-w-[500px] glass-card rounded-[40px] p-10 lg:p-16 relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-[10px] font-black text-primary-600 uppercase tracking-widest mb-4">
                        <ShieldCheck size={12} />
                        Security Protocol
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2">Initialize Recovery</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Enter your Terminal ID to receive a reset link</p>
                </div>

                {!submitted ? (
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Terminal ID (Email)</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-500 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    {...register('email')}
                                    type="email"
                                    placeholder="your@orbit.com"
                                    className="w-full pl-12 pr-4 py-4 bg-white/70 border border-slate-200 focus:border-primary-500 rounded-2xl text-[13px] font-bold text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 shadow-sm"
                                />
                            </div>
                            {errors.email && <p className="ml-1 text-[10px] font-bold text-red-500 uppercase tracking-wider">{errors.email.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-orbit text-white rounded-2xl font-black text-[13px] uppercase tracking-[0.2em] shadow-lg shadow-primary-500/20 active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Processing...' : 'Secure Recovery'}
                        </button>

                        <Link to="/login" className="flex items-center justify-center gap-2 text-[11px] font-black text-slate-500 hover:text-slate-900 uppercase tracking-widest transition-colors">
                            <ArrowLeft size={14} />
                            ABORT - Return to Login
                        </Link>
                    </form>
                ) : (
                    <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-xl">
                            <Sparkles size={32} />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Transmission Sent</h4>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                                Check your comms for the recovery key.
                            </p>
                        </div>
                        <Link to="/login" className="block py-4 border border-slate-200 text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                            Back to Secure Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
