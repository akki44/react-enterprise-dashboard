/**
 * Authentication Store
 * Manages global authentication state using React Context
 * This is a lightweight alternative to Redux for auth state
 */

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import type { User, AuthTokens, AuthState } from '@/types';
import { storage, CONSTANTS } from '@/utils';

// ============================================================================
// Context Type Definition
// ============================================================================

interface AuthContextType extends AuthState {
    login: (user: User, tokens: AuthTokens) => void;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
}

// ============================================================================
// Context Creation
// ============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================================
// Provider Component
// ============================================================================

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    // Initialize state from localStorage
    const [user, setUser] = useState<User | null>(() => {
        return storage.get<User>(CONSTANTS.USER_KEY);
    });

    const [tokens, setTokens] = useState<AuthTokens | null>(() => {
        return storage.get<AuthTokens>(CONSTANTS.TOKEN_KEY);
    });

    /**
     * Login: Store user and tokens in state and localStorage
     */
    const login = useCallback((user: User, tokens: AuthTokens) => {
        setUser(user);
        setTokens(tokens);
        storage.set(CONSTANTS.USER_KEY, user);
        storage.set(CONSTANTS.TOKEN_KEY, tokens);
    }, []);

    /**
     * Logout: Clear user and tokens from state and localStorage
     */
    const logout = useCallback(() => {
        setUser(null);
        setTokens(null);
        storage.remove(CONSTANTS.USER_KEY);
        storage.remove(CONSTANTS.TOKEN_KEY);
    }, []);

    /**
     * Update user: Partially update user data
     */
    const updateUser = useCallback((updates: Partial<User>) => {
        setUser((prev) => {
            if (!prev) return null;
            const updated = { ...prev, ...updates };
            storage.set(CONSTANTS.USER_KEY, updated);
            return updated;
        });
    }, []);

    // Memoize context value to prevent unnecessary re-renders
    const value = useMemo(
        () => ({
            user,
            tokens,
            isAuthenticated: !!user && !!tokens,
            login,
            logout,
            updateUser,
        }),
        [user, tokens, login, logout, updateUser]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================================================
// Custom Hook
// ============================================================================

/**
 * useAuth Hook
 * Access authentication state and methods from any component
 */
export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
