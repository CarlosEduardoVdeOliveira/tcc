import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApiUrl } from "../utils/config.js";

const getToken = async () => await AsyncStorage.getItem("user_token");

const api = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000, // 10 segundos de timeout
});

api.interceptors.request.use(async (config) => {
  const user_token = await getToken();
  console.log("🔑 Token obtido:", user_token ? "Sim" : "Não");
  console.log("🌐 URL da requisição:", config.baseURL + config.url);
  
  if (user_token) {
    config.headers.Authorization = `Bearer ${user_token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("✅ Resposta da API:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("❌ Erro da API:", error.message);
    console.error("❌ URL da requisição:", error.config?.url);
    console.error("❌ Status:", error.response?.status);
    console.error("❌ Dados do erro:", error.response?.data);
    throw error;
  }
);

// Função de teste para verificar a API
export const testApiConnection = async () => {
  try {
    console.log("🧪 Testando conexão com a API...");
    const url = getApiUrl();
    console.log("🌐 URL base:", url);
    
    // Teste sem autenticação
    const healthResponse = await axios.get(`${url}api/v1/health`);
    console.log("✅ Health check:", healthResponse.data);
    
    // Teste com autenticação
    const user_token = await getToken();
    const user = JSON.parse(await AsyncStorage.getItem("user") || "{}");
    
    console.log("👤 Usuário logado:", user);
    console.log("🔑 Token disponível:", user_token ? "Sim" : "Não");
    
    if (user_token && user.id) {
      const beehivesResponse = await api.get("/api/v1/beehive");
      console.log("✅ Colmeias encontradas:", beehivesResponse.data);
      return beehivesResponse.data;
    } else {
      console.log("⚠️ Usuário não logado ou token não encontrado");
      return null;
    }
  } catch (error) {
    console.error("❌ Erro no teste da API:", error);
    throw error;
  }
};

export const getBeehive = async (id) => {
  try {
    console.log("🔄 Buscando colmeia com ID:", id);
    const response = await api.get(`/api/v1/beehive/${id}`);
    console.log("✅ Colmeia encontrada:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao buscar colmeia:", error);
    throw error;
  }
};

export const getBeehives = async () => {
  try {
    const user_token = await getToken();
    const user = JSON.parse(await AsyncStorage.getItem("user") || "{}");
    
    console.log("🔄 Buscando colmeias do usuário:", user.id);
    console.log("🔑 Token disponível:", user_token ? "Sim" : "Não");
    
    const response = await api.get("/api/v1/beehive");
    console.log("✅ Colmeias encontradas:", response.data.length);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao buscar colmeias:", error);
    throw error;
  }
};

export const getUserBeehives = async () => {
  try {
    const user_token = await getToken();
    const user = JSON.parse(await AsyncStorage.getItem("user") || "{}");

    if (!user_token || !user.id) {
      throw new Error("Token ou usuário não encontrado");
    }

    console.log("🔄 Buscando colmeias do usuário:", user.id);
    const response = await api.get("/api/v1/beehive");
    console.log("✅ Colmeias encontradas:", response.data.length);

    return response.data;
  } catch (error) {
    console.error("❌ Erro ao buscar colmeias do usuário:", error);
    throw error;
  }
};

export const createBeehive = async (beehiveData) => {
  try {
    console.log("🔄 Criando nova colmeia:", beehiveData);
    const response = await api.post("/api/v1/beehive", beehiveData);
    console.log("✅ Colmeia criada:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao criar colmeia:", error);
    throw error;
  }
};

export const updateBeehive = async (id, beehiveData) => {
  try {
    console.log("🔄 Atualizando colmeia:", id, beehiveData);
    const response = await api.put(`/api/v1/beehive/${id}`, beehiveData);
    console.log("✅ Colmeia atualizada:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao atualizar colmeia:", error);
    throw error;
  }
};

export const deleteBeehive = async (id) => {
  try {
    console.log("🔄 Deletando colmeia:", id);
    const response = await api.delete(`/api/v1/beehive/${id}`);
    console.log("✅ Colmeia deletada");
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao deletar colmeia:", error);
    throw error;
  }
};
