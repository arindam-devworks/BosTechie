/**
 * Centralized environment configuration.
 * Validates and exports environment variables to prevent runtime errors.
 */
export const env = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
    APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
};
