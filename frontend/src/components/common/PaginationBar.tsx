import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const PAGE_SIZES = [5, 10, 20, 50]

interface PaginationBarProps {
  page: number
  totalPages: number
  totalItems: number
  pageSize: number
  loading: boolean
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export function PaginationBar({ page, totalPages, totalItems, pageSize, loading, onPageChange, onPageSizeChange }: PaginationBarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-border"
      style={{ background: 'rgba(8, 8, 15, 0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between gap-4" style={{ height: '52px' }}>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="hidden sm:inline">Por página:</span>
          <Select value={String(pageSize)} onValueChange={(v) => onPageSizeChange(Number(v))}>
            <SelectTrigger className="h-8 w-16 text-sm border-border bg-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZES.map((n) => (
                <SelectItem key={n} value={String(n)} className="text-sm">{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span><strong className="text-foreground">{totalItems}</strong> itens</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{page} / {totalPages}</span>
          <div className="flex gap-1.5">
            <Button variant="outline" size="sm" className="h-8 px-3 text-sm border-border" onClick={() => onPageChange(page - 1)} disabled={page === 1 || loading}>
              ← Anterior
            </Button>
            <Button variant="outline" size="sm" className="h-8 px-3 text-sm border-border" onClick={() => onPageChange(page + 1)} disabled={page === totalPages || loading || totalPages === 0}>
              Próximo →
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
