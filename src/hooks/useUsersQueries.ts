/**
 * Custom React Query hooks for user management
 */

import { useQuery } from '@tanstack/react-query';
import { usersApi } from '@/services/api';
import type { UserFilters } from '@/types';
import { CONSTANTS } from '@/utils';

// ============================================================================
// Query Keys
// ============================================================================

export const usersKeys = {
    all: ['users'] as const,
    list: (filters: UserFilters) => [...usersKeys.all, 'list', filters] as const,
    detail: (id: string) => [...usersKeys.all, 'detail', id] as const,
};

// ============================================================================
// Hooks
// ============================================================================

/**
 * Users list query hook with filters
 */
export function useUsers(filters: UserFilters = {}) {
    return useQuery({
        queryKey: usersKeys.list(filters),
        queryFn: () => usersApi.getUsers(filters),
        staleTime: CONSTANTS.QUERY_STALE_TIME,
        keepPreviousData: true, // Keep previous data while fetching new data
    });
}

/**
 * Single user query hook
 */
export function useUser(id: string) {
    return useQuery({
        queryKey: usersKeys.detail(id),
        queryFn: () => usersApi.getUserById(id),
        staleTime: CONSTANTS.QUERY_STALE_TIME,
        enabled: !!id,
    });
}
