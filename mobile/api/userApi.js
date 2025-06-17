import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "./api.js";

const getToken = async () => {
  try {
    return await AsyncStorage.getItem("user_token");
  } catch (error) {
    console.error("Erro ao obter token:", error);
    return null;
  }
};

export const getUser = async (id) => {
  const user_token = await getToken();
  return Api.get(`/producer/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
  
export const createUser = (data) => Api.post("/producer", data);

export const updateUser = async (data, id) => {
  const user_token = await getToken();
  return Api.put(`/producer/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const deleteUser = async (id) => {
  const user_token = await getToken();
  return Api.delete(`/producer/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
