import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "./api";

const QUEUE_KEY = "offline_activity_queue";

export const saveToOfflineQueue = async (request) => {
  try {
    const queueJson = await AsyncStorage.getItem(QUEUE_KEY);
    const queue = queueJson ? JSON.parse(queueJson) : [];

    queue.push(request);
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    console.log("💾 Requisição salva offline:", request);
  } catch (error) {
    console.error("Erro ao salvar requisição offline:", error);
  }
};

export const syncOfflineQueue = async () => {
  try {
    const queueJson = await AsyncStorage.getItem(QUEUE_KEY);
    const queue = queueJson ? JSON.parse(queueJson) : [];

    if (queue.length === 0) {
      console.log("📭 Fila offline vazia, nada para sincronizar.");
      return;
    }

    console.log(`🔁 Sincronizando ${queue.length} requisições offline...`);
    const remaining = [];

    for (const req of queue) {
      try {
        await Api(req); // axios aceita config completo
        console.log("✅ Requisição sincronizada:", req.url);
      } catch (err) {
        console.error("❌ Falha ao sincronizar:", req.url, err.message);
        remaining.push(req); // mantém na fila para tentar depois
      }
    }

    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
  } catch (error) {
    console.error("Erro ao sincronizar fila offline:", error);
  }
};
