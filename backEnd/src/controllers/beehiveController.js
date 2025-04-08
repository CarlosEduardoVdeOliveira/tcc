const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllBeehives = async (_req, res) => {
  try {
    const beehives = await prisma.beehive.findMany();
    res.json(beehives);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBeehiveById = async (req, res) => {
  try {
    const { id } = req.params;
    const beehive = await prisma.beehive.findUnique({
      where: { id: Number(id) },
      include: {
        activities: true,
        productionHoney: true,
        temperaturesHumidity: true,
        foods: true,
        diseases: true,
      },
    });

    if (!beehive) {
      return res.status(404).json({ error: "Colmeia não encontrada" });
    }

    res.json(beehive);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBeehive = async (req, res) => {
  try {
    const beehive = await prisma.beehive.create({
      data: req.body,
    });
    res.status(201).json(beehive);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBeehive = async (req, res) => {
  try {
    const { id } = req.params;
    const beehive = await prisma.beehive.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(beehive);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBeehive = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.beehive.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBeehives,
  getBeehiveById,
  createBeehive,
  updateBeehive,
  deleteBeehive,
};
