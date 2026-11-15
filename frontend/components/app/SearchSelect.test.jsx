import { describe, expect, test, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchSelect from '@/components/app/SearchSelect'

const OPTIONS = [
  { value: 1, label: 'Why did Sara go early?', hint: 'B1' },
  { value: 2, label: 'Where is the market?', disabled: true, note: 'In question 3' },
]

function setup(loadOptions = vi.fn(async () => OPTIONS)) {
  const onSelect = vi.fn()
  render(<SearchSelect selected={null} onSelect={onSelect} loadOptions={loadOptions} placeholder="Choose a question" />)
  return { loadOptions, onSelect, user: userEvent.setup() }
}

describe('SearchSelect', () => {
  test('waits for 3 characters before searching', async () => {
    const { loadOptions, user } = setup()
    await user.click(screen.getByRole('button', { name: 'Choose a question' }))
    await user.type(screen.getByRole('combobox'), 'wh')
    expect(screen.getByText('Type at least 3 characters to search')).toBeInTheDocument()
    await new Promise((r) => setTimeout(r, 400))
    expect(loadOptions).not.toHaveBeenCalled()
  })

  test('searches once typing stops and picks an option', async () => {
    const { loadOptions, onSelect, user } = setup()
    await user.click(screen.getByRole('button', { name: 'Choose a question' }))
    await user.type(screen.getByRole('combobox'), 'why')
    await screen.findByText('Why did Sara go early?')
    expect(loadOptions).toHaveBeenCalledTimes(1)
    expect(loadOptions).toHaveBeenCalledWith('why')
    await user.click(screen.getByText('Why did Sara go early?'))
    expect(onSelect).toHaveBeenCalledWith(OPTIONS[0])
  })

  test('a disabled option cannot be picked; an empty search says so', async () => {
    const loadOptions = vi.fn(async (q) => (q === 'zzz' ? [] : OPTIONS))
    const { onSelect, user } = setup(loadOptions)
    await user.click(screen.getByRole('button', { name: 'Choose a question' }))
    await user.type(screen.getByRole('combobox'), 'whe')
    await user.click(await screen.findByText('Where is the market?'))
    expect(onSelect).not.toHaveBeenCalled()
    await user.clear(screen.getByRole('combobox'))
    await user.type(screen.getByRole('combobox'), 'zzz')
    await waitFor(() => expect(screen.getByText('No results found')).toBeInTheDocument())
  })
})
