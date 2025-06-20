import { Api } from "./api.js";

export const login = (data) => Api.post("/api/v1/login", data);

