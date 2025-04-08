const { z } = require("zod");

const beehiveSchema = z.object({
  produtorId: z.number().int().positive(),
  name: z.string().min(1),
  location: z.string().min(3),
  startDate: z.string().transform((str) => new Date(str)),
  status: z.enum(["ativa", "em manutenção", "abandonada"]),
  typeBeehive: z.string().min(1),
  observations: z.string().optional(),
});

module.exports = {
  beehiveSchema,
};
