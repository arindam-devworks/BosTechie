/**
 * Centralized validation patterns for BosTechie Orbit SaaS
 * Single source of truth for all regex rules and sanitization
 */

// ─── Regex Patterns ──────────────────────────────────────────────────────────

export const PATTERNS = {
    /** Letters, spaces, hyphens only — e.g. first/last name */
    NAME: /^[A-Za-z\s-]{2,50}$/,

    /** Company: letters, numbers, spaces &.- */
    COMPANY: /^[A-Za-z0-9\s&.\-]{2,100}$/,

    /** Strict email: no spaces, valid @ and TLD */
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,

    /** E.164 international phone: optional +, 8-18 digits */
    PHONE: /^\+?[1-9]\d{7,17}$/,

    /**
     * Strong password:
     *  - 8-64 chars
     *  - at least 1 lowercase, 1 uppercase, 1 digit, 1 special char
     */
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_#^()=+[\]{};:'",.<>/?`~|\\]).{8,64}$/,
};

// ─── Error Messages ───────────────────────────────────────────────────────────

export const MESSAGES = {
    firstName: {
        required: 'First name is required',
        min: 'Must be at least 2 characters',
        max: 'Cannot exceed 50 characters',
        pattern: 'Only letters, spaces, and hyphens allowed',
    },
    lastName: {
        required: 'Last name is required',
        min: 'Must be at least 2 characters',
        max: 'Cannot exceed 50 characters',
        pattern: 'Only letters, spaces, and hyphens allowed',
    },
    companyName: {
        required: 'Company name is required',
        min: 'Must be at least 2 characters',
        max: 'Cannot exceed 100 characters',
        pattern: 'Only letters, numbers, spaces & . - allowed',
    },
    email: {
        required: 'Work email is required',
        format: 'Enter a valid email address',
        max: 'Email cannot exceed 254 characters',
    },
    phone: {
        required: 'Phone number is required',
        format: 'Enter a valid international phone number (e.g. +1 234 567 8901)',
    },
    password: {
        required: 'Password is required',
        min: 'Minimum 8 characters',
        max: 'Maximum 64 characters',
        pattern: 'Must include uppercase, lowercase, number & special character',
    },
    confirmPassword: {
        required: 'Please confirm your password',
        match: "Passwords don't match",
    },
};

// ─── Password Strength ────────────────────────────────────────────────────────

/**
 * Returns a numeric strength score 0-4 for a password string.
 * 0 = empty, 1 = weak, 2 = fair, 3 = strong, 4 = excellent
 */
export function getPasswordStrength(password) {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/\d/.test(password) && /[@$!%*?&\-_#^()=+[\]{};:'",.<>/?`~|\\]/.test(password)) score++;
    return score;
}

export const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Strong', 'Excellent'];
export const STRENGTH_COLORS = ['', 'bg-red-500', 'bg-yellow-400', 'bg-blue-500', 'bg-emerald-500'];
export const STRENGTH_TEXT_COLORS = ['', 'text-red-500', 'text-yellow-500', 'text-blue-500', 'text-emerald-500'];

// ─── Security / Sanitization ──────────────────────────────────────────────────

/**
 * Sanitize a string: trim whitespace, strip any HTML/script injection.
 * Safe to call on all user-supplied string inputs before processing.
 */
export function sanitize(value) {
    if (typeof value !== 'string') return value;
    return value
        .trim()
        // Remove script tags and their contents
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
        // Strip any remaining HTML tags
        .replace(/<[^>]*>/g, '')
        // Remove javascript: protocol
        .replace(/javascript:/gi, '')
        // Remove on* event handlers (onerror=, onclick=, etc.)
        .replace(/on\w+\s*=/gi, '');
}
