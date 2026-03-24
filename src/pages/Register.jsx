import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../validations/registerSchema';
import { sanitize, getPasswordStrength, STRENGTH_LABELS, STRENGTH_COLORS, STRENGTH_TEXT_COLORS } from '../validations/patterns';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/authApi';
import { useNavigate, Link } from 'react-router-dom';
import {
    User, Mail, Building2,
    Lock, ShieldCheck, Eye, EyeOff,
    Rocket, Fingerprint, Zap, CheckCircle2, AlertCircle, Loader2
} from 'lucide-react';
import { ROUTES } from '../constants/routes';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// ─── Input class helper ───────────────────────────────────────────────────────
function inputClass(error, touched) {
    const base = 'w-full pl-10 pr-4 py-3 bg-white/70 dark:bg-slate-900/50 border rounded-xl text-[12px] font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all duration-300';
    if (error) return `${base} border-red-400 dark:border-red-500/70 focus:border-red-400 ring-2 ring-red-500/10`;
    if (touched && !error) return `${base} border-emerald-400 dark:border-emerald-500/60 focus:border-emerald-400 ring-2 ring-emerald-500/10`;
    return `${base} border-slate-200 dark:border-slate-800 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15`;
}

// ─── Field success icon ───────────────────────────────────────────────────────
function SuccessIcon() {
    return <CheckCircle2 size={14} className="text-emerald-500 absolute right-3 top-1/2 -translate-y-1/2" />;
}

// ─── Password strength bar ────────────────────────────────────────────────────
function StrengthBar({ password }) {
    const score = getPasswordStrength(password);
    if (!password) return null;
    return (
        <div className="mt-2 space-y-1.5">
            <div className="flex gap-1">
                {[1, 2, 3, 4].map((s) => (
                    <div
                        key={s}
                        className={`h-1 flex-1 rounded-full transition-all duration-500 ${score >= s ? STRENGTH_COLORS[score] : 'bg-slate-200 dark:bg-slate-800'}`}
                    />
                ))}
            </div>
            {score > 0 && (
                <p className={`text-[10px] font-black uppercase tracking-widest ${STRENGTH_TEXT_COLORS[score]}`}>
                    {STRENGTH_LABELS[score]}
                </p>
            )}
        </div>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [phoneValue, setPhoneValue] = useState('');

    const {
        register: formRegister,
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting, touchedFields, isValid }
    } = useForm({
        resolver: zodResolver(registerSchema),
        mode: 'onBlur',
        reValidateMode: 'onChange',
    });

    const passwordValue = watch('password', '');

    const onSubmit = useCallback(async (data) => {
        try {
            setServerError('');
            // Sanitize all string fields
            const clean = {
                firstName: sanitize(data.firstName),
                lastName: sanitize(data.lastName),
                companyName: sanitize(data.companyName),
                email: sanitize(data.email),
                phone: sanitize(phoneValue || ''),
                password: data.password,
            };

            // Validate phone via libphonenumber
            if (phoneValue && !isValidPhoneNumber(phoneValue)) {
                setServerError('Enter a valid international phone number.');
                return;
            }

            await authApi.signup({ ...clean, name: `${clean.firstName} ${clean.lastName}` });
            await login(clean.email, clean.password);
            navigate(ROUTES.DASHBOARD);
        } catch {
            setServerError('Orbital sync failed. Please try again.');
        }
    }, [login, navigate, phoneValue]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            {/* Background orbs */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px] animate-pulse delay-1000 pointer-events-none" />

            <div className="w-full max-w-[1200px] grid lg:grid-cols-2 glass-card rounded-2xl sm:rounded-[40px] overflow-hidden relative z-10">

                {/* ── Left panel (desktop only) ─────────────────────────────── */}
                <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 dark:bg-slate-950 border-r border-white/5 dark:border-slate-800/50 relative bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2944&auto=format&fit=crop')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-slate-900/85 dark:bg-slate-950/90 backdrop-blur-[2px]" />

                    {/* Logo */}
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-orbit orbit-glow flex items-center justify-center text-white font-black text-xl">BO</div>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-black text-white uppercase tracking-tighter leading-none">Bostechie</h1>
                            <span className="text-[10px] font-black text-primary-400 uppercase tracking-[0.3em] mt-1">Orbit</span>
                        </div>
                    </div>

                    {/* Headline + features */}
                    <div className="relative z-10">
                        <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                            Join the <br /><span className="text-gradient underline decoration-primary-500/30 underline-offset-8">Frontier.</span>
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                                <div className="p-2 rounded-xl bg-primary-500/20 text-primary-400"><Rocket size={18} /></div>
                                <div>
                                    <h3 className="text-[11px] font-black text-primary-400 uppercase tracking-widest mb-1">Instant Activation</h3>
                                    <p className="text-slate-300 text-xs font-medium leading-relaxed">Launch your first global campaign in under 120 seconds.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                                <div className="p-2 rounded-xl bg-violet-500/20 text-violet-400"><Fingerprint size={18} /></div>
                                <div>
                                    <h3 className="text-[11px] font-black text-violet-400 uppercase tracking-widest mb-1">Quantum Security</h3>
                                    <p className="text-slate-300 text-xs font-medium leading-relaxed">Multi-factor orbital authentication for every entity.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social proof */}
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Joined 2,400+ Command Centers</span>
                    </div>
                </div>

                {/* ── Right panel: Form ─────────────────────────────────────── */}
                <div className="p-6 sm:p-8 lg:p-12 bg-white/40 dark:bg-slate-900/40 flex flex-col justify-center overflow-y-auto max-h-screen lg:max-h-[90vh] custom-scrollbar">

                    {/* Mobile logo */}
                    <div className="mb-6 lg:hidden flex justify-center">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-orbit orbit-glow flex items-center justify-center text-white font-black text-lg">BO</div>
                            <div className="flex flex-col">
                                <span className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Bostechie</span>
                                <span className="text-[10px] font-black text-primary-500 uppercase tracking-[0.3em] mt-0.5">Orbit</span>
                            </div>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center lg:text-left mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-4">
                            <Zap size={12} fill="currentColor" /> Entity Registration
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-1">Establish Link</h3>
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Provide credentials for orbital authorization</p>
                    </div>

                    {/* Server error */}
                    {serverError && (
                        <div className="mb-4 flex items-center gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30">
                            <AlertCircle size={16} className="text-red-500 shrink-0" />
                            <p className="text-red-600 dark:text-red-400 text-[11px] font-black uppercase tracking-widest">{serverError}</p>
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>

                        {/* First Name + Last Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                        <User size={15} />
                                    </div>
                                    <input
                                        {...formRegister('firstName')}
                                        placeholder="Ex: Elon"
                                        autoComplete="given-name"
                                        className={inputClass(errors.firstName, touchedFields.firstName)}
                                    />
                                    {touchedFields.firstName && !errors.firstName && <SuccessIcon />}
                                </div>
                                {errors.firstName && (
                                    <p className="ml-1 flex items-center gap-1 text-[9px] font-bold text-red-500 uppercase">
                                        <AlertCircle size={9} /> {errors.firstName.message}
                                    </p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                        <User size={15} />
                                    </div>
                                    <input
                                        {...formRegister('lastName')}
                                        placeholder="Ex: Musk"
                                        autoComplete="family-name"
                                        className={inputClass(errors.lastName, touchedFields.lastName)}
                                    />
                                    {touchedFields.lastName && !errors.lastName && <SuccessIcon />}
                                </div>
                                {errors.lastName && (
                                    <p className="ml-1 flex items-center gap-1 text-[9px] font-bold text-red-500 uppercase">
                                        <AlertCircle size={9} /> {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Company Entity */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Company Entity</label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                    <Building2 size={15} />
                                </div>
                                <input
                                    {...formRegister('companyName')}
                                    placeholder="Ex: SpaceX"
                                    autoComplete="organization"
                                    className={inputClass(errors.companyName, touchedFields.companyName)}
                                />
                                {touchedFields.companyName && !errors.companyName && <SuccessIcon />}
                            </div>
                            {errors.companyName && (
                                <p className="ml-1 flex items-center gap-1 text-[9px] font-bold text-red-500 uppercase">
                                    <AlertCircle size={9} /> {errors.companyName.message}
                                </p>
                            )}
                        </div>

                        {/* Work Email + Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Work Email */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                        <Mail size={15} />
                                    </div>
                                    <input
                                        {...formRegister('email')}
                                        type="email"
                                        placeholder="your@orbit.com"
                                        autoComplete="email"
                                        className={inputClass(errors.email, touchedFields.email)}
                                    />
                                    {touchedFields.email && !errors.email && <SuccessIcon />}
                                </div>
                                {errors.email && (
                                    <p className="ml-1 flex items-center gap-1 text-[9px] font-bold text-red-500 uppercase">
                                        <AlertCircle size={9} /> {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Phone (react-phone-number-input) */}
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Comms (Phone)</label>
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field }) => (
                                        <div className={`relative flex items-center rounded-xl border transition-all duration-300 overflow-hidden
                                            ${errors.phone ? 'border-red-400 dark:border-red-500/70 ring-2 ring-red-500/10' :
                                                touchedFields.phone && !errors.phone ? 'border-emerald-400 dark:border-emerald-500/60 ring-2 ring-emerald-500/10' :
                                                    'border-slate-200 dark:border-slate-800 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/15'}
                                            bg-white/70 dark:bg-slate-900/50`}
                                        >
                                            <PhoneInput
                                                {...field}
                                                value={phoneValue}
                                                onChange={(val) => {
                                                    setPhoneValue(val || '');
                                                    field.onChange(val || '');
                                                }}
                                                defaultCountry="IN"
                                                international
                                                countryCallingCodeEditable={false}
                                                placeholder="+1 234 567 8900"
                                                className="phone-input-orbit w-full"
                                            />
                                            {touchedFields.phone && !errors.phone && (
                                                <CheckCircle2 size={14} className="text-emerald-500 mr-3 shrink-0" />
                                            )}
                                        </div>
                                    )}
                                />
                                {errors.phone && (
                                    <p className="ml-1 flex items-center gap-1 text-[9px] font-bold text-red-500 uppercase">
                                        <AlertCircle size={9} /> {errors.phone.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Secret Key (Password)</label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                    <Lock size={15} />
                                </div>
                                <input
                                    {...formRegister('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••••••"
                                    autoComplete="new-password"
                                    className={`${inputClass(errors.password, touchedFields.password)} pr-10`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                            <StrengthBar password={passwordValue} />
                            {errors.password && (
                                <p className="ml-1 flex items-center gap-1 text-[9px] font-bold text-red-500 uppercase">
                                    <AlertCircle size={9} /> {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Key Verification</label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                    <ShieldCheck size={15} />
                                </div>
                                <input
                                    {...formRegister('confirmPassword')}
                                    type="password"
                                    placeholder="••••••••••••"
                                    autoComplete="new-password"
                                    className={`${inputClass(errors.confirmPassword, touchedFields.confirmPassword)} pr-10`}
                                />
                                {touchedFields.confirmPassword && !errors.confirmPassword && <SuccessIcon />}
                            </div>
                            {errors.confirmPassword && (
                                <p className="ml-1 flex items-center gap-1 text-[9px] font-bold text-red-500 uppercase">
                                    <AlertCircle size={9} /> {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-2 py-4 bg-orbit text-white rounded-2xl font-black text-[13px] uppercase tracking-[0.2em] shadow-lg shadow-primary-500/20 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Syncing...
                                </>
                            ) : (
                                <>
                                    Initialize Entity
                                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-[11px] font-black text-slate-500 uppercase tracking-widest">
                        Already Registered?{' '}
                        <Link to={ROUTES.LOGIN} className="text-primary-500 hover:text-primary-600 transition-colors ml-1 underline underline-offset-4 decoration-2">
                            Secure Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
