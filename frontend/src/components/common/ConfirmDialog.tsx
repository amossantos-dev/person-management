import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const HOLD_DURATION = 1500

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
  holdToDelete?: boolean
}

function HoldButton({ onConfirm, loading }: { onConfirm: () => void; loading?: boolean }) {
  const [progress, setProgress] = useState(0)
  const [holding, setHolding] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const clearHold = useCallback(() => {
    setHolding(false)
    setProgress(0)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    startTimeRef.current = null
  }, [])

  const startHold = useCallback(() => {
    setHolding(true)
    startTimeRef.current = Date.now()
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - (startTimeRef.current ?? Date.now())
      const pct = Math.min((elapsed / HOLD_DURATION) * 100, 100)
      setProgress(pct)
      if (pct >= 100) {
        clearInterval(intervalRef.current!)
        intervalRef.current = null
        onConfirm()
      }
    }, 16)
  }, [onConfirm])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const bgColor = holding
    ? `rgba(${Math.round(124 + (220 - 124) * (progress / 100))}, ${Math.round(58 - 58 * (progress / 100))}, ${Math.round(237 - 237 * (progress / 100))}, 0.9)`
    : 'rgba(220, 38, 38, 0.9)'

  return (
    <div
      className="relative overflow-hidden rounded-md select-none"
      style={{ minWidth: 160 }}
      onMouseDown={startHold}
      onMouseUp={clearHold}
      onMouseLeave={clearHold}
      onTouchStart={startHold}
      onTouchEnd={clearHold}
    >
      <motion.div
        className="absolute inset-0 left-0"
        style={{ background: bgColor, opacity: 0.9 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.016, ease: 'linear' }}
      />
      <button
        disabled={loading}
        className="relative z-10 w-full h-9 px-4 text-sm font-medium text-white rounded-md cursor-pointer"
        style={{ background: loading ? 'rgba(220,38,38,0.4)' : 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.4)' }}
      >
        {loading ? 'Excluindo...' : holding ? 'Solte para cancelar' : 'Segure para confirmar'}
      </button>
    </div>
  )
}

export function ConfirmDialog({ open, title, description, onConfirm, onCancel, loading, holdToDelete }: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
          {holdToDelete ? (
            <HoldButton onConfirm={onConfirm} loading={loading} />
          ) : (
            <Button variant="destructive" onClick={onConfirm} disabled={loading}>
              {loading ? 'Excluindo...' : 'Confirmar'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
