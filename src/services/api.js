const api = {
    get: async () => ({ data: {} }),
    post: async () => ({ data: {} }),
    put: async () => ({ data: {} }),
    delete: async () => ({ data: {} }),
    interceptors: {
        request: { use: () => {} },
        response: { use: () => {} }
    }
};

export default api;
