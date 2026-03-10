import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validations/loginSchema';
import { sanitize } from '../validations/patterns';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Globe, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

// ─── Input class helper ───────────────────────────────────────────────────────
function inputClass(error, touched, extraPadding = '') {
    const base = `w-full pl-12 py-4 bg-white/70 dark:bg-slate-900/50 border rounded-2xl text-[13px] font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all duration-300 shadow-sm ${extraPadding}`;
    if (error) return `${base} border-red-400 dark:border-red-500/70 focus:border-red-400 ring-2 ring-red-500/10`;
    if (touched && !error) return `${base} border-emerald-400 dark:border-emerald-500/60 focus:border-emerald-400 ring-2 ring-emerald-500/10`;
    return `${base} border-slate-200 dark:border-slate-800 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15`;
}

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, touchedFields, isValid }
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
        reValidateMode: 'onChange',
    });

    const onSubmit = useCallback(async (data) => {
        try {
            setServerError('');
            const email = sanitize(data.email);
            const password = data.password;

            await new Promise((resolve) => setTimeout(resolve, 800));

            if (email === 'admin@demo.com' && password === 'password123') {
                const fakeToken = btoa(JSON.stringify({ email, name: 'Admin', role: 'admin' }));
                login(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${fakeToken}.signature`, { email, name: 'Admin' });
                navigate('/');
            } else {
                setServerError('Invalid credentials. Use admin@demo.com / password123');
            }
        } catch {
            setServerError('An error occurred during secure connection');
        }
    }, [login, navigate]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            {/* Background orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px] animate-pulse delay-1000 pointer-events-none" />

            <div className="w-full max-w-[1000px] grid lg:grid-cols-2 glass-card rounded-2xl sm:rounded-[40px] overflow-hidden relative z-10">

                {/* ── Left panel (desktop only) ─────────────────────────────── */}
                <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 dark:bg-slate-950 border-r border-white/5 dark:border-slate-800/50 relative bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-slate-900/80 dark:bg-slate-950/90 backdrop-blur-[2px]" />

                    {/* Logo */}
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-orbit orbit-glow flex items-center justify-center text-white font-black text-xl">BO</div>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-black text-white uppercase tracking-tighter leading-none">Bostechie</h1>
                            <span className="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] mt-1">Orbit</span>
                        </div>
                    </div>

                    {/* Headline */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-black text-primary-400 uppercase tracking-widest mb-6">
                            <Sparkles size={12} /> Version 2.0 Ready
                        </div>
                        <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
                            Enter the <span className="text-gradient">Automation</span> Universe.
                        </h2>
                        <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-sm">
                            Connect with millions across Email and WhatsApp with enterprise-grade precision and orbital scale.
                        </p>
                    </div>

                    {/* Status */}
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Globe size={14} className="text-primary-500" />
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Global Node: Active</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Secure Sync Enabled</span>
                    </div>
                </div>

                {/* ── Right panel: Form ─────────────────────────────────────── */}
                <div className="p-6 sm:p-8 lg:p-16 bg-white/40 dark:bg-slate-900/40 flex flex-col justify-center">

                    {/* Mobile logo */}
                    <div className="mb-8 lg:hidden flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-orbit orbit-glow flex items-center justify-center text-white font-black text-2xl">BO</div>
                    </div>

                    {/* Header */}
                    <div className="text-center lg:text-left mb-8">
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-2">Access Granted</h3>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Initialize your session to continue</p>
                    </div>

                    {/* Server error */}
                    {serverError && (
                        <div className="mb-6 flex items-center gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30">
                            <AlertCircle size={16} className="text-red-500 shrink-0" />
                            <p className="text-red-600 dark:text-red-400 text-[11px] font-black uppercase tracking-widest">{serverError}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] ml-1">Terminal ID (Email)</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    {...register('email')}
                                    type="email"
                                    placeholder="your@command.center"
                                    autoComplete="email"
                                    className={inputClass(errors.email, touchedFields.email, touchedFields.email && !errors.email ? 'pr-10' : 'pr-4')}
                                />
                                {touchedFields.email && !errors.email && (
                                    <CheckCircle2 size={15} className="text-emerald-500 absolute right-4 top-1/2 -translate-y-1/2" />
                                )}
                            </div>
                            {errors.email && (
                                <p className="ml-1 flex items-center gap-1 text-[10px] font-bold text-red-500 uppercase tracking-wider">
                                    <AlertCircle size={10} /> {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Secret Key (Password)</label>
                                <Link to="/forgot-password" className="text-[10px] font-black text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 uppercase tracking-wider transition-colors">
                                    Lost Access?
                                </Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••••••"
                                    autoComplete="current-password"
                                    className={inputClass(errors.password, touchedFields.password, 'pr-12')}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="ml-1 flex items-center gap-1 text-[10px] font-bold text-red-500 uppercase tracking-wider">
                                    <AlertCircle size={10} /> {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Remember me */}
                        <label className="flex items-center gap-3 cursor-pointer group ml-1">
                            <div className="relative w-5 h-5 shrink-0">
                                <input type="checkbox" className="peer absolute opacity-0 w-full h-full cursor-pointer z-10" />
                                <div className="w-5 h-5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 group-hover:border-primary-200 dark:group-hover:border-primary-800 peer-checked:bg-primary-500 peer-checked:border-primary-500 transition-all duration-300 shadow-sm rounded-sm" />
                                <div className="absolute inset-0 flex items-center justify-center text-white scale-0 peer-checked:scale-100 transition-transform duration-300">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                </div>
                            </div>
                            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Stay synchronised</span>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-orbit text-white rounded-2xl font-black text-[13px] uppercase tracking-[0.2em] shadow-lg shadow-primary-500/20 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Initialize Session
                                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-10 text-center text-[11px] font-black text-slate-500 uppercase tracking-widest">
                        New Entity?{' '}
                        <Link to="/register" className="text-primary-500 hover:text-primary-600 transition-colors ml-1 underline underline-offset-4 decoration-2">
                            Create ID
                        </Link>
                    </p>
                </div>
            </div>

            {/* Footer — hidden on mobile to prevent overflow */}
            <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 items-center gap-8">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">© 2026 Bostechie</span>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Orbit Platform</span>
            </div>
        </div>
    );
}
