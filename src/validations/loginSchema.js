import { z } from 'zod';
import { PATTERNS, MESSAGES } from './patterns';

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, MESSAGES.email.required)
        .max(254, MESSAGES.email.max)
        .regex(PATTERNS.EMAIL, MESSAGES.email.format)
        .toLowerCase()
        .transform((v) => v.trim()),

    password: z
        .string()
        .min(1, MESSAGES.password.required)
        .min(8, MESSAGES.password.min),
});
