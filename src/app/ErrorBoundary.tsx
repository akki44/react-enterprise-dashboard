/**
 * Error Boundary Component
 * Catches and displays React errors gracefully
 */

import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components';

// ============================================================================
// Types
// ============================================================================

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

// ============================================================================
// Component
// ============================================================================

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
        });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-900 px-4">
                    <div className="max-w-md w-full bg-white dark:bg-secondary-800 rounded-lg shadow-lg p-8 text-center">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-red-600 dark:text-red-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>

                        <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                            Oops! Something went wrong
                        </h1>

                        <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                            We're sorry for the inconvenience. The application encountered an unexpected error.
                        </p>

                        {this.state.error && (
                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
                                <p className="text-sm font-mono text-red-800 dark:text-red-300">
                                    {this.state.error.message}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-3 justify-center">
                            <Button variant="primary" onClick={this.handleReset}>
                                Try Again
                            </Button>
                            <Button variant="ghost" onClick={() => window.location.reload()}>
                                Reload Page
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
