const { z } = require('zod');

const foodSchema = z.object({
  beehiveId: z.number().int().positive(),
  date: z.string().transform((str) => new Date(str)),
  typeFood: z.string().min(1),
  amount: z.number().positive(),
  observations: z.string().optional(),
});

module.exports = {
  foodSchema,
};