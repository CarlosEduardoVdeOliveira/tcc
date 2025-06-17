import axios from "axios";

export const Api = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  timeout: 10000,
});

// Interceptor para requisições
Api.interceptors.request.use(
  (config) => {
    console.log("Requisição sendo feita:", config.method?.toUpperCase(), config.url);
    console.log("Dados da requisição:", config.data);
    return config;
  },
  (error) => {
    console.error("Erro na requisição:", error);
    return Promise.reject(error);
  }
);

// Interceptor para respostas
Api.interceptors.response.use(
  (response) => {
    console.log("Resposta recebida:", response.status, response.config.url);
    console.log("Dados da resposta:", response.data);
    return response;
  },
  (error) => {
    console.error("Erro na resposta:", error.response?.status, error.response?.data);
    console.error("URL da requisição:", error.config?.url);
    return Promise.reject(error);
  }
);
