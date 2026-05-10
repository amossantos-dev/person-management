import { z } from 'zod'

const addressSchema = z.object({
  zipCode: z.string().optional(),
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(1, 'Estado é obrigatório'),
  country: z.string().min(1, 'País é obrigatório'),
}).superRefine((val, ctx) => {
  if (val.country === 'BR') {
    const digits = (val.zipCode ?? '').replace(/\D/g, '')
    if (!digits) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'CEP é obrigatório.', path: ['zipCode'] })
    } else if (digits.length !== 8) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'CEP inválido. Use o formato 00000-000.', path: ['zipCode'] })
    }
  }
})

export const personSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  dateOfBirth: z.string().min(1, 'Data de nascimento é obrigatória'),
  address: addressSchema,
})

export type PersonFormValues = z.infer<typeof personSchema>
