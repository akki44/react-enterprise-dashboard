/**
 * Dashboard Page
 * Main dashboard view with statistics and recent activity
 */

import { useDashboardStats, useActivityLogs } from '@/hooks';
import { StatsCard } from '../components/StatsCard';
import { ActivityTable } from '../components/ActivityTable';

// ============================================================================
// Component
// ============================================================================

export function DashboardPage() {
    const { data: stats, isLoading: statsLoading } = useDashboardStats();
    const { data: activities = [], isLoading: activitiesLoading } = useActivityLogs();

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                    Dashboard
                </h1>
                <p className="mt-1 text-secondary-600 dark:text-secondary-400">
                    Welcome back! Here's what's happening today.
                </p>
            </div>

            {/* Stats Grid */}
            {statsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="h-32 bg-secondary-200 dark:bg-secondary-700 animate-pulse rounded-lg"
                        />
                    ))}
                </div>
            ) : stats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        title="Total Users"
                        value={stats.totalUsers}
                        format="number"
                        trend={8.2}
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                        }
                    />

                    <StatsCard
                        title="Active Users"
                        value={stats.activeUsers}
                        format="number"
                        trend={12.5}
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        }
                    />

                    <StatsCard
                        title="Total Revenue"
                        value={stats.totalRevenue}
                        format="currency"
                        trend={stats.growthRate}
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        }
                    />

                    <StatsCard
                        title="Growth Rate"
                        value={stats.growthRate}
                        format="percentage"
                        trend={2.4}
                        icon={
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                        }
                    />
                </div>
            ) : null}

            {/* Activity Table */}
            <ActivityTable activities={activities} isLoading={activitiesLoading} />
        </div>
    );
}
