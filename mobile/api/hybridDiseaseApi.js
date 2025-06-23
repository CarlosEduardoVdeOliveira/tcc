import { isOfflineMode } from "../utils/config.js";
import {
  createDisease,
  deleteDisease,
  getDisease,
  updateDisease
} from "./diseaseApi.js";
import {
  offlineCreateDisease,
  offlineDeleteDisease,
  offlineGetDisease,
  offlineUpdateDisease
} from "./offlineApi.js";

// API híbrida para doenças
export const hybridGetDisease = async (beehiveId) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: buscando doenças localmente");
      return await offlineGetDisease(beehiveId);
    } else {
      console.log("Modo online: buscando doenças da API");
      return await getDisease(beehiveId);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineGetDisease(beehiveId);
  }
};

export const hybridCreateDisease = async (data) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: criando doença localmente");
      return await offlineCreateDisease(data);
    } else {
      console.log("Modo online: criando doença na API");
      return await createDisease(data);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineCreateDisease(data);
  }
};

export const hybridUpdateDisease = async (data, id) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: atualizando doença localmente");
      return await offlineUpdateDisease(data, id);
    } else {
      console.log("Modo online: atualizando doença na API");
      return await updateDisease(data, id);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineUpdateDisease(data, id);
  }
};

export const hybridDeleteDisease = async (id) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: removendo doença localmente");
      return await offlineDeleteDisease(id);
    } else {
      console.log("Modo online: removendo doença na API");
      return await deleteDisease(id);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineDeleteDisease(id);
  }
}; 