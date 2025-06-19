import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getApiUrl } from "../utils/config.js";

const getToken = async () => {
  try {
    return await AsyncStorage.getItem("user_token");
  } catch (error) {
    console.error("Erro ao obter token:", error);
    return null;
  }
};

const api = axios.create({
  baseURL: getApiUrl(),
});

api.interceptors.request.use(async (config) => {
  const user_token = await getToken();
  if (user_token) {
    config.headers.Authorization = `Bearer ${user_token}`;
  }
  return config;
});

export const getUser = async () => {
  try {
    const user = JSON.parse(await AsyncStorage.getItem("user") || "{}");
    if (!user.id) {
      throw new Error("Usuário não encontrado");
    }
    
    const response = await api.get(`/api/v1/producer/${user.id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw error;
  }
};
  
export const createUser = async (data) => {
  try {
    const response = await api.post("/api/v1/producer", data);
    return response;
  } catch (error) {
    let message = "Erro ao criar usuário.";
    if (error.response?.data?.message) {
      message = error.response.data.message;
    }
    return { error: true, message };
  }
};

export const updateUser = async (data, id) => {
  try {
    const response = await api.put(`/api/v1/producer/${id}`, data);
    return response;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/api/v1/producer/${id}`);
    return response;
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw error;
  }
}; 