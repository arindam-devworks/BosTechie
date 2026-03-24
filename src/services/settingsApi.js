import { apiClient } from './apiClient';

/**
 * Settings API service covering profile, company/tenant info, and integrations.
 */
export const settingsApi = {
    getProfile: async () => {
        const data = await apiClient.get('/settings/profile');
        return {
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            avatarUrl: data.avatar_url,
            timezone: data.timezone,
            notificationsEnabled: data.notifications_enabled,
        };
    },
    
    updateProfile: async (payload) => {
        return apiClient.put('/settings/profile', payload);
    },
    
    getCompany: async () => {
        const data = await apiClient.get('/settings/company');
        return {
            id: data.id,
            name: data.company_name || data.name,
            industry: data.industry,
            logoUrl: data.logo_url,
            address: data.address,
            billingEmail: data.billing_email,
            subscriptionPlan: data.subscription_plan || 'free',
        };
    },
    
    updateCompany: async (payload) => {
        return apiClient.put('/settings/company', payload);
    },
    
    getIntegrations: async () => {
        const data = await apiClient.get('/settings/integrations');
        return data.integrations || data;
    },
    
    updateIntegrations: async (provider, payload) => {
        return apiClient.put(`/settings/integrations/${provider}`, payload);
    },
    
    getSecurity: async () => {
        const data = await apiClient.get('/settings/security');
        return data; // MFA status, session info
    },
    
    updateSecurity: async (payload) => {
        return apiClient.put('/settings/security', payload);
    }
};
