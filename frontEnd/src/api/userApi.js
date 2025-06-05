import { Api } from "./api.js";

const user_token = localStorage.getItem("user_token")
export const getUser = (id) =>
  Api.get(`/producer/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
  
export const createUser = (data) => Api.post("/producer", data);

export const updateUser = (data, id) => Api.put(`/producer/${id}`, data, {
  headers: {
    Authorization: `Bearer ${user_token}`,
  },
});
export const deleteUser = (id) => Api.delete(`/producer/${id}`, {
  headers: {
    Authorization: `Bearer ${user_token}`,
  },
});
