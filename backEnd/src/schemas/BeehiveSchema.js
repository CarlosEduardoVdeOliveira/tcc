import { z } from "zod";

const beehiveSchema = z.object({
  producerId: z.number().int().positive(),
  name: z.string().min(1),
  longitude: z.number(),
  latitude: z.number(),
  startDate: z.union([
    z.string().transform((str) => new Date(str)),
    z.date()
  ]),
  status: z.enum(["ativa", "em manutenção", "abandonada"]),
  typeBeehive: z.string().min(1),
  observations: z.string().optional(),
});

export default beehiveSchema;
