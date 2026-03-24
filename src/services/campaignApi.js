import { apiClient } from './apiClient';

/**
 * Campaign API service interacting with Campaign endpoints.
 * Includes mappers for status, sender tracking, and schedule parsing.
 */
export const campaignApi = {
    getAll: async (params) => {
        // e.g. params = { status: 'draft', type: 'email' }
        const data = await apiClient.get('/campaigns', { params });
        
        return {
            items: data.items?.map(c => ({
                id: c.id,
                name: c.campaign_name || c.name,
                type: c.channel_type || c.type, // 'email' | 'whatsapp'
                status: c.status,               // 'draft' | 'sending' | 'completed' | 'failed' | 'scheduled'
                audienceId: c.segment_id || c.audience_id,
                templateId: c.template_id,
                scheduleDate: c.scheduled_at || null,
                metrics: {
                    sent: c.sent_count || 0,
                    openRate: c.open_rate || 0,
                    clickRate: c.click_rate || 0,
                }
            })) || [],
            total: data.total || 0,
            page: data.page || 1,
            totalPages: data.total_pages || 1,
        };
    },
    
    getById: async (id) => {
        const data = await apiClient.get(`/campaigns/${id}`);
        return {
            id: data.id,
            name: data.campaign_name || data.name,
            type: data.channel_type || data.type,
            status: data.status,
            subject: data.subject_line || '',
            previewText: data.preview_text || '',
            senderName: data.sender_name || '',
            senderEmail: data.sender_email || '',
            audienceId: data.segment_id || data.audience_id || '',
            templateId: data.template_id || '',
            attachments: data.attachments || [],
            scheduleDate: data.scheduled_at || null,
        };
    },
    
    create: async (payload) => {
        return apiClient.post('/campaigns', payload);
    },
    
    update: async ({ id, payload }) => {
        return apiClient.put(`/campaigns/${id}`, payload);
    },
    
    delete: async (id) => {
        return apiClient.delete(`/campaigns/${id}`);
    },
    
    sendTest: async ({ id, emails }) => {
        return apiClient.post(`/campaigns/${id}/test`, { test_emails: emails });
    },
    
    sendLive: async (id) => {
        return apiClient.post(`/campaigns/${id}/send`);
    },
    
    schedule: async ({ id, date }) => {
        return apiClient.post(`/campaigns/${id}/schedule`, { scheduled_time: date });
    }
};
