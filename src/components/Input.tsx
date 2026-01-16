/**
 * Input Component
 * Reusable form input with error handling
 */

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils';

// ============================================================================
// Types
// ============================================================================

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

// ============================================================================
// Component
// ============================================================================

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'w-full px-4 py-2 rounded-lg border transition-colors duration-200',
                        'bg-white dark:bg-secondary-800',
                        'text-secondary-900 dark:text-secondary-100',
                        'placeholder:text-secondary-400 dark:placeholder:text-secondary-500',
                        'focus:outline-none focus:ring-2 focus:ring-offset-0',
                        error
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-secondary-300 dark:border-secondary-600 focus:ring-primary-500',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        className
                    )}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
                {helperText && !error && (
                    <p className="mt-1 text-sm text-secondary-500 dark:text-secondary-400">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
