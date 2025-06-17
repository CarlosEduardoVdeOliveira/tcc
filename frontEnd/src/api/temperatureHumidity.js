import { Api } from "./api.js";

/* TemperatureHumidity */
export const getTemperatureHumidity = (id) => {
  const user_token = localStorage.getItem("user_token");
  console.log("getTemperatureHumidity - Token:", user_token);
  return Api.get(`/temperature_humidity/beehive/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const getTemperatureHumidityById = (id) => {
  const user_token = localStorage.getItem("user_token");
  console.log("getTemperatureHumidityById - Token:", user_token);
  return Api.get(`/temperature_humidity/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const createTemperatureHumidity = (data) => {
  const user_token = localStorage.getItem("user_token");
  console.log("createTemperatureHumidity - Token:", user_token);
  return Api.post("/temperature_humidity", data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const updateTemperatureHumidity = (data, id) => {
  const user_token = localStorage.getItem("user_token");
  console.log("updateTemperatureHumidity - Token:", user_token);
  return Api.put(`/temperature_humidity/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};

export const deleteTemperatureHumidity = (id) => {
  const user_token = localStorage.getItem("user_token");
  console.log("deleteTemperatureHumidity - Token:", user_token);
  return Api.delete(`/temperature_humidity/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
};
