import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from '@/components/app/Pagination'

describe('Pagination', () => {
  test('renders nothing for a single page', () => {
    const { container } = render(<Pagination page={1} totalPages={1} onPageChange={() => {}} />)
    expect(container).toBeEmptyDOMElement()
  })

  test('marks the current page and disables Previous on page 1', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '1' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled()
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument()
  })

  test('disables Next on the last page', () => {
    render(<Pagination page={5} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
  })

  test('reports the requested page', async () => {
    const onPageChange = vi.fn()
    render(<Pagination page={3} totalPages={10} onPageChange={onPageChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Next page' }))
    await userEvent.click(screen.getByRole('button', { name: 'Previous page' }))
    await userEvent.click(screen.getByRole('button', { name: 'Page 10' }))
    expect(onPageChange.mock.calls).toEqual([[4], [2], [10]])
  })

  test('clicking the current page does nothing', async () => {
    const onPageChange = vi.fn()
    render(<Pagination page={2} totalPages={3} onPageChange={onPageChange} />)
    await userEvent.click(screen.getByRole('button', { name: '2' }))
    expect(onPageChange).not.toHaveBeenCalled()
  })

  test('disabled blocks every control while a page loads', () => {
    render(<Pagination page={2} totalPages={3} onPageChange={() => {}} disabled />)
    for (const button of screen.getAllByRole('button')) expect(button).toBeDisabled()
  })
})
