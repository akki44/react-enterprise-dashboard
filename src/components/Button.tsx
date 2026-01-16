/**
 * Button Component
 * Reusable button with variants and sizes
 */

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils';
import type { ButtonVariant, ButtonSize } from '@/types';

// ============================================================================
// Types
// ============================================================================

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    children: ReactNode;
}

// ============================================================================
// Variant Styles
// ============================================================================

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600',
    secondary:
        'bg-secondary-200 text-secondary-900 hover:bg-secondary-300 focus:ring-secondary-500 dark:bg-secondary-700 dark:text-secondary-100 dark:hover:bg-secondary-600',
    danger:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600',
    ghost:
        'bg-transparent text-secondary-700 hover:bg-secondary-100 focus:ring-secondary-500 dark:text-secondary-300 dark:hover:bg-secondary-800',
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

// ============================================================================
// Component
// ============================================================================

export function Button({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled,
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {children}
        </button>
    );
}
