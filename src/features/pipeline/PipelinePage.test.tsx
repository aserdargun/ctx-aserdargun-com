import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { PipelinePage } from './PipelinePage'

function LocationProbe() {
  const location = useLocation()
  return <output data-testid="location">{location.pathname}{location.search}</output>
}

function renderPipeline(entry = '/en/pipeline?stage=retrieve&method=dense-retrieval-method') {
  render(
    <MemoryRouter initialEntries={[entry]}>
      <PipelinePage locale="en" />
      <LocationProbe />
    </MemoryRouter>,
  )
}

describe('PipelinePage', () => {
  it('selects a stage, updates detail, and writes valid share state', async () => {
    const user = userEvent.setup()
    renderPipeline()
    await user.click(screen.getByRole('button', { name: /Memory, stage 11/ }))
    expect(screen.getByRole('heading', { name: 'Memory' })).toBeInTheDocument()
    expect(screen.getByTestId('location')).toHaveTextContent('stage=memory')
    expect(screen.getByRole('radio', { name: 'Working memory' })).toBeChecked()
  })

  it('moves through stages with arrow keys', async () => {
    const user = userEvent.setup()
    renderPipeline()
    const selected = screen.getByRole('button', { name: /Retrieve, stage 6/ })
    selected.focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('button', { name: /Rerank, stage 7/ })).toHaveAttribute('aria-current', 'step')
  })

  it('selects a method and updates comparison state', async () => {
    const user = userEvent.setup()
    renderPipeline()
    await user.click(screen.getByRole('radio', { name: 'Hybrid' }))
    expect(screen.getByRole('radio', { name: 'Hybrid' })).toBeChecked()
    expect(screen.getByTestId('location')).toHaveTextContent('method=hybrid-retrieval-method')
  })

  it('shows five quality gates without universal pass labels', () => {
    renderPipeline()
    expect(screen.getAllByTestId('quality-gate')).toHaveLength(5)
    expect(screen.queryByText(/^Pass$/)).not.toBeInTheDocument()
  })
})
