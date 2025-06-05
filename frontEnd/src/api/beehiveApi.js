import { Api } from "./api.js";

const user_token = localStorage.getItem("user_token");

export const getBeehive = async (id) => {
  return await Api.get(`/beehive/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const getBeehives = (config) => Api.get("/beehive", config);

export const getUserBeehives = async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user_token || !user.id) {
    throw new Error("Token ou usuário não encontrado");
  }

  const response = await getBeehives({
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });

  return response.data.filter((b) => b.producerId === user.id);
};

export const createBeehive = async (data) => {
  return await Api.post(`/beehive`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
export const updateBeehive = async (id, data) => {
  return await Api.put(`/beehive/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
export const deleteBeehive = async (id) => {
  return await Api.delete(`/beehive/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
