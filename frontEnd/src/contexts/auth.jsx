import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    const userData = localStorage.getItem("user");

    console.log("AuthProvider - Token recuperado:", token);
    console.log("AuthProvider - User data recuperado:", userData);

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  const signin = async (email, password) => {
    try {
      console.log("Tentando fazer login com:", email);
      const response = await axios.post("http://localhost:3000/api/v1/login", {
        email,
        password,
      });

      const { user, token } = response.data;

      console.log("Login bem-sucedido. Token recebido:", token);
      console.log("User recebido:", user);

      localStorage.setItem("user_token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return { success: true };
    } catch (error) {
      console.error("Erro no login:", error.response?.data);
      return { error: false, message: "E-mail ou senha inválidos" };
    }
  };

  const signout = () => {
    console.log("Fazendo logout");
    setUser(null);
    localStorage.removeItem("user_token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
