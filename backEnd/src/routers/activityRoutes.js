const express = require("express");
const router = express.Router();
const atividadeController = require("../controllers/atividadeController");
const validate = require("../middlewares/validate");
const { atividadeSchema } = require("../schemas/atividadeSchema");

router.get("/", atividadeController.getAllAtividades);
router.get("/:id", atividadeController.getAtividadeById);
router.get("/colmeia/:colmeiaId", atividadeController.getAtividadesByColmeiaId);
router.post(
  "/",
  validate(atividadeSchema),
  atividadeController.createAtividade
);
router.put(
  "/:id",
  validate(atividadeSchema),
  atividadeController.updateAtividade
);
router.delete("/:id", atividadeController.deleteAtividade);

module.exports = router;
