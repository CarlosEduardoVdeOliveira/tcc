import { Api } from "./api.js";

/* Food */
export const getFood = (id) => {
  const user_token = localStorage.getItem("user_token");
  console.log("getFood - Token:", user_token);
  return Api.get(`/food/beehive/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const getFoodById = (id) => {
  const user_token = localStorage.getItem("user_token");
  console.log("getFoodById - Token:", user_token);
  return Api.get(`/food/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const createFood = (data) => {
  const user_token = localStorage.getItem("user_token");
  console.log("createFood - Token:", user_token);
  return Api.post("/food", data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const updateFood = (data, id) => {
  const user_token = localStorage.getItem("user_token");
  console.log("updateFood - Token:", user_token);
  return Api.put(`/food/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const deleteFood = (id) => {
  const user_token = localStorage.getItem("user_token");
  console.log("deleteFood - Token:", user_token);
  return Api.delete(`/food/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
