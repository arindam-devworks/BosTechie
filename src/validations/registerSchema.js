import { z } from 'zod';
import { PATTERNS, MESSAGES } from './patterns';

export const registerSchema = z.object({
    firstName: z
        .string()
        .min(1, MESSAGES.firstName.required)
        .min(2, MESSAGES.firstName.min)
        .max(50, MESSAGES.firstName.max)
        .regex(PATTERNS.NAME, MESSAGES.firstName.pattern)
        .transform((v) => v.trim()),

    lastName: z
        .string()
        .min(1, MESSAGES.lastName.required)
        .min(2, MESSAGES.lastName.min)
        .max(50, MESSAGES.lastName.max)
        .regex(PATTERNS.NAME, MESSAGES.lastName.pattern)
        .transform((v) => v.trim()),

    companyName: z
        .string()
        .min(1, MESSAGES.companyName.required)
        .min(2, MESSAGES.companyName.min)
        .max(100, MESSAGES.companyName.max)
        .regex(PATTERNS.COMPANY, MESSAGES.companyName.pattern)
        .transform((v) => v.trim()),

    email: z
        .string()
        .min(1, MESSAGES.email.required)
        .max(254, MESSAGES.email.max)
        .regex(PATTERNS.EMAIL, MESSAGES.email.format)
        .toLowerCase()
        .transform((v) => v.trim()),

    phone: z
        .string()
        .min(1, MESSAGES.phone.required)
        .regex(PATTERNS.PHONE, MESSAGES.phone.format),

    password: z
        .string()
        .min(1, MESSAGES.password.required)
        .min(8, MESSAGES.password.min)
        .max(64, MESSAGES.password.max)
        .regex(PATTERNS.PASSWORD, MESSAGES.password.pattern),

    confirmPassword: z
        .string()
        .min(1, MESSAGES.confirmPassword.required),

}).refine((data) => data.password === data.confirmPassword, {
    message: MESSAGES.confirmPassword.match,
    path: ['confirmPassword'],
});
