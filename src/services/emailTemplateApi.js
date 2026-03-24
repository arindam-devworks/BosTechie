import { apiClient } from './apiClient';

/**
 * Email Template API service.
 * Handles persistence of HTML/JSON templates.
 */
export const emailTemplateApi = {
    getAll: async (params) => {
        const data = await apiClient.get('/email-templates', { params });
        return {
            items: data.items?.map(t => ({
                id: t.id,
                name: t.template_name || t.name,
                category: t.category,
                thumbnailUrl: t.preview_image_url || null,
                status: t.status,
                updatedAt: t.updated_at
            })) || [],
            total: data.total || 0,
            page: data.page || 1,
            totalPages: data.total_pages || 1,
        };
    },
    
    getById: async (id) => {
        const data = await apiClient.get(`/email-templates/${id}`);
        return {
            id: data.id,
            name: data.template_name || data.name,
            category: data.category || 'general',
            html: data.compiled_html || '',
            jsonState: data.editor_json_state || {},
            tags: data.tags || [],
        };
    },
    
    create: async (payload) => {
        return apiClient.post('/email-templates', {
            template_name: payload.name,
            category: payload.category,
            compiled_html: payload.html,
            editor_json_state: payload.jsonState,
            tags: payload.tags
        });
    },
    
    update: async ({ id, payload }) => {
        return apiClient.put(`/email-templates/${id}`, {
            template_name: payload.name,
            category: payload.category,
            compiled_html: payload.html,
            editor_json_state: payload.jsonState,
            tags: payload.tags
        });
    },
    
    delete: async (id) => {
        return apiClient.delete(`/email-templates/${id}`);
    }
};
