import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

const getAllFoods = async (_req, res) => {
  try {
    const foods = await prisma.food.findMany();
    if (!foods || foods.length === 0) {
      return res.status(200).json("Não há alimentação registradas.");
    }
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getFoodsByBeehiveId = async (req, res) => {
  try {
    const { beehiveId } = req.params;
    const foods = await prisma.food.findMany({
      where: { beehiveId: Number(beehiveId) },
    });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createFood = async (req, res) => {
  try {
    const food = await prisma.food.create({
      data: req.body,
    });
    res.json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await prisma.food.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.food.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const syncFoods = async (req, res) => {
  try {
    const foods = req.body;

    if (!Array.isArray(foods)) {
      return res.status(400).json({ error: "Formato inválido. Esperado um array de alimentações." });
    }

    const result = await prisma.$transaction(
      foods.map((food) =>
        prisma.food.upsert({
          where: { id: food.id || 0 },
          update: food,
          create: food,
        })
      )
    );

    res.status(201).json({ message: "Alimentações sincronizadas com sucesso", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllFoods,
  getFoodsByBeehiveId,
  createFood,
  updateFood,
  deleteFood,
  syncFoods
};
