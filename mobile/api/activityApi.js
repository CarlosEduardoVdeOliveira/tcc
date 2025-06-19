import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const getToken = async () => await AsyncStorage.getItem("user_token");

const api = axios.create({
  baseURL: "http://192.168.15.22:3000/api/v1",
});

api.interceptors.request.use(async (config) => {
  const user_token = await getToken();
  if (user_token) {
    config.headers.Authorization = `Bearer ${user_token}`;
  }
  return config;
});

/* Activity */
export const getActivity = async (beehiveId) => {
  const response = await api.get(`/activities?beehiveId=${beehiveId}`);
  return response;
};

export const createActivity = async (activityData) => {
  const response = await api.post("/activities", activityData);
  return response;
};

export const updateActivity = async (id, activityData) => {
  const response = await api.put(`/activities/${id}`, activityData);
  return response;
};

export const deleteActivity = async (id) => {
  const response = await api.delete(`/activities/${id}`);
  return response;
};
