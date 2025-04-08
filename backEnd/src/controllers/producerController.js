const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllProducers = async (req, res) => {
  try {
    const producers = await prisma.producer.findMany();
    res.json(producers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProducerById = async (req, res) => {
  try {
    const { id } = req.params;
    const producer = await prisma.producer.findUnique({
      where: { id: Number(id) },
      include: { beehives: true },
    });

    if (!producer) {
      return res.status(404).json({ error: 'Produtor não encontrado' });
    }

    res.json(producer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProducer = async (req, res) => {
  try {
    const producer = await prisma.producer.create({
      data: req.body,
    });
    res.status(201).json(producer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProducer = async (req, res) => {
  try {
    const { id } = req.params;
    const producer = await prisma.producer.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(producer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProducer = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.producer.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducers,
  getProducerById,
  createProducer,
  updateProducer,
  deleteProducer,
};