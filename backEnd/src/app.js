import cors from "cors";
import express from "express";
import activityRoutes from "./routers/activityRoutes.js";
import beehiveRoutes from "./routers/beehiveRoutes.js";
import loginRoutes from "./routers/loginRoutes.js";
import producerRoutes from "./routers/producerRoutes.js";
// Importe outras rotas aqui

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/login", loginRoutes);
app.use("/api/v1/producer", producerRoutes);
app.use("/api/v1/beehive", beehiveRoutes);
app.use("/api/v1/activity", activityRoutes);
// Use outras rotas aqui

app.use((_req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno do servidor" });
});

export default app;
