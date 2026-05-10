import { z } from 'zod'

const addressSchema = z.object({
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(1, 'Estado é obrigatório'),
  country: z.string().min(1, 'País é obrigatório'),
})

export const personSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  dateOfBirth: z.string().min(1, 'Data de nascimento é obrigatória'),
  address: addressSchema,
})

export type PersonFormValues = z.infer<typeof personSchema>
