import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { PatternsPage } from './PatternsPage'

describe('PatternsPage', () => {
  it('opens a shareable hybrid retrieval pattern', () => {
    render(<MemoryRouter initialEntries={['/en/patterns?pattern=hybrid-retrieval']}><PatternsPage locale="en" /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Hybrid retrieval with reranking' })).toBeInTheDocument()
    expect(screen.getAllByTestId('pattern-stage').some((node) => node.textContent?.includes('Rerank'))).toBe(true)
  })
})
