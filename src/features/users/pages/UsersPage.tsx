/**
 * Users Page
 * User management with filtering, sorting, and pagination
 */

import { useState, useMemo } from 'react';
import { useUsers } from '@/hooks';
import { useDebounce } from '@/hooks';
import { Card, CardHeader, CardBody, Table, Pagination, Input, Button } from '@/components';
import type { UserFilters, UserListItem, TableColumn, UserRole } from '@/types';
import { format } from 'date-fns';
import { cn } from '@/utils';

// ============================================================================
// Component
// ============================================================================

export function UsersPage() {
    const [filters, setFilters] = useState<UserFilters>({
        page: 1,
        pageSize: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc',
    });

    const [searchInput, setSearchInput] = useState('');
    const debouncedSearch = useDebounce(searchInput, 300);

    // Update filters when debounced search changes
    const activeFilters = useMemo(
        () => ({
            ...filters,
            search: debouncedSearch || undefined,
        }),
        [filters, debouncedSearch]
    );

    const { data, isLoading } = useUsers(activeFilters);

    // Table columns configuration
    const columns: TableColumn<UserListItem>[] = [
        {
            key: 'email',
            label: 'Email',
            sortable: true,
            render: (_, row) => (
                <div>
                    <div className="font-medium text-secondary-900 dark:text-secondary-100">
                        {row.firstName} {row.lastName}
                    </div>
                    <div className="text-sm text-secondary-500 dark:text-secondary-400">{row.email}</div>
                </div>
            ),
        },
        {
            key: 'role',
            label: 'Role',
            sortable: true,
            render: (value) => (
                <span
                    className={cn(
                        'px-2 py-1 text-xs font-medium rounded-full',
                        value === 'ADMIN'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                    )}
                >
                    {value as string}
                </span>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (value) => (
                <span
                    className={cn(
                        'px-2 py-1 text-xs font-medium rounded-full',
                        value === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    )}
                >
                    {value as string}
                </span>
            ),
        },
        {
            key: 'lastLogin',
            label: 'Last Login',
            sortable: true,
            render: (value) =>
                value ? format(new Date(value as string), 'MMM d, yyyy') : 'Never',
        },
        {
            key: 'createdAt',
            label: 'Created',
            sortable: true,
            render: (value) => format(new Date(value as string), 'MMM d, yyyy'),
        },
    ];

    const handleSort = (key: string) => {
        setFilters((prev) => ({
            ...prev,
            sortBy: key,
            sortOrder: prev.sortBy === key && prev.sortOrder === 'asc' ? 'desc' : 'asc',
        }));
    };

    const handlePageChange = (page: number) => {
        setFilters((prev) => ({ ...prev, page }));
    };

    const handleRoleFilter = (role: UserRole | 'all') => {
        setFilters((prev) => ({
            ...prev,
            role: role === 'all' ? undefined : role,
            page: 1,
        }));
    };

    const handleStatusFilter = (status: 'active' | 'inactive' | 'all') => {
        setFilters((prev) => ({
            ...prev,
            status: status === 'all' ? undefined : status,
            page: 1,
        }));
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                    User Management
                </h1>
                <p className="mt-1 text-secondary-600 dark:text-secondary-400">
                    Manage and monitor user accounts
                </p>
            </div>

            {/* Filters */}
            <Card>
                <CardBody>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <Input
                            placeholder="Search users..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />

                        {/* Role Filter */}
                        <div>
                            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                                Role
                            </label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                value={filters.role || 'all'}
                                onChange={(e) => handleRoleFilter(e.target.value as UserRole | 'all')}
                            >
                                <option value="all">All Roles</option>
                                <option value="ADMIN">Admin</option>
                                <option value="USER">User</option>
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                                Status
                            </label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                value={filters.status || 'all'}
                                onChange={(e) =>
                                    handleStatusFilter(e.target.value as 'active' | 'inactive' | 'all')
                                }
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                            Users ({data?.pagination.total || 0})
                        </h3>
                        <Button variant="primary" size="sm">
                            Add User
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className="p-0">
                    <Table
                        columns={columns}
                        data={data?.data || []}
                        onSort={handleSort}
                        sortKey={filters.sortBy}
                        sortOrder={filters.sortOrder}
                        isLoading={isLoading}
                        emptyMessage="No users found"
                    />
                </CardBody>
                {data?.pagination && (
                    <CardBody className="border-t border-secondary-200 dark:border-secondary-700">
                        <Pagination
                            currentPage={data.pagination.page}
                            totalPages={data.pagination.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </CardBody>
                )}
            </Card>
        </div>
    );
}
