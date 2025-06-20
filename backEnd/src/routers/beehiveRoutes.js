import express from "express";
import beehiveController from "../controllers/beehiveController.js";
import validate from "../middlewares/validate.js";
import authenticate from "../middlewares/auth.js";
import beehiveSchema from "../schemas/BeehiveSchema.js";

const router = express.Router();

router.get("/", authenticate, beehiveController.getAllBeehives);
router.get("/:id", authenticate, beehiveController.getBeehiveById);
router.post(
  "/",
  authenticate,
  validate(beehiveSchema),
  beehiveController.createBeehive
);
router.put(
  "/:id",
  authenticate,
  validate(beehiveSchema),
  beehiveController.updateBeehive
);
router.delete("/:id", authenticate, beehiveController.deleteBeehive);

export default router;
