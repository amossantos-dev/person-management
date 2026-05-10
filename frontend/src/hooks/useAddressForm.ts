import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { fetchCities, fetchStates } from '@/utils/ibge'
import { fetchAddressByCep, formatCep } from '@/utils/cep'
import type { PersonFormValues } from '@/utils/schemas'

type Option = { value: string; label: string }

export function useAddressForm() {
  const { watch, setValue } = useFormContext<PersonFormValues>()

  const country = watch('address.country')
  const state = watch('address.state')
  const isBrazil = country === 'BR'

  const [states, setStates] = useState<Option[]>([])
  const [cities, setCities] = useState<Option[]>([])
  const [loadingStates, setLoadingStates] = useState(false)
  const [loadingCities, setLoadingCities] = useState(false)
  const [loadingCep, setLoadingCep] = useState(false)
  const lastFetchedCep = useRef('')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!isBrazil) { setStates([]); setCities([]); return }
    setLoadingStates(true)
    fetchStates()
      .then((data) => setStates(data.map((s) => ({ value: s.sigla, label: s.nome }))))
      .finally(() => setLoadingStates(false))
  }, [isBrazil])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!isBrazil || !state) { setCities([]); return }
    setLoadingCities(true)
    fetchCities(state)
      .then((data) => setCities(data.map((c) => ({ value: c, label: c }))))
      .finally(() => setLoadingCities(false))
  }, [isBrazil, state])

  async function handleCepChange(raw: string) {
    const formatted = formatCep(raw)
    setValue('address.zipCode', formatted, { shouldValidate: false })

    const digits = formatted.replace(/\D/g, '')
    if (digits.length !== 8 || digits === lastFetchedCep.current) return
    lastFetchedCep.current = digits

    setLoadingCep(true)
    try {
      const data = await fetchAddressByCep(digits)
      if (!data) return
      setValue('address.street', data.logradouro, { shouldValidate: false })
      setValue('address.neighborhood', data.bairro, { shouldValidate: false })
      setValue('address.state', data.uf, { shouldValidate: false })
      setValue('address.city', data.localidade, { shouldValidate: false })
      setValue('address.country', 'BR', { shouldValidate: false })
    } finally {
      setLoadingCep(false)
    }
  }

  function handleCountryChange(value: string) {
    setValue('address.country', value, { shouldValidate: false })
    setValue('address.state', '', { shouldValidate: false })
    setValue('address.city', '', { shouldValidate: false })
    if (value !== 'BR') {
      setValue('address.zipCode', '', { shouldValidate: false })
      lastFetchedCep.current = ''
    }
  }

  function handleStateChange(value: string) {
    setValue('address.state', value, { shouldValidate: false })
    setValue('address.city', '', { shouldValidate: false })
  }

  function handleCityChange(value: string) {
    setValue('address.city', value, { shouldValidate: false })
  }

  return {
    country, state, isBrazil,
    states, cities,
    loadingStates, loadingCities, loadingCep,
    handleCepChange, handleCountryChange, handleStateChange, handleCityChange,
  }
}
