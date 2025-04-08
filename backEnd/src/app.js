const express = require("express");
const cors = require("cors");
const produtorRoutes = require("./routes/produtorRoutes");
const colmeiaRoutes = require("./routes/colmeiaRoutes");
const atividadeRoutes = require("./routes/atividadeRoutes");
// Importe outras rotas aqui

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/produtores", produtorRoutes);
app.use("/api/colmeias", colmeiaRoutes);
app.use("/api/atividades", atividadeRoutes);
// Use outras rotas aqui

app.use((_req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno do servidor" });
});

module.exports = app;
