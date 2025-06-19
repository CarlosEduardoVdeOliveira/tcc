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
    const { beehiveId } = req.params;
    if (!beehiveId) {
      return res.json("Colmeia não encontrada.");
    }
    const temperatureHumidity = await prisma.temperaturesHumidity.findMany({
      where: { beehiveId: Number(beehiveId) },
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
const syncTemperatureHumidity = async (req, res) => {
  try {
    const records = req.body;

    if (!Array.isArray(records)) {
      return res.status(400).json({ error: "Formato inválido. Esperado um array de registros de temperatura/umidade." });
    }

    const result = await prisma.$transaction(
      records.map((record) =>
        prisma.temperaturesHumidity.upsert({
          where: { id: record.id || 0 },
          update: record,
          create: record,
        })
      )
    );

    res.status(201).json({ message: "Temperaturas e umidades sincronizadas com sucesso", result });
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
  syncTemperatureHumidity
};
