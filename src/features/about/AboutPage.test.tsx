import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AboutPage } from './AboutPage'

describe('AboutPage', () => {
  it('renders Turkish methodology without English fallback text', () => {
    render(<MemoryRouter initialEntries={['/tr/about']}><AboutPage locale="tr" /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Kanıt politikası' })).toBeInTheDocument()
    expect(screen.queryByText('Evidence policy')).not.toBeInTheDocument()
  })
})
