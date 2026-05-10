import { Search, Trash2, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { PersonTable } from '@/components/persons/PersonTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePersons } from '@/hooks/usePersons'

export function PersonsListPage() {
  const navigate = useNavigate()
  const {
    persons, loading, search, setSearch,
    page, setPage, pageSize, setPageSize,
    totalPages, totalItems,
    deleteTarget, setDeleteTarget, deleting, handleDelete,
    selected, toggleSelect, toggleSelectAll,
    bulkConfirmOpen, setBulkConfirmOpen,
    bulkDeleting, handleBulkDelete,
  } = usePersons()

  return (
    <div className="flex flex-col gap-5 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Início / Pessoas</p>
          <h1 className="text-2xl font-semibold text-foreground">Pessoas</h1>
        </div>
        <Button size="sm" onClick={() => navigate('/persons/new')} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Nova Pessoa
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9 h-9 text-sm bg-muted/40"
            placeholder="Buscar por nome, cidade ou estado..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {selected.size > 0 && (
          <Button
            variant="destructive"
            size="sm"
            className="gap-2 shrink-0"
            onClick={() => setBulkConfirmOpen(true)}
            disabled={bulkDeleting}
          >
            <Trash2 className="h-4 w-4" />
            {bulkDeleting ? 'Excluindo...' : `Excluir (${selected.size})`}
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <PersonTable
          persons={persons}
          loading={loading}
          selected={selected}
          onToggle={toggleSelect}
          onToggleAll={toggleSelectAll}
          onDeleteClick={setDeleteTarget}
        />
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Excluir pessoa"
        description={`Deseja excluir "${deleteTarget?.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />

      <ConfirmDialog
        open={bulkConfirmOpen}
        title="Excluir pessoas"
        description={`Deseja excluir ${selected.size} ${selected.size === 1 ? 'pessoa selecionada' : 'pessoas selecionadas'}? Esta ação não pode ser desfeita.`}
        onConfirm={handleBulkDelete}
        onCancel={() => setBulkConfirmOpen(false)}
        loading={bulkDeleting}
      />

      {/* Pagination */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 h-13 flex items-center justify-between gap-4" style={{ height: '52px' }}>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="hidden sm:inline">Por página:</span>
            <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
              <SelectTrigger className="h-8 w-16 text-sm border-border bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((n) => (
                  <SelectItem key={n} value={String(n)} className="text-sm">{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>
              <strong className="text-foreground">{totalItems}</strong> itens
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{page} / {totalPages}</span>
            <div className="flex gap-1.5">
              <Button variant="outline" size="sm" className="h-8 px-3 text-sm border-border" onClick={() => setPage(page - 1)} disabled={page === 1 || loading}>
                ← Anterior
              </Button>
              <Button variant="outline" size="sm" className="h-8 px-3 text-sm border-border" onClick={() => setPage(page + 1)} disabled={page === totalPages || loading || totalPages === 0}>
                Próximo →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
