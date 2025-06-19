import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => await AsyncStorage.getItem("user_token");

const api = axios.create({
  baseURL: "http://192.168.15.22:3000/api/v1/",
});

api.interceptors.request.use(async (config) => {
  const user_token = await getToken();
  if (user_token) {
    config.headers.Authorization = `Bearer ${user_token}`;
  }
  return config;
});

/* TemperatureHumidity */
export const getTemperatureHumidity = async (beehiveId) => {
  const response = await api.get(`/temperature-humidity?beehiveId=${beehiveId}`);
  return response;
};

export const createTemperatureHumidity = async (tempHumData) => {
  const response = await api.post("/temperature-humidity", tempHumData);
  return response;
};

export const updateTemperatureHumidity = async (id, tempHumData) => {
  const response = await api.put(`/temperature-humidity/${id}`, tempHumData);
  return response;
};

export const deleteTemperatureHumidity = async (id) => {
  const response = await api.delete(`/temperature-humidity/${id}`);
  return response;
};
