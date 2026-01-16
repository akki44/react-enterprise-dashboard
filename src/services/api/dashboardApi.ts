/**
 * Dashboard API Service
 * Handles dashboard-related data fetching
 */

import apiClient from './client';
import { mockApi } from './mockApi';
import type { DashboardStats, ActivityLog } from '@/types';

const USE_MOCK_API = import.meta.env.VITE_ENABLE_MOCK_API === 'true';

export const dashboardApi = {
    /**
     * Get dashboard statistics
     */
    getStats: async (): Promise<DashboardStats> => {
        if (USE_MOCK_API) {
            return mockApi.getDashboardStats();
        }

        return apiClient.get('/dashboard/stats');
    },

    /**
     * Get recent activity logs
     */
    getActivityLogs: async (): Promise<ActivityLog[]> => {
        if (USE_MOCK_API) {
            return mockApi.getActivityLogs();
        }

        return apiClient.get('/dashboard/activity');
    },
};
