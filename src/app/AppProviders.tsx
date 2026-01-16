/**
 * App Providers
 * Wraps the app with all necessary context providers
 */

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, ThemeProvider } from '@/store';
import { Toaster } from 'react-hot-toast';
import { CONSTANTS } from '@/utils';

// ============================================================================
// React Query Client Configuration
// ============================================================================

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: CONSTANTS.QUERY_STALE_TIME,
            gcTime: CONSTANTS.QUERY_CACHE_TIME,
            retry: 1,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: 0,
        },
    },
});

// ============================================================================
// Component
// ============================================================================

interface AppProvidersProps {
    children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <AuthProvider>
                    {children}
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 4000,
                            style: {
                                background: 'var(--toast-bg)',
                                color: 'var(--toast-color)',
                            },
                            success: {
                                iconTheme: {
                                    primary: '#10b981',
                                    secondary: '#fff',
                                },
                            },
                            error: {
                                iconTheme: {
                                    primary: '#ef4444',
                                    secondary: '#fff',
                                },
                            },
                        }}
                    />
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
