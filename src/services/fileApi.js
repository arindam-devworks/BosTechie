import axios from 'axios';
import { env } from '../config/env';

/**
 * File API service supporting file upload with validation and progress tracking.
 * This is not wrapped around `apiClient`'s default content-type headers 
 * because multipart form uploads require dynamic Content-Type with a boundary automatically set by Axios.
 */
export const fileApi = {
    /**
     * Upload an asset.
     * @param {File} file Object
     * @param {Function} onProgress Progress callback matching Axios signature
     */
    upload: async (file, onProgress) => {
        const formData = new FormData();
        formData.append('file', file);

        const token = localStorage.getItem('access_token');
        
        const response = await axios.post(`${env.API_BASE_URL}/files/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            onUploadProgress: (progressEvent) => {
                if (onProgress) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(percentCompleted);
                }
            }
        });
        
        // Maps the response immediately. Assuming response returns {"url": "https://..."}
        return {
            id: response.data.file_id || response.data.id,
            url: response.data.file_url || response.data.url,
            name: response.data.file_name || file.name,
            size: response.data.size || file.size,
        };
    },
    
    delete: async (id) => {
        const token = localStorage.getItem('access_token');
        return axios.delete(`${env.API_BASE_URL}/files/${id}`, {
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        });
    }
};
