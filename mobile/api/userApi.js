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
  console.log("=== INTERCEPTOR REQUEST ===");
  console.log("URL:", config.url);
  console.log("Método:", config.method);
  console.log("Headers:", config.headers);
  console.log("Data:", config.data);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("=== INTERCEPTOR RESPONSE SUCCESS ===");
    console.log("Status:", response.status);
    console.log("Data:", response.data);
    return response;
  },
  (error) => {
    console.log("=== INTERCEPTOR RESPONSE ERROR ===");
    console.log("Error:", error);
    console.log("Response:", error.response);
    return Promise.reject(error);
  }
);

export const getUser = async () => {
  try {
    const user = JSON.parse((await AsyncStorage.getItem("user")) || "{}");
    if (!user.id) {
      throw new Error("Usuário não encontrado");
    }

    const response = await api.get(`/producer/${user.id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    console.log("=== API CREATE USER ===");
    console.log("URL base:", getApiUrl());
    console.log("Dados enviados:", JSON.stringify(data, null, 2));
    console.log("Tipo dos dados:", typeof data);
    console.log("Headers que serão enviados:", {
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    const response = await api.post("/producer", data);
    console.log("Resposta da API:", response.data);
    console.log("Status da resposta:", response.status);
    console.log("Headers da resposta:", response.headers);

    return response;
  } catch (error) {
    console.error("=== ERRO NA API CREATE USER ===");
    console.error("Erro completo:", error);
    console.error("Mensagem de erro:", error.message);
    console.error("Status do erro:", error.response?.status);
    console.error("Dados do erro:", error.response?.data);
    console.error("Headers da requisição:", error.config?.headers);
    console.error("URL da requisição:", error.config?.url);
    console.error("Método da requisição:", error.config?.method);
    console.error("Dados enviados na requisição:", error.config?.data);

    let message = "Erro ao criar usuário.";

    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.message) {
      message = error.message;
    }

    // Se for erro de rede
    if (
      error.code === "NETWORK_ERROR" ||
      error.message.includes("Network Error")
    ) {
      message = "Erro de conexão. Verifique sua internet.";
    }

    // Se for erro de timeout
    if (error.code === "ECONNABORTED") {
      message = "Tempo limite excedido. Tente novamente.";
    }

    return { error: true, message };
  }
};

export const updateUser = async (data, id) => {
  try {
    const response = await api.put(`/producer/${id}`, data);
    return response;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/producer/${id}`);
    return response;
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw error;
  }
};

export const createUserWithFetch = async (data) => {
  try {
    console.log("=== API CREATE USER COM FETCH ===");
    console.log("URL base:", getApiUrl());
    console.log("Dados enviados:", JSON.stringify(data, null, 2));

    const response = await fetch(`${getApiUrl()}/producer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log("Resposta da API (fetch):", responseData);
    console.log("Status da resposta (fetch):", response.status);

    if (!response.ok) {
      throw new Error(responseData.message || "Erro na requisição");
    }

    return responseData;
  } catch (error) {
    console.error("=== ERRO NA API CREATE USER COM FETCH ===");
    console.error("Erro completo:", error);
    console.error("Mensagem de erro:", error.message);

    return { error: true, message: error.message };
  }
};
