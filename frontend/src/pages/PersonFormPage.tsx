import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
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

function SuccessOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full"
        style={{ width: 96, height: 96, background: 'rgba(34, 197, 94, 0.2)', border: '2px solid rgba(34, 197, 94, 0.6)' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4, type: 'spring', stiffness: 200 }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <motion.path
            d="M12 24 L21 33 L36 16"
            stroke="rgb(34, 197, 94)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export function PersonFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [showSuccess, setShowSuccess] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

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
      setSubmitSuccess(true)
      setShowSuccess(true)
      await new Promise((r) => setTimeout(r, 800))
      navigate('/persons')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Erro ao salvar pessoa.')
    }
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
