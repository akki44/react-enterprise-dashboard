/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */

import apiClient from './client';
import { mockApi } from './mockApi';
import type { LoginCredentials, User, AuthTokens } from '@/types';

const USE_MOCK_API = import.meta.env.VITE_ENABLE_MOCK_API === 'true';

interface LoginResponse {
    user: User;
    tokens: AuthTokens;
}

export const authApi = {
    /**
     * Login user with email and password
     */
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        if (USE_MOCK_API) {
            return mockApi.login(credentials);
        }

        return apiClient.post('/auth/login', credentials);
    },

    /**
     * Logout current user
     */
    logout: async (): Promise<void> => {
        if (USE_MOCK_API) {
            await mockApi.logout();
            return;
        }

        return apiClient.post('/auth/logout');
    },

    /**
     * Get current authenticated user
     */
    getCurrentUser: async (): Promise<User> => {
        if (USE_MOCK_API) {
            return mockApi.getCurrentUser();
        }

        return apiClient.get('/auth/me');
    },

    /**
     * Refresh access token
     */
    refreshToken: async (refreshToken: string): Promise<AuthTokens> => {
        if (USE_MOCK_API) {
            // Mock token refresh
            return {
                accessToken: 'new_mock_access_token_' + Date.now(),
                refreshToken: 'new_mock_refresh_token_' + Date.now(),
            };
        }

        return apiClient.post('/auth/refresh', { refreshToken });
    },
};
