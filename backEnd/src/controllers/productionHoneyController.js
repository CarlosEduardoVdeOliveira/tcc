import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

const getAllProductionsHoney = async (_req, res) => {
  try {
    const productionsHoney = await prisma.productionHoney.findMany();
    res.json(productionsHoney);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductionHoneyById = async (req, res) => {
  try {
    const { id } = req.params;
    const productionHoney = await prisma.productionHoney.findUnique({
      where: { id: Number(id) },
      include: { beehive: true },
    });

    if (!productionHoney) {
      return res.status(404).json({ error: "Produção de mel não encontrada" });
    }

    res.json(productionHoney);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductionsHoneyByBeehiveId = async (req, res) => {
  try {
    const { beehiveId } = req.params;
    const productionsHoney = await prisma.productionHoney.findMany({
      where: { beehiveId: Number(beehiveId) },
    });
    res.json(productionsHoney);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProductionHoney = async (req, res) => {
  try {
    const productionHoney = await prisma.productionHoney.create({
      data: req.body,
    });
    res.status(201).json(productionHoney);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProductionHoney = async (req, res) => {
  try {
    const { id } = req.params;
    const productionHoney = await prisma.productionHoney.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(productionHoney);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProductionHoney = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.productionHoney.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllProductionsHoney,
  getProductionHoneyById,
  getProductionsHoneyByBeehiveId,
  createProductionHoney,
  updateProductionHoney,
  deleteProductionHoney,
};
