const express = require("express");
const router = express.Router();
const produtorController = require("../controllers/produtorController");
const validate = require("../middlewares/validate");
const { produtorSchema } = require("../schemas/produtorSchema");

router.get("/", produtorController.getAllProdutores);
router.get("/:id", produtorController.getProdutorById);
router.post("/", validate(produtorSchema), produtorController.createProdutor);
router.put("/:id", validate(produtorSchema), produtorController.updateProdutor);
router.delete("/:id", produtorController.deleteProdutor);

module.exports = router;
