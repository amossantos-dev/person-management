import api from './axios'
import type { ApiResponse, CreatePersonRequest, LoginRequest, LoginResponse, PagedResult, Person, UpdatePersonRequest } from '@/types'

function extractError(data: ApiResponse<unknown>): string {
  if (data.errors?.length) return data.errors[0]
  return data.message ?? 'Erro inesperado.'
}

export async function login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
  const res = await api.post<ApiResponse<LoginResponse>>('/api/auth/login', data)
  if (!res.data.success) throw new Error(extractError(res.data))
  return res.data
}

export async function getPersons(page: number, pageSize: number, search?: string): Promise<ApiResponse<PagedResult<Person>>> {
  const res = await api.get<ApiResponse<PagedResult<Person>>>('/api/persons/find', { params: { page, pageSize, search } })
  if (!res.data.success) throw new Error(extractError(res.data))
  return res.data
}

export async function getPersonById(id: string): Promise<ApiResponse<Person>> {
  const res = await api.get<ApiResponse<Person>>(`/api/persons/${id}`)
  if (!res.data.success) throw new Error(extractError(res.data))
  return res.data
}

export async function createPerson(data: CreatePersonRequest): Promise<ApiResponse<Person>> {
  const res = await api.post<ApiResponse<Person>>('/api/persons', data)
  if (!res.data.success) throw new Error(extractError(res.data))
  return res.data
}

export async function updatePerson(id: string, data: UpdatePersonRequest): Promise<ApiResponse<Person>> {
  const res = await api.put<ApiResponse<Person>>(`/api/persons/${id}`, data)
  if (!res.data.success) throw new Error(extractError(res.data))
  return res.data
}

export async function deletePerson(id: string): Promise<ApiResponse<boolean>> {
  const res = await api.delete<ApiResponse<boolean>>(`/api/persons/${id}`)
  if (!res.data.success) throw new Error(extractError(res.data))
  return res.data
}

export async function deleteManyPersons(ids: string[]): Promise<ApiResponse<boolean>> {
  const res = await api.delete<ApiResponse<boolean>>('/api/persons', { data: { ids } })
  if (!res.data.success) throw new Error(extractError(res.data))
  return res.data
}
