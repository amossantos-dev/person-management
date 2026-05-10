import { useFormContext, Controller } from 'react-hook-form'
import { Combobox } from '@/components/common/Combobox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { COUNTRIES } from '@/utils/ibge'
import { useAddressForm } from '@/hooks/useAddressForm'
import type { PersonFormValues } from '@/utils/schemas'

export function AddressForm() {
  const { register, control, formState: { errors } } = useFormContext<PersonFormValues>()
  const {
    isBrazil, state,
    states, cities,
    loadingStates, loadingCities, loadingCep,
    handleCepChange, handleCountryChange, handleStateChange, handleCityChange,
  } = useAddressForm()

  const ae = errors.address as Record<string, { message?: string }> | undefined

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 flex flex-col gap-1.5">
        <Label className="text-sm">
          CEP
          {isBrazil ? <span className="text-destructive ml-0.5">*</span> : <span className="text-muted-foreground text-xs ml-1">(opcional)</span>}
          {loadingCep && <span className="text-muted-foreground text-xs ml-2">Buscando...</span>}
        </Label>
        <Input
          {...register('address.zipCode')}
          placeholder="00000-000"
          className="h-9 text-sm"
          maxLength={9}
          onChange={(e) => handleCepChange(e.target.value)}
        />
        {ae?.zipCode && <span className="text-xs text-destructive">{ae.zipCode.message}</span>}
      </div>

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
            <Combobox options={COUNTRIES} value={field.value} onChange={handleCountryChange} placeholder="Selecione um país" searchPlaceholder="Buscar país..." emptyText="País não encontrado." />
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
              <Combobox options={states} value={field.value} onChange={handleStateChange} placeholder={loadingStates ? 'Carregando...' : 'Selecione'} searchPlaceholder="Buscar estado..." emptyText="Estado não encontrado." disabled={loadingStates} />
            )}
          />
        ) : (
          <Input {...register('address.state')} placeholder="Estado" className="h-9 text-sm" />
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
              <Combobox options={cities} value={field.value} onChange={handleCityChange} placeholder={loadingCities ? 'Carregando...' : 'Selecione'} searchPlaceholder="Buscar cidade..." emptyText="Cidade não encontrada." disabled={!state || loadingCities} />
            )}
          />
        ) : (
          <Input {...register('address.city')} placeholder="Cidade" className="h-9 text-sm" />
        )}
        {ae?.city && <span className="text-xs text-destructive">{ae.city.message}</span>}
      </div>
    </div>
  )
}
