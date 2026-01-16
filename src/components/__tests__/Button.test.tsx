/**
 * Button Component Tests
 * Unit tests for the Button component
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/Button';

describe('Button Component', () => {
    it('renders button with children', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('handles click events', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);

        fireEvent.click(screen.getByText('Click me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('shows loading state', () => {
        render(<Button isLoading>Loading</Button>);
        expect(screen.getByText('Loading')).toBeInTheDocument();
        // Loading spinner should be present
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    it('disables button when disabled prop is true', () => {
        render(<Button disabled>Disabled</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    it('applies variant styles', () => {
        const { rerender } = render(<Button variant="primary">Primary</Button>);
        let button = screen.getByRole('button');
        expect(button.className).toContain('bg-primary-600');

        rerender(<Button variant="danger">Danger</Button>);
        button = screen.getByRole('button');
        expect(button.className).toContain('bg-red-600');
    });
});
