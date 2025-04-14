import express from "express";
import foodController from "../controllers/foodController.js";
import validate from "../middlewares/validate.js";
import foodSchema from "../schemas/FoodSchema.js";

const router = express.Router();

router.get("/", foodController.getAllFoods);
router.get("/:id", foodController.getFoodsByBeehiveId);
router.post("/", validate(foodSchema), foodController.createFood);
router.put(
  "/:id",
  validate(foodSchema),

  foodController.updateFood
);
router.delete("/:id", foodController.deleteFood);
export default router;
