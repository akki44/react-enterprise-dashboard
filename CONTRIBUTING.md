# Contributing to Enterprise Dashboard

Thank you for considering contributing to this project! This document outlines the process and guidelines.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Create a feature branch: `git checkout -b feature/my-feature`
4. Start development server: `npm run dev`

## Code Standards

### TypeScript
- Use TypeScript strict mode
- Define proper types for all functions and components
- Avoid `any` type unless absolutely necessary
- Use interfaces for object shapes

### React
- Use functional components with hooks
- Follow React best practices (keys, fragments, etc.)
- Use `useMemo` and `useCallback` for performance
- Keep components focused and single-purpose

### Styling
- Use Tailwind CSS utility classes
- Follow the existing design system
- Support dark mode for all new components
- Ensure responsive design (mobile-first)

### Testing
- Write tests for new features
- Maintain minimum 70% code coverage
- Use React Testing Library for component tests
- Mock external dependencies

## Commit Messages

Follow conventional commits format:

```
feat: add user profile page
fix: resolve login redirect issue
docs: update README with new features
test: add tests for dashboard component
refactor: simplify authentication logic
```

## Pull Request Process

1. Update documentation if needed
2. Add tests for new functionality
3. Ensure all tests pass: `npm test`
4. Run linter: `npm run lint`
5. Format code: `npm run format`
6. Create PR with clear description

## Questions?

Feel free to open an issue for any questions or concerns.
