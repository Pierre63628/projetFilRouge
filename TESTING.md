# Testing Guide

This project uses **Vitest** and **React Testing Library** for testing React TypeScript components.

## 🚀 Quick Start

### Install Dependencies

```bash
pnpm install
```

### Run Tests

```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm test:run

# Run tests with coverage
pnpm test:coverage

# Run tests with UI
pnpm test:ui
```

## 📁 Test Structure

```
src/
├── test/
│   ├── setup.ts              # Test setup and global mocks
│   ├── test-utils.tsx        # Custom render utilities
│   └── integration/          # Integration tests
├── **/*.test.tsx             # Component unit tests
└── **/*.spec.tsx             # Additional test files
```

## 🧪 Test Types

### Unit Tests
- **Component rendering tests**: Verify components render without crashing
- **Props handling tests**: Test component behavior with different props
- **User interaction tests**: Test button clicks, form submissions, etc.
- **Accessibility tests**: Ensure proper ARIA attributes and semantic HTML

### Integration Tests
- **App-level tests**: Test complete application flow
- **Route testing**: Verify navigation and routing works correctly
- **Component interaction**: Test how components work together

## 📝 Test Examples

### Basic Component Test
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders without crashing', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### Testing with Props
```typescript
it('displays correct props', () => {
  const props = { title: 'Test Title', count: 5 }
  render(<MyComponent {...props} />)
  
  expect(screen.getByText('Test Title')).toBeInTheDocument()
  expect(screen.getByText('5')).toBeInTheDocument()
})
```

### Testing User Interactions
```typescript
import { fireEvent } from '@testing-library/react'

it('handles button click', () => {
  const mockFn = vi.fn()
  render(<MyComponent onClick={mockFn} />)
  
  fireEvent.click(screen.getByRole('button'))
  expect(mockFn).toHaveBeenCalledTimes(1)
})
```

## 🛠️ Configuration

### Vitest Config (`vitest.config.ts`)
- **Environment**: jsdom for DOM testing
- **Globals**: Enabled for describe, it, expect
- **Setup**: Automatic Jest DOM matchers
- **CSS**: Enabled for styled components

### Test Setup (`src/test/setup.ts`)
- **Jest DOM**: Custom matchers for DOM testing
- **Mocks**: Global mocks for browser APIs
- **Utilities**: Common test utilities

## 📊 Coverage

Generate test coverage reports:

```bash
pnpm test:coverage
```

Coverage reports are generated in the `coverage/` directory.

## 🔧 Troubleshooting

### Common Issues

1. **Module not found errors**: Ensure all dependencies are installed
2. **Router errors**: Use the custom render utility from `test-utils.tsx`
3. **CSS import errors**: CSS processing is enabled in vitest config
4. **Mock issues**: Check that mocks are properly defined in test files

### Best Practices

- **Arrange, Act, Assert**: Structure tests clearly
- **Test behavior, not implementation**: Focus on what users see/do
- **Use semantic queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
- **Mock external dependencies**: Keep tests isolated and fast
- **Write descriptive test names**: Make test failures easy to understand

## 🚀 CI/CD Integration

Tests run automatically in GitHub Actions:
- On every push to main branch
- On every pull request
- Tests must pass before builds can succeed

The CI pipeline runs:
1. Install dependencies
2. Lint code
3. **Run tests** ← Your tests here!
4. Build project

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
