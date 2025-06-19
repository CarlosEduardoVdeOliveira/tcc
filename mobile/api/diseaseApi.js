import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => await AsyncStorage.getItem("user_token");

const api = axios.create({
  baseURL: "http://192.168.15.22:3000/api/v1",
});

api.interceptors.request.use(async (config) => {
  const user_token = await getToken();
  if (user_token) {
    config.headers.Authorization = `Bearer ${user_token}`;
  }
  return config;
});

/* Disease */
export const getDisease = async (beehiveId) => {
  const response = await api.get(`/diseases?beehiveId=${beehiveId}`);
  return response;
};

export const createDisease = async (diseaseData) => {
  const response = await api.post("/diseases", diseaseData);
  return response;
};

export const updateDisease = async (id, diseaseData) => {
  const response = await api.put(`/diseases/${id}`, diseaseData);
  return response;
};

export const deleteDisease = async (id) => {
  const response = await api.delete(`/diseases/${id}`);
  return response;
};
