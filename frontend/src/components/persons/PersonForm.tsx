import { Loader2 } from 'lucide-react'
import { FormProvider, type UseFormReturn } from 'react-hook-form'
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
}

export function PersonForm({ methods, loading, isEdit, onSubmit, onCancel }: PersonFormProps) {
  const { register, handleSubmit, formState: { errors } } = methods

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
        {/* Personal */}
        <section>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Dados Pessoais</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label className="text-sm">Nome</Label>
              <Input {...register('name')} placeholder="Nome completo" className="h-9 text-sm" />
              {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm">Data de Nascimento</Label>
              <Input {...register('dateOfBirth')} type="date" className="h-9 text-sm" />
              {errors.dateOfBirth && <span className="text-xs text-destructive">{errors.dateOfBirth.message}</span>}
            </div>
          </div>
        </section>

        <div className="h-px bg-border" />

        {/* Address */}
        <section>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Endereço</p>
          <AddressForm />
        </section>

        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" size="sm" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? 'Salvando...' : isEdit ? 'Salvar' : 'Criar'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
