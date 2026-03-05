import { z } from 'zod';

export const registerSchema = z.object({
    firstName: z.string().min(1, 'First Name is required').max(50, 'First Name cannot exceed 50 characters'),
    lastName: z.string().min(1, 'Last Name is required').max(50, 'Last Name cannot exceed 50 characters'),
    companyName: z.string().min(1, 'Company Name is required').max(100, 'Company Name cannot exceed 100 characters'),
    email: z.string().email('Valid email is required'),
    phone: z.string().max(18, 'Phone cannot exceed 18 characters'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
