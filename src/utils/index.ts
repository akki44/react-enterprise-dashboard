/**
 * Utility functions and constants used throughout the application
 */

import { type ClassValue, clsx } from 'clsx';

// ============================================================================
// Class Name Utilities
// ============================================================================

/**
 * Merge class names with clsx
 * Useful for conditional styling with Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

// ============================================================================
// Local Storage Utilities
// ============================================================================

const STORAGE_PREFIX = 'enterprise_dashboard_';

export const storage = {
    get: <T>(key: string): T | null => {
        try {
            const item = localStorage.getItem(STORAGE_PREFIX + key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },

    set: <T>(key: string, value: T): void => {
        try {
            localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    },

    remove: (key: string): void => {
        try {
            localStorage.removeItem(STORAGE_PREFIX + key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    },

    clear: (): void => {
        try {
            Object.keys(localStorage)
                .filter((key) => key.startsWith(STORAGE_PREFIX))
                .forEach((key) => localStorage.removeItem(key));
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    },
};

// ============================================================================
// Format Utilities
// ============================================================================

/**
 * Format number as currency
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
}

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals = 1): string {
    return `${value.toFixed(decimals)}%`;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

// ============================================================================
// Validation Utilities
// ============================================================================

/**
 * Check if email is valid
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Check if string is empty or whitespace
 */
export function isEmpty(value: string | null | undefined): boolean {
    return !value || value.trim().length === 0;
}

// ============================================================================
// Debounce Utility
// ============================================================================

/**
 * Debounce function execution
 * Used for search inputs and other high-frequency events
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            func(...args);
        };

        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
}

// ============================================================================
// Constants
// ============================================================================

export const CONSTANTS = {
    TOKEN_KEY: 'auth_tokens',
    USER_KEY: 'user_data',
    THEME_KEY: 'theme',
    DEBOUNCE_DELAY: 300,
    QUERY_STALE_TIME: 5 * 60 * 1000, // 5 minutes
    QUERY_CACHE_TIME: 10 * 60 * 1000, // 10 minutes
} as const;

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    USERS: '/users',
    REPORTS: '/reports',
    SETTINGS: '/settings',
    PROFILE: '/profile',
} as const;
