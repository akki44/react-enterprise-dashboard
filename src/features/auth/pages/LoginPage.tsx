/**
 * Login Page
 * Handles user authentication with form validation
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/store';
import { useLogin } from '@/hooks';
import { Button, Input, Card, CardBody } from '@/components';
import { loginSchema, type LoginFormData } from '../schemas/loginSchema';
import { ROUTES } from '@/utils';

// ============================================================================
// Component
// ============================================================================

export function LoginPage() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: 'admin@example.com',
            password: 'password',
        },
    });

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate(ROUTES.DASHBOARD);
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data, {
            onSuccess: () => {
                navigate(ROUTES.DASHBOARD);
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-100 dark:from-secondary-900 dark:to-secondary-800 px-4">
            <Card className="w-full max-w-md">
                <CardBody className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-secondary-600 dark:text-secondary-400">
                            Sign in to your account to continue
                        </p>
                    </div>

                    {/* Demo Credentials */}
                    <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg">
                        <p className="text-sm font-medium text-primary-900 dark:text-primary-100 mb-2">
                            Demo Credentials:
                        </p>
                        <p className="text-sm text-primary-700 dark:text-primary-300">
                            Email: admin@example.com
                        </p>
                        <p className="text-sm text-primary-700 dark:text-primary-300">
                            Password: password (any password except "wrong")
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            error={errors.password?.message}
                            {...register('password')}
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            isLoading={loginMutation.isPending}
                        >
                            Sign In
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-secondary-600 dark:text-secondary-400">
                            Enterprise Dashboard v1.0
                        </p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
