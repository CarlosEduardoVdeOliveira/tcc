import { Api } from "./api.js";

/* Activity */
const user_token = localStorage.getItem("user_token");
export const getActivity = (id) =>
  Api.get(`/activity/beehive/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });

export const createActivity = (data) =>
  Api.post("/activity", data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
export const updateActivity = (data, id) =>
  Api.put(`/activity/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
export const deleteActivity = (id) =>
  Api.delete(`/activity/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
