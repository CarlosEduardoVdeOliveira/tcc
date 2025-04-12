import express from "express";
import activityController from "../controllers/activityController.js";
import authenticate from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import activitySchema from "../schemas/activitySchema.js";
const router = express.Router();

router.get("/", authenticate, activityController.getAllActivities);
router.get("/:id", authenticate, activityController.getActivityById);
router.get(
  "/beehive/:beehiveId",
  authenticate,
  activityController.getActivitiesByBeehiveId
);
router.post(
  "/",
  validate(activitySchema),
  authenticate,
  activityController.createActivity
);
router.put(
  "/:id",
  validate(activitySchema),
  authenticate,
  activityController.updateActivity
);
router.delete("/:id", authenticate, activityController.deleteActivity);

export default router;
