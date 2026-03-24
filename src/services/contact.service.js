import { apiClient } from '../api/client';
import { ENDPOINTS } from '../api/endpoints';

export const contactService = {
    getSegmentedContacts: async () => {
        // return apiClient.get(ENDPOINTS.CONTACTS.LIST);
        return Promise.resolve([]);
    },

    importContacts: async (fileData) => {
        // return apiClient.post(ENDPOINTS.CONTACTS.IMPORT, fileData);
        return new Promise(resolve => setTimeout(() => resolve({ importedCount: 0, duplicatesReplaced: 0 }), 1500));
    }
};
