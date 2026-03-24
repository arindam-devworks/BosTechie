import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../services/authApi';
import { Lock, Eye, EyeOff, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { ROUTES } from '../constants/routes';

const schema = z.object({
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Missing Uppercase')
        .regex(/[0-9]/, 'Missing Number')
        .regex(/[^A-Za-z0-9]/, 'Missing Special'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "No sync",
    path: ["confirmPassword"],
});

export default function ResetPassword() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            setServerError('');
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token') || 'dev-token';
            await authApi.resetPassword({ token, password: data.password });
            setSuccess(true);
            setTimeout(() => navigate(ROUTES.LOGIN), 3000);
        } catch (e) {
            setServerError(e?.message || 'Failed to establish new key.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px]"></div>

            <div className="w-full max-w-[500px] glass-card rounded-[40px] p-10 lg:p-16 relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/20 text-[10px] font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-4">
                        <ShieldAlert size={12} />
                        Override Sequence
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">Reset Secret Key</h3>
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">Establish a new orbital access key</p>
                </div>

                {serverError && (
                    <div className="mb-6 flex items-center justify-center p-3 rounded-2xl bg-red-50 text-red-500 text-[11px] font-bold uppercase">
                        {serverError}
                    </div>
                )}

                {!success ? (
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] ml-1">New Secret Key</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 group-focus-within:text-primary-500 dark:group-focus-within:text-primary-400 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••••••"
                                    className="w-full pl-12 pr-12 py-4 bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-primary-500 dark:focus:border-primary-500 rounded-2xl text-[13px] font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all duration-300 shadow-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="ml-1 text-[10px] font-bold text-red-500 uppercase">{errors.password.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] ml-1">Verify Sync</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 group-focus-within:text-primary-500 dark:group-focus-within:text-primary-400 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    {...register('confirmPassword')}
                                    type="password"
                                    placeholder="••••••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-primary-500 dark:focus:border-primary-500 rounded-2xl text-[13px] font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all duration-300 shadow-sm"
                                />
                            </div>
                            {errors.confirmPassword && <p className="ml-1 text-[10px] font-bold text-red-500 uppercase">{errors.confirmPassword.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-orbit text-white rounded-2xl font-black text-[13px] uppercase tracking-[0.2em] shadow-lg shadow-primary-500/20 active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Syncing...' : 'Confirm Reset'}
                        </button>
                    </form>
                ) : (
                    <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto border-4 border-white dark:border-slate-800 shadow-xl">
                            <CheckCircle2 size={32} />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter">Key Established</h4>
                            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
                                Redirecting to terminal lobby...
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
