import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/utils/date'
import { usePersonDetail } from '@/hooks/usePersonDetail'

function Prop({ label, value, index }: { label: string; value?: string; index: number }) {
  return (
    <motion.div
      className="flex items-start gap-0 py-1.5 border-b border-border last:border-0"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <span className="text-xs text-muted-foreground w-36 shrink-0 pt-px">{label}</span>
      <span className="text-sm text-foreground">{value || '—'}</span>
    </motion.div>
  )
}

const sectionVariants = {
  hidden: { opacity: 0, rotateY: -15 },
  visible: { opacity: 1, rotateY: 0 },
}

export function PersonDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { person, loading, confirmOpen, setConfirmOpen, deleting, handleDelete } = usePersonDetail(id)

  if (loading) {
    return (
      <div className="flex flex-col gap-3 max-w-lg">
        <Skeleton className="h-6 w-32" />
        {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
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

      <motion.section variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, ease: 'easeOut' }} style={{ transformPerspective: 1000 }}>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Dados Pessoais</p>
        <div className="rounded border border-border px-3 glass-card" style={{ borderRadius: '12px' }}>
          <Prop label="Nome" value={person.name} index={0} />
          <Prop label="Data de Nascimento" value={formatDate(person.dateOfBirth)} index={1} />
        </div>
      </motion.section>

      <motion.section variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }} style={{ transformPerspective: 1000 }}>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Endereço</p>
        <div className="rounded border border-border px-3 glass-card" style={{ borderRadius: '12px' }}>
          {person.address.zipCode && <Prop label="CEP" value={person.address.zipCode} index={0} />}
          <Prop label="Rua" value={person.address.street} index={1} />
          <Prop label="Número" value={person.address.number} index={2} />
          <Prop label="Complemento" value={person.address.complement} index={3} />
          <Prop label="Bairro" value={person.address.neighborhood} index={4} />
          <Prop label="Cidade" value={person.address.city} index={5} />
          <Prop label="Estado" value={person.address.state} index={6} />
          <Prop label="País" value={person.address.country} index={7} />
        </div>
      </motion.section>

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
        holdToDelete
      />
    </div>
  )
}
