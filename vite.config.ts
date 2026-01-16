import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@/app': path.resolve(__dirname, './src/app'),
            '@/features': path.resolve(__dirname, './src/features'),
            '@/components': path.resolve(__dirname, './src/components'),
            '@/hooks': path.resolve(__dirname, './src/hooks'),
            '@/services': path.resolve(__dirname, './src/services'),
            '@/store': path.resolve(__dirname, './src/store'),
            '@/routes': path.resolve(__dirname, './src/routes'),
            '@/utils': path.resolve(__dirname, './src/utils'),
            '@/types': path.resolve(__dirname, './src/types'),
            '@/assets': path.resolve(__dirname, './src/assets'),
            '@/styles': path.resolve(__dirname, './src/styles'),
        },
    },
    server: {
        port: 3000,
        open: true,
    },
    build: {
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'query-vendor': ['@tanstack/react-query'],
                    'form-vendor': ['react-hook-form', 'zod', '@hookform/resolvers'],
                },
            },
        },
    },
});
