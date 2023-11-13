import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Header } from './Header'

describe.skip('Header', () => {
  it('has Vacations title', () => {
    render(<Header />)
    const headline = screen.getByText(/Vacations/i)
    expect(headline).toBeInTheDocument()
  })
})
