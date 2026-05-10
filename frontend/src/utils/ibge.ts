import * as iso from 'i18n-iso-countries'
import ptLocale from 'i18n-iso-countries/langs/pt.json'

iso.registerLocale(ptLocale)

export interface IbgeState {
  id: number
  sigla: string
  nome: string
}

export interface IbgeCity {
  nome: string
}

let statesCache: IbgeState[] | null = null
const citiesCache: Record<string, string[]> = {}

export async function fetchStates(): Promise<IbgeState[]> {
  if (statesCache) return statesCache
  const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
  statesCache = await res.json()
  return statesCache!
}

export async function fetchCities(uf: string): Promise<string[]> {
  if (citiesCache[uf]) return citiesCache[uf]
  const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`)
  const data: IbgeCity[] = await res.json()
  citiesCache[uf] = data.map((c) => c.nome)
  return citiesCache[uf]
}

export function getAllCountries() {
  const names = iso.getNames('pt')
  return Object.entries(names)
    .map(([code, name]) => ({ value: code, label: name }))
    .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'))
}
