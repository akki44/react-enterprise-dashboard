/**
 * Global TypeScript type definitions for the application
 * These types are shared across multiple features and modules
 */

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T = unknown> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
}

export interface ApiError {
    message: string;
    code?: string;
    statusCode?: number;
    errors?: Record<string, string[]>;
}

// ============================================================================
// Authentication Types
// ============================================================================

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MANAGER = 'MANAGER',
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    tokens: AuthTokens | null;
    isAuthenticated: boolean;
}

// ============================================================================
// Dashboard Types
// ============================================================================

export interface DashboardStats {
    totalUsers: number;
    activeUsers: number;
    totalRevenue: number;
    growthRate: number;
}

export interface ActivityLog {
    id: string;
    userId: string;
    userName: string;
    action: string;
    timestamp: string;
    status: 'success' | 'error' | 'warning';
}

// ============================================================================
// User Management Types
// ============================================================================

export interface UserListItem {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    status: 'active' | 'inactive' | 'suspended';
    lastLogin?: string;
    createdAt: string;
}

export interface UserFilters {
    search?: string;
    role?: UserRole;
    status?: 'active' | 'inactive' | 'suspended';
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// Common UI Types
// ============================================================================

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface SelectOption<T = string> {
    label: string;
    value: T;
}

export interface TableColumn<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    render?: (value: unknown, row: T) => React.ReactNode;
}

// ============================================================================
// Form Types
// ============================================================================

export interface FormFieldError {
    message: string;
}

export type FormErrors<T> = Partial<Record<keyof T, FormFieldError>>;
