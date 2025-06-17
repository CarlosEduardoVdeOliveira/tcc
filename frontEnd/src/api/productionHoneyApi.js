import { Api } from "./api.js";

/* ProductionHoney */
export const getProductionHoney = (id) => {
  const user_token = localStorage.getItem("user_token");
  console.log("getProductionHoney - Token:", user_token);
  return Api.get(`/production_honey/beehive/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const getProductionHoneyById = (id) => {
  const user_token = localStorage.getItem("user_token");
  console.log("getProductionHoneyById - Token:", user_token);
  return Api.get(`/production_honey/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const createProductionHoney = (data) => {
  const user_token = localStorage.getItem("user_token");
  console.log("createProductionHoney - Token:", user_token);
  return Api.post("/production_honey", data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const updateProductionHoney = (data, id) => {
  const user_token = localStorage.getItem("user_token");
  console.log("updateProductionHoney - Token:", user_token);
  return Api.put(`/production_honey/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const deleteProductionHoney = (id) => {
  const user_token = localStorage.getItem("user_token");
  console.log("deleteProductionHoney - Token:", user_token);
  return Api.delete(`/production_honey/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
