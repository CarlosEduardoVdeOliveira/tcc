import AsyncStorage from "@react-native-async-storage/async-storage";

// Simular estrutura de resposta da API
const createApiResponse = (data, success = true) => ({
  data,
  status: success ? 200 : 400,
  success
});

// Gerar IDs únicos para itens locais
const generateLocalId = () => `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Chaves para armazenamento local
const STORAGE_KEYS = {
  BEEHIVES: 'offline_beehives',
  ACTIVITIES: 'offline_activities',
  FOODS: 'offline_foods',
  DISEASES: 'offline_diseases',
  PRODUCTION_HONEY: 'offline_production_honey',
  TEMPERATURE_HUMIDITY: 'offline_temperature_humidity',
  USERS: 'offline_users',
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data'
};

// Funções auxiliares para AsyncStorage
const saveData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Erro ao salvar dados: ${key}`, error);
    return false;
  }
};

const loadData = async (key, defaultValue = []) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Erro ao carregar dados: ${key}`, error);
    return defaultValue;
  }
};

// ===== API OFFLINE PARA COLMEIAS =====
export const offlineGetBeehives = async () => {
  const beehives = await loadData(STORAGE_KEYS.BEEHIVES);
  return createApiResponse(beehives);
};

export const offlineGetBeehive = async (id) => {
  const beehives = await loadData(STORAGE_KEYS.BEEHIVES);
  const beehive = beehives.find(b => b.id === id);
  
  if (!beehive) {
    throw new Error('Colmeia não encontrada');
  }
  
  return createApiResponse(beehive);
};

export const offlineCreateBeehive = async (data) => {
  const beehives = await loadData(STORAGE_KEYS.BEEHIVES);
  
  const newBeehive = {
    id: generateLocalId(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isLocal: true
  };
  
  beehives.push(newBeehive);
  await saveData(STORAGE_KEYS.BEEHIVES, beehives);
  
  return createApiResponse(newBeehive);
};

export const offlineUpdateBeehive = async (id, data) => {
  const beehives = await loadData(STORAGE_KEYS.BEEHIVES);
  const index = beehives.findIndex(b => b.id === id);
  
  if (index === -1) {
    throw new Error('Colmeia não encontrada');
  }
  
  beehives[index] = {
    ...beehives[index],
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  await saveData(STORAGE_KEYS.BEEHIVES, beehives);
  return createApiResponse(beehives[index]);
};

export const offlineDeleteBeehive = async (id) => {
  const beehives = await loadData(STORAGE_KEYS.BEEHIVES);
  const filteredBeehives = beehives.filter(b => b.id !== id);
  
  await saveData(STORAGE_KEYS.BEEHIVES, filteredBeehives);
  
  // Remover dados relacionados à colmeia
  await Promise.all([
    AsyncStorage.removeItem(`${STORAGE_KEYS.ACTIVITIES}_${id}`),
    AsyncStorage.removeItem(`${STORAGE_KEYS.FOODS}_${id}`),
    AsyncStorage.removeItem(`${STORAGE_KEYS.DISEASES}_${id}`),
    AsyncStorage.removeItem(`${STORAGE_KEYS.PRODUCTION_HONEY}_${id}`),
    AsyncStorage.removeItem(`${STORAGE_KEYS.TEMPERATURE_HUMIDITY}_${id}`)
  ]);
  
  return createApiResponse({ success: true });
};

// ===== API OFFLINE PARA ATIVIDADES =====
export const offlineGetActivity = async (beehiveId) => {
  const activities = await loadData(`${STORAGE_KEYS.ACTIVITIES}_${beehiveId}`);
  return createApiResponse(activities);
};

export const offlineCreateActivity = async (data) => {
  const activities = await loadData(`${STORAGE_KEYS.ACTIVITIES}_${data.beehiveId}`);
  
  const newActivity = {
    id: generateLocalId(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isLocal: true
  };
  
  activities.push(newActivity);
  await saveData(`${STORAGE_KEYS.ACTIVITIES}_${data.beehiveId}`, activities);
  
  return createApiResponse(newActivity);
};

export const offlineUpdateActivity = async (data, id) => {
  const activities = await loadData(`${STORAGE_KEYS.ACTIVITIES}_${data.beehiveId}`);
  const index = activities.findIndex(a => a.id === id);
  
  if (index === -1) {
    throw new Error('Atividade não encontrada');
  }
  
  activities[index] = {
    ...activities[index],
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  await saveData(`${STORAGE_KEYS.ACTIVITIES}_${data.beehiveId}`, activities);
  return createApiResponse(activities[index]);
};

export const offlineDeleteActivity = async (id) => {
  // Buscar em todas as colmeias para encontrar a atividade
  const beehives = await loadData(STORAGE_KEYS.BEEHIVES);
  
  for (const beehive of beehives) {
    const activities = await loadData(`${STORAGE_KEYS.ACTIVITIES}_${beehive.id}`);
    const activityIndex = activities.findIndex(a => a.id === id);
    
    if (activityIndex !== -1) {
      activities.splice(activityIndex, 1);
      await saveData(`${STORAGE_KEYS.ACTIVITIES}_${beehive.id}`, activities);
      return createApiResponse({ success: true });
    }
  }
  
  throw new Error('Atividade não encontrada');
};

// ===== API OFFLINE PARA ALIMENTAÇÃO =====
export const offlineGetFood = async (beehiveId) => {
  const foods = await loadData(`${STORAGE_KEYS.FOODS}_${beehiveId}`);
  return createApiResponse(foods);
};

export const offlineCreateFood = async (data) => {
  const foods = await loadData(`${STORAGE_KEYS.FOODS}_${data.beehiveId}`);
  
  const newFood = {
    id: generateLocalId(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isLocal: true
  };
  
  foods.push(newFood);
  await saveData(`${STORAGE_KEYS.FOODS}_${data.beehiveId}`, foods);
  
  return createApiResponse(newFood);
};

export const offlineUpdateFood = async (data, id) => {
  const foods = await loadData(`${STORAGE_KEYS.FOODS}_${data.beehiveId}`);
  const index = foods.findIndex(f => f.id === id);
  
  if (index === -1) {
    throw new Error('Alimentação não encontrada');
  }
  
  foods[index] = {
    ...foods[index],
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  await saveData(`${STORAGE_KEYS.FOODS}_${data.beehiveId}`, foods);
  return createApiResponse(foods[index]);
};

export const offlineDeleteFood = async (id) => {
  const beehives = await loadData(STORAGE_KEYS.BEEHIVES);
  
  for (const beehive of beehives) {
    const foods = await loadData(`${STORAGE_KEYS.FOODS}_${beehive.id}`);
    const foodIndex = foods.findIndex(f => f.id === id);
    
    if (foodIndex !== -1) {
      foods.splice(foodIndex, 1);
      await saveData(`${STORAGE_KEYS.FOODS}_${beehive.id}`, foods);
      return createApiResponse({ success: true });
    }
  }
  
  throw new Error('Alimentação não encontrada');
};

// ===== API OFFLINE PARA DOENÇAS =====
export const offlineGetDisease = async (beehiveId) => {
  const diseases = await loadData(`${STORAGE_KEYS.DISEASES}_${beehiveId}`);
  return createApiResponse(diseases);
};

export const offlineCreateDisease = async (data) => {
  const diseases = await loadData(`${STORAGE_KEYS.DISEASES}_${data.beehiveId}`);
  
  const newDisease = {
    id: generateLocalId(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isLocal: true
  };
  
  diseases.push(newDisease);
  await saveData(`${STORAGE_KEYS.DISEASES}_${data.beehiveId}`, diseases);
  
  return createApiResponse(newDisease);
};

export const offlineUpdateDisease = async (data, id) => {
  const diseases = await loadData(`${STORAGE_KEYS.DISEASES}_${data.beehiveId}`);
  const index = diseases.findIndex(d => d.id === id);
  
  if (index === -1) {
    throw new Error('Doença não encontrada');
  }
  
  diseases[index] = {
    ...diseases[index],
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  await saveData(`${STORAGE_KEYS.DISEASES}_${data.beehiveId}`, diseases);
  return createApiResponse(diseases[index]);
};

export const offlineDeleteDisease = async (id) => {
  const beehives = await loadData(STORAGE_KEYS.BEEHIVES);
  
  for (const beehive of beehives) {
    const diseases = await loadData(`${STORAGE_KEYS.DISEASES}_${beehive.id}`);
    const diseaseIndex = diseases.findIndex(d => d.id === id);
    
    if (diseaseIndex !== -1) {
      diseases.splice(diseaseIndex, 1);
      await saveData(`${STORAGE_KEYS.DISEASES}_${beehive.id}`, diseases);
      return createApiResponse({ success: true });
    }
  }
  
  throw new Error('Doença não encontrada');
};

// ===== API OFFLINE PARA PRODUÇÃO DE MEL =====
export const offlineGetProductionHoney = async (beehiveId) => {
  const productionHoney = await loadData(`${STORAGE_KEYS.PRODUCTION_HONEY}_${beehiveId}`);
  return createApiResponse(productionHoney);
};

export const offlineCreateProductionHoney = async (data) => {
  const productionHoney = await loadData(`${STORAGE_KEYS.PRODUCTION_HONEY}_${data.beehiveId}`);
  
  const newProductionHoney = {
    id: generateLocalId(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isLocal: true
  };
  
  productionHoney.push(newProductionHoney);
  await saveData(`${STORAGE_KEYS.PRODUCTION_HONEY}_${data.beehiveId}`, productionHoney);
  
  return createApiResponse(newProductionHoney);
};

export const offlineUpdateProductionHoney = async (data, id) => {
  const productionHoney = await loadData(`${STORAGE_KEYS.PRODUCTION_HONEY}_${data.beehiveId}`);
  const index = productionHoney.findIndex(p => p.id === id);
  
  if (index === -1) {
    throw new Error('Produção de mel não encontrada');
  }
  
  productionHoney[index] = {
    ...productionHoney[index],
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  await saveData(`${STORAGE_KEYS.PRODUCTION_HONEY}_${data.beehiveId}`, productionHoney);
  return createApiResponse(productionHoney[index]);
};

export const offlineDeleteProductionHoney = async (id) => {
  const beehives = await loadData(STORAGE_KEYS.BEEHIVES);
  
  for (const beehive of beehives) {
    const productionHoney = await loadData(`${STORAGE_KEYS.PRODUCTION_HONEY}_${beehive.id}`);
    const productionIndex = productionHoney.findIndex(p => p.id === id);
    
    if (productionIndex !== -1) {
      productionHoney.splice(productionIndex, 1);
      await saveData(`${STORAGE_KEYS.PRODUCTION_HONEY}_${beehive.id}`, productionHoney);
      return createApiResponse({ success: true });
    }
  }
  
  throw new Error('Produção de mel não encontrada');
};

// ===== API OFFLINE PARA TEMPERATURA E UMIDADE =====
export const offlineGetTemperatureHumidity = async (beehiveId) => {
  const temperatureHumidity = await loadData(`${STORAGE_KEYS.TEMPERATURE_HUMIDITY}_${beehiveId}`);
  return createApiResponse(temperatureHumidity);
};

export const offlineCreateTemperatureHumidity = async (data) => {
  const temperatureHumidity = await loadData(`${STORAGE_KEYS.TEMPERATURE_HUMIDITY}_${data.beehiveId}`);
  
  const newTemperatureHumidity = {
    id: generateLocalId(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isLocal: true
  };
  
  temperatureHumidity.push(newTemperatureHumidity);
  await saveData(`${STORAGE_KEYS.TEMPERATURE_HUMIDITY}_${data.beehiveId}`, temperatureHumidity);
  
  return createApiResponse(newTemperatureHumidity);
};

export const offlineUpdateTemperatureHumidity = async (data, id) => {
  const temperatureHumidity = await loadData(`${STORAGE_KEYS.TEMPERATURE_HUMIDITY}_${data.beehiveId}`);
  const index = temperatureHumidity.findIndex(t => t.id === id);
  
  if (index === -1) {
    throw new Error('Medição de temperatura/umidade não encontrada');
  }
  
  temperatureHumidity[index] = {
    ...temperatureHumidity[index],
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  await saveData(`${STORAGE_KEYS.TEMPERATURE_HUMIDITY}_${data.beehiveId}`, temperatureHumidity);
  return createApiResponse(temperatureHumidity[index]);
};

export const offlineDeleteTemperatureHumidity = async (id) => {
  const beehives = await loadData(STORAGE_KEYS.BEEHIVES);
  
  for (const beehive of beehives) {
    const temperatureHumidity = await loadData(`${STORAGE_KEYS.TEMPERATURE_HUMIDITY}_${beehive.id}`);
    const tempIndex = temperatureHumidity.findIndex(t => t.id === id);
    
    if (tempIndex !== -1) {
      temperatureHumidity.splice(tempIndex, 1);
      await saveData(`${STORAGE_KEYS.TEMPERATURE_HUMIDITY}_${beehive.id}`, temperatureHumidity);
      return createApiResponse({ success: true });
    }
  }
  
  throw new Error('Medição de temperatura/umidade não encontrada');
};

// ===== API OFFLINE PARA AUTENTICAÇÃO =====
export const offlineLogin = async (email, password) => {
  // Simular autenticação offline
  const mockUser = {
    id: generateLocalId(),
    name: 'Usuário Offline',
    email: email,
    role: 'user',
    createdAt: new Date().toISOString()
  };
  
  const mockToken = `offline_token_${Date.now()}`;
  
  // Salvar dados do usuário
  await saveData(STORAGE_KEYS.USER_DATA, mockUser);
  await AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, mockToken);
  
  return createApiResponse({
    user: mockUser,
    token: mockToken
  });
};

export const offlineGetToken = async () => {
  return await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
};

export const offlineGetUser = async () => {
  const userData = await loadData(STORAGE_KEYS.USER_DATA);
  return userData;
};

// ===== FUNÇÕES AUXILIARES =====
export const initializeOfflineData = async () => {
  // Criar dados de exemplo se não existirem
  const beehives = await loadData(STORAGE_KEYS.BEEHIVES);
  
  if (beehives.length === 0) {
    const sampleBeehives = [
      {
        id: generateLocalId(),
        name: 'Colmeia Exemplo 1',
        location: 'Apiário Principal',
        latitude: -19.55,
        longitude: -42.64,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isLocal: true
      },
      {
        id: generateLocalId(),
        name: 'Colmeia Exemplo 2',
        location: 'Apiário Secundário',
        latitude: -19.56,
        longitude: -42.65,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isLocal: true
      }
    ];
    
    await saveData(STORAGE_KEYS.BEEHIVES, sampleBeehives);
    console.log('Dados de exemplo criados');
  }
};

export const clearAllOfflineData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const offlineKeys = keys.filter(key => 
      key.startsWith('offline_') || 
      key === 'user_token' || 
      key === 'user_data'
    );
    
    await AsyncStorage.multiRemove(offlineKeys);
    console.log('Todos os dados offline removidos');
  } catch (error) {
    console.error('Erro ao limpar dados offline:', error);
  }
}; 