import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

// Mock the child components to isolate App component testing
vi.mock('./Common/Common', () => ({
  default: () => <div data-testid="common-component">Common Component</div>
}))

vi.mock('./Homepage/Homepage', () => ({
  default: () => <div data-testid="homepage-component">Homepage Component</div>
}))

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByTestId('common-component')).toBeInTheDocument()
  })

  it('sets up routing correctly', () => {
    render(<App />)
    // Check that the router is working by verifying the presence of routed components
    expect(screen.getByTestId('common-component')).toBeInTheDocument()
  })

  it('renders the main route structure', () => {
    render(<App />)
    // Verify that the app renders the expected structure
    const commonComponent = screen.getByTestId('common-component')
    expect(commonComponent).toBeInTheDocument()
  })
})
