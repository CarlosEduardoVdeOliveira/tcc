import express from "express";
import temperatureHumidityController from "../controllers/temperatureHumidityController.js";

const router = express.Router();

router.get("/", temperatureHumidityController.getAllTemperatureHumidity);
router.get(
  "/:id",
  temperatureHumidityController.getTemperatureHumidityByBeehiveId
);
router.post("/", temperatureHumidityController.createTemperatureHumidity);
router.put("/:id", temperatureHumidityController.updateTemperatureHumidity);
router.delete("/:id", temperatureHumidityController.deleteTemperatureHumidity);

export default router;
