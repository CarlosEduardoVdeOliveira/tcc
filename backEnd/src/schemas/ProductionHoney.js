const { z } = require('zod');

const productionHoneySchema = z.object({
  beehiveId: z.number().int().positive(),
  dateCollection: z.string().transform((str) => new Date(str)),
  amount: z.number().positive(),
  quality: z.enum(['alta', 'média', 'baixa']),
  observations: z.string().optional(),
});

module.exports = {
  productionHoneySchema,
};