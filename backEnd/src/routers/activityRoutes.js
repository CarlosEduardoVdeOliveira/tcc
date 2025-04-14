import express from "express";
import activityController from "../controllers/activityController.js";
import validate from "../middlewares/validate.js";
import activitySchema from "../schemas/ActivitySchema.js";
const router = express.Router();

router.get("/", activityController.getAllActivities);
router.get("/:id", activityController.getActivityById);
router.get("/beehive/:beehiveId", activityController.getActivitiesByBeehiveId);
router.post("/", validate(activitySchema), activityController.createActivity);
router.put("/:id", validate(activitySchema), activityController.updateActivity);
router.delete("/:id", activityController.deleteActivity);

export default router;
