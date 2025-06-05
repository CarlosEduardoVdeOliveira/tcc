import { Api } from "./api.js";

/* Food */
const user_token = localStorage.getItem("user_token");
export const getFood = (id) =>
  Api.get(`/food/beehive/${id} `, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
export const createFood = (data) =>
  Api.post("/food", data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
export const updateFood = (data, id) =>
  Api.put(`/food/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
export const deleteFood = (id) =>
  Api.delete(`/food/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
