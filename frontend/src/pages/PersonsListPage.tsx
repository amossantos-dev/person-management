import { Search, Trash2, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { PaginationBar } from '@/components/common/PaginationBar'
import { PersonTable } from '@/components/persons/PersonTable'
import { AnimatedCounter } from '@/components/animations/AnimatedCounter'
import { TopProgressBar } from '@/components/animations/TopProgressBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePersons } from '@/hooks/usePersons'

export function PersonsListPage() {
  const navigate = useNavigate()
  const {
    persons, loading, search, setSearch,
    page, setPage, pageSize, setPageSize,
    totalPages, totalItems,
    deleteTarget, setDeleteTarget, deleting, handleDelete,
    selected, toggleSelect, toggleSelectAll,
    bulkConfirmOpen, setBulkConfirmOpen, bulkDeleting, handleBulkDelete,
  } = usePersons()

  return (
    <div className="flex flex-col gap-5 pb-20">
      <TopProgressBar loading={loading} />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Início / Pessoas</p>
          <h1 className="text-2xl font-semibold text-foreground">
            <AnimatedCounter value={totalItems} suffix=" pessoas encontradas" />
          </h1>
        </div>
        <Button size="sm" onClick={() => navigate('/persons/new')} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Nova Pessoa
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9 h-9 text-sm bg-muted/40" placeholder="Buscar por nome, cidade ou estado..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {selected.size > 0 && (
          <Button variant="destructive" size="sm" className="gap-2 shrink-0" onClick={() => setBulkConfirmOpen(true)} disabled={bulkDeleting}>
            <Trash2 className="h-4 w-4" />
            {bulkDeleting ? 'Excluindo...' : `Excluir (${selected.size})`}
          </Button>
        )}
      </div>

      <div className="rounded-lg border border-border overflow-hidden glass-card" style={{ borderRadius: '12px' }}>
        <PersonTable persons={persons} loading={loading} selected={selected} onToggle={toggleSelect} onToggleAll={toggleSelectAll} onDeleteClick={setDeleteTarget} />
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Excluir pessoa"
        description={`Deseja excluir "${deleteTarget?.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
        holdToDelete
      />

      <ConfirmDialog
        open={bulkConfirmOpen}
        title="Excluir pessoas"
        description={`Deseja excluir ${selected.size} ${selected.size === 1 ? 'pessoa selecionada' : 'pessoas selecionadas'}? Esta ação não pode ser desfeita.`}
        onConfirm={handleBulkDelete}
        onCancel={() => setBulkConfirmOpen(false)}
        loading={bulkDeleting}
        holdToDelete
      />

      <PaginationBar
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        loading={loading}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  )
}
