/**
 * Main Layout Component
 * Wraps authenticated pages with sidebar and top navigation
 */

import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

// ============================================================================
// Component
// ============================================================================

export function MainLayout() {
    return (
        <div className="flex h-screen bg-secondary-50 dark:bg-secondary-900">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation */}
                <TopNav />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
