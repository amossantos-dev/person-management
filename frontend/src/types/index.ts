export interface PersonAddress {
  zipCode?: string
  street: string
  number: string
  complement?: string
  neighborhood?: string
  city: string
  state: string
  country: string
}

export interface Person {
  id: string
  name: string
  dateOfBirth: string
  address: PersonAddress
}

export interface CreatePersonRequest {
  name: string
  dateOfBirth: string
  address: PersonAddress
}

export interface UpdatePersonRequest {
  name: string
  dateOfBirth: string
  address: PersonAddress
}

export interface PagedResult<T> {
  items: T[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}
