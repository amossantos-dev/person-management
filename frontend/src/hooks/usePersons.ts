import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { deleteManyPersons, deletePerson, getPersons } from '@/api/persons'
import type { Person } from '@/types'
import { useDebounce } from './useDebounce'

export function usePersons() {
  const [persons, setPersons]       = useState<Person[]>([])
  const [search, setSearch]         = useState('')
  const [page, setPage]             = useState(1)
  const [pageSize, setPageSize]     = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading]       = useState(false)

  // single delete
  const [deleteTarget, setDeleteTarget] = useState<Person | null>(null)
  const [deleting, setDeleting]         = useState(false)

  // bulk selection
  const [selected, setSelected]   = useState<Set<string>>(new Set())
  const [bulkConfirmOpen, setBulkConfirmOpen] = useState(false)
  const [bulkDeleting, setBulkDeleting] = useState(false)

  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => { setPage(1); setSelected(new Set()) }, [debouncedSearch, pageSize])
  useEffect(() => { setSelected(new Set()) }, [page])

  const fetch = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getPersons(page, pageSize, debouncedSearch || undefined)
      setPersons(res.data!.items)
      setTotalPages(res.data!.totalPages)
      setTotalItems(res.data!.totalItems)
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Erro ao carregar pessoas.')
    } finally {
      setLoading(false)
    }
  }, [page, pageSize, debouncedSearch])

  useEffect(() => { fetch() }, [fetch])

  // ── single delete ──────────────────────────────────────
  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deletePerson(deleteTarget.id)
      toast.success(`"${deleteTarget.name}" excluído com sucesso.`)
      setDeleteTarget(null)
      setSelected((s) => { const n = new Set(s); n.delete(deleteTarget.id); return n })
      fetch()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Erro ao excluir pessoa.')
    } finally {
      setDeleting(false)
    }
  }

  // ── bulk selection ─────────────────────────────────────
  function toggleSelect(id: string) {
    setSelected((s) => {
      const n = new Set(s)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
  }

  function toggleSelectAll() {
    const allIds = persons.map((p) => p.id)
    const allSelected = allIds.every((id) => selected.has(id))
    setSelected(allSelected ? new Set() : new Set(allIds))
  }

  // ── bulk delete ────────────────────────────────────────
  async function handleBulkDelete() {
    if (selected.size === 0) return
    setBulkDeleting(true)
    setBulkConfirmOpen(false)
    const ids = Array.from(selected)
    try {
      await deleteManyPersons(ids)
      toast.success(`${ids.length} ${ids.length === 1 ? 'pessoa excluída' : 'pessoas excluídas'} com sucesso.`)
      setSelected(new Set())
      fetch()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Erro ao excluir pessoas.')
    } finally {
      setBulkDeleting(false)
    }
  }

  return {
    persons, loading,
    search, setSearch,
    page, setPage, pageSize, setPageSize,
    totalPages, totalItems,
    deleteTarget, setDeleteTarget,
    deleting, handleDelete,
    selected, toggleSelect, toggleSelectAll,
    bulkConfirmOpen, setBulkConfirmOpen,
    bulkDeleting, handleBulkDelete,
  }
}
