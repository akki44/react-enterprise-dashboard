/**
 * Users API Service
 * Handles user management API calls
 */

import apiClient from './client';
import { mockApi } from './mockApi';
import type { UserListItem, UserFilters, PaginatedResponse } from '@/types';

const USE_MOCK_API = import.meta.env.VITE_ENABLE_MOCK_API === 'true';

export const usersApi = {
    /**
     * Get paginated list of users with filters
     */
    getUsers: async (filters: UserFilters = {}): Promise<PaginatedResponse<UserListItem>> => {
        if (USE_MOCK_API) {
            return mockApi.getUsers(filters);
        }

        return apiClient.get('/users', { params: filters });
    },

    /**
     * Get single user by ID
     */
    getUserById: async (id: string): Promise<UserListItem> => {
        if (USE_MOCK_API) {
            const response = await mockApi.getUsers();
            const user = response.data.find((u) => u.id === id);
            if (!user) throw new Error('User not found');
            return user;
        }

        return apiClient.get(`/users/${id}`);
    },
};
