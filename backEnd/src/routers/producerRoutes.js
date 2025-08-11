import express from 'express';
import producerController from '../controllers/producerController.js';
import authenticate from '../middlewares/auth.js';
import validate from '../middlewares/validate.js';
import {
  producerSchema,
  producerUpdateSchema,
} from '../schemas/ProducerSchema.js';
const router = express.Router();

router.get('/', producerController.getAllProducers);
router.get('/:id', producerController.getProducerById);
router.post('/', validate(producerSchema), producerController.createProducer);
router.put(
  '/:id',
  validate(producerUpdateSchema),
  authenticate,
  producerController.updateProducer
);
router.delete('/:id', authenticate, producerController.deleteProducer);

export default router;
