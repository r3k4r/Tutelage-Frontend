'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { api } from '@/common/utils/api'
import { toResourceFormData } from '@/common/utils/formData'
import { RESOURCES } from '@/common/constants/resources'
import { RESOURCE_FORMS } from '@/common/constants/resource-forms'

/**
 * Create / update / delete for a RESOURCES entry, with toasts.
 * `save(values, id?)` creates when id is absent. Both resolve to the API body on success, `null` on failure.
 * Only the form's own fields are sent: a field the form does not show (a story's wordCount) is left untouched.
 */
export function useResourceMutations(resource, label) {
  const { item: path } = RESOURCES[resource]
  const fields = [...RESOURCE_FORMS[resource].fields.map((f) => f.name), 'level', 'tags']
  const [busy, setBusy] = useState(false)

  const run = async (request, fallbackMessage) => {
    setBusy(true)
    const res = await request
    setBusy(false)
    if (!res.ok) {
      toast.error(res.message)
      return null
    }
    toast.success(res.data?.message || fallbackMessage)
    return res.data ?? {}
  }

  const save = (values, id) =>
    run(
      api(id ? `${path}/${id}` : path, { method: id ? 'PUT' : 'POST', body: toResourceFormData(values, fields) }),
      `${label} saved`,
    )

  const remove = (id) => run(api(`${path}/${id}`, { method: 'DELETE' }), `${label} deleted`)

  return { save, remove, busy }
}
