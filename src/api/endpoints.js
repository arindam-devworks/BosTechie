export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.bostechieorbit.com/v1';

export const ENDPOINTS = {
    // Auth & Identity
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        REFRESH: '/auth/refresh',
        ME: '/auth/me',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
        LOGOUT: '/auth/logout'
    },
    
    // Core Multi-Tenant
    TENANT: {
        CURRENT: '/tenants/current',
        MEMBERS: '/tenants/members',
        INVITES: '/tenants/invites',
        SETTINGS: '/tenants/settings',
        PROVIDERS: '/tenants/providers' // Meta API keys, Twilio configs, SMTP configs
    },
    
    // Audience
    CONTACTS: {
        LIST: '/contacts',
        DETAIL: (id) => `/contacts/${id}`,
        IMPORT: '/contacts/import',
        TAGS: '/contacts/tags'
    },
    
    SEGMENTS: {
        LIST: '/segments',
        DETAIL: (id) => `/segments/${id}`,
        EVALUATE: '/segments/evaluate' // Preview segment size
    },
    
    // Content Creation
    TEMPLATES: {
        EMAIL: '/templates/email',
        EMAIL_DETAIL: (id) => `/templates/email/${id}`,
        WHATSAPP: '/templates/whatsapp',
        WHATSAPP_DETAIL: (id) => `/templates/whatsapp/${id}`,
        WHATSAPP_SYNC: '/templates/whatsapp/sync-provider' // e.g. Sync status from Meta
    },
    
    // Delivery
    CAMPAIGNS: {
        LIST: '/campaigns',
        DETAIL: (id) => `/campaigns/${id}`,
        CREATE: '/campaigns',
        SCHEDULE: (id) => `/campaigns/${id}/schedule`,
        TEST: (id) => `/campaigns/${id}/test`,
        CANCEL: (id) => `/campaigns/${id}/cancel`
    },
    
    // Reporting
    ANALYTICS: {
        OVERVIEW: '/analytics/overview',
        CAMPAIGN: (id) => `/analytics/campaigns/${id}`,
        DELIVERY_LOGS: '/analytics/logs'
    }
};
