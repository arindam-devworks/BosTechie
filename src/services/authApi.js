import { apiClient } from './apiClient';

/**
 * Auth API service interacting with authentication endpoints.
 * Implements mappers if the response schema needs to be molded into the UI schema.
 */
export const authApi = {
    login: async (credentials) => {
        const data = await apiClient.post('/auth/login', credentials);
        return {
            user: {
                id: data.user.id,
                name: data.user.full_name || data.user.name,
                email: data.user.email,
                role: data.user.role,
                tenantId: data.user.tenant_id,
            },
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
        };
    },
    
    signup: async (payload) => {
        const data = await apiClient.post('/auth/signup', payload);
        return data; // map as needed
    },
    
    getMe: async () => {
        const data = await apiClient.get('/auth/me');
        // Response Mapper
        return {
            id: data.id,
            name: data.full_name || data.name,
            email: data.email,
            role: data.role,
            tenantId: data.tenant_id,
        };
    },
    
    logout: async () => {
        return apiClient.post('/auth/logout');
    },
    
    forgotPassword: async (email) => {
        return apiClient.post('/auth/forgot-password', { email });
    },
    
    resetPassword: async (payload) => {
        return apiClient.post('/auth/reset-password', payload);
    }
};
