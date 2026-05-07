export const ROUTES = {
    // Auth
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',

    // Main App
    DASHBOARD: '/dashboard', 
    ROOT: '/',
    CONTACTS: '/contacts',
    CAMPAIGNS: '/campaigns',
    INBOX: '/inbox',
    EMAIL_TEMPLATES: '/email-templates',
    EMAIL_EDITOR: '/campaigns/email-editor/:templateId',
    WHATSAPP_TEMPLATES: '/whatsapp-templates',
    WHATSAPP_TEMPLATE_CREATE: '/whatsapp-templates/create',
    WHATSAPP_TEMPLATE_EDIT: '/whatsapp-templates/edit/:id',
    CAMPAIGN_HISTORY: '/campaign-history',
    ANALYTICS: '/analytics',
    SETTINGS: '/settings',
};
