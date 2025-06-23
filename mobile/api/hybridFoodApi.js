import { isOfflineMode } from "../utils/config.js";
import {
  createFood,
  deleteFood,
  getFood,
  updateFood
} from "./foodApi.js";
import {
  offlineCreateFood,
  offlineDeleteFood,
  offlineGetFood,
  offlineUpdateFood
} from "./offlineApi.js";

// API híbrida para alimentação
export const hybridGetFood = async (beehiveId) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: buscando alimentação localmente");
      return await offlineGetFood(beehiveId);
    } else {
      console.log("Modo online: buscando alimentação da API");
      return await getFood(beehiveId);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineGetFood(beehiveId);
  }
};

export const hybridCreateFood = async (data) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: criando alimentação localmente");
      return await offlineCreateFood(data);
    } else {
      console.log("Modo online: criando alimentação na API");
      return await createFood(data);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineCreateFood(data);
  }
};

export const hybridUpdateFood = async (data, id) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: atualizando alimentação localmente");
      return await offlineUpdateFood(data, id);
    } else {
      console.log("Modo online: atualizando alimentação na API");
      return await updateFood(data, id);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineUpdateFood(data, id);
  }
};

export const hybridDeleteFood = async (id) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: removendo alimentação localmente");
      return await offlineDeleteFood(id);
    } else {
      console.log("Modo online: removendo alimentação na API");
      return await deleteFood(id);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineDeleteFood(id);
  }
}; 