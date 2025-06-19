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

/* Food */
export const getFood = async (beehiveId) => {
  const response = await api.get(`/foods?beehiveId=${beehiveId}`);
  return response;
};

export const createFood = async (foodData) => {
  const response = await api.post("/foods", foodData);
  return response;
};

export const updateFood = async (id, foodData) => {
  const response = await api.put(`/foods/${id}`, foodData);
  return response;
};

export const deleteFood = async (id) => {
  const response = await api.delete(`/foods/${id}`);
  return response;
};
