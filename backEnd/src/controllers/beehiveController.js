/* eslint-disable object-shorthand */
import { z } from 'zod';
import { PrismaClient } from '../generated/prisma/client.js';
import beehiveSchema from '../schemas/BeehiveSchema.js';

const prisma = new PrismaClient();

const getAllBeehives = async (req, res) => {
  try {
    // O middleware de autenticação adiciona req.user com os dados do token
    const producerId = req.user.id;

    const beehives = await prisma.beehive.findMany({
      where: {
        producerId: producerId,
      },
    });
    if (!beehives.length) {
      return res.status(200).json([]);
    }
    if (beehives.length === 0) {
      return res.status(404).json({ error: 'Nenhuma colmeia encontrada.' });
    }
    res.json(beehives);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBeehiveById = async (req, res) => {
  try {
    const { id } = req.params;
    const producerId = req.user.id;

    const beehive = await prisma.beehive.findFirst({
      where: {
        id: Number(id),
        producerId: producerId,
      },
      include: {
        activities: true,
        productionsHoney: true,
        temperaturesHumidities: true,
        foods: true,
        diseases: true,
      },
    });

    if (!beehive) {
      return res.status(404).json({ error: 'Colmeia não encontrada' });
    }

    res.json(beehive);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBeehive = async (req, res) => {
  try {
    // Verifica se req.user existe
    if (!req.user || !req.user.id) {
      console.log('Usuário não autenticado:', req.user);
      return res.status(401).json({ status: 'error', message: 'Usuário não autenticado' });
    }

    // Valida dados com Zod
    const data = beehiveSchema.parse(req.body);
    const producerId = req.user.id;

    // Log dos dados recebidos
    console.log('Dados recebidos para criar colmeia:', data, 'Producer ID:', producerId);

    const beehive = await prisma.beehive.create({
      data: {
        ...data,
        producerId: producerId,
      },
    });

    console.log('Colmeia criada com sucesso:', beehive);

    res.status(201).json(beehive);
  } catch (error) {
    console.error('Erro ao criar colmeia:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: 'error',
        message: 'Dados inválidos',
        errors: error.errors,
      });
    }

    res.status(500).json({ status: 'error', message: error.message });
  }
};

const findAllBeehivePerStatus = async (req, res) => {
  try {
    const { status } = beehiveSchema.pick({ status: true }).parse(req.body);

    const beehives = await prisma.beehive.findMany({
      where: {
        status,
      },
    });

    if (beehives.length === 0) {
      return res
        .status(404)
        .json({ error: 'Nenhuma colmeia encontrada com o status informado.' });
    }

    return res.status(200).json(beehives);
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Erro ao filtrar colmeias por status.',
      errors: error?.errors || error.message,
    });
  }
};
const updateBeehive = async (req, res) => {
  try {
    const { id } = req.params;
    const data = beehiveSchema.parse(req.body);
    const producerId = req.user.id;

    // Verificar se a colmeia pertence ao usuário
    const existingBeehive = await prisma.beehive.findFirst({
      where: {
        id: Number(id),
        producerId: producerId,
      },
    });

    if (!existingBeehive) {
      return res.status(404).json({ error: 'Colmeia não encontrada' });
    }

    const beehive = await prisma.beehive.update({
      where: { id: Number(id) },
      data,
    });

    res.json(beehive);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: 'error',
        message: 'Dados inválidos',
        errors: error.errors,
      });
    }

    res.status(500).json({ error: error.message });
  }
};

const deleteBeehive = async (req, res) => {
  try {
    const { id } = req.params;
    const producerId = req.user.id;

    if (!id) return res.status(400).json({ error: 'ID da colmeia é obrigatório' });

    const deleted = await prisma.beehive.deleteMany({
      where: { id: Number(id), producerId },
    });

    if (deleted.count === 0) {
      return res.status(404).json({ error: 'Colmeia não encontrada ou não pertence ao produtor' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar colmeia:', error);
    res.status(500).json({ error: error.message });
  }
};

const syncBeehives = async (req, res) => {
  try {
    const beehives = req.body;
    const producerId = req.user.id;

    if (!Array.isArray(beehives)) {
      return res
        .status(400)
        .json({ error: 'Formato inválido. Esperado um array de colmeias.' });
    }

    const result = await prisma.$transaction(
      beehives.map(beehive =>
        prisma.beehive.upsert({
          where: { id: beehive.id || 0 },
          update: { ...beehive, producerId },
          create: { ...beehive, producerId },
        })
      )
    );

    res
      .status(201)
      .json({ message: 'Colmeias sincronizadas com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllBeehives,
  getBeehiveById,
  createBeehive,
  findAllBeehivePerStatus,
  updateBeehive,
  deleteBeehive,
  syncBeehives,
};
