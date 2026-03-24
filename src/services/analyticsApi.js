import { apiClient } from './apiClient';

/**
 * Analytics API service
 * Real metrics retrieval enforcing strict mapping from backend JSON.
 */
export const analyticsApi = {
    getOverview: async (params) => {
        const data = await apiClient.get('/analytics/overview', { params });
        return {
            totalSent: data.total_sent || 0,
            averageOpenRate: data.avg_open_rate || 0,
            averageClickRate: data.avg_click_rate || 0,
            activeCampaigns: data.active_campaigns || 0,
            audienceGrowth: data.audience_growth || [],
            timeline: data.timeline || [] // Points for charts
        };
    },
    
    getCampaignAnalytics: async (id) => {
        const data = await apiClient.get(`/analytics/campaigns/${id}`);
        return {
            sent: data.sent || 0,
            delivered: data.delivered || 0,
            opened: data.opened || 0,
            clicked: data.clicked || 0,
            bounced: data.bounced || 0,
            complaints: data.complaints || 0,
            links: data.top_links || []
        };
    },
    
    getDeliveryMetrics: async (params) => {
        const data = await apiClient.get('/analytics/delivery', { params });
        return data.metrics || data;
    },
    
    getEngagementMetrics: async (params) => {
        const data = await apiClient.get('/analytics/engagement', { params });
        return data.metrics || data;
    }
};
