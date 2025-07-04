import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Homepage from './Homepage'

// Mock SessionBlock component
vi.mock('./Sessions/SessionBlock', () => ({
  default: ({ name, theme }: { name: string; theme: string }) => (
    <div data-testid={`session-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
      <span>{name}</span>
      <span>{theme}</span>
    </div>
  )
}))

describe('Homepage Component', () => {
  it('renders without crashing', () => {
    render(<Homepage />)
    expect(screen.getByText('Bienvenue chez EscapeXperience')).toBeInTheDocument()
  })

  it('displays the main heading', () => {
    render(<Homepage />)
    const heading = screen.getByRole('heading', { name: /bienvenue chez escapexperience/i })
    expect(heading).toBeInTheDocument()
  })

  it('displays the main description', () => {
    render(<Homepage />)
    const description = screen.getByText(/plongez dans l'aventure/i)
    expect(description).toBeInTheDocument()
  })

  it('displays the discover sessions button', () => {
    render(<Homepage />)
    const button = screen.getByRole('link', { name: /découvrir les sessions/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('href', '#sessions')
  })

  it('renders all session blocks', () => {
    render(<Homepage />)
    
    // Check for specific sessions
    expect(screen.getByTestId('session-rock-n-spy')).toBeInTheDocument()
    expect(screen.getByTestId('session-dr-kang')).toBeInTheDocument()
    expect(screen.getByTestId('session-contagion')).toBeInTheDocument()
    expect(screen.getByTestId('session-ghost')).toBeInTheDocument()
  })

  it('displays the sessions section heading', () => {
    render(<Homepage />)
    const sessionsHeading = screen.getByRole('heading', { name: /nos sessions d'escape game/i })
    expect(sessionsHeading).toBeInTheDocument()
  })

  it('displays the about section', () => {
    render(<Homepage />)
    const aboutHeading = screen.getByRole('heading', { name: /à propos de escapexperience/i })
    expect(aboutHeading).toBeInTheDocument()
    
    const aboutText = screen.getByText(/escapexperience est une entreprise passionnée/i)
    expect(aboutText).toBeInTheDocument()
  })

  it('displays contact information', () => {
    render(<Homepage />)
    const contactHeading = screen.getByRole('heading', { name: /contact/i })
    expect(contactHeading).toBeInTheDocument()
    
    expect(screen.getByText(/contact@escapexperience.fr/i)).toBeInTheDocument()
    expect(screen.getByText(/01 23 45 67 89/i)).toBeInTheDocument()
    expect(screen.getByText(/42 rue de l'aventure, 75000 paris/i)).toBeInTheDocument()
  })

  it('has proper section structure', () => {
    render(<Homepage />)
    const sections = screen.getAllByRole('region')
    expect(sections).toHaveLength(3) // sessions, about, contact sections
  })
})
