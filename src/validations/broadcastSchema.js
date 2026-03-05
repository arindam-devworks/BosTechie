import { z } from 'zod';

export const broadcastSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title max 100 characters'),
    offerDescription: z.string().min(1, 'Offer description is required'),
    channel: z.enum(['whatsapp', 'email'], { required_error: 'Channel selection required' }),
    audience: z.string().min(1, 'Audience selection required'),
    salutation: z.string().optional(),
    closing: z.string().optional(),
    signature: z.string().optional(),
    signatureLogo: z.any().optional(),
    attachments: z.any().array().optional(),
});
