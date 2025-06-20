import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "./api.js";

/* Food */
export const getFood = async (id) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.get(`/food/beehive/${id} `, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const createFood = async (data) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.post("/food", data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const updateFood = async (data, id) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.put(`/food/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const deleteFood = async (id) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.delete(`/food/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
