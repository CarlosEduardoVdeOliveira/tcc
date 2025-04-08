const express = require("express");
const router = express.Router();
const colmeiaController = require("../controllers/colmeiaController");
const validate = require("../middlewares/validate");
const { colmeiaSchema } = require("../schemas/colmeiaSchema");

router.get("/", colmeiaController.getAllColmeias);
router.get("/:id", colmeiaController.getColmeiaById);
router.post("/", validate(colmeiaSchema), colmeiaController.createColmeia);
router.put("/:id", validate(colmeiaSchema), colmeiaController.updateColmeia);
router.delete("/:id", colmeiaController.deleteColmeia);

module.exports = router;
