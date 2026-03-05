import api from './api';

export const fetchOrbitalTelemetry = async () => {
    try {
        const response = await api.get('/campaigns/analytics');
        return response.data.data;
    } catch (error) {
        console.error('Telemetry Retrieval Failure:', error);
        throw error;
    }
};
