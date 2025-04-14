import express from "express";
import beehiveController from "../controllers/beehiveController.js";
import validate from "../middlewares/validate.js";
import beehiveSchema from "../schemas/BeehiveSchema.js";

const router = express.Router();

router.get("/", beehiveController.getAllBeehives);
router.get("/:id", beehiveController.getBeehiveById);
router.post(
  "/",
  validate(beehiveSchema),
  beehiveController.createBeehive
);
router.put(
  "/:id",
  validate(beehiveSchema),
  beehiveController.updateBeehive
);
router.delete("/:id", beehiveController.deleteBeehive);

export default router;
