import { Check, Loader2 } from 'lucide-react'
import { FormProvider, type UseFormReturn } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { PersonFormValues } from '@/utils/schemas'
import { AddressForm } from './AddressForm'

interface PersonFormProps {
  methods: UseFormReturn<PersonFormValues>
  loading: boolean
  isEdit: boolean
  onSubmit: (values: PersonFormValues) => void
  onCancel: () => void
  submitSuccess?: boolean
}


export function PersonForm({ methods, loading, isEdit, onSubmit, onCancel, submitSuccess }: PersonFormProps) {
  const { register, handleSubmit, formState: { errors, dirtyFields } } = methods

  const nameValue = methods.watch('name')
  const dateValue = methods.watch('dateOfBirth')

  function getFieldBorder(fieldName: keyof PersonFormValues, value: string) {
    if (errors[fieldName]) return 'rgba(239,68,68,0.6)'
    if (value && dirtyFields[fieldName]) return 'rgba(124,58,237,0.4)'
    return 'rgba(255,255,255,0.1)'
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
        {/* Personal */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.4 }}
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Dados Pessoais</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label className="text-sm">Nome</Label>
              <Input
                {...register('name')}
                placeholder="Nome completo"
                className="h-9 text-sm"
                style={{
                  borderColor: getFieldBorder('name', nameValue),
                  transition: 'border-color 0.2s ease',
                }}
              />
              {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm">Data de Nascimento</Label>
              <Input
                {...register('dateOfBirth')}
                type="date"
                className="h-9 text-sm"
                style={{
                  borderColor: getFieldBorder('dateOfBirth', dateValue),
                  transition: 'border-color 0.2s ease',
                }}
              />
              {errors.dateOfBirth && <span className="text-xs text-destructive">{errors.dateOfBirth.message}</span>}
            </div>
          </div>
        </motion.section>

        <div className="h-px bg-border" />

        {/* Address */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Endereço</p>
          <AddressForm />
        </motion.section>

        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancelar
          </Button>

          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              size="sm"
              disabled={loading}
              style={submitSuccess ? {
                background: 'rgba(34, 197, 94, 0.9)',
                borderColor: 'rgba(34, 197, 94, 0.5)',
              } : undefined}
            >
              {submitSuccess ? (
                <>
                  <Check className="h-4 w-4" />
                  Salvo!
                </>
              ) : loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                    Salvando...
                  </motion.span>
                </>
              ) : (
                isEdit ? 'Salvar' : 'Criar'
              )}
            </Button>
          </motion.div>
        </div>
      </form>
    </FormProvider>
  )
}
