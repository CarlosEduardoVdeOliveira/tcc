import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { getApiUrl } from "../utils/config.js";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const token = await AsyncStorage.getItem("user_token");
        const userData = await AsyncStorage.getItem("user");

        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.log("Erro ao carregar dados do AsyncStorage", error);
      } finally {
        setLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const signin = async (email, password) => {
    try {
      console.log("🔐 Tentando fazer login com:", email);
      console.log("🌐 URL da API:", getApiUrl());
      
      const response = await axios.post(`${getApiUrl()}login`, {
        email,
        password,
      });

      console.log("✅ Resposta do login:", response.data);

      const { user, token } = response.data;

      await AsyncStorage.setItem("user_token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return { success: true };
    } catch (error) {
      console.error("❌ Erro no login:", error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        return { error: true, message: "E-mail ou senha inválidos" };
      } else if (error.response?.status === 400) {
        return { error: true, message: error.response.data?.message || "Dados inválidos" };
      } else if (error.code === 'ECONNREFUSED') {
        return { error: true, message: "Servidor não está rodando. Verifique se o backend está ativo." };
      } else {
        return { error: true, message: "Erro de conexão. Tente novamente." };
      }
    }
  };

  const signout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user_token");
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
