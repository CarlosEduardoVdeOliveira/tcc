import { z } from "zod";

const activitySchema = z.object({
  beehiveId: z.number().int().positive(),
  data: z.string().transform((str) => new Date(str)),
  typeActivity: z.string().min(1),
  descriptions: z.string().min(1),
  observations: z.string().optional(),
});

export default activitySchema;
