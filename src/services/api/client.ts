/**
 * Axios HTTP client configuration
 * Includes request/response interceptors for authentication and error handling
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { storage, CONSTANTS } from '@/utils';
import type { ApiError, AuthTokens } from '@/types';

// ============================================================================
// Axios Instance Configuration
// ============================================================================

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com/v1',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ============================================================================
// Request Interceptor
// ============================================================================

/**
 * Inject authentication token into every request
 * This ensures all API calls are authenticated if user is logged in
 */
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const tokens = storage.get<AuthTokens>(CONSTANTS.TOKEN_KEY);

        if (tokens?.accessToken) {
            config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// ============================================================================
// Response Interceptor
// ============================================================================

/**
 * Handle responses and errors globally
 * - Transform successful responses
 * - Handle token expiration (401)
 * - Format error messages consistently
 */
apiClient.interceptors.response.use(
    (response) => {
        // Return the data directly for cleaner usage
        return response.data;
    },
    async (error: AxiosError<ApiError>) => {
        // Handle 401 Unauthorized - Token expired or invalid
        if (error.response?.status === 401) {
            // Clear auth data
            storage.remove(CONSTANTS.TOKEN_KEY);
            storage.remove(CONSTANTS.USER_KEY);

            // Redirect to login page
            // In a real app, you might want to attempt token refresh first
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }

        // Format error for consistent handling
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message || 'An unexpected error occurred',
            code: error.response?.data?.code,
            statusCode: error.response?.status,
            errors: error.response?.data?.errors,
        };

        return Promise.reject(apiError);
    }
);

export default apiClient;
