import express from "express";
import diseaseController from "../controllers/diseaseController.js";
import validate from "../middlewares/validate.js";
import diseaseSchema from "../schemas/DiseaseSchema.js";

const router = express.Router();

router.get("/", diseaseController.getAllDiseases);

router.get(
  "/beehive/:beehiveId",
  diseaseController.getDiseaseByBeehiveId
);

router.post(
  "/",
  validate(diseaseSchema),
  diseaseController.createDisease
);
router.put(
  "/:id",
  validate(diseaseSchema),
  diseaseController.updateDisease
);
router.delete("/:id", diseaseController.deleteDisease);

export default router;
