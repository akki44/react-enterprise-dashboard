/**
 * Modal Component
 * Reusable modal dialog with overlay
 */

import { ReactNode, useEffect } from 'react';
import { cn } from '@/utils';

// ============================================================================
// Types
// ============================================================================

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

// ============================================================================
// Size Styles
// ============================================================================

const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
};

// ============================================================================
// Component
// ============================================================================

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={cn(
                    'relative w-full bg-white dark:bg-secondary-800 rounded-lg shadow-xl animate-slide-in',
                    'border border-secondary-200 dark:border-secondary-700',
                    sizeStyles[size]
                )}
            >
                {/* Header */}
                {title && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-secondary-200 dark:border-secondary-700">
                        <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Body */}
                <div className="px-6 py-4">{children}</div>
            </div>
        </div>
    );
}
