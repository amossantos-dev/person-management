import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { deletePerson, getPersonById } from '@/api/persons'
import type { Person } from '@/types'

export function usePersonDetail(id?: string) {
  const navigate = useNavigate()
  const [person, setPerson] = useState<Person | null>(null)
  const [loading, setLoading] = useState(true)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!id) return
    getPersonById(id)
      .then((res) => setPerson(res.data!))
      .catch((err: unknown) => toast.error(err instanceof Error ? err.message : 'Pessoa não encontrada.'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleDelete() {
    if (!id) return
    setDeleting(true)
    try {
      await deletePerson(id)
      toast.success('Pessoa excluída com sucesso.')
      navigate('/persons')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Erro ao excluir.')
    } finally {
      setDeleting(false)
    }
  }

  return { person, loading, confirmOpen, setConfirmOpen, deleting, handleDelete }
}
