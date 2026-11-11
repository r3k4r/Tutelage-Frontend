import { expect, test } from 'vitest'
import { toResourceFormData } from '@/common/utils/formData'

const entries = (fd) => [...fd.entries()].map(([k, v]) => [k, v instanceof File ? `file:${v.name}` : v])

test('serializes listed fields, joining arrays and blanking missing values', () => {
  const fd = toResourceFormData(
    { title: 'Hi', tags: ['grammar', 'a1'], level: ['A1', 'B1'], description: undefined, extra: 'ignored' },
    ['title', 'tags', 'level', 'description'],
  )
  expect(entries(fd)).toEqual([
    ['title', 'Hi'],
    ['tags', 'grammar,a1'],
    ['level', 'A1,B1'],
    ['description', ''],
  ])
})

test('maps the files and deleted task ids the backend expects', () => {
  const pdf = new File(['x'], 'prep.pdf')
  const t1 = new File(['y'], 't1.pdf')
  const fd = toResourceFormData(
    { title: 'T', pdf, taskPdfs: [t1, 'not-a-file'], deletedTaskPdfIds: [3, 4] },
    ['title'],
  )
  expect(entries(fd)).toEqual([
    ['title', 'T'],
    ['pdfFile', 'file:prep.pdf'],
    ['taskPdfs', 'file:t1.pdf'],
    ['deletedTaskPdfIds', '[3,4]'],
  ])
})

test('an existing PDF URL is not re-uploaded and empty deletions are omitted', () => {
  const fd = toResourceFormData({ title: 'T', pdf: 'https://cdn/x.pdf', deletedTaskPdfIds: [] }, ['title'])
  expect(entries(fd)).toEqual([['title', 'T']])
})

test('FormData from forms that build their own body passes through', () => {
  const own = new FormData()
  expect(toResourceFormData(own, ['title'])).toBe(own)
})
