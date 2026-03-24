import { apiClient } from './apiClient';

/**
 * Contact API service interacting with the Contacts module.
 * Incorporates response mappers to transform backend lists into standardized frontend structures.
 */
export const contactApi = {
    getAll: async (params) => {
        // e.g. params = { page: 1, limit: 10, search: 'foo', statuses: ['active'] }
        const data = await apiClient.get('/contacts', { params });
        
        // Map backend paginated response to a standard structure
        return {
            items: data.items?.map(c => ({
                id: c.id,
                name: c.first_name ? `${c.first_name} ${c.last_name || ''}`.trim() : c.name,
                email: c.email_address || c.email,
                phone: c.phone_number || c.phone,
                country: c.country || 'N/A',
                status: c.status,
                tags: c.tags || [],
                createdAt: c.created_at || c.updated_at,
                lastActive: c.last_active_at || c.updated_at,
            })) || [],
            total: data.total || 0,
            page: data.page || 1,
            totalPages: data.total_pages || 1,
        };
    },
    
    getById: async (id) => {
        const data = await apiClient.get(`/contacts/${id}`);
        // Response Mapper
        return {
            id: data.id,
            name: data.first_name ? `${data.first_name} ${data.last_name || ''}`.trim() : data.name,
            email: data.email_address || data.email,
            phone: data.phone_number || data.phone,
            status: data.status,
            tags: data.tags || [],
            source: data.import_source || 'manual',
        };
    },
    
    create: async (payload) => {
        return apiClient.post('/contacts', payload);
    },
    
    update: async ({ id, payload }) => {
        return apiClient.put(`/contacts/${id}`, payload);
    },
    
    delete: async (id) => {
        return apiClient.delete(`/contacts/${id}`);
    },
    
    importCsv: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        // We override Content-Type so Axios handles headers for multipart correctly
        return apiClient.post('/contacts/import-csv', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    getSegments: async () => {
        const data = await apiClient.get('/contacts/segments');
        return data.items || data;
    },

    createSegment: async (payload) => {
        return apiClient.post('/contacts/segments', payload);
    }
};
