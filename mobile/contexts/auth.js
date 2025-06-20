import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import API_CONFIG from "../constants/config.js";

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
      const response = await axios.post(`${API_CONFIG.BASE_URL}/login`, {
        email,
        password,
      });

      const { user, token } = response.data;

      await AsyncStorage.setItem("user_token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return { success: true };
    } catch (error) {
      return { error: true, message: "E-mail ou senha inválidos" };
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
