import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

// Mock the child components
vi.mock('./Socials/Socials', () => ({
  default: () => <div data-testid="socials-component">Socials Component</div>
}))

vi.mock('./Links/Links', () => ({
  default: () => <div data-testid="links-component">Links Component</div>
}))

describe('Footer Component', () => {
  it('renders without crashing', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders socials component', () => {
    render(<Footer />)
    const socials = screen.getByTestId('socials-component')
    expect(socials).toBeInTheDocument()
  })

  it('renders links component', () => {
    render(<Footer />)
    const links = screen.getByTestId('links-component')
    expect(links).toBeInTheDocument()
  })

  it('displays copyright information with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    const copyright = screen.getByText(`© ${currentYear} Projet Fil Rouge. Tous droits réservés.`)
    expect(copyright).toBeInTheDocument()
  })

  it('has correct CSS classes', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('footer')
  })

  it('has correct structure with footer content and bottom sections', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    
    // Check for footer-content div
    const footerContent = footer.querySelector('.footer-content')
    expect(footerContent).toBeInTheDocument()
    
    // Check for footer-bottom div
    const footerBottom = footer.querySelector('.footer-bottom')
    expect(footerBottom).toBeInTheDocument()
  })

  it('organizes socials and links in separate sections', () => {
    render(<Footer />)
    
    const socialsSection = screen.getByTestId('socials-component').parentElement
    const linksSection = screen.getByTestId('links-component').parentElement
    
    expect(socialsSection).toHaveClass('footer-socials')
    expect(linksSection).toHaveClass('footer-links')
  })

  it('updates copyright year dynamically', () => {
    // Mock Date to test dynamic year
    const mockDate = new Date('2025-01-01')
    vi.setSystemTime(mockDate)
    
    render(<Footer />)
    const copyright = screen.getByText('© 2025 Projet Fil Rouge. Tous droits réservés.')
    expect(copyright).toBeInTheDocument()
    
    vi.useRealTimers()
  })
})
