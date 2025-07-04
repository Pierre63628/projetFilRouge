import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Links from './Links'

describe('Links Component', () => {
  it('renders without crashing', () => {
    render(<Links />)
    expect(screen.getByText('Legal notice')).toBeInTheDocument()
  })

  it('renders all footer links', () => {
    render(<Links />)
    
    expect(screen.getByRole('link', { name: /legal notice/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact us/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about sessions/i })).toBeInTheDocument()
  })

  it('has correct href attributes for links', () => {
    render(<Links />)
    
    const legalNoticeLink = screen.getByRole('link', { name: /legal notice/i })
    const contactLink = screen.getByRole('link', { name: /contact us/i })
    const aboutSessionsLink = screen.getByRole('link', { name: /about sessions/i })
    
    expect(legalNoticeLink).toHaveAttribute('href', '#')
    expect(contactLink).toHaveAttribute('href', '#')
    expect(aboutSessionsLink).toHaveAttribute('href', '#')
  })

  it('has correct structure with div and ul elements', () => {
    render(<Links />)
    
    const container = screen.getByRole('link', { name: /legal notice/i }).closest('#Links')
    expect(container).toBeInTheDocument()
    
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })

  it('middle link has correct ID', () => {
    render(<Links />)
    
    const middleLink = screen.getByRole('link', { name: /contact us/i })
    expect(middleLink).toHaveAttribute('id', 'middleLink')
  })

  it('renders links in correct order', () => {
    render(<Links />)
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
    
    expect(links[0]).toHaveTextContent('Legal notice')
    expect(links[1]).toHaveTextContent('Contact us')
    expect(links[2]).toHaveTextContent('About sessions')
  })

  it('applies correct CSS structure', () => {
    render(<Links />)
    
    const container = screen.getByRole('link', { name: /legal notice/i }).closest('#Links')
    expect(container).toHaveAttribute('id', 'Links')
  })
})
