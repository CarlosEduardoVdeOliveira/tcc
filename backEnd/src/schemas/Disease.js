const { z } = require("zod");

const enfermidadeSchema = z.object({
  beehiveId: z.number().int().positive(),
  data: z.string().transform((str) => new Date(str)),
  diseasePrague: z.string().min(1),
  treatment: z.string().min(1),
  observations: z.string().optional(),
});

module.exports = {
  enfermidadeSchema,
};
