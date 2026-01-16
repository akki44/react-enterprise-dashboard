/**
 * Sidebar Navigation Component
 * Main navigation sidebar with links
 */

import { NavLink } from 'react-router-dom';
import { useLogout } from '@/hooks';
import { useAuth } from '@/store';
import { ROUTES, cn } from '@/utils';
import { Button } from '@/components';

// ============================================================================
// Navigation Items
// ============================================================================

const navItems = [
    {
        name: 'Dashboard',
        path: ROUTES.DASHBOARD,
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
            </svg>
        ),
    },
    {
        name: 'Users',
        path: ROUTES.USERS,
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
            </svg>
        ),
    },
    {
        name: 'Reports',
        path: ROUTES.REPORTS,
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
            </svg>
        ),
    },
];

// ============================================================================
// Component
// ============================================================================

export function Sidebar() {
    const { user } = useAuth();
    const logoutMutation = useLogout();

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return (
        <aside className="w-64 bg-white dark:bg-secondary-800 border-r border-secondary-200 dark:border-secondary-700 flex flex-col">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-secondary-200 dark:border-secondary-700">
                <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    Enterprise
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors',
                                isActive
                                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                    : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                            )
                        }
                    >
                        {item.icon}
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-secondary-200 dark:border-secondary-700">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <span className="text-primary-700 dark:text-primary-300 font-semibold">
                            {user?.firstName?.[0]}
                            {user?.lastName?.[0]}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={handleLogout}
                    isLoading={logoutMutation.isPending}
                >
                    Logout
                </Button>
            </div>
        </aside>
    );
}
