/**
 * React Query Keys structure
 * Keeps all query cache keys organized in one place for easy invalidation.
 */
export const queryKeys = {
    auth: {
        me: () => ['auth', 'me'],
    },
    contacts: {
        all: () => ['contacts'],
        list: (filters) => ['contacts', 'list', filters],
        detail: (id) => ['contacts', 'detail', id],
        segments: () => ['contacts', 'segments'],
    },
    campaigns: {
        all: () => ['campaigns'],
        list: (filters) => ['campaigns', 'list', filters],
        detail: (id) => ['campaigns', 'detail', id],
    },
    templates: {
        email: {
            list: () => ['templates', 'email', 'list'],
            detail: (id) => ['templates', 'email', 'detail', id],
        },
        whatsapp: {
            list: () => ['templates', 'whatsapp', 'list'],
            detail: (id) => ['templates', 'whatsapp', 'detail', id],
        }
    },
    analytics: {
        overview: () => ['analytics', 'overview'],
        campaigns: (id) => ['analytics', 'campaigns', id],
        delivery: () => ['analytics', 'delivery'],
        engagement: () => ['analytics', 'engagement'],
    },
    settings: {
        profile: () => ['settings', 'profile'],
        company: () => ['settings', 'company'],
        integrations: () => ['settings', 'integrations'],
        security: () => ['settings', 'security'],
    }
};
