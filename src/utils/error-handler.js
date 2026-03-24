/**
 * Standardizes backend API errors into a safe format for the UI.
 * 
 * @param {number} status 
 * @param {any} data 
 * @returns {import('../types/models').ApiErrorResponse}
 */
export const handleApiError = (status, data) => {
    // Default fallback error shape
    const fallbackError = {
        status,
        errorCode: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred while communicating with the server.',
        details: []
    };

    if (!data) return fallbackError;

    // Map standard validation arrays
    if (status === 400 || status === 422) {
        return {
            status,
            errorCode: data.errorCode || 'VALIDATION_FAILED',
            message: data.message || 'Please check the form for mistakes.',
            details: data.details || [] // Array of { field, message }
        };
    }

    if (status === 401) {
        return {
            status,
            errorCode: 'UNAUTHORIZED',
            message: data.message || 'Your session has expired. Please log in again.',
            details: []
        };
    }

    if (status === 403) {
        return {
            status,
            errorCode: 'FORBIDDEN',
            message: data.message || 'You do not have permission to access or modify this resource in this workspace.',
            details: []
        };
    }

    if (status === 404) {
        return {
            status,
            errorCode: 'NOT_FOUND',
            message: data.message || 'The requested resource was not found.',
            details: []
        };
    }

    return {
        status,
        errorCode: data.errorCode || fallbackError.errorCode,
        message: data.message || fallbackError.message,
        details: data.details || fallbackError.details
    };
};
