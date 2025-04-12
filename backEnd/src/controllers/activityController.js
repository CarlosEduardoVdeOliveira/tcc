import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

const getAllActivities = async (_req, res) => {
  try {
    const activities = await prisma.activity.findMany();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await prisma.activity.findUnique({
      where: { id: Number(id) },
      include: { beehive: true },
    });

    if (!activity) {
      return res.status(404).json({ error: "Atividade não encontrada" });
    }

    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getActivitiesByBeehiveId = async (req, res) => {
  try {
    const { beehiveId } = req.params;
    const activities = await prisma.activity.findMany({
      where: { beehiveId: Number(beehiveId) },
    });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createActivity = async (req, res) => {
  try {
    const activity = await prisma.activity.create({
      data: req.body,
    });
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await prisma.activity.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.activity.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default {
  getAllActivities,
  getActivityById,
  getActivitiesByBeehiveId,
  createActivity,
  updateActivity,
  deleteActivity,
};
