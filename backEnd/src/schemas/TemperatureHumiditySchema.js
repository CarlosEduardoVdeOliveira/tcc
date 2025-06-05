import { z } from "zod";

const temperaturesHumiditySchema = z.object({
  beehiveId: z.number().int().positive(),
  dateMeasurement: z
  .union([
    z
      .string()
      .refine((str) => !isNaN(Date.parse(str)), { message: "Data inválida" }),
    z.date(),
  ])
  .transform((value) => (value instanceof Date ? value : new Date(value))),
  internalTemperature: z.number(),
  externalTemperature: z.number(),
  humidityInternal: z.number().min(0).max(100),
  humidityExternal: z.number().min(0).max(100),
});
export default temperaturesHumiditySchema;
