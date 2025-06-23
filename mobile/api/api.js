import axios from "axios";
import { getApiUrl } from "../utils/config.js";

const baseURL = getApiUrl();
console.log("=== API CONFIG DEBUG ===");
console.log("BaseURL configurada:", baseURL);

export const Api = axios.create({
  baseURL: "http://192.168.15.22:3000/api/v1",
  timeout: 10000,
});

// Adicionar interceptor para logs
Api.interceptors.request.use(
  (config) => {
    console.log("=== REQUEST INTERCEPTOR ===");
    console.log("URL completa:", config.baseURL + config.url);
    console.log("Método:", config.method);
    console.log("Headers:", config.headers);
    console.log("Data:", config.data);
    return config;
  },
  (error) => {
    console.error("Erro no interceptor de request:", error);
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => {
    console.log("=== RESPONSE INTERCEPTOR ===");
    console.log("Status:", response.status);
    console.log("Data:", response.data);
    return response;
  },
  (error) => {
    console.error("=== RESPONSE ERROR INTERCEPTOR ===");
    console.error("Erro na resposta:", error.response?.data);
    console.error("Status:", error.response?.status);
    return Promise.reject(error);
  }
);
