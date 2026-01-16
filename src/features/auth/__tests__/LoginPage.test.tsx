/**
 * Login Integration Test
 * Tests the complete login flow
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/store';
import { LoginPage } from '@/features/auth';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

// Test wrapper with providers
function TestWrapper({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>{children}</AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

describe('Login Flow Integration Test', () => {
    it('successfully logs in with valid credentials', async () => {
        render(
            <TestWrapper>
                <LoginPage />
            </TestWrapper>
        );

        // Fill in the form
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole('button', { name: /sign in/i });

        fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(submitButton);

        // Wait for navigation
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalled();
        });
    });

    it('shows validation errors for empty fields', async () => {
        render(
            <TestWrapper>
                <LoginPage />
            </TestWrapper>
        );

        const submitButton = screen.getByRole('button', { name: /sign in/i });

        // Clear the default values and submit
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
        fireEvent.click(submitButton);

        // Check for validation errors
        await waitFor(() => {
            expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        });
    });
});
