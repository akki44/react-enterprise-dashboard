/**
 * Mock API responses for development and testing
 * In production, replace these with actual API calls
 */

import type {
    User,
    AuthTokens,
    LoginCredentials,
    DashboardStats,
    ActivityLog,
    UserListItem,
    PaginatedResponse,
    UserFilters,
    UserRole,
} from '@/types';

// ============================================================================
// Mock Data
// ============================================================================

const MOCK_USER: User = {
    id: '1',
    email: 'admin@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'ADMIN' as UserRole,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

const MOCK_TOKENS: AuthTokens = {
    accessToken: 'mock_access_token_' + Date.now(),
    refreshToken: 'mock_refresh_token_' + Date.now(),
};

const MOCK_USERS: UserListItem[] = Array.from({ length: 50 }, (_, i) => ({
    id: `user_${i + 1}`,
    email: `user${i + 1}@example.com`,
    firstName: `User`,
    lastName: `${i + 1}`,
    role: i % 3 === 0 ? ('ADMIN' as UserRole) : ('USER' as UserRole),
    status: (i % 4 === 0 ? 'inactive' : 'active') as 'active' | 'inactive',
    lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
}));

const MOCK_ACTIVITIES: ActivityLog[] = Array.from({ length: 10 }, (_, i) => ({
    id: `activity_${i + 1}`,
    userId: `user_${i + 1}`,
    userName: `User ${i + 1}`,
    action: ['Login', 'Updated profile', 'Created report', 'Deleted item'][i % 4] || 'Login',
    timestamp: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
    status: (['success', 'error', 'warning'][i % 3] || 'success') as 'success' | 'error' | 'warning',
}));

// ============================================================================
// Mock API Functions
// ============================================================================

/**
 * Simulate network delay
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
    /**
     * Mock login - accepts any email/password
     */
    login: async (credentials: LoginCredentials) => {
        await delay(800);

        // Simple validation
        if (!credentials.email || !credentials.password) {
            throw new Error('Email and password are required');
        }

        // For demo: reject if password is "wrong"
        if (credentials.password === 'wrong') {
            throw new Error('Invalid credentials');
        }

        return {
            user: MOCK_USER,
            tokens: MOCK_TOKENS,
        };
    },

    /**
     * Mock logout
     */
    logout: async () => {
        await delay(300);
        return { success: true };
    },

    /**
     * Mock get current user
     */
    getCurrentUser: async () => {
        await delay(500);
        return MOCK_USER;
    },

    /**
     * Mock dashboard stats
     */
    getDashboardStats: async (): Promise<DashboardStats> => {
        await delay(600);
        return {
            totalUsers: 1247,
            activeUsers: 892,
            totalRevenue: 125430,
            growthRate: 12.5,
        };
    },

    /**
     * Mock activity logs
     */
    getActivityLogs: async (): Promise<ActivityLog[]> => {
        await delay(500);
        return MOCK_ACTIVITIES;
    },

    /**
     * Mock users list with pagination and filtering
     */
    getUsers: async (filters: UserFilters = {}): Promise<PaginatedResponse<UserListItem>> => {
        await delay(700);

        let filteredUsers = [...MOCK_USERS];

        // Apply search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filteredUsers = filteredUsers.filter(
                (user) =>
                    user.email.toLowerCase().includes(searchLower) ||
                    user.firstName.toLowerCase().includes(searchLower) ||
                    user.lastName.toLowerCase().includes(searchLower)
            );
        }

        // Apply role filter
        if (filters.role) {
            filteredUsers = filteredUsers.filter((user) => user.role === filters.role);
        }

        // Apply status filter
        if (filters.status) {
            filteredUsers = filteredUsers.filter((user) => user.status === filters.status);
        }

        // Apply sorting
        if (filters.sortBy) {
            filteredUsers.sort((a, b) => {
                const aValue = a[filters.sortBy as keyof UserListItem];
                const bValue = b[filters.sortBy as keyof UserListItem];

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return filters.sortOrder === 'desc'
                        ? bValue.localeCompare(aValue)
                        : aValue.localeCompare(bValue);
                }
                return 0;
            });
        }

        // Apply pagination
        const page = filters.page || 1;
        const pageSize = filters.pageSize || 10;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

        return {
            data: paginatedUsers,
            pagination: {
                page,
                pageSize,
                total: filteredUsers.length,
                totalPages: Math.ceil(filteredUsers.length / pageSize),
            },
        };
    },
};
