import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from './AppRouter'

describe('App routes', () => {
  it('redirects the root to the English pipeline', async () => {
    render(<MemoryRouter initialEntries={['/']}><AppRoutes /></MemoryRouter>)
    expect(await screen.findByRole('heading', { name: 'Build the context, not just the prompt.' })).toBeInTheDocument()
  })

  it('renders a localized not-found route', async () => {
    render(<MemoryRouter initialEntries={['/tr/olmayan']}><AppRoutes /></MemoryRouter>)
    expect(await screen.findByRole('heading', { name: 'Bu yol bulunamadı.' })).toBeInTheDocument()
  })
})
