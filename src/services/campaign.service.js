import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

/**
 * Campaign and Broadcast Management Service
 */
export const campaignService = {
    /**
     * Lists all campaigns contextually filtered by tenant parameters
     * @param {Object} filters 
     * @returns {Promise<import('../types/models').Campaign[]>}
     */
    getCampaigns: async (filters = {}) => {
        // [BACKEND READY]
        // return apiClient.get(ENDPOINTS.CAMPAIGNS.LIST, { params: filters });
        
        return new Promise(resolve => setTimeout(() => {
            resolve([
                { id: 'CAM-001', name: 'Summer Nexus Protocol', channel: 'email', status: 'completed', recipients: 1240, delivered: 1238, opened: 856, clicked: 245, date: '2026-03-01 14:00' },
                { id: 'CAM-002', name: 'WhatsApp Flash Sync', channel: 'whatsapp', status: 'sending', recipients: 500, delivered: 342, opened: 210, clicked: 89, date: '2026-03-04 09:30' },
                { id: 'CAM-003', name: 'Alpha Feedback Loop', channel: 'email', status: 'scheduled', recipients: 2400, delivered: 0, opened: 0, clicked: 0, date: '2026-03-10 10:00' },
                { id: 'CAM-004', name: 'Retention Pulse', channel: 'email', status: 'failed', failureReason: 'SMTP Auth rejection: Protocol breach detected in sector 7.', recipients: 150, delivered: 10, opened: 5, clicked: 2, date: '2026-02-28 16:45' }
            ]);
        }, 1000));
    },

    getCampaignAnalytics: async (id) => {
        // return apiClient.get(ENDPOINTS.ANALYTICS.CAMPAIGN(id));
        return Promise.resolve({});
    },

    createCampaign: async (data) => {
        // return apiClient.post(ENDPOINTS.CAMPAIGNS.CREATE, data);
        return new Promise(resolve => setTimeout(() => resolve({ id: 'CAM-005', ...data }), 1200));
    }
};
