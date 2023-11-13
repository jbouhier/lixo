import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Home } from './Home'

describe('Home', () => {
  it('has Home button', () => {
    render(<Home />)
    const headline = screen.getByText(/Home/i)
    expect(headline).toBeInTheDocument()
  })
})
