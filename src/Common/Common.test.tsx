import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Common from './Common'

// Mock the child components
vi.mock('./Header/Header', () => ({
  default: () => <div data-testid="header-component">Header Component</div>
}))

vi.mock('./Footer/Footer', () => ({
  default: () => <div data-testid="footer-component">Footer Component</div>
}))

// Helper function to render with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Common Component', () => {
  it('renders without crashing', () => {
    renderWithRouter(<Common />)
    expect(screen.getByTestId('header-component')).toBeInTheDocument()
    expect(screen.getByTestId('footer-component')).toBeInTheDocument()
  })

  it('renders header component', () => {
    renderWithRouter(<Common />)
    const header = screen.getByTestId('header-component')
    expect(header).toBeInTheDocument()
  })

  it('renders footer component', () => {
    renderWithRouter(<Common />)
    const footer = screen.getByTestId('footer-component')
    expect(footer).toBeInTheDocument()
  })

  it('renders main element for content', () => {
    renderWithRouter(<Common />)
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })

  it('has correct structure with header, main, and footer', () => {
    renderWithRouter(<Common />)
    
    const header = screen.getByTestId('header-component')
    const main = screen.getByRole('main')
    const footer = screen.getByTestId('footer-component')
    
    expect(header).toBeInTheDocument()
    expect(main).toBeInTheDocument()
    expect(footer).toBeInTheDocument()
    
    // Check that main is between header and footer in the DOM
    const container = header.parentElement
    const children = Array.from(container?.children || [])
    
    expect(children.indexOf(header)).toBeLessThan(children.indexOf(main))
    expect(children.indexOf(main)).toBeLessThan(children.indexOf(footer))
  })

  it('provides outlet for nested routes', () => {
    renderWithRouter(<Common />)
    // The Outlet component should be present within the main element
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })
})
