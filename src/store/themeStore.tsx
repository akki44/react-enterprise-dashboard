/**
 * Theme Store
 * Manages dark mode and theme preferences
 */

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { storage, CONSTANTS } from '@/utils';

// ============================================================================
// Types
// ============================================================================

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

// ============================================================================
// Context
// ============================================================================

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ============================================================================
// Provider
// ============================================================================

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(() => {
        const saved = storage.get<Theme>(CONSTANTS.THEME_KEY);
        return saved || 'light';
    });

    // Apply theme to document root
    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        storage.set(CONSTANTS.THEME_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    const value = useMemo(
        () => ({
            theme,
            toggleTheme,
            setTheme,
        }),
        [theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ============================================================================
// Hook
// ============================================================================

export function useTheme() {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}
