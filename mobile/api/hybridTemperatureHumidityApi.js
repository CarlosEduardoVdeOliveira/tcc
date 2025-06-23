import { isOfflineMode } from "../utils/config.js";
import {
  offlineCreateTemperatureHumidity,
  offlineDeleteTemperatureHumidity,
  offlineGetTemperatureHumidity,
  offlineUpdateTemperatureHumidity
} from "./offlineApi.js";
import {
  createTemperatureHumidity,
  deleteTemperatureHumidity,
  getTemperatureHumidity,
  updateTemperatureHumidity
} from "./temperatureHumidity.js";

// API híbrida para temperatura e umidade
export const hybridGetTemperatureHumidity = async (beehiveId) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: buscando temperatura/umidade localmente");
      return await offlineGetTemperatureHumidity(beehiveId);
    } else {
      console.log("Modo online: buscando temperatura/umidade da API");
      return await getTemperatureHumidity(beehiveId);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineGetTemperatureHumidity(beehiveId);
  }
};

export const hybridCreateTemperatureHumidity = async (data) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: criando temperatura/umidade localmente");
      return await offlineCreateTemperatureHumidity(data);
    } else {
      console.log("Modo online: criando temperatura/umidade na API");
      return await createTemperatureHumidity(data);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineCreateTemperatureHumidity(data);
  }
};

export const hybridUpdateTemperatureHumidity = async (data, id) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: atualizando temperatura/umidade localmente");
      return await offlineUpdateTemperatureHumidity(data, id);
    } else {
      console.log("Modo online: atualizando temperatura/umidade na API");
      return await updateTemperatureHumidity(data, id);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineUpdateTemperatureHumidity(data, id);
  }
};

export const hybridDeleteTemperatureHumidity = async (id) => {
  try {
    if (isOfflineMode()) {
      console.log("Modo offline: removendo temperatura/umidade localmente");
      return await offlineDeleteTemperatureHumidity(id);
    } else {
      console.log("Modo online: removendo temperatura/umidade na API");
      return await deleteTemperatureHumidity(id);
    }
  } catch (error) {
    console.log("Erro na API, usando modo offline:", error.message);
    return await offlineDeleteTemperatureHumidity(id);
  }
}; 