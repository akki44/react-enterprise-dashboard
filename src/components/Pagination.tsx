/**
 * Pagination Component
 * Reusable pagination controls
 */

import { Button } from './Button';
import { cn } from '@/utils';

// ============================================================================
// Types
// ============================================================================

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

// ============================================================================
// Component
// ============================================================================

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Show max 7 page numbers
    const getVisiblePages = () => {
        if (totalPages <= 7) return pages;

        if (currentPage <= 4) {
            return [...pages.slice(0, 5), '...', totalPages];
        }

        if (currentPage >= totalPages - 3) {
            return [1, '...', ...pages.slice(totalPages - 5)];
        }

        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    };

    const visiblePages = getVisiblePages();

    return (
        <div className={cn('flex items-center justify-between', className)}>
            <div className="text-sm text-secondary-600 dark:text-secondary-400">
                Page {currentPage} of {totalPages}
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>

                <div className="flex gap-1">
                    {visiblePages.map((page, index) =>
                        page === '...' ? (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-3 py-1 text-secondary-500 dark:text-secondary-400"
                            >
                                ...
                            </span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => onPageChange(page as number)}
                                className={cn(
                                    'px-3 py-1 rounded text-sm font-medium transition-colors',
                                    page === currentPage
                                        ? 'bg-primary-600 text-white dark:bg-primary-500'
                                        : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                                )}
                            >
                                {page}
                            </button>
                        )
                    )}
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
