import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "./api.js";

/* TemperatureHumidity */
export const getTemperatureHumidity = async (id) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.get(`/temperature_humidity/beehive/${id} `, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const createTemperatureHumidity = async (data) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.post("/temperature_humidity", data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const updateTemperatureHumidity = async (data, id) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.put(`/temperature_humidity/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const deleteTemperatureHumidity = async (id) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.delete(`/temperature_humidity/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
