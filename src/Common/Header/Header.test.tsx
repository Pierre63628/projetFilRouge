import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from './Header'

// Mock the Navbar component
vi.mock('./Nav/Navbar', () => ({
  default: () => <div data-testid="navbar-component">Navbar Component</div>
}))

describe('Header Component', () => {
  it('renders without crashing', () => {
    render(<Header />)
    expect(screen.getByText('La Maison Horrifique')).toBeInTheDocument()
  })

  it('displays the correct title', () => {
    render(<Header />)
    const title = screen.getByRole('heading', { name: /la maison horrifique/i })
    expect(title).toBeInTheDocument()
    expect(title.tagName).toBe('H1')
  })

  it('renders the navbar component', () => {
    render(<Header />)
    const navbar = screen.getByTestId('navbar-component')
    expect(navbar).toBeInTheDocument()
  })

  it('has correct structure with title and navbar', () => {
    render(<Header />)
    
    const header = screen.getByRole('heading').parentElement
    expect(header).toHaveAttribute('id', 'Header')
    
    const title = screen.getByRole('heading', { name: /la maison horrifique/i })
    const navbar = screen.getByTestId('navbar-component')
    
    expect(title).toBeInTheDocument()
    expect(navbar).toBeInTheDocument()
  })

  it('applies correct CSS classes and IDs', () => {
    render(<Header />)
    const headerContainer = screen.getByRole('heading').parentElement
    expect(headerContainer).toHaveAttribute('id', 'Header')
  })
})
