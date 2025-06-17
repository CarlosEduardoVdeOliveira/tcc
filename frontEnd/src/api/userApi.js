import { Api } from "./api.js";

export const getUser = (id) => {
  const user_token = localStorage.getItem("user_token");
  return Api.get(`/producer/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
  
export const createUser = (data) => Api.post("/producer", data);

export const updateUser = (data, id) => {
  const user_token = localStorage.getItem("user_token");
  return Api.put(`/producer/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const deleteUser = (id) => {
  const user_token = localStorage.getItem("user_token");
  return Api.delete(`/producer/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
