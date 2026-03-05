import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';

export const contactSchema = z.object({
    name: z.string().min(1, 'Name is required').max(50, 'Name cannot exceed 50 characters'),
    email: z.string().email('Invalid email').max(50, 'Email cannot exceed 50 characters'),
    phone: z.string()
        .max(18, 'Phone cannot exceed 18 characters')
        .refine((val) => !val || isValidPhoneNumber(val), {
            message: 'Invalid phone format',
        }),
    country: z.string().min(1, 'Country is required').max(50, 'Country cannot exceed 50 characters'),
    tags: z.string().max(50, 'Tags cannot exceed 50 characters').optional().or(z.literal('')),
    organization: z.string().max(50, 'Organization cannot exceed 50 characters').optional().or(z.literal('')),
});
