import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "./api.js";

/* ProductionHoney */
export const getProductionHoney = async (id) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.get(`/production_honey/beehive/${id} `, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const createProductionHoney = async (data) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.post("/production_honey", data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const updateProductionHoney = async (data, id) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.put(`/production_honey/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const deleteProductionHoney = async (id) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.delete(`/production_honey/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
