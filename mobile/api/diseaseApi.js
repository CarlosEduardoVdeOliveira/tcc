import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "./api.js";

/* Disease */
export const getDisease = async (id) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.get(`/disease/beehive/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
  
export const createDisease = async (data) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.post("/disease", data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const updateDisease = async (data, id) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.put(`/disease/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const deleteDisease = async (id) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.delete(`/disease/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
