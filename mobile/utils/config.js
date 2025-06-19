import { Platform } from 'react-native';

// Configuração da API
export const API_CONFIG = {
  // Para Android Emulator
  ANDROID_EMULATOR: "http://10.0.2.2:3000/api/v1",
  
  // Para iOS Simulator
  IOS_SIMULATOR: "http://localhost:3000/api/v1",
  
  // Para dispositivo físico (IP da sua máquina)
  PHYSICAL_DEVICE: "http://192.168.15.22:3000/api/v1",
  
  // Para desenvolvimento web
  WEB: "http://localhost:3000/api/v1",
  
  // Para teste local (se o servidor estiver rodando na mesma máquina)
  LOCAL: "http://localhost:3000/api/v1",
};

// Função para obter a URL correta baseada na plataforma
export const getApiUrl = () => {
  const platform = Platform.OS;
  console.log("Plataforma detectada:", platform);
  
  let url;
  if (platform === 'android') {
    url = API_CONFIG.ANDROID_EMULATOR;
  } else if (platform === 'ios') {
    url = API_CONFIG.IOS_SIMULATOR;
  } else {
    url = API_CONFIG.WEB;
  }
  
  console.log("URL da API configurada:", url);
  return url;
};
