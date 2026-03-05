import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../validations/registerSchema';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
    User, Mail, Building2, Phone,
    Lock, ShieldCheck, Eye, EyeOff,
    Rocket, Fingerprint, Zap
} from 'lucide-react';

export default function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { register: formRegister, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data) => {
        try {
            setError('');
            await new Promise(resolve => setTimeout(resolve, 800));
            // Simulate successful registration and auto-login
            const fakeToken = btoa(JSON.stringify({
                email: data.email,
                name: `${data.firstName} ${data.lastName}`,
                company: data.companyName
            }));
            login(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${fakeToken}.signature`, {
                email: data.email,
                name: `${data.firstName} ${data.lastName}`
            });
            navigate('/');
        } catch (err) {
            setError('Orbital sync failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

            <div className="w-full max-w-[1200px] grid lg:grid-cols-2 glass-card rounded-[40px] overflow-hidden relative z-10">
                {/* Left Side: Signup Info */}
                <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 border-r border-white/5 relative bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2944&auto=format&fit=crop')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-[2px]"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-orbit orbit-glow flex items-center justify-center text-white font-black text-xl">
                                BO
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-xl font-black text-white uppercase tracking-tighter leading-none">Bostechei</h1>
                                <span className="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] mt-1">Orbit</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                            Join the <br /><span className="text-gradient underline decoration-primary-500/30 underline-offset-8">Frontier.</span>
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                                <div className="p-2 rounded-xl bg-primary-500/20 text-primary-400">
                                    <Rocket size={18} />
                                </div>
                                <div>
                                    <h3 className="text-[11px] font-black text-white uppercase tracking-widest mb-1 text-primary-400">Instant Activation</h3>
                                    <p className="text-slate-300 text-xs font-medium leading-relaxed">Launch your first global campaign in under 120 seconds.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                                <div className="p-2 rounded-xl bg-violet-500/20 text-violet-400">
                                    <Fingerprint size={18} />
                                </div>
                                <div>
                                    <h3 className="text-[11px] font-black text-white uppercase tracking-widest mb-1 text-violet-400">Quantum Security</h3>
                                    <p className="text-slate-300 text-xs font-medium leading-relaxed">Multi-factor orbital authentication for every entity.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 flex items-center gap-6">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Joined 2,400+ Command Centers</span>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="p-8 lg:p-12 bg-white/40 flex flex-col justify-center overflow-y-auto max-h-[90vh] custom-scrollbar">
                    <div className="text-center lg:text-left mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-[10px] font-black text-primary-600 uppercase tracking-widest mb-4">
                            <Zap size={12} fill="currentColor" />
                            Entity Registration
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-1">Establish Link</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Provide credentials for orbital authorization</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        {error && (
                            <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-[11px] font-black uppercase tracking-widest text-center italic">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">First Name</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-500 transition-colors">
                                        <User size={16} />
                                    </div>
                                    <input
                                        {...formRegister('firstName')}
                                        placeholder="Ex: Elon"
                                        className={`w-full pl-10 pr-4 py-3 bg-white/70 border ${errors.firstName ? 'border-red-300' : 'border-slate-200 group-focus-within:border-primary-500'} rounded-xl text-[12px] font-bold text-slate-900 placeholder-slate-400 outline-none transition-all duration-300`}
                                    />
                                </div>
                                {errors.firstName && <p className="ml-1 text-[9px] font-bold text-red-500 uppercase">{errors.firstName.message}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Last Name</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-500 transition-colors">
                                        <User size={16} />
                                    </div>
                                    <input
                                        {...formRegister('lastName')}
                                        placeholder="Ex: Musk"
                                        className={`w-full pl-10 pr-4 py-3 bg-white/70 border ${errors.lastName ? 'border-red-300' : 'border-slate-200 group-focus-within:border-primary-500'} rounded-xl text-[12px] font-bold text-slate-900 placeholder-slate-400 outline-none transition-all duration-300`}
                                    />
                                </div>
                                {errors.lastName && <p className="ml-1 text-[9px] font-bold text-red-500 uppercase">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Company Entity</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-500 transition-colors">
                                    <Building2 size={16} />
                                </div>
                                <input
                                    {...formRegister('companyName')}
                                    placeholder="Ex: SpaceX"
                                    className={`w-full pl-10 pr-4 py-3 bg-white/70 border ${errors.companyName ? 'border-red-300' : 'border-slate-200 group-focus-within:border-primary-500'} rounded-xl text-[12px] font-bold text-slate-900 placeholder-slate-400 outline-none transition-all duration-300`}
                                />
                            </div>
                            {errors.companyName && <p className="ml-1 text-[9px] font-bold text-red-500 uppercase">{errors.companyName.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Work Email</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-500 transition-colors">
                                        <Mail size={16} />
                                    </div>
                                    <input
                                        {...formRegister('email')}
                                        type="email"
                                        placeholder="your@orbit.com"
                                        className={`w-full pl-10 pr-4 py-3 bg-white/70 border ${errors.email ? 'border-red-300' : 'border-slate-200 group-focus-within:border-primary-500'} rounded-xl text-[12px] font-bold text-slate-900 placeholder-slate-400 outline-none transition-all duration-300`}
                                    />
                                </div>
                                {errors.email && <p className="ml-1 text-[9px] font-bold text-red-500 uppercase">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Comms (Phone)</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-500 transition-colors">
                                        <Phone size={16} />
                                    </div>
                                    <input
                                        {...formRegister('phone')}
                                        type="tel"
                                        placeholder="+1 234 567 890"
                                        className={`w-full pl-10 pr-4 py-3 bg-white/70 border ${errors.phone ? 'border-red-300' : 'border-slate-200 group-focus-within:border-primary-500'} rounded-xl text-[12px] font-bold text-slate-900 placeholder-slate-400 outline-none transition-all duration-300`}
                                    />
                                </div>
                                {errors.phone && <p className="ml-1 text-[9px] font-bold text-red-500 uppercase">{errors.phone.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Secret Key (Password)</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-500 transition-colors">
                                    <Lock size={16} />
                                </div>
                                <input
                                    {...formRegister('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••••••"
                                    className={`w-full pl-10 pr-12 py-3 bg-white/70 border ${errors.password ? 'border-red-300' : 'border-slate-200 group-focus-within:border-primary-500'} rounded-xl text-[12px] font-bold text-gray-900 placeholder-slate-400 outline-none transition-all duration-300`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.password && <p className="ml-1 text-[9px] font-bold text-red-500 uppercase leading-tight">{errors.password.message}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Key Verification</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-500 transition-colors">
                                    <ShieldCheck size={16} />
                                </div>
                                <input
                                    {...formRegister('confirmPassword')}
                                    type="password"
                                    placeholder="••••••••••••"
                                    className={`w-full pl-10 pr-12 py-3 bg-white/70 border ${errors.confirmPassword ? 'border-red-300' : 'border-slate-200 group-focus-within:border-primary-500'} rounded-xl text-[12px] font-bold text-gray-900 placeholder-slate-400 outline-none transition-all duration-300`}
                                />
                            </div>
                            {errors.confirmPassword && <p className="ml-1 text-[9px] font-bold text-red-500 uppercase">{errors.confirmPassword.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-4 py-4 bg-orbit text-white rounded-2xl font-black text-[13px] uppercase tracking-[0.2em] shadow-lg shadow-primary-500/20 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                        >
                            <span className="relative z-10">{isSubmitting ? 'Syncing...' : 'Initialize Entity'}</span>
                        </button>
                    </form>

                    <p className="mt-8 text-center text-[11px] font-black text-slate-500 uppercase tracking-widest">
                        Already Registered?{' '}
                        <Link to="/login" className="text-primary-500 hover:text-primary-600 transition-colors ml-1 underline underline-offset-4 decoration-2">
                            Secure Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
