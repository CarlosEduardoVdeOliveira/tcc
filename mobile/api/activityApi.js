import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "./api.js";

/* Activity */
export const getActivity = async (id) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.get(`/activity/beehive/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const createActivity = async (data) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.post("/activity", data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const updateActivity = async (data, id) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.put(`/activity/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const deleteActivity = async (id) => {
  const user_token = await AsyncStorage.getItem("user_token");
  return Api.delete(`/activity/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
