import express from "express";
import temperatureHumidityController from "../controllers/temperatureHumidityController.js";
import validate from "../middlewares/validate.js";
import temperaturesHumiditySchema from "../schemas/TemperatureHumiditySchema.js";

const router = express.Router();

router.get("/", temperatureHumidityController.getAllTemperatureHumidity);
router.get(
  "/beehive/:beehiveId",
  temperatureHumidityController.getTemperatureHumidityByBeehiveId
);
router.post(
  "/",
  validate(temperaturesHumiditySchema),
  temperatureHumidityController.createTemperatureHumidity
);
router.put(
  "/:id",
  validate(temperaturesHumiditySchema),
  temperatureHumidityController.updateTemperatureHumidity
);
router.delete("/:id", temperatureHumidityController.deleteTemperatureHumidity);

export default router;
