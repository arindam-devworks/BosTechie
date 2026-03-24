// Mock apiClient ready for future backend integration
const mockData = (url, method) => {
    url = url || '';
    if (url.includes('/auth/login') || url.includes('/auth/register')) {
        return {
            user: { id: 'usr_mock', email: 'admin@demo.com', name: 'Admin', role: 'owner' },
            accessToken: 'mock_access_token',
            refreshToken: 'mock_refresh_token'
        };
    }
    if (url.includes('/auth/me')) return { id: 'usr_mock', email: 'admin@demo.com', name: 'Admin', role: 'owner' };
    if (url.includes('/settings/company')) return { name: 'BosTechie Orbit', plan: 'Enterprise' };
    if (url.includes('/analytics/overview')) return { totalCampaigns: 42, totalSent: 15420, openRate: 68.5, clickRate: 24.2, activeContacts: 8550 };
    
    if (url.includes('/campaigns')) {
        return {
            items: [
                { id: 'camp_1', name: 'Welcome Series 2024', status: 'active', sent: 1250, opened: 850, clicked: 320, type: 'email', created_at: '2024-03-01T10:00:00Z' },
                { id: 'camp_2', name: 'Flash Sale Alert', status: 'completed', sent: 5000, opened: 3200, clicked: 1100, type: 'whatsapp', created_at: '2024-03-15T14:30:00Z' },
                { id: 'camp_3', name: 'Monthly Newsletter - March', status: 'draft', sent: 0, opened: 0, clicked: 0, type: 'email', created_at: '2024-03-20T09:15:00Z' }
            ],
            total: 3
        };
    }

    if (url.includes('/email-templates')) {
        return {
            items: [
                { id: 'temp_1', template_name: 'Modern Welcome', category: 'onboarding', preview_image_url: 'https://placehold.co/400x300?text=Welcome+Template', status: 'published', updated_at: '2024-03-10T12:00:00Z' },
                { id: 'temp_2', template_name: 'Product Catalog', category: 'ecommerce', preview_image_url: 'https://placehold.co/400x300?text=Catalog+Template', status: 'published', updated_at: '2024-03-12T15:45:00Z' },
                { id: 'temp_3', template_name: 'Blank Canvas', category: 'general', preview_image_url: null, status: 'draft', updated_at: '2024-03-22T08:30:00Z' }
            ],
            total: 3
        };
    }

    if (url.includes('/whatsapp-templates')) {
        return {
            items: [
                { id: 'wa_1', template_name: 'Order Confirmation', category: 'transactional', language_code: 'en_US', status: 'approved', updated_at: '2024-03-11T09:00:00Z' },
                { id: 'wa_2', template_name: 'Appointment Reminder', category: 'utility', language_code: 'en_US', status: 'submitted', updated_at: '2024-03-14T11:20:00Z' }
            ],
            total: 2
        };
    }

    if (url.includes('/contacts')) {
        return {
            items: [
                { id: 'cnt_1', email: 'john@example.com', name: 'John Doe', status: 'subscribed', lists: ['Main List'] },
                { id: 'cnt_2', email: 'jane@example.com', name: 'Jane Smith', status: 'subscribed', lists: ['Newsletter'] }
            ],
            total: 2
        };
    }

    if (method === 'get') {
        return { data: [], total: 0 };
    }
    return { success: true, id: 'mock_' + Date.now() };
};

const mockRequest = async (url, method, _data) => {
    console.warn(`[DEV MOCK] Bypassing ${method.toUpperCase()} ${url}`);
    return mockData(url, method);
};

export const apiClient = {
    get: (url) => mockRequest(url, 'get'),
    post: (url, data) => mockRequest(url, 'post', data),
    put: (url, data) => mockRequest(url, 'put', data),
    patch: (url, data) => mockRequest(url, 'patch', data),
    delete: (url) => mockRequest(url, 'delete'),
    interceptors: {
        request: { use: () => {} },
        response: { use: () => {} }
    }
};

// Also support if it is called as a function (e.g. apiClient({ method, url }))
export default apiClient;
