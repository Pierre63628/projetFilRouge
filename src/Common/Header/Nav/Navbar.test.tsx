import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Helper function to render with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Navbar Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders without crashing', () => {
    renderWithRouter(<Navbar />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders all navigation buttons', () => {
    renderWithRouter(<Navbar />)
    
    expect(screen.getByRole('button', { name: /reservations/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /about sessions/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /contact us/i })).toBeInTheDocument()
  })

  it('navigates to reservations when reservations button is clicked', () => {
    renderWithRouter(<Navbar />)
    
    const reservationsButton = screen.getByRole('button', { name: /reservations/i })
    fireEvent.click(reservationsButton)
    
    expect(mockNavigate).toHaveBeenCalledWith('/reservations')
  })

  it('navigates to sessions when about sessions button is clicked', () => {
    renderWithRouter(<Navbar />)
    
    const sessionsButton = screen.getByRole('button', { name: /about sessions/i })
    fireEvent.click(sessionsButton)
    
    expect(mockNavigate).toHaveBeenCalledWith('/sessions')
  })

  it('navigates to contact form when contact us button is clicked', () => {
    renderWithRouter(<Navbar />)
    
    const contactButton = screen.getByRole('button', { name: /contact us/i })
    fireEvent.click(contactButton)
    
    expect(mockNavigate).toHaveBeenCalledWith('/contactform')
  })

  it('has correct structure with nav and ul elements', () => {
    renderWithRouter(<Navbar />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    expect(list).toHaveAttribute('id', 'navLinks')
  })

  it('middle button has correct ID', () => {
    renderWithRouter(<Navbar />)
    
    const middleButton = screen.getByRole('button', { name: /about sessions/i })
    expect(middleButton).toHaveAttribute('id', 'middleButton')
  })

  it('handles multiple button clicks correctly', () => {
    renderWithRouter(<Navbar />)
    
    const reservationsButton = screen.getByRole('button', { name: /reservations/i })
    const sessionsButton = screen.getByRole('button', { name: /about sessions/i })
    const contactButton = screen.getByRole('button', { name: /contact us/i })
    
    fireEvent.click(reservationsButton)
    fireEvent.click(sessionsButton)
    fireEvent.click(contactButton)
    
    expect(mockNavigate).toHaveBeenCalledTimes(3)
    expect(mockNavigate).toHaveBeenNthCalledWith(1, '/reservations')
    expect(mockNavigate).toHaveBeenNthCalledWith(2, '/sessions')
    expect(mockNavigate).toHaveBeenNthCalledWith(3, '/contactform')
  })
})
