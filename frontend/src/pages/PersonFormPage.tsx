import { AnimatePresence } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '@/components/common/PageHeader'
import { PersonForm } from '@/components/persons/PersonForm'
import { SuccessOverlay } from '@/components/persons/SuccessOverlay'
import { Skeleton } from '@/components/ui/skeleton'
import { usePersonForm } from '@/hooks/usePersonForm'

export function PersonFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { methods, isEdit, showSuccess, submitSuccess, isSubmitting, onSubmit } = usePersonForm(id)

  if (isEdit && !methods.formState.isDirty && !methods.getValues('name')) {
    return (
      <div className="flex flex-col gap-3 max-w-2xl mx-auto">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-20 mt-2" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-1/2" />
        <Skeleton className="h-4 w-20 mt-4" />
        <Skeleton className="h-7 w-full" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-7" />)}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence>
        {showSuccess && <SuccessOverlay />}
      </AnimatePresence>
      <PageHeader
        title={isEdit ? 'Editar Pessoa' : 'Nova Pessoa'}
        breadcrumbs={[{ label: 'Pessoas', to: '/persons' }, { label: isEdit ? 'Editar' : 'Nova' }]}
      />
      <PersonForm
        methods={methods}
        loading={isSubmitting}
        isEdit={isEdit}
        onSubmit={onSubmit}
        onCancel={() => navigate('/persons')}
        submitSuccess={submitSuccess}
      />
    </div>
  )
}
