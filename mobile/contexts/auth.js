import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

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
          console.log("[Auth] Dados carregados do AsyncStorage (modo offline)");
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.log("[Auth] Erro ao carregar dados do AsyncStorage:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const loginRequest = async (email, password) => {
    const response = await axios.post(
      "http://10.0.2.2:3000/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 10000,
      }
    );
    return response.data;
  };

  const signin = async (email, password) => {
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    // Senhas alternativas para tentar corrigir erros comuns
    const passwordVariations = [
      cleanPassword,
      cleanPassword.replace(/\s/g, ""),
      cleanPassword.toLowerCase(),
    ];

    for (const pwd of passwordVariations) {
      try {
        const loginData = await loginRequest(cleanEmail, pwd);

        const { user, token } = loginData;

        // Armazenar localmente
        await AsyncStorage.setItem("user_token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        setUser(user);

        console.log("[Auth] Login online bem-sucedido.");
        return { success: true };
      } catch (error) {
        // Ignora erro e tenta próxima variação
        console.log(error, "Erro ao tentar fazer login.");
      }
    }

    // ⚠️ Modo offline: validação local
    try {
      const storedUserStr = await AsyncStorage.getItem("user");
      const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;

      if (
        storedUser &&
        storedUser.email === cleanEmail &&
        storedUser.password === cleanPassword // precisa salvar senha no cadastro offline!
      ) {
        setUser(storedUser);
        console.log("[Auth] Login em modo offline bem-sucedido.");
        return {
          success: true,
          message: "Você está em modo offline.",
        };
      } else {
        return {
          error: true,
          message: "Falha no login. Sem conexão e/ou dados inválidos.",
        };
      }
    } catch (offlineError) {
      console.log("[Auth] Erro no login offline:", offlineError);
      return {
        error: true,
        message: "Erro no login offline. Tente novamente.",
      };
    }
  };

  const signout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user_token");
    await AsyncStorage.removeItem("user");
    console.log("[Auth] Usuário desconectado.");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
