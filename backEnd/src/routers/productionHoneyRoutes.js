import express from "express";
import productionHoneyController from "../controllers/productionHoneyController.js";
import validate from "../middlewares/validate.js";
import productionHoneySchema from "../schemas/ProductionHoneySchema.js";

const router = express.Router();

router.get("/", productionHoneyController.getAllProductionsHoney);
router.get(
  "/:id",

  productionHoneyController.getProductionHoneyById
);
router.get(
  "/beehive/:id",

  productionHoneyController.getProductionsHoneyByBeehiveId
);
router.post(
  "/",
  validate(productionHoneySchema),

  productionHoneyController.createProductionHoney
);
router.put(
  "/:id",
  validate(productionHoneySchema),

  productionHoneyController.updateProductionHoney
);
router.delete(
  "/:id",

  productionHoneyController.deleteProductionHoney
);

export default router;
