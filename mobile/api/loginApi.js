import { Api } from "./api.js";

export const login = (data) => Api.post("/login", data);

