import { useContext } from "react";
import { AuthContext } from "../contexts/auth.js";

export const useAuth = () => useContext(AuthContext);
