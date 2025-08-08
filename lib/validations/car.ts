import { z } from "zod"

export const carSchema = z.object({
  brand: z.string().min(1, "Marca é obrigatória"),
  model: z.string().min(1, "Modelo é obrigatório"),
  year: z
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  price: z.number().positive("Preço deve ser positivo"),
  transmission: z.enum(["AUTOMATIC", "MANUAL"]),
  fuelType: z.enum(["GASOLINE", "DIESEL", "HYBRID", "ELECTRIC", "FLEX"]),
  condition: z.enum(["NEW", "USED", "SEMI_NEW"]),
  mileage: z.number().optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  images: z.array(z.string()).min(1, "Pelo menos uma imagem é obrigatória").max(5, "Máximo 5 imagens"),
})

export type CarInput = z.infer<typeof carSchema>
