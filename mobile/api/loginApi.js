import axios from "axios";
import { Api } from "./api.js";

export const login = (data) => {
  console.log("=== API LOGIN DEBUG ===");
  console.log("Dados recebidos na API:", data);
  console.log("Tipo dos dados:", typeof data);
  console.log("Email no objeto:", data.email);
  console.log("Password no objeto:", data.password);
  console.log("JSON.stringify dos dados:", JSON.stringify(data));

  // Tentar primeiro com JSON (padrão)
  return Api.post("/login", data);
};

// Função alternativa para testar com form-data
export const loginFormData = (data) => {
  const formData = new FormData();
  formData.append("email", data.email);
  formData.append("password", data.password);

  console.log("FormData criado:", formData);

  // Não definir Content-Type manualmente, deixar o axios definir
  return Api.post("/login", formData);
};

// Função que simula exatamente o Insomnia
export const loginInsomniaStyle = async (data) => {
  console.log("=== TESTE ESTILO INSOMNIA ===");

  try {
    const response = await axios.post(
      "http://10.0.2.2:3000/api/v1/login",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "axios/1.6.0",
        },
        timeout: 10000,
        validateStatus: function (status) {
          return status < 500; // Resolve apenas para status < 500
        },
      }
    );

    console.log("Resposta estilo Insomnia:", response.data);
    return response;
  } catch (error) {
    console.error("Erro estilo Insomnia:", error.response?.data);
    throw error;
  }
};

// Função de teste direta com axios
export const loginDirect = async (data) => {
  console.log("=== TESTE DIRETO COM AXIOS ===");

  try {
    const response = await axios.post(
      "http://10.0.2.2:3000/api/v1/login",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 10000,
      }
    );

    console.log("Resposta direta:", response.data);
    return response;
  } catch (error) {
    console.error("Erro na requisição direta:", error.response?.data);
    throw error;
  }
};

// Função que testa diferentes variações dos dados
export const loginTestVariations = async (email, password) => {
  console.log("=== TESTE DE VARIAÇÕES ===");

  const variations = [
    { email: email, password: password },
    { email: email.toLowerCase(), password: password },
    { email: email.trim(), password: password.trim() },
    { email: email.toLowerCase().trim(), password: password.trim() },
  ];

  for (let i = 0; i < variations.length; i++) {
    const variation = variations[i];
    console.log(`Testando variação ${i + 1}:`, variation);

    try {
      const response = await axios.post(
        "http://10.0.2.2:3000/api/v1/login",
        variation,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 5000,
        }
      );

      console.log(`Variação ${i + 1} funcionou:`, response.data);
      return response;
    } catch (error) {
      console.log(
        `Variação ${i + 1} falhou:`,
        error.response?.status,
        error.response?.data?.message
      );
    }
  }

  throw new Error("Todas as variações falharam");
};

// Função para verificar se o usuário existe
export const checkUserExists = async (email) => {
  console.log("=== VERIFICANDO SE USUÁRIO EXISTE ===");

  try {
    // Tentar buscar o usuário (se a API tiver endpoint para isso)
    const response = await axios.get(
      `http://10.0.2.2:3000/api/v1/producer?email=${email}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 5000,
      }
    );

    console.log("Usuário encontrado:", response.data);
    return response.data;
  } catch (error) {
    console.log(
      "Erro ao verificar usuário:",
      error.response?.status,
      error.response?.data
    );
    return null;
  }
};

// Função para testar login com dados exatos do Insomnia
export const loginExactInsomnia = async (email, password) => {
  console.log("=== TESTE EXATO INSOMNIA ===");

  // Dados exatos que funcionam no Insomnia
  const exactData = {
    email: email,
    password: password,
  };

  console.log("Dados exatos:", exactData);
  console.log("JSON stringify:", JSON.stringify(exactData));

  try {
    const response = await axios.post(
      "http://10.0.2.2:3000/api/v1/login",
      exactData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "axios/1.6.0",
          Connection: "keep-alive",
        },
        timeout: 10000,
      }
    );

    console.log("Resposta exata Insomnia:", response.data);
    return response;
  } catch (error) {
    console.error("Erro exato Insomnia:", error.response?.data);
    throw error;
  }
};
