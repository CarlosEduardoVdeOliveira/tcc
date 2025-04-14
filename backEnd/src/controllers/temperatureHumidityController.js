import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

const getAllTemperatureHumidity = async (_req, res) => {
  try {
    const temperatureHumidity = await prisma.temperaturesHumidity.findMany();
    if (!temperatureHumidity || temperatureHumidity.length === 0) {
      return res.json("Não há temperaturas ou umidades cadastradas");
    }
    res.json(temperatureHumidity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTemperatureHumidityByBeehiveId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json("Colmeia não encontrada.");
    }
    const temperatureHumidity = await prisma.temperaturesHumidity.findMany({
      where: { id: Number(id) },
      include: { beehive: true },
    });
    res.json(temperatureHumidity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTemperatureHumidity = async (req, res) => {
  try {
    const temperatureHumidity = await prisma.temperaturesHumidity.create({
      data: req.body,
    });
    res.status(201).json(temperatureHumidity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTemperatureHumidity = async (req, res) => {
  try {
    const { id } = req.params;
    const temperatureHumidity = await prisma.temperaturesHumidity.update({
      where: { id: Number(id) },
      data: req.body,
    });
    if (!id) {
      return res.json("Temperatura ou umidade não encontrada");
    }
    res.json(temperatureHumidity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTemperatureHumidity = async (req, res) => {
  try {
    const { id } = req.params;
    const temperatureHumidity = await prisma.temperaturesHumidity.delete({
      where: { id: Number(id) },
    });
    if (!id) {
      return res.json("Temperatura ou umidade não encontradas");
    }
    res.json(temperatureHumidity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default {
  getAllTemperatureHumidity,
  getTemperatureHumidityByBeehiveId,
  createTemperatureHumidity,
  updateTemperatureHumidity,
  deleteTemperatureHumidity,
};
