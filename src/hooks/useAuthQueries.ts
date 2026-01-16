/**
 * Custom React Query hooks for authentication
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/services/api';
import { useAuth } from '@/store';
import type { LoginCredentials } from '@/types';
import toast from 'react-hot-toast';

// ============================================================================
// Query Keys
// ============================================================================

export const authKeys = {
    currentUser: ['auth', 'currentUser'] as const,
};

// ============================================================================
// Hooks
// ============================================================================

/**
 * Login mutation hook
 * Handles login flow and updates auth context
 */
export function useLogin() {
    const { login } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
        onSuccess: (data) => {
            login(data.user, data.tokens);
            queryClient.setQueryData(authKeys.currentUser, data.user);
            toast.success('Login successful!');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Login failed');
        },
    });
}

/**
 * Logout mutation hook
 * Handles logout flow and clears auth context
 */
export function useLogout() {
    const { logout } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            logout();
            queryClient.clear();
            toast.success('Logged out successfully');
        },
        onError: (error: Error) => {
            // Still logout on error
            logout();
            queryClient.clear();
            toast.error(error.message || 'Logout failed');
        },
    });
}

/**
 * Get current user query hook
 * Fetches current user data from API
 */
export function useCurrentUser() {
    const { isAuthenticated } = useAuth();

    return useQuery({
        queryKey: authKeys.currentUser,
        queryFn: () => authApi.getCurrentUser(),
        enabled: isAuthenticated,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
    });
}
