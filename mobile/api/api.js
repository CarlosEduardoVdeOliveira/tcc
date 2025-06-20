import axios from "axios";

export const Api = axios.create({
  baseURL: "http://192.168.15.22:3000/api/v1",
  timeout: 10000,
});
