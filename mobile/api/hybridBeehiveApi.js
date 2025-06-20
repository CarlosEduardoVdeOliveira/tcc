import { isOfflineMode } from "../utils/config.js";
import {
    createBeehive,
    deleteBeehive,
    getBeehive,
    getBeehives,
    updateBeehive
} from "./beehiveApi.js";
import {
    offlineCreateBeehive,
    offlineDeleteBeehive,
    offlineGetBeehive,
    offlineGetBeehives,
    offlineUpdateBeehive
} from "./offlineApi.js";

// API híbrida para colmeias
export const hybridGetBeehives = async () => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: buscando colmeias localmente");
      return await offlineGetBeehives();
    } else {
      console.log("Modo online: buscando colmeias da API");
      return await getBeehives();
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineGetBeehives();
  }
};

export const hybridGetBeehive = async (id) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: buscando colmeia localmente");
      return await offlineGetBeehive(id);
    } else {
      console.log("Modo online: buscando colmeia da API");
      return await getBeehive(id);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineGetBeehive(id);
  }
};

export const hybridCreateBeehive = async (data) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: criando colmeia localmente");
      return await offlineCreateBeehive(data);
    } else {
      console.log("Modo online: criando colmeia na API");
      return await createBeehive(data);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineCreateBeehive(data);
  }
};

export const hybridUpdateBeehive = async (id, data) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: atualizando colmeia localmente");
      return await offlineUpdateBeehive(id, data);
    } else {
      console.log("Modo online: atualizando colmeia na API");
      return await updateBeehive(id, data);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineUpdateBeehive(id, data);
  }
};

export const hybridDeleteBeehive = async (id) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: removendo colmeia localmente");
      return await offlineDeleteBeehive(id);
    } else {
      console.log("Modo online: removendo colmeia na API");
      return await deleteBeehive(id);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineDeleteBeehive(id);
  }
}; 