import { z } from "zod";

const diseaseSchema = z.object({
  beehiveId: z.number().int().positive(),
  data: z.string().transform((str) => new Date(str)),
  diseasePrague: z.string().min(1),
  treatment: z.string().min(1),
  observations: z.string().optional(),
});

export default diseaseSchema;
