import { apiClient } from './apiClient';

/**
 * WhatsApp Template API service.
 * Submits structured WA templates and handles standard status flows (draft/submitted/approved).
 */
export const whatsappTemplateApi = {
    getAll: async (params) => {
        const data = await apiClient.get('/whatsapp-templates', { params });
        return {
            items: data.items?.map(t => ({
                id: t.id,
                name: t.template_name || t.name,
                category: t.category,
                language: t.language_code || t.language,
                status: t.status, // draft | submitted | approved | rejected
                updatedAt: t.updated_at
            })) || [],
            total: data.total || 0,
            page: data.page || 1,
            totalPages: data.total_pages || 1,
        };
    },
    
    getById: async (id) => {
        const data = await apiClient.get(`/whatsapp-templates/${id}`);
        return {
            id: data.id,
            name: data.template_name || data.name,
            category: data.category,
            language: data.language_code || data.language,
            status: data.status,
            header: {
                type: data.header_type || 'text',
                text: data.header_text || '',
                mediaUrl: data.header_media_url || null,
            },
            bodyText: data.body_text || '',
            footerText: data.footer_text || '',
            buttons: data.buttons || [],
            rejectionReason: data.rejection_reason || null,
        };
    },
    
    create: async (payload) => {
        return apiClient.post('/whatsapp-templates', {
            template_name: payload.name,
            category: payload.category,
            language_code: payload.language,
            header_type: payload.header.type,
            header_text: payload.header.text,
            header_media_url: payload.header.mediaUrl,
            body_text: payload.bodyText,
            footer_text: payload.footerText,
            buttons: payload.buttons
        });
    },
    
    update: async ({ id, payload }) => {
        return apiClient.put(`/whatsapp-templates/${id}`, {
            template_name: payload.name,
            category: payload.category,
            language_code: payload.language,
            header_type: payload.header?.type,
            header_text: payload.header?.text,
            header_media_url: payload.header?.mediaUrl,
            body_text: payload.bodyText,
            footer_text: payload.footerText,
            buttons: payload.buttons
        });
    },
    
    delete: async (id) => {
        return apiClient.delete(`/whatsapp-templates/${id}`);
    },
    
    submitForApproval: async (id) => {
        return apiClient.post(`/whatsapp-templates/${id}/submit`);
    }
};
