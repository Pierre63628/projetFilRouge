import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Socials from './Socials'

describe('Socials Component', () => {
  it('renders without crashing', () => {
    render(<Socials />)
    expect(screen.getByText('Follow us on Instagram')).toBeInTheDocument()
  })

  it('renders Instagram link', () => {
    render(<Socials />)
    
    const instagramLink = screen.getByRole('link', { name: /follow us on instagram/i })
    expect(instagramLink).toBeInTheDocument()
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com')
  })

  it('renders Twitter link', () => {
    render(<Socials />)
    
    const twitterLink = screen.getByRole('link', { name: /read latest new on twitter/i })
    expect(twitterLink).toBeInTheDocument()
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com')
  })

  it('renders social media images', () => {
    render(<Socials />)
    
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(2)
    
    // Both images have empty src and alt attributes as per the component
    images.forEach(img => {
      expect(img).toHaveAttribute('src', '')
      expect(img).toHaveAttribute('alt', '')
    })
  })

  it('has correct structure with container and divs', () => {
    render(<Socials />)
    
    const container = screen.getByText('Follow us on Instagram').closest('#Socials')
    expect(container).toBeInTheDocument()
    expect(container).toHaveAttribute('id', 'Socials')
  })

  it('renders both social media sections', () => {
    render(<Socials />)
    
    // Check that both Instagram and Twitter sections are present
    const instagramSection = screen.getByText('Follow us on Instagram').parentElement
    const twitterSection = screen.getByText('Read latest new on Twitter').parentElement
    
    expect(instagramSection).toBeInTheDocument()
    expect(twitterSection).toBeInTheDocument()
    
    // Both should be direct children of the #Socials container
    const socialsContainer = screen.getByText('Follow us on Instagram').closest('#Socials')
    expect(socialsContainer).toContainElement(instagramSection)
    expect(socialsContainer).toContainElement(twitterSection)
  })

  it('links open to correct social media platforms', () => {
    render(<Socials />)
    
    const instagramLink = screen.getByRole('link', { name: /follow us on instagram/i })
    const twitterLink = screen.getByRole('link', { name: /read latest new on twitter/i })
    
    expect(instagramLink.getAttribute('href')).toBe('https://instagram.com')
    expect(twitterLink.getAttribute('href')).toBe('https://twitter.com')
  })

  it('has proper accessibility structure', () => {
    render(<Socials />)
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
    
    // Each link should have descriptive text
    expect(links[0]).toHaveTextContent('Follow us on Instagram')
    expect(links[1]).toHaveTextContent('Read latest new on Twitter')
  })
})
