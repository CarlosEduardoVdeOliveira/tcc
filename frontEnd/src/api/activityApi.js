import { Api } from "./api.js";

/* Activity */
export const getActivity = (id) => {
  const user_token = localStorage.getItem("user_token");
  return Api.get(`/activity/beehive/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const getActivityById = (id) => {
  const user_token = localStorage.getItem("user_token");
  return Api.get(`/activity/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const createActivity = (data) => {
  const user_token = localStorage.getItem("user_token");
  return Api.post("/activity", data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const updateActivity = (data, id) => {
  const user_token = localStorage.getItem("user_token");
  return Api.put(`/activity/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const deleteActivity = (id) => {
  const user_token = localStorage.getItem("user_token");
  return Api.delete(`/activity/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
