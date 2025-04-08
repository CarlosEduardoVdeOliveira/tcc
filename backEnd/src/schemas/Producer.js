const { z } = require("zod");

const producerSchema = z.object({
  cpfCnpj: z.string().min(11).max(18),
  location: z.string().min(3),
  startDate: z.string().transform((str) => new Date(str)),
  status: z.enum(["Ativo", "Inativo"]),
});

module.exports = {
  producerSchema,
};
