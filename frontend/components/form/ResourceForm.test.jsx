import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResourceForm from '@/components/form/ResourceForm'
import { levelValueOf } from '@/common/constants/resource-forms'

// jsdom has no scrollIntoView; the form calls it to reveal the first error.
Element.prototype.scrollIntoView = vi.fn()

const renderForm = (props) => {
  const onSubmit = vi.fn()
  render(<ResourceForm resource="readings" onSubmit={onSubmit} onCancel={() => {}} {...props} />)
  return onSubmit
}

describe('ResourceForm', () => {
  test('required fields block submit and show inline errors', async () => {
    const onSubmit = renderForm()
    await userEvent.click(screen.getByRole('button', { name: 'Create' }))
    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByText('Title is required')).toBeInTheDocument()
    expect(screen.getByText('Reading content is required')).toBeInTheDocument()
    expect(screen.getByLabelText(/Title/)).toHaveAttribute('aria-invalid', 'true')
  })

  test('submits text fields, tags and empty file lists on create', async () => {
    const onSubmit = renderForm()
    await userEvent.type(screen.getByLabelText(/Title/), 'My reading')
    await userEvent.type(screen.getByLabelText(/Reading content/), 'Once upon a time')
    await userEvent.type(screen.getByLabelText('Tags'), 'grammar, a1{Enter}')
    await userEvent.click(screen.getByRole('button', { name: 'Create' }))
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'My reading',
        content: 'Once upon a time',
        tags: ['grammar', 'a1'],
        level: '',
        pdf: null,
        taskPdfs: [],
        deletedTaskPdfIds: [],
      }),
    )
  })

  test('edit prefills from the item and stages task PDF removal (undoable)', async () => {
    const item = {
      id: 7,
      title: 'Old',
      content: 'Body',
      level: ['B1 Intermediate'],
      tags: ['x'],
      taskPdfs: [{ id: 3, fileName: 'task.pdf', filePath: 'https://cdn/task.pdf' }],
    }
    const onSubmit = renderForm({ item })
    expect(screen.getByLabelText(/Title/)).toHaveValue('Old')
    expect(screen.getByText('task.pdf')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Remove' }))
    expect(screen.getByText('will be removed')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Undo remove' }))
    await userEvent.click(screen.getByRole('button', { name: 'Remove' }))

    await userEvent.click(screen.getByRole('button', { name: 'Save changes' }))
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ title: 'Old', level: 'b1', tags: ['x'], deletedTaskPdfIds: [3] }))
  })

  test('levelRequired forms demand a level', async () => {
    const onSubmit = renderForm({ resource: 'writings' })
    await userEvent.type(screen.getByLabelText(/Title/), 'T')
    await userEvent.click(screen.getByRole('button', { name: 'Create' }))
    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByText('Level is required')).toBeInTheDocument()
  })
})

test('levelValueOf maps stored labels and values to the API value', () => {
  expect(levelValueOf(['C1 Advanced'])).toBe('c1')
  expect(levelValueOf('a2')).toBe('a2')
  expect(levelValueOf(null)).toBe('')
})
