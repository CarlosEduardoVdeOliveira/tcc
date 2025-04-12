import { z } from "zod";
const producerSchema = z.object({
  name: z.string().min(3).max(18),
  email: z.string().email().min(3),
  password: z.string().min(6).max(18),
  cpfCnpj: z.string().min(11).max(18),
  longitude: z.number(),
  latitude: z.number(),
  startDate: z
    .union([
      z
        .string()
        .refine((str) => !isNaN(Date.parse(str)), { message: "Data inválida" }),
      z.date(),
    ])
    .transform((value) => (value instanceof Date ? value : new Date(value))),
  status: z.enum(["Ativo", "Inativo"]),
});

export default producerSchema;
