import { isOfflineMode } from "../utils/config.js";
import {
  createActivity,
  deleteActivity,
  getActivity,
  updateActivity
} from "./activityApi.js";
import {
  offlineCreateActivity,
  offlineDeleteActivity,
  offlineGetActivity,
  offlineUpdateActivity
} from "./offlineApi.js";

// API híbrida para atividades
export const hybridGetActivity = async (beehiveId) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: buscando atividades localmente");
      return await offlineGetActivity(beehiveId);
    } else {
      console.log("Modo online: buscando atividades da API");
      return await getActivity(beehiveId);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineGetActivity(beehiveId);
  }
};

export const hybridCreateActivity = async (data) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: criando atividade localmente");
      return await offlineCreateActivity(data);
    } else {
      console.log("Modo online: criando atividade na API");
      return await createActivity(data);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineCreateActivity(data);
  }
};

export const hybridUpdateActivity = async (data, id) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: atualizando atividade localmente");
      return await offlineUpdateActivity(data, id);
    } else {
      console.log("Modo online: atualizando atividade na API");
      return await updateActivity(data, id);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineUpdateActivity(data, id);
  }
};

export const hybridDeleteActivity = async (id) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: removendo atividade localmente");
      return await offlineDeleteActivity(id);
    } else {
      console.log("Modo online: removendo atividade na API");
      return await deleteActivity(id);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineDeleteActivity(id);
  }
}; 