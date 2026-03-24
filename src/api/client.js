/**
 * A backend-ready network client abstraction.
 * Currently stubbed heavily to run without a backend.
 */
class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    getToken() {
        return localStorage.getItem('orbit_access_token') || 'mock_access_token';
    }

    getTenantId() {
        return localStorage.getItem('orbit_active_tenant_id') || 'mock_tenant';
    }

    getHeaders(customHeaders = {}) {
        return new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...customHeaders
        });
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        console.warn(`[DEV MOCK CLIENT] Bypassing ${options.method || 'GET'} ${url}`);

        // Simple mock response that fits most use cases
        if (options.method === 'GET' || !options.method) {
            // Specialized mock data for common list endpoints
            if (endpoint.includes('campaign')) return { items: [], total: 0 };
            if (endpoint.includes('template')) return { items: [], total: 0 };
            if (endpoint.includes('contact')) return { items: [], total: 0 };
            return [];
        }
        
        return { success: true, data: [], id: 'mock_' + Date.now() };
    }

    get(endpoint, headers = {}) {
        return this.request(endpoint, { method: 'GET', headers });
    }

    post(endpoint, body, headers = {}) {
        return this.request(endpoint, { method: 'POST', body: JSON.stringify(body), headers });
    }

    put(endpoint, body, headers = {}) {
        return this.request(endpoint, { method: 'PUT', body: JSON.stringify(body), headers });
    }

    patch(endpoint, body, headers = {}) {
        return this.request(endpoint, { method: 'PATCH', body: JSON.stringify(body), headers });
    }

    delete(endpoint, headers = {}) {
        return this.request(endpoint, { method: 'DELETE', headers });
    }
}

export const apiClient = new ApiClient('');
