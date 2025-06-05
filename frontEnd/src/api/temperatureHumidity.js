import { Api } from "./api.js";

/* TemperatureHumidity */
const user_token = localStorage.getItem("user_token");
export const getTemperatureHumidity = (id) =>
  Api.get(`/temperature_humidity/beehive/${id} `, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
export const createTemperatureHumidity = (data) =>
  Api.post("/temperature_humidity", data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
export const updateTemperatureHumidity = (data, id) =>
  Api.put(`/temperature_humidity/${id}`, data, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
export const deleteTemperatureHumidity = (id) =>
  Api.delete(`/temperature_humidity/${id}`, {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  });
