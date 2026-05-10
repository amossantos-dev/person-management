import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { createPerson, getPersonById, updatePerson } from '@/api/persons'
import { PageHeader } from '@/components/common/PageHeader'
import { PersonForm } from '@/components/persons/PersonForm'
import { Skeleton } from '@/components/ui/skeleton'
import { toInputDate } from '@/utils/date'
import { personSchema, type PersonFormValues } from '@/utils/schemas'

const defaultValues: PersonFormValues = {
  name: '',
  dateOfBirth: '',
  address: { street: '', number: '', complement: '', neighborhood: '', city: '', state: '', country: '' },
}

export function PersonFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const methods = useForm<PersonFormValues>({
    resolver: zodResolver(personSchema),
    defaultValues,
  })

  const { reset, formState: { isSubmitting } } = methods

  useEffect(() => {
    if (!isEdit || !id) return
    getPersonById(id)
      .then((res) => {
        const p = res.data!
        reset({
          name: p.name,
          dateOfBirth: toInputDate(p.dateOfBirth),
          address: { ...p.address, complement: p.address.complement ?? '', neighborhood: p.address.neighborhood ?? '' },
        })
      })
      .catch((err: unknown) => toast.error(err instanceof Error ? err.message : 'Erro ao carregar dados.'))
  }, [id, isEdit, reset])

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
          <Skeleton className="h-7" />
          <Skeleton className="h-7" />
          <Skeleton className="h-7" />
          <Skeleton className="h-7" />
        </div>
      </div>
    )
  }

  async function onSubmit(values: PersonFormValues) {
    try {
      const payload = { ...values, address: { ...values.address, complement: values.address.complement || undefined } }
      if (isEdit && id) {
        await updatePerson(id, payload)
        toast.success('Pessoa atualizada com sucesso.')
      } else {
        await createPerson(payload)
        toast.success('Pessoa criada com sucesso.')
      }
      navigate('/persons')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Erro ao salvar pessoa.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
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
      />
    </div>
  )
}
