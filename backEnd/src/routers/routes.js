/* 
import express from "express";
import authenticate from "../middlewares/authenticate.js";
import { ensureDatabaseConnection } from "../middlewares/ensureDatabaseConnection.js";

import activityController from "../controllers/activityController.js";
import beehiveController from "../controllers/beehiveController.js";
import diseaseController from "../controllers/diseaseController.js";
import foodController from "../controllers/foodController.js";
import productionHoneyController from "../controllers/productionHoneyController.js";
import temperatureHumidityController from "../controllers/temperatureHumidityController.js";

const router = express.Router();

// Rotas de sincronização offline -> online
router.post("/activities/sync", authenticate, ensureDatabaseConnection, activityController.syncActivities);
router.post("/beehives/sync", authenticate, ensureDatabaseConnection, beehiveController.syncBeehives);
router.post("/diseases/sync", authenticate, ensureDatabaseConnection, diseaseController.syncDiseases);
router.post("/foods/sync", authenticate, ensureDatabaseConnection, foodController.syncFoods);
router.post("/productions-honey/sync", authenticate, ensureDatabaseConnection, productionHoneyController.syncProductionsHoney);
router.post("/temperature-humidity/sync", authenticate, ensureDatabaseConnection, temperatureHumidityController.syncTemperatureHumidity);

export default router;
 */