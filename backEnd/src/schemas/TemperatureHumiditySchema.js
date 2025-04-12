import { z } from "zod";

const temperaturesHumiditySchema = z.object({
  beehiveId: z.number().int().positive(),
  data: z.string().transform((str) => new Date(str)),
  internalTemperature: z.number(),
  externalTemperature: z.number(),
  humidityInternal: z.number().min(0).max(100),
  humidityExternal: z.number().min(0).max(100),
});
export default temperaturesHumiditySchema;
