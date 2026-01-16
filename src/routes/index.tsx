/**
 * Application Routes Configuration
 * Centralized route definitions with lazy loading
 */

import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { MainLayout } from '@/app/layout';
import { PageLoader } from '@/components';
import { ROUTES } from '@/utils';

// ============================================================================
// Lazy Load Pages
// ============================================================================

const LoginPage = lazy(() =>
    import('@/features/auth').then((module) => ({ default: module.LoginPage }))
);

const DashboardPage = lazy(() =>
    import('@/features/dashboard').then((module) => ({ default: module.DashboardPage }))
);

const UsersPage = lazy(() =>
    import('@/features/users').then((module) => ({ default: module.UsersPage }))
);

// Placeholder for Reports page
const ReportsPage = lazy(() =>
    Promise.resolve({
        default: () => (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                    Reports
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400">
                    Reports feature coming soon...
                </p>
            </div>
        ),
    })
);

// ============================================================================
// Suspense Wrapper
// ============================================================================

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
    return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

// ============================================================================
// Router Configuration
// ============================================================================

export const router = createBrowserRouter([
    {
        path: ROUTES.LOGIN,
        element: (
            <SuspenseWrapper>
                <LoginPage />
            </SuspenseWrapper>
        ),
    },
    {
        path: ROUTES.HOME,
        element: <ProtectedRoute />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to={ROUTES.DASHBOARD} replace />,
                    },
                    {
                        path: ROUTES.DASHBOARD,
                        element: (
                            <SuspenseWrapper>
                                <DashboardPage />
                            </SuspenseWrapper>
                        ),
                    },
                    {
                        path: ROUTES.USERS,
                        element: (
                            <SuspenseWrapper>
                                <UsersPage />
                            </SuspenseWrapper>
                        ),
                    },
                    {
                        path: ROUTES.REPORTS,
                        element: (
                            <SuspenseWrapper>
                                <ReportsPage />
                            </SuspenseWrapper>
                        ),
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: (
            <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-900">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                        404
                    </h1>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-4">Page not found</p>
                    <a
                        href={ROUTES.DASHBOARD}
                        className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                        Go to Dashboard
                    </a>
                </div>
            </div>
        ),
    },
]);
