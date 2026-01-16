module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@/app/(.*)$': '<rootDir>/src/app/$1',
        '^@/features/(.*)$': '<rootDir>/src/features/$1',
        '^@/components/(.*)$': '<rootDir>/src/components/$1',
        '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^@/services/(.*)$': '<rootDir>/src/services/$1',
        '^@/store/(.*)$': '<rootDir>/src/store/$1',
        '^@/routes/(.*)$': '<rootDir>/src/routes/$1',
        '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@/types/(.*)$': '<rootDir>/src/types/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/main.tsx',
        '!src/vite-env.d.ts',
    ],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70,
        },
    },
};
