/**
 * Card Component
 * Reusable card container for content sections
 */

import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils';

// ============================================================================
// Types
// ============================================================================

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

// ============================================================================
// Component
// ============================================================================

export function Card({ children, className, ...props }: CardProps) {
    return (
        <div
            className={cn(
                'bg-white dark:bg-secondary-800 rounded-lg shadow-sm border border-secondary-200 dark:border-secondary-700',
                'transition-colors duration-200',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

// ============================================================================
// Sub-components
// ============================================================================

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
    return (
        <div
            className={cn('px-6 py-4 border-b border-secondary-200 dark:border-secondary-700', className)}
            {...props}
        >
            {children}
        </div>
    );
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function CardBody({ children, className, ...props }: CardBodyProps) {
    return (
        <div className={cn('px-6 py-4', className)} {...props}>
            {children}
        </div>
    );
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
    return (
        <div
            className={cn('px-6 py-4 border-t border-secondary-200 dark:border-secondary-700', className)}
            {...props}
        >
            {children}
        </div>
    );
}
