import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

/**
 * Tenant / Company Context Service
 * Handles multi-tenant resource scoping and settings.
 */
export const tenantService = {
    /**
     * Retrieves the currently active company profile
     * @returns {Promise<import('../types/models').Company>}
     */
    getCurrentTenant: async () => {
        // [BACKEND READY]
        // return apiClient.get(ENDPOINTS.TENANT.CURRENT);
        return new Promise(resolve => setTimeout(() => resolve({
            id: 'CMP-001',
            name: 'Bostechie Technologies',
            industry: 'SaaS',
            timezone: 'Asia/Kolkata',
            status: 'active',
            settings: {}
        }), 400));
    },

    getMembers: async () => {
        // return apiClient.get(ENDPOINTS.TENANT.MEMBERS);
        return Promise.resolve([]);
    },

    getProviders: async () => {
        // return apiClient.get(ENDPOINTS.TENANT.PROVIDERS);
        return Promise.resolve({ twilio: true, meta: false });
    }
};
