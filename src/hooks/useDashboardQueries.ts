/**
 * Custom React Query hooks for dashboard data
 */

import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/services/api';
import { CONSTANTS } from '@/utils';

// ============================================================================
// Query Keys
// ============================================================================

export const dashboardKeys = {
    stats: ['dashboard', 'stats'] as const,
    activity: ['dashboard', 'activity'] as const,
};

// ============================================================================
// Hooks
// ============================================================================

/**
 * Dashboard statistics query hook
 */
export function useDashboardStats() {
    return useQuery({
        queryKey: dashboardKeys.stats,
        queryFn: () => dashboardApi.getStats(),
        staleTime: CONSTANTS.QUERY_STALE_TIME,
        refetchInterval: 60000, // Refetch every minute
    });
}

/**
 * Activity logs query hook
 */
export function useActivityLogs() {
    return useQuery({
        queryKey: dashboardKeys.activity,
        queryFn: () => dashboardApi.getActivityLogs(),
        staleTime: CONSTANTS.QUERY_STALE_TIME,
        refetchInterval: 30000, // Refetch every 30 seconds
    });
}
