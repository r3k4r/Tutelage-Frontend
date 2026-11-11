/**
 * Builds the multipart body the content endpoints expect from an admin form's values:
 * the listed text fields (arrays comma-joined), `pdf` -> pdfFile, each `taskPdfs` file,
 * and `deletedTaskPdfIds` as JSON. A FormData value (AudioForm) is passed through.
 */
export function toResourceFormData(values, fields) {
  if (values instanceof FormData) return values
  const fd = new FormData()
  for (const field of fields) {
    const value = values[field]
    fd.append(field, Array.isArray(value) ? value.join(',') : value ?? '')
  }
  if (values.pdf instanceof File) fd.append('pdfFile', values.pdf)
  for (const file of values.taskPdfs ?? []) {
    if (file instanceof File) fd.append('taskPdfs', file)
  }
  if (values.deletedTaskPdfIds?.length) fd.append('deletedTaskPdfIds', JSON.stringify(values.deletedTaskPdfIds))
  return fd
}
