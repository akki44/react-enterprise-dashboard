/**
 * App Component
 * Root application component
 */

import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { AppProviders } from './AppProviders';
import { ErrorBoundary } from './ErrorBoundary';

// ============================================================================
// Component
// ============================================================================

export function App() {
    return (
        <ErrorBoundary>
            <AppProviders>
                <RouterProvider router={router} />
            </AppProviders>
        </ErrorBoundary>
    );
}
