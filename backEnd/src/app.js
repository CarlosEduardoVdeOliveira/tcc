import cors from "cors";
import express from "express";
import authenticate from "./middlewares/auth.js";
import activityRoutes from "./routers/activityRoutes.js";
import beehiveRoutes from "./routers/beehiveRoutes.js";
import diseaseRoutes from "./routers/diseaseRoutes.js";
import foodRoutes from "./routers/foodRoutes.js";
import loginRoutes from "./routers/loginRoutes.js";
import producerRoutes from "./routers/producerRoutes.js";
import productionHoneyRoutes from "./routers/productionHoneyRoutes.js";
import temperatureHumidityRoutes from "./routers/temperatureHumidityRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rota de health check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Backend funcionando corretamente",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/v1/login", loginRoutes);
app.use("/api/v1/producer", producerRoutes);
app.use("/api/v1/beehive", authenticate, beehiveRoutes);
app.use("/api/v1/activity", authenticate, activityRoutes);
app.use("/api/v1/disease", authenticate, diseaseRoutes);
app.use("/api/v1/food", authenticate, foodRoutes);
app.use("/api/v1/production_honey", authenticate, productionHoneyRoutes);
app.use(
  "/api/v1/temperature_humidity",
  authenticate,
  temperatureHumidityRoutes
);

app.use((_req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno do servidor" });
});

export default app;
