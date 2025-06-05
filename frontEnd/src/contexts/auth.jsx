import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  const signin = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/login", {
        email,
        password,
      });

      const { user, token } = response.data;

      localStorage.setItem("user_token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return { success: true };
    } catch (error) {
      return { error: false, message: "E-mail ou senha inválidos" };
    }
  };

  const signout = () => {
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
