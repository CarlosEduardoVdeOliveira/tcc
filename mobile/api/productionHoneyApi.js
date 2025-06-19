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

/* ProductionHoney */
export const getProductionHoney = async (beehiveId) => {
  const response = await api.get(`/production-honey?beehiveId=${beehiveId}`);
  return response;
};

export const createProductionHoney = async (productionData) => {
  const response = await api.post("/production-honey", productionData);
  return response;
};

export const updateProductionHoney = async (id, productionData) => {
  const response = await api.put(`/production-honey/${id}`, productionData);
  return response;
};

export const deleteProductionHoney = async (id) => {
  const response = await api.delete(`/production-honey/${id}`);
  return response;
};
