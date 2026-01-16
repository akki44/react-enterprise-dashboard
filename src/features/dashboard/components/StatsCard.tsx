/**
 * Stats Card Component
 * Displays a single statistic with icon and trend
 */

import { ReactNode } from 'react';
import { Card, CardBody } from '@/components';
import { formatNumber, formatCurrency, formatPercentage } from '@/utils';

// ============================================================================
// Types
// ============================================================================

interface StatsCardProps {
    title: string;
    value: number;
    icon: ReactNode;
    trend?: number;
    format?: 'number' | 'currency' | 'percentage';
}

// ============================================================================
// Component
// ============================================================================

export function StatsCard({ title, value, icon, trend, format = 'number' }: StatsCardProps) {
    const formatValue = () => {
        switch (format) {
            case 'currency':
                return formatCurrency(value);
            case 'percentage':
                return formatPercentage(value);
            default:
                return formatNumber(value);
        }
    };

    const isPositiveTrend = trend !== undefined && trend >= 0;

    return (
        <Card className="hover:shadow-md transition-shadow duration-200">
            <CardBody>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                            {title}
                        </p>
                        <p className="mt-2 text-3xl font-bold text-secondary-900 dark:text-secondary-100">
                            {formatValue()}
                        </p>
                        {trend !== undefined && (
                            <div className="mt-2 flex items-center gap-1">
                                <span
                                    className={`text-sm font-medium ${isPositiveTrend
                                            ? 'text-green-600 dark:text-green-400'
                                            : 'text-red-600 dark:text-red-400'
                                        }`}
                                >
                                    {isPositiveTrend ? '↑' : '↓'} {Math.abs(trend)}%
                                </span>
                                <span className="text-sm text-secondary-500 dark:text-secondary-400">
                                    vs last month
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex-shrink-0 p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                        <div className="text-primary-600 dark:text-primary-400">{icon}</div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
