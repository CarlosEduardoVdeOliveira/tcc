import { Api } from "./api.js";

/* Disease */
const user_token = localStorage.getItem("user_token");

export const getDisease = (id) =>
  Api.get(`/disease/beehive/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
  
export const createDisease = (data) =>
  Api.post("/disease", data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
export const updateDisease = (data, id) =>
  Api.put(`/disease/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
export const deleteDisease = (id) =>
  Api.delete(`/disease/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
