/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/store';
import { ROUTES } from '@/utils';
import { PageLoader } from '@/components';

// ============================================================================
// Component
// ============================================================================

export function ProtectedRoute() {
    const { isAuthenticated, user } = useAuth();

    // Show loader while checking authentication
    if (isAuthenticated && !user) {
        return <PageLoader />;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    // Render child routes
    return <Outlet />;
}
