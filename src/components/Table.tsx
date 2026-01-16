/**
 * Table Component
 * Reusable data table with sorting
 */

import { ReactNode } from 'react';
import { cn } from '@/utils';
import type { TableColumn } from '@/types';

// ============================================================================
// Types
// ============================================================================

interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    onSort?: (key: string) => void;
    sortKey?: string;
    sortOrder?: 'asc' | 'desc';
    isLoading?: boolean;
    emptyMessage?: string;
}

// ============================================================================
// Component
// ============================================================================

export function Table<T extends Record<string, unknown>>({
    columns,
    data,
    onSort,
    sortKey,
    sortOrder,
    isLoading,
    emptyMessage = 'No data available',
}: TableProps<T>) {
    const handleSort = (key: string, sortable?: boolean) => {
        if (sortable && onSort) {
            onSort(key);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-secondary-50 dark:bg-secondary-700/50 border-b border-secondary-200 dark:border-secondary-700">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={String(column.key)}
                                className={cn(
                                    'px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider',
                                    column.sortable && 'cursor-pointer hover:text-secondary-700 dark:hover:text-secondary-200'
                                )}
                                onClick={() => handleSort(String(column.key), column.sortable)}
                            >
                                <div className="flex items-center gap-2">
                                    {column.label}
                                    {column.sortable && sortKey === column.key && (
                                        <span className="text-primary-600 dark:text-primary-400">
                                            {sortOrder === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-secondary-800 divide-y divide-secondary-200 dark:divide-secondary-700">
                    {isLoading ? (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-8 text-center">
                                <div className="flex justify-center">
                                    <div className="animate-spin h-6 w-6 border-2 border-primary-600 border-t-transparent rounded-full" />
                                </div>
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-6 py-8 text-center text-secondary-500 dark:text-secondary-400"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={String(column.key)}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-secondary-100"
                                    >
                                        {column.render
                                            ? column.render(row[column.key as keyof T], row)
                                            : (row[column.key as keyof T] as ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
