import bcrypt from "bcryptjs";
import { z } from "zod";
import { PrismaClient } from "../generated/prisma/client.js";
import producerSchema from "../schemas/ProducerSchema.js";

const prisma = new PrismaClient();

const getAllProducers = async (_req, res) => {
  try {
    const producers = await prisma.producer.findMany();
    res.json(producers);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar produtores", details: error.message });
  }
};

const getProducerById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const producer = await prisma.producer.findUnique({
      where: { id },
      include: { beehives: true },
    });

    if (!producer) {
      return res.status(404).json({ error: "Produtor não encontrado" });
    }

    res.json(producer);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar produtor", details: error.message });
  }
};

const createProducer = async (req, res) => {
  try {
    const data = producerSchema.parse(req.body);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const producer = await prisma.producer.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    res.status(201).json(producer);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: "error",
        message: "Dados inválidos",
        errors: error.errors,
      });
    }
    res
      .status(500)
      .json({ error: "Erro ao criar produtor", details: error.message });
  }
};

const updateProducer = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const data = producerSchema.partial().parse(req.body);

    const producer = await prisma.producer.update({
      where: { id },
      data,
    });

    res.json(producer);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: "error",
        message: "Dados inválidos",
        errors: error.errors,
      });
    }
    res
      .status(500)
      .json({ error: "Erro ao atualizar produtor", details: error.message });
  }
};

const deleteProducer = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    await prisma.producer.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao deletar produtor", details: error.message });
  }
};

export default {
  getAllProducers,
  getProducerById,
  createProducer,
  updateProducer,
  deleteProducer,
};
