import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SessionBlock from './SessionBlock'
import type { Session } from '../Homepage'

const mockSession: Session = {
  id: 1,
  image: '/test-image.jpg',
  name: 'Test Session',
  theme: 'Adventure, Mystery',
  playerNb: '2-6',
  difficulty: 'Intermediate',
  description: 'This is a test session description for testing purposes.'
}

describe('SessionBlock Component', () => {
  it('renders without crashing', () => {
    render(<SessionBlock {...mockSession} />)
    expect(screen.getByText('Test Session')).toBeInTheDocument()
  })

  it('displays session name correctly', () => {
    render(<SessionBlock {...mockSession} />)
    const sessionName = screen.getByText('Test Session')
    expect(sessionName).toBeInTheDocument()
    expect(sessionName).toHaveClass('sessionName')
  })

  it('displays session image with correct attributes', () => {
    render(<SessionBlock {...mockSession} />)
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
    expect(image).toHaveAttribute('alt', '#')
    expect(image).toHaveClass('sessionImage')
  })

  it('displays theme information', () => {
    render(<SessionBlock {...mockSession} />)
    const theme = screen.getByText('Theme: Adventure, Mystery')
    expect(theme).toBeInTheDocument()
    expect(theme).toHaveClass('sessionTheme')
  })

  it('displays player number information', () => {
    render(<SessionBlock {...mockSession} />)
    const playerNb = screen.getByText('2-6 players')
    expect(playerNb).toBeInTheDocument()
    expect(playerNb).toHaveClass('sessionPlayerNb')
  })

  it('displays difficulty information', () => {
    render(<SessionBlock {...mockSession} />)
    const difficulty = screen.getByText('Difficulty: Intermediate')
    expect(difficulty).toBeInTheDocument()
    expect(difficulty).toHaveClass('sessionDifficulty')
  })

  it('displays session description', () => {
    render(<SessionBlock {...mockSession} />)
    const description = screen.getByText('This is a test session description for testing purposes.')
    expect(description).toBeInTheDocument()
    expect(description).toHaveClass('sessionDescription')
  })

  it('renders with different session data', () => {
    const differentSession: Session = {
      id: 2,
      image: '/different-image.jpg',
      name: 'Different Session',
      theme: 'Horror, Thriller',
      playerNb: '3-8',
      difficulty: 'Hard',
      description: 'A different session with different properties.'
    }

    render(<SessionBlock {...differentSession} />)
    
    expect(screen.getByText('Different Session')).toBeInTheDocument()
    expect(screen.getByText('Theme: Horror, Thriller')).toBeInTheDocument()
    expect(screen.getByText('3-8 players')).toBeInTheDocument()
    expect(screen.getByText('Difficulty: Hard')).toBeInTheDocument()
    expect(screen.getByText('A different session with different properties.')).toBeInTheDocument()
  })

  it('handles empty or undefined props gracefully', () => {
    const emptySession: Session = {
      id: 0,
      image: '',
      name: '',
      theme: '',
      playerNb: '',
      difficulty: '',
      description: ''
    }

    render(<SessionBlock {...emptySession} />)
    
    // Should still render the structure even with empty values
    expect(screen.getByText('Theme:')).toBeInTheDocument()
    expect(screen.getByText('players')).toBeInTheDocument()
    expect(screen.getByText('Difficulty:')).toBeInTheDocument()
  })
})
