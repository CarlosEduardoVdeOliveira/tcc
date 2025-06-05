import { Api } from "./api.js";

/* ProductionHoney */
const user_token = localStorage.getItem("user_token");
export const getProductionHoney = (id) =>
  Api.get(`/production_honey/beehive/${id} `, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
export const createProductionHoney = (data) =>
  Api.post("/production_honey", data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
export const updateProductionHoney = (data, id) =>
  Api.put(`/production_honey/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
export const deleteProductionHoney = (id) =>
  Api.delete(`/production_honey/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
