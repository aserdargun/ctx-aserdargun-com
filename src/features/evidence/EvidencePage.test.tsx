import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { EvidencePage } from './EvidencePage'

describe('EvidencePage', () => {
  it('shows every evidence claim with source and review metadata', () => {
    render(<MemoryRouter initialEntries={['/en/evidence?kind=evidence']}><EvidencePage locale="en" /></MemoryRouter>)
    const rows = screen.getAllByTestId('claim-record')
    expect(rows.length).toBeGreaterThan(0)
    for (const row of rows) {
      for (const link of within(row).getAllByRole('link')) {
        expect(link).toHaveAttribute('href', expect.stringMatching(/^https:\/\//))
      }
      expect(within(row).getByText(/Reviewed/)).toBeInTheDocument()
    }
  })
})
