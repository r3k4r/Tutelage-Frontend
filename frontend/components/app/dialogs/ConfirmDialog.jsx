'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

/**
 * Confirm for a destructive or async action. The confirm button stays a plain Button (not a
 * DialogClose) so the dialog closes only when the caller's request succeeds; `busy` blocks double-fires.
 */
export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  children,
  confirmLabel = 'Delete',
  variant = 'destructive',
  busy = false,
  onConfirm,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription asChild>
            <div className="text-sm">{children}</div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>
            Cancel
          </Button>
          <Button variant={variant} onClick={onConfirm} disabled={busy}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
