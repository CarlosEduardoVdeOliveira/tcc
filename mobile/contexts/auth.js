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
      console.log("=== DEBUG LOGIN SIMPLIFICADO ===");
      console.log("Email:", email);
      console.log("Password:", password);
      
      // Limpar espaços em branco
      const cleanEmail = email.trim();
      const cleanPassword = password.trim();
      
      console.log("Dados limpos:", { email: cleanEmail, password: cleanPassword });
      
      // Primeiro verificar se o usuário existe
      console.log("Verificando se o usuário existe no servidor...");
      try {
        const userCheckResponse = await axios.get(`http://10.0.2.2:3000/api/v1/producer?email=${cleanEmail}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 5000,
        });
        console.log("Usuário encontrado no servidor:", userCheckResponse.data);
      } catch (userCheckError) {
        console.log("Erro ao verificar usuário:", userCheckError.response?.status, userCheckError.response?.data);
        console.log("Isso pode indicar que o usuário não existe ou o endpoint não está disponível");
      }
      
      // Teste direto com axios (sem configurações da API)
      console.log("Fazendo requisição direta com axios...");
      
      // Testar com diferentes variações da senha
      const passwordVariations = [
        cleanPassword,
        cleanPassword.trim(),
        cleanPassword.replace(/\s/g, ''),
        cleanPassword.toLowerCase(),
      ];
      
      for (let i = 0; i < passwordVariations.length; i++) {
        const testPassword = passwordVariations[i];
        console.log(`Testando senha variação ${i + 1}: "${testPassword}"`);
        
        try {
          const response = await axios.post("http://10.0.2.2:3000/api/v1/login", {
            email: cleanEmail,
            password: testPassword
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            timeout: 10000,
          });
          
          console.log(`Variação ${i + 1} funcionou!`);
          console.log("Resposta do servidor:", response.data);
          console.log("Status da resposta:", response.status);

          const { user, token } = response.data;

          await AsyncStorage.setItem("user_token", token);
          await AsyncStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          
          console.log("Login realizado com sucesso para:", user.email);
          return { success: true };
        } catch (variationError) {
          console.log(`Variação ${i + 1} falhou:`, variationError.response?.status, variationError.response?.data?.message);
        }
      }
      
      // Se todas as variações falharem, tentar uma última vez com os dados originais
      console.log("Todas as variações falharam, tentando com dados originais...");
      
      const response = await axios.post("http://10.0.2.2:3000/api/v1/login", {
        email: cleanEmail,
        password: cleanPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 10000,
      });
      
      console.log("Resposta do servidor:", response.data);
      console.log("Status da resposta:", response.status);

      const { user, token } = response.data;

      await AsyncStorage.setItem("user_token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      
      console.log("Login realizado com sucesso para:", user.email);
      return { success: true };
    } catch (error) {
      console.error("=== ERRO NO LOGIN SIMPLIFICADO ===");
      console.error("Erro completo:", error);
      console.error("Status do erro:", error.response?.status);
      console.error("URL da requisição:", error.config?.url);
      console.error("Dados enviados:", error.config?.data);
      console.error("Headers da requisição:", error.config?.headers);
      console.error("Método da requisição:", error.config?.method);
      console.error("Resposta do servidor:", error.response?.data);
      
      if (error.response?.status === 401) {
        return { error: true, message: "E-mail ou senha inválidos" };
      } else if (error.response?.status === 404) {
        return { error: true, message: "Servidor não encontrado. Verifique a conexão." };
      } else if (error.response?.status === 500) {
        return { error: true, message: "Erro interno do servidor. Tente novamente." };
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
