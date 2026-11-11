'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { api } from '@/common/utils/api'
import { toResourceFormData } from '@/common/utils/formData'
import { RESOURCES } from '@/common/constants/resources'

/**
 * Create / update / delete for a RESOURCES entry, with toasts.
 * `save(values, id?)` creates when id is absent. Both resolve to true on success.
 */
export function useResourceMutations(resource, label) {
  const { item: path, fields } = RESOURCES[resource]
  const [busy, setBusy] = useState(false)

  const run = async (request, fallbackMessage) => {
    setBusy(true)
    const res = await request
    setBusy(false)
    if (!res.ok) {
      toast.error(res.message)
      return false
    }
    toast.success(res.message || fallbackMessage)
    return true
  }

  const save = (values, id) =>
    run(
      api(id ? `${path}/${id}` : path, { method: id ? 'PUT' : 'POST', body: toResourceFormData(values, fields) }),
      `${label} saved`,
    )

  const remove = (id) => run(api(`${path}/${id}`, { method: 'DELETE' }), `${label} deleted`)

  return { save, remove, busy }
}
