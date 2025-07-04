import { describe, it, expect } from 'vitest'
import { render, screen } from '../test-utils'
import App from '../../App'

describe('App Integration Tests', () => {
  it('renders the complete application', () => {
    render(<App />)
    
    // Check that the main components are rendered
    expect(screen.getByText('La Maison Horrifique')).toBeInTheDocument()
    expect(screen.getByText('Bienvenue chez EscapeXperience')).toBeInTheDocument()
  })

  it('displays navigation elements', () => {
    render(<App />)
    
    // Check navigation buttons
    expect(screen.getByRole('button', { name: /reservations/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /about sessions/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /contact us/i })).toBeInTheDocument()
  })

  it('displays session information', () => {
    render(<App />)
    
    // Check that sessions are displayed
    expect(screen.getByText("Rock'N SPY")).toBeInTheDocument()
    expect(screen.getByText('Dr Kang')).toBeInTheDocument()
    expect(screen.getByText('Contagion')).toBeInTheDocument()
    expect(screen.getByText('Ghost')).toBeInTheDocument()
  })

  it('displays footer information', () => {
    render(<App />)
    
    // Check footer content
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} Projet Fil Rouge. Tous droits réservés.`)).toBeInTheDocument()
    expect(screen.getByText('Follow us on Instagram')).toBeInTheDocument()
    expect(screen.getByText('Read latest new on Twitter')).toBeInTheDocument()
  })

  it('has proper page structure', () => {
    render(<App />)
    
    // Check main structural elements
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
