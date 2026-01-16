/**
 * Activity Table Component
 * Displays recent activity logs
 */

import { format } from 'date-fns';
import { Card, CardHeader, CardBody } from '@/components';
import type { ActivityLog } from '@/types';
import { cn } from '@/utils';

// ============================================================================
// Types
// ============================================================================

interface ActivityTableProps {
    activities: ActivityLog[];
    isLoading?: boolean;
}

// ============================================================================
// Component
// ============================================================================

export function ActivityTable({ activities, isLoading }: ActivityTableProps) {
    const getStatusColor = (status: ActivityLog['status']) => {
        switch (status) {
            case 'success':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'error':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            case 'warning':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            default:
                return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-700 dark:text-secondary-300';
        }
    };

    return (
        <Card>
            <CardHeader>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                    Recent Activity
                </h3>
            </CardHeader>
            <CardBody className="p-0">
                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin h-6 w-6 border-2 border-primary-600 border-t-transparent rounded-full" />
                    </div>
                ) : activities.length === 0 ? (
                    <div className="text-center py-8 text-secondary-500 dark:text-secondary-400">
                        No recent activity
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-secondary-50 dark:bg-secondary-700/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase">
                                        Action
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase">
                                        Time
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
                                {activities.map((activity) => (
                                    <tr
                                        key={activity.id}
                                        className="hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
                                                {activity.userName}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-secondary-600 dark:text-secondary-400">
                                                {activity.action}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={cn(
                                                    'px-2 py-1 text-xs font-medium rounded-full',
                                                    getStatusColor(activity.status)
                                                )}
                                            >
                                                {activity.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500 dark:text-secondary-400">
                                            {format(new Date(activity.timestamp), 'MMM d, h:mm a')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}
