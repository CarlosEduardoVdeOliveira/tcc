// Configuração da API
// Altere o IP abaixo para o IP da sua máquina na rede local
const API_CONFIG = {
  // Para desenvolvimento local - use o IP da sua máquina
  BASE_URL: "http://192.168.15.22:3000/api/v1", // IP correto da sua máquina
  
  // Para desenvolvimento com emulador Android
  // BASE_URL: "http://10.0.2.2:3000/api/v1",
  
  // Para desenvolvimento com emulador iOS
  // BASE_URL: "http://localhost:3000/api/v1",
  
  // Para produção (quando publicar)
  // BASE_URL: "https://seu-dominio.com/api/v1",
};

export default API_CONFIG; 