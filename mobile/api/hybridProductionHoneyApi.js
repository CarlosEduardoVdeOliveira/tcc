import { isOfflineMode } from "../utils/config.js";
import {
    offlineCreateProductionHoney,
    offlineDeleteProductionHoney,
    offlineGetProductionHoney,
    offlineUpdateProductionHoney
} from "./offlineApi.js";
import {
    createProductionHoney,
    deleteProductionHoney,
    getProductionHoney,
    updateProductionHoney
} from "./productionHoneyApi.js";

// API híbrida para produção de mel
export const hybridGetProductionHoney = async (beehiveId) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: buscando produção de mel localmente");
      return await offlineGetProductionHoney(beehiveId);
    } else {
      console.log("Modo online: buscando produção de mel da API");
      return await getProductionHoney(beehiveId);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineGetProductionHoney(beehiveId);
  }
};

export const hybridCreateProductionHoney = async (data) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: criando produção de mel localmente");
      return await offlineCreateProductionHoney(data);
    } else {
      console.log("Modo online: criando produção de mel na API");
      return await createProductionHoney(data);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineCreateProductionHoney(data);
  }
};

export const hybridUpdateProductionHoney = async (data, id) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: atualizando produção de mel localmente");
      return await offlineUpdateProductionHoney(data, id);
    } else {
      console.log("Modo online: atualizando produção de mel na API");
      return await updateProductionHoney(data, id);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineUpdateProductionHoney(data, id);
  }
};

export const hybridDeleteProductionHoney = async (id) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: removendo produção de mel localmente");
      return await offlineDeleteProductionHoney(id);
    } else {
      console.log("Modo online: removendo produção de mel na API");
      return await deleteProductionHoney(id);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineDeleteProductionHoney(id);
  }
}; 