import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AtlasPage } from './AtlasPage'

describe('AtlasPage', () => {
  it('filters techniques by stage', async () => {
    render(<MemoryRouter initialEntries={['/en/atlas']}><AtlasPage locale="en" /></MemoryRouter>)
    await userEvent.click(screen.getByRole('button', { name: 'Retrieve' }))
    const records = screen.getAllByTestId('method-record')
    expect(records).toHaveLength(4)
    expect(records.every((row) => row.dataset.stage === 'retrieve')).toBe(true)
  })
})
