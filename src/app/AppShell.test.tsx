import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from './AppShell'

describe('AppShell', () => {
  it('renders localized navigation, a skip link, and one main landmark', () => {
    render(
      <MemoryRouter initialEntries={['/en/pipeline']}>
        <AppShell locale="en"><h1>Pipeline</h1></AppShell>
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main-content')
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Pipeline' })).toHaveAttribute('href', '/en/pipeline')
    expect(screen.getAllByRole('main')).toHaveLength(1)
  })

  it('offers a Turkish locale switch that preserves the current route and query', () => {
    render(
      <MemoryRouter initialEntries={['/en/pipeline?stage=memory']}>
        <AppShell locale="en"><h1>Pipeline</h1></AppShell>
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Türkçe' })).toHaveAttribute('href', '/tr/pipeline?stage=memory')
  })

  it('sets Turkish document metadata and localized shell labels', async () => {
    render(
      <MemoryRouter initialEntries={['/tr/pipeline']}>
        <AppShell locale="tr"><h1>İşlem hattı</h1></AppShell>
      </MemoryRouter>,
    )
    await waitFor(() => expect(document.documentElement).toHaveAttribute('lang', 'tr'))
    expect(document.title).toBe('CTX - Bağlam Mühendisliği')
    expect(screen.getByRole('link', { name: 'CTX ana sayfası' })).toBeInTheDocument()
    expect(screen.getByText('Kaynak izi')).toBeInTheDocument()
  })
})
