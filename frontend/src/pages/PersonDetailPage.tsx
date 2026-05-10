import { useEffect, useState } from 'react'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { deletePerson, getPersonById } from '@/api/persons'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type { Person } from '@/types'
import { formatDate } from '@/utils/date'

function Prop({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-start gap-0 py-1.5 border-b border-border last:border-0">
      <span className="text-xs text-muted-foreground w-36 shrink-0 pt-px">{label}</span>
      <span className="text-sm text-foreground">{value || '—'}</span>
    </div>
  )
}

export function PersonDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [person, setPerson]       = useState<Person | null>(null)
  const [loading, setLoading]     = useState(true)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting]   = useState(false)

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

  if (loading) {
    return (
      <div className="flex flex-col gap-3 max-w-lg">
        <Skeleton className="h-6 w-32" />
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    )
  }

  if (!person) return null

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-5">
      <PageHeader
        title={person.name}
        breadcrumbs={[{ label: 'Pessoas', to: '/persons' }, { label: person.name }]}
      />

      <section>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Dados Pessoais</p>
        <div className="rounded border border-border px-3">
          <Prop label="Nome" value={person.name} />
          <Prop label="Data de Nascimento" value={formatDate(person.dateOfBirth)} />
        </div>
      </section>

      <section>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Endereço</p>
        <div className="rounded border border-border px-3">
          <Prop label="Rua" value={person.address.street} />
          <Prop label="Número" value={person.address.number} />
          <Prop label="Complemento" value={person.address.complement} />
          <Prop label="Bairro" value={person.address.neighborhood} />
          <Prop label="Cidade" value={person.address.city} />
          <Prop label="Estado" value={person.address.state} />
          <Prop label="País" value={person.address.country} />
        </div>
      </section>

      <div className="flex items-center justify-between pt-1">
        <Button variant="ghost" size="sm" onClick={() => navigate('/persons')} className="gap-1.5 h-7 text-xs px-3 text-muted-foreground">
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setConfirmOpen(true)} className="gap-1.5 h-7 text-xs px-3 text-destructive hover:text-destructive hover:bg-destructive/10">
            <Trash2 className="h-3.5 w-3.5" />
            Excluir
          </Button>
          <Button size="sm" onClick={() => navigate(`/persons/${person.id}/edit`)} className="gap-1.5 h-7 text-xs px-3">
            <Pencil className="h-3.5 w-3.5" />
            Editar
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Excluir pessoa"
        description={`Deseja excluir "${person.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
        loading={deleting}
      />
    </div>
  )
}
