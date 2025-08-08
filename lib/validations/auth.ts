import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  phone: z.string()
    .min(8, "Telefone deve ter pelo menos 8 dígitos")
    .max(15, "Telefone deve ter no máximo 15 dígitos")
    .regex(/^\d+$/, "Digite apenas números")
    .optional()
    .or(z.literal("")),
})

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
