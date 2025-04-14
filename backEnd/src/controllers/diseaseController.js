import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

const getAllDiseases = async (_req, res) => {
  try {
    const diseases = await prisma.disease.findMany();

    if (!diseases || diseases.length === 0) {
      return res.status(200).json("Não há doenças ou pragas registradas.");
    }
    res.status(200).json(diseases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getDiseaseByBeehiveId = (req, res) => {
  try {
    const { beehiveId } = req.params;
    const diseaseBeehiveId = prisma.disease.findMany({
      where: { beehiveId: Number(beehiveId) },
    });
    req.json(diseaseBeehiveId);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createDisease = async (req, res) => {
  try {
    const disease = await prisma.disease.create({
      data: req.body,
    });
    res.status(201).json(disease);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDisease = async (req, res) => {
  try {
    const { id } = req.params;
    const disease = await prisma.disease.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(disease);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDisease = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.disease.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllDiseases,
  createDisease,
  getDiseaseByBeehiveId,
  updateDisease,
  deleteDisease,
};
