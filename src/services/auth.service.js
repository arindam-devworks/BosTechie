import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

/**
 * Authentication Service
 * Handles user identity, sessions, and credentials.
 */
export const authService = {
    /**
     * Authenticates a user and retrieves an access token
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<{token: string, user: import('../types/models').AuthUser}>}
     */
    login: async (email, password) => {
        // [BACKEND READY] Replace simulated promise with real API call
        // return apiClient.post(ENDPOINTS.AUTH.LOGIN, { email, password });
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password.length >= 6) {
                    resolve({
                        token: 'mock-jwt-token-12345',
                        user: {
                            id: 'USR-001',
                            email,
                            fullName: 'Demo Orbit User',
                            role: 'owner',
                            companyId: 'CMP-001',
                            createdAt: new Date(),
                            lastLogin: new Date()
                        }
                    });
                } else {
                    reject({ status: 401, message: 'Invalid credentials provided' });
                }
            }, 800);
        });
    },

    register: async (data) => {
        // return apiClient.post(ENDPOINTS.AUTH.REGISTER, data);
        return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
    },

    logout: async () => {
        // [BACKEND READY] Clear all potential session identifiers
        localStorage.removeItem('orbit_access_token');
        localStorage.removeItem('orbit_active_tenant_id');
        localStorage.removeItem('token'); // Legacy cleanup
        localStorage.removeItem('user');  // Possible legacy cleanup
        return Promise.resolve();
    },

    getCurrentUser: async () => {
        const token = localStorage.getItem('orbit_access_token');
        if (!token) return null;
        
        // return apiClient.get(ENDPOINTS.AUTH.ME);
        return new Promise((resolve) => setTimeout(() => resolve({
            id: 'USR-001',
            email: 'admin@bostechie.com',
            fullName: 'Orbit Admin',
            role: 'owner',
            companyId: 'CMP-001'
        }), 500));
    }
};
