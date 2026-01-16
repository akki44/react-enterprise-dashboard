# Enterprise Dashboard

A production-ready, enterprise-grade React 18 + TypeScript dashboard application demonstrating senior-level frontend engineering practices, scalable architecture, and real-world patterns.

![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Overview

This project showcases a comprehensive enterprise dashboard built with modern web technologies and best practices. It's designed to demonstrate advanced React patterns, clean architecture, performance optimization, and production-ready code suitable for large-scale applications.

**Key Highlights:**
- ✅ Feature-based architecture for scalability
- ✅ Type-safe with TypeScript strict mode
- ✅ JWT authentication with protected routes
- ✅ Advanced data fetching with React Query
- ✅ Form validation with React Hook Form + Zod
- ✅ Dark mode support
- ✅ Comprehensive testing setup
- ✅ CI/CD pipeline with GitHub Actions

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Authentication Flow](#-authentication-flow)
- [Performance Optimizations](#-performance-optimizations)
- [Testing Strategy](#-testing-strategy)
- [Key Design Decisions](#-key-design-decisions)
- [Scripts](#-scripts)
- [Contributing](#-contributing)

## 🛠 Tech Stack

### Core
- **React 18.2** - UI library with concurrent features
- **TypeScript 5.3** - Type safety with strict mode enabled
- **Vite 5.0** - Next-generation frontend tooling

### State Management & Data Fetching
- **React Query (TanStack Query)** - Server state management with caching
- **React Context** - Global client state (auth, theme)

### Routing & Forms
- **React Router v6** - Client-side routing with lazy loading
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **CSS Variables** - Theme customization

### Testing
- **Jest** - Test runner
- **React Testing Library** - Component testing
- **@testing-library/user-event** - User interaction simulation

### Code Quality
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 🏗 Architecture

This application follows a **feature-based architecture** designed for large teams and scalable applications.

### Architectural Principles

1. **Feature-Based Organization**: Code is organized by feature/domain rather than technical layers
2. **Separation of Concerns**: Clear boundaries between UI, business logic, and data access
3. **Dependency Injection**: Services and utilities are easily mockable and testable
4. **Single Responsibility**: Each module has one clear purpose
5. **DRY (Don't Repeat Yourself)**: Shared logic is extracted into reusable hooks and utilities

### Key Architectural Patterns

- **Container/Presenter Pattern**: Separation of data fetching and UI rendering
- **Custom Hooks**: Encapsulation of reusable logic
- **Higher-Order Components**: Error boundaries and route protection
- **Composition**: Building complex UIs from simple components
- **Centralized API Layer**: All API calls go through a single configured client

## ✨ Features

### Authentication & Authorization
- ✅ JWT-based authentication
- ✅ Login/logout flow with form validation
- ✅ Protected routes with automatic redirect
- ✅ Token storage in localStorage
- ✅ Automatic token injection via Axios interceptors
- ✅ Token expiration handling (401 redirect)

### Dashboard
- ✅ Real-time statistics cards
- ✅ Activity log table
- ✅ Responsive grid layout
- ✅ Loading skeletons
- ✅ Auto-refresh data

### User Management
- ✅ Paginated user table
- ✅ Advanced filtering (search, role, status)
- ✅ Debounced search input
- ✅ Column sorting
- ✅ Status badges
- ✅ Role-based display

### UI/UX
- ✅ Dark mode toggle with persistence
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error boundaries
- ✅ 404 page
- ✅ Smooth animations

### Developer Experience
- ✅ Hot module replacement (HMR)
- ✅ Path aliases for clean imports
- ✅ TypeScript strict mode
- ✅ ESLint + Prettier configuration
- ✅ Git hooks (optional)

## 🚦 Getting Started

### Prerequisites

- Node.js 18.x or 20.x
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-enterprise-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:3000`

### Demo Credentials

```
Email: admin@example.com
Password: password (any password except "wrong")
```

## 📁 Project Structure

```
src/
├── app/                    # Application bootstrap & providers
│   ├── layout/            # Layout components (Sidebar, TopNav)
│   ├── App.tsx            # Root component
│   ├── AppProviders.tsx   # Context providers wrapper
│   └── ErrorBoundary.tsx  # Global error handler
│
├── features/              # Feature modules (domain-driven)
│   ├── auth/             # Authentication feature
│   │   ├── pages/        # Login page
│   │   ├── schemas/      # Validation schemas
│   │   └── index.ts      # Public exports
│   ├── dashboard/        # Dashboard feature
│   │   ├── components/   # Feature-specific components
│   │   ├── pages/        # Dashboard page
│   │   └── index.ts
│   └── users/            # User management feature
│       ├── pages/        # Users page
│       └── index.ts
│
├── components/            # Shared UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   ├── Table.tsx
│   ├── Pagination.tsx
│   └── Loader.tsx
│
├── hooks/                 # Custom React hooks
│   ├── useAuthQueries.ts  # Auth-related queries
│   ├── useDashboardQueries.ts
│   ├── useUsersQueries.ts
│   ├── useDebounce.ts
│   └── index.ts
│
├── services/              # API layer
│   └── api/
│       ├── client.ts      # Axios instance with interceptors
│       ├── mockApi.ts     # Mock data for development
│       ├── authApi.ts     # Auth endpoints
│       ├── dashboardApi.ts
│       ├── usersApi.ts
│       └── index.ts
│
├── store/                 # Global state management
│   ├── authStore.tsx      # Authentication context
│   ├── themeStore.tsx     # Theme context
│   └── index.ts
│
├── routes/                # Routing configuration
│   ├── ProtectedRoute.tsx # Route guard
│   └── index.tsx          # Route definitions
│
├── utils/                 # Utility functions
│   └── index.ts           # Helpers, formatters, constants
│
├── types/                 # TypeScript type definitions
│   └── index.ts           # Global types
│
├── styles/                # Global styles
│   └── index.css          # Tailwind + custom CSS
│
└── main.tsx               # Application entry point
```

### Why This Structure?

- **Scalability**: Easy to add new features without affecting existing code
- **Maintainability**: Clear organization makes code easy to find and update
- **Team Collaboration**: Multiple developers can work on different features simultaneously
- **Testing**: Feature-based structure makes testing more intuitive
- **Code Reusability**: Shared components and utilities are centralized

## 🔐 Authentication Flow

### Login Process

1. User submits credentials via `LoginPage`
2. Form validation with Zod schema
3. API call via `authApi.login()`
4. On success:
   - Store user data and tokens in Context
   - Persist to localStorage
   - Redirect to dashboard
5. On error:
   - Display error toast
   - Keep user on login page

### Protected Routes

```typescript
// Routes are protected using ProtectedRoute wrapper
<ProtectedRoute>
  <MainLayout>
    <DashboardPage />
  </MainLayout>
</ProtectedRoute>
```

### Token Management

- **Storage**: Tokens stored in localStorage via custom storage utility
- **Injection**: Axios request interceptor adds token to all requests
- **Expiration**: Response interceptor catches 401 errors and redirects to login
- **Logout**: Clears tokens and user data from storage and context

## ⚡ Performance Optimizations

### Code Splitting
- Route-level lazy loading with `React.lazy()`
- Suspense boundaries for loading states
- Manual chunk splitting in Vite config

### React Query Optimizations
- Stale-while-revalidate caching strategy
- Background refetching for fresh data
- Query deduplication
- Optimistic updates (ready for mutations)

### React Optimizations
- `useMemo` for expensive calculations
- `useCallback` for stable function references
- Debounced search inputs (300ms delay)
- Virtualization-ready table structure

### Build Optimizations
- Tree shaking via ES modules
- Minification and compression
- Source maps for debugging
- Vendor chunk splitting

## 🧪 Testing Strategy

### Test Coverage Goals
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

### Testing Layers

1. **Unit Tests**: Individual components and hooks
   - Button component behavior
   - Custom hook logic (useDebounce)
   - Utility functions

2. **Integration Tests**: Feature workflows
   - Login flow end-to-end
   - Form submission and validation
   - API integration with mocked responses

3. **Component Tests**: UI interactions
   - User events (click, type, submit)
   - Conditional rendering
   - Props validation

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 💡 Key Design Decisions

### Why React Query over Redux?

- **Server State**: Most state in modern apps is server state (cached API data)
- **Less Boilerplate**: No actions, reducers, or sagas needed
- **Built-in Features**: Caching, refetching, pagination out of the box
- **Better DX**: Automatic loading and error states

### Why Context for Auth?

- **Simple State**: Auth state is relatively simple (user + tokens)
- **Infrequent Updates**: Auth state changes rarely (login/logout)
- **No Complex Logic**: No need for middleware or time-travel debugging
- **Performance**: Context is sufficient for this use case

### Why Feature-Based Architecture?

- **Domain-Driven**: Code organized by business domain, not technical layer
- **Scalability**: Easy to add features without touching existing code
- **Team Collaboration**: Multiple teams can work on different features
- **Encapsulation**: Features are self-contained with clear boundaries

### Why Tailwind CSS?

- **Utility-First**: Rapid UI development without context switching
- **Consistency**: Design system enforced through configuration
- **Performance**: Purges unused CSS in production
- **Dark Mode**: Built-in dark mode support

### Why Axios over Fetch?

- **Interceptors**: Easy request/response transformation
- **Automatic JSON**: No need to manually parse responses
- **Error Handling**: Better error handling out of the box
- **Timeout Support**: Built-in request timeout
- **Browser Support**: Better compatibility

## 📜 Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format code with Prettier
npm run type-check       # Run TypeScript compiler

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

## 🤝 Contributing

This is a portfolio/demonstration project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ by a Senior Frontend Engineer

---

**Note**: This is a demonstration project showcasing enterprise-level React development practices. The mock API can be replaced with real backend endpoints by updating the API service layer.