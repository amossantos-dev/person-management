import { useEffect, useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Combobox } from '@/components/common/Combobox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { fetchCities, fetchStates, getAllCountries } from '@/utils/ibge'
import type { PersonFormValues } from '@/utils/schemas'

const countries = getAllCountries()

export function AddressForm() {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext<PersonFormValues>()

  const country  = watch('address.country')
  const state    = watch('address.state')
  const isBrazil = country === 'BR'

  const [states, setStates]           = useState<{ value: string; label: string }[]>([])
  const [cities, setCities]           = useState<{ value: string; label: string }[]>([])
  const [loadingStates, setLoadingStates] = useState(false)
  const [loadingCities, setLoadingCities] = useState(false)

  useEffect(() => {
    if (!isBrazil) { setStates([]); setCities([]); return }
    setLoadingStates(true)
    fetchStates()
      .then((data) => setStates(data.map((s) => ({ value: s.sigla, label: s.nome }))))
      .finally(() => setLoadingStates(false))
  }, [isBrazil])

  useEffect(() => {
    if (!isBrazil || !state) { setCities([]); return }
    setLoadingCities(true)
    fetchCities(state)
      .then((data) => setCities(data.map((c) => ({ value: c, label: c }))))
      .finally(() => setLoadingCities(false))
  }, [isBrazil, state])

  function handleCountryChange(value: string) {
    setValue('address.country', value, { shouldValidate: false })
    setValue('address.state',   '',    { shouldValidate: false })
    setValue('address.city',    '',    { shouldValidate: false })
  }

  function handleStateChange(value: string) {
    setValue('address.state', value, { shouldValidate: false })
    setValue('address.city',  '',   { shouldValidate: false })
  }

  const ae = errors.address

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 flex flex-col gap-1.5">
        <Label className="text-sm">Rua</Label>
        <Input {...register('address.street')} placeholder="Nome da rua" className="h-9 text-sm" />
        {ae?.street && <span className="text-xs text-destructive">{ae.street.message}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-sm">Número</Label>
        <Input {...register('address.number')} placeholder="123" className="h-9 text-sm" />
        {ae?.number && <span className="text-xs text-destructive">{ae.number.message}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-sm">Complemento <span className="text-muted-foreground text-xs">(opcional)</span></Label>
        <Input {...register('address.complement')} placeholder="Apto, bloco..." className="h-9 text-sm" />
      </div>

      <div className="col-span-2 flex flex-col gap-1.5">
        <Label className="text-sm">Bairro</Label>
        <Input {...register('address.neighborhood')} placeholder="Nome do bairro" className="h-9 text-sm" />
        {ae?.neighborhood && <span className="text-xs text-destructive">{ae.neighborhood.message}</span>}
      </div>

      <div className="col-span-2 flex flex-col gap-1.5">
        <Label className="text-sm">País</Label>
        <Controller
          name="address.country"
          control={control}
          render={({ field }) => (
            <Combobox
              options={countries}
              value={field.value}
              onChange={handleCountryChange}
              placeholder="Selecione um país"
              searchPlaceholder="Buscar país..."
              emptyText="País não encontrado."
            />
          )}
        />
        {ae?.country && <span className="text-xs text-destructive">{ae.country.message}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-sm">Estado</Label>
        {isBrazil ? (
          <Controller
            name="address.state"
            control={control}
            render={({ field }) => (
              <Combobox
                options={states}
                value={field.value}
                onChange={handleStateChange}
                placeholder={loadingStates ? 'Carregando...' : 'Selecione'}
                searchPlaceholder="Buscar estado..."
                emptyText="Estado não encontrado."
                disabled={!country || loadingStates}
              />
            )}
          />
        ) : (
          <Input {...register('address.state')} placeholder="Estado" className="h-9 text-sm" disabled={!country} />
        )}
        {ae?.state && <span className="text-xs text-destructive">{ae.state.message}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-sm">Cidade</Label>
        {isBrazil ? (
          <Controller
            name="address.city"
            control={control}
            render={({ field }) => (
              <Combobox
                options={cities}
                value={field.value}
                onChange={(v) => setValue('address.city', v, { shouldValidate: false })}
                placeholder={loadingCities ? 'Carregando...' : 'Selecione'}
                searchPlaceholder="Buscar cidade..."
                emptyText="Cidade não encontrada."
                disabled={!state || loadingCities}
              />
            )}
          />
        ) : (
          <Input {...register('address.city')} placeholder="Cidade" className="h-9 text-sm" disabled={!country} />
        )}
        {ae?.city && <span className="text-xs text-destructive">{ae.city.message}</span>}
      </div>
    </div>
  )
}
