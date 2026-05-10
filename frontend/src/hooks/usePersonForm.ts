import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { createPerson, getPersonById, updatePerson } from '@/api/persons'
import { toInputDate } from '@/utils/date'
import { personSchema, type PersonFormValues } from '@/utils/schemas'

const defaultValues: PersonFormValues = {
  name: '',
  dateOfBirth: '',
  address: { zipCode: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '', country: '' },
}

export function usePersonForm(id?: string) {
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [showSuccess, setShowSuccess] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const methods = useForm<PersonFormValues>({ resolver: zodResolver(personSchema), defaultValues })
  const { reset, formState: { isSubmitting } } = methods

  useEffect(() => {
    if (!isEdit || !id) return
    getPersonById(id)
      .then((res) => {
        const p = res.data!
        reset({
          name: p.name,
          dateOfBirth: toInputDate(p.dateOfBirth),
          address: {
            ...p.address,
            zipCode: p.address.zipCode ?? '',
            complement: p.address.complement ?? '',
            neighborhood: p.address.neighborhood ?? '',
          },
        })
      })
      .catch((err: unknown) => toast.error(err instanceof Error ? err.message : 'Erro ao carregar dados.'))
  }, [id, isEdit, reset])

  async function onSubmit(values: PersonFormValues) {
    try {
      const payload = {
        ...values,
        address: {
          ...values.address,
          zipCode: values.address.zipCode || undefined,
          complement: values.address.complement || undefined,
        },
      }
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

  return { methods, isEdit, showSuccess, submitSuccess, isSubmitting, onSubmit }
}
