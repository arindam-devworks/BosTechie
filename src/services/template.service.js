import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

export const templateService = {
    /**
     * Retrieves Email Templates
     * @returns {Promise<import('../types/models').EmailTemplate[]>}
     */
    getEmailTemplates: async () => {
        // return apiClient.get(ENDPOINTS.TEMPLATES.EMAIL);
        return new Promise(resolve => setTimeout(() => resolve([]), 600));
    },

    /**
     * Retrieves WhatsApp Meta Templates
     * @returns {Promise<import('../types/models').WhatsAppTemplate[]>}
     */
    getWhatsAppTemplates: async () => {
        // return apiClient.get(ENDPOINTS.TEMPLATES.WHATSAPP);
        return new Promise(resolve => setTimeout(() => resolve([]), 600));
    },

    saveEmailTemplate: async (templateData) => {
        // return apiClient.post(ENDPOINTS.TEMPLATES.EMAIL, templateData);
        return new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));
    }
};
