import { Api } from "./api.js";

/* Disease */
export const getDisease = (id) => {
  const user_token = localStorage.getItem("user_token");
  console.log("getDisease - Token:", user_token);
  return Api.get(`/disease/beehive/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const getDiseaseById = (id) => {
  const user_token = localStorage.getItem("user_token");
  console.log("getDiseaseById - Token:", user_token);
  return Api.get(`/disease/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const createDisease = (data) => {
  const user_token = localStorage.getItem("user_token");
  console.log("createDisease - Token:", user_token);
  return Api.post("/disease", data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const updateDisease = (data, id) => {
  const user_token = localStorage.getItem("user_token");
  console.log("updateDisease - Token:", user_token);
  return Api.put(`/disease/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const deleteDisease = (id) => {
  const user_token = localStorage.getItem("user_token");
  console.log("deleteDisease - Token:", user_token);
  return Api.delete(`/disease/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
