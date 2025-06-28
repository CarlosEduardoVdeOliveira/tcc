import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "./api.js";

export const getBeehive = async (id) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return await Api.get(`/beehive/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const getBeehives = (config) => Api.get("/beehive", config);

export const getUserBeehives = async () => {
  const user_token = await AsyncStorage.getItem("user_token");
  const userData = await AsyncStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : {};

  if (!user_token || !user.id) {
    throw new Error("Token ou usuário não encontrado");
  }

  const response = await getBeehives({
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });

  return response.data.filter((b) => b.producerId === user.id);
};

export const createBeehive = async (data) => {
  const user_token = await AsyncStorage.getItem("user_token");
  console.log("Chamando createBeehive com:", {
    data,
    user_token: user_token ? "presente" : "ausente",
  });
  return await Api.post(`/beehive`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const updateBeehive = async (id, data) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return await Api.put(`/beehive/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const deleteBeehive = async (id) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return await Api.delete(`/beehive/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
