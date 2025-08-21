import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações para modo offline
export const OFFLINE_CONFIG = {
  // Diretório para armazenar operações offline
  storageDir: path.join(__dirname, '../../offline-storage'),
  
  // Arquivo para operações pendentes
  pendingOperationsFile: 'pending-operations.json',
  
  // Arquivo para cache de dados
  dataCacheFile: 'data-cache.json',
  
  // Tempo máximo para manter operações offline (em dias)
  maxOfflineAge: 7,
  
  // Intervalo para verificar conectividade (em segundos)
  connectivityCheckInterval: 30,
  
  // Número máximo de tentativas de sincronização
  maxSyncRetries: 3,
  
  // Delay entre tentativas de sincronização (em segundos)
  syncRetryDelay: 60,
  
  // Tamanho máximo do cache (em MB)
  maxCacheSize: 100,
  
  // Tipos de operações que podem ser executadas offline
  supportedOfflineOperations: [
    'CREATE_ACTIVITY',
    'UPDATE_ACTIVITY',
    'DELETE_ACTIVITY',
    'CREATE_FOOD',
    'UPDATE_FOOD',
    'DELETE_FOOD',
    'CREATE_DISEASE',
    'UPDATE_DISEASE',
    'DELETE_DISEASE',
    'CREATE_PRODUCTION_HONEY',
    'UPDATE_PRODUCTION_HONEY',
    'DELETE_PRODUCTION_HONEY',
    'CREATE_TEMPERATURE_HUMIDITY',
    'UPDATE_TEMPERATURE_HUMIDITY',
    'DELETE_TEMPERATURE_HUMIDITY',
    'CREATE_BEEHIVE',
    'UPDATE_BEEHIVE',
    'DELETE_BEEHIVE'
  ]
};

// Função para inicializar diretório de armazenamento offline
export const initializeOfflineStorage = () => {
  try {
    if (!fs.existsSync(OFFLINE_CONFIG.storageDir)) {
      fs.mkdirSync(OFFLINE_CONFIG.storageDir, { recursive: true });
      console.log('Diretório de armazenamento offline criado:', OFFLINE_CONFIG.storageDir);
    }
    
    // Criar arquivos se não existirem
    const pendingOpsPath = path.join(OFFLINE_CONFIG.storageDir, OFFLINE_CONFIG.pendingOperationsFile);
    const dataCachePath = path.join(OFFLINE_CONFIG.storageDir, OFFLINE_CONFIG.dataCacheFile);
    
    if (!fs.existsSync(pendingOpsPath)) {
      fs.writeFileSync(pendingOpsPath, JSON.stringify([], null, 2));
    }
    
    if (!fs.existsSync(dataCachePath)) {
      fs.writeFileSync(dataCachePath, JSON.stringify({}, null, 2));
    }
    
    console.log('Armazenamento offline inicializado com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar armazenamento offline:', error);
  }
};

// Função para salvar operação offline
export const saveOfflineOperation = (operation) => {
  try {
    const pendingOpsPath = path.join(OFFLINE_CONFIG.storageDir, OFFLINE_CONFIG.pendingOperationsFile);
    
    if (!fs.existsSync(pendingOpsPath)) {
      fs.writeFileSync(pendingOpsPath, JSON.stringify([], null, 2));
    }
    
    const pendingOps = JSON.parse(fs.readFileSync(pendingOpsPath, 'utf8'));
    pendingOps.push(operation);
    
    fs.writeFileSync(pendingOpsPath, JSON.stringify(pendingOps, null, 2));
    
    console.log('Operação offline salva:', operation.id);
    return true;
  } catch (error) {
    console.error('Erro ao salvar operação offline:', error);
    return false;
  }
};

// Função para carregar operações offline pendentes
export const loadPendingOfflineOperations = () => {
  try {
    const pendingOpsPath = path.join(OFFLINE_CONFIG.storageDir, OFFLINE_CONFIG.pendingOperationsFile);
    
    if (!fs.existsSync(pendingOpsPath)) {
      return [];
    }
    
    const pendingOps = JSON.parse(fs.readFileSync(pendingOpsPath, 'utf8'));
    
    // Filtrar operações antigas
    const cutoffDate = new Date(Date.now() - OFFLINE_CONFIG.maxOfflineAge * 24 * 60 * 60 * 1000);
    const validOps = pendingOps.filter(op => new Date(op.timestamp) > cutoffDate);
    
    if (validOps.length !== pendingOps.length) {
      // Salvar operações filtradas
      fs.writeFileSync(pendingOpsPath, JSON.stringify(validOps, null, 2));
      console.log(`${pendingOps.length - validOps.length} operações antigas removidas`);
    }
    
    return validOps;
  } catch (error) {
    console.error('Erro ao carregar operações offline:', error);
    return [];
  }
};

// Função para remover operação offline
export const removeOfflineOperation = (operationId) => {
  try {
    const pendingOpsPath = path.join(OFFLINE_CONFIG.storageDir, OFFLINE_CONFIG.pendingOperationsFile);
    
    if (!fs.existsSync(pendingOpsPath)) {
      return false;
    }
    
    const pendingOps = JSON.parse(fs.readFileSync(pendingOpsPath, 'utf8'));
    const filteredOps = pendingOps.filter(op => op.id !== operationId);
    
    if (filteredOps.length !== pendingOps.length) {
      fs.writeFileSync(pendingOpsPath, JSON.stringify(filteredOps, null, 2));
      console.log('Operação offline removida:', operationId);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Erro ao remover operação offline:', error);
    return false;
  }
};

// Função para salvar dados em cache
export const saveDataToCache = (key, data) => {
  try {
    const cachePath = path.join(OFFLINE_CONFIG.storageDir, OFFLINE_CONFIG.dataCacheFile);
    
    if (!fs.existsSync(cachePath)) {
      fs.writeFileSync(cachePath, JSON.stringify({}, null, 2));
    }
    
    const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    cache[key] = {
      data,
      timestamp: new Date().toISOString(),
      size: JSON.stringify(data).length
    };
    
    // Verificar tamanho do cache
    const totalSize = Object.values(cache).reduce((sum, item) => sum + item.size, 0);
    const maxSizeBytes = OFFLINE_CONFIG.maxCacheSize * 1024 * 1024;
    
    if (totalSize > maxSizeBytes) {
      // Remover itens mais antigos
      const sortedKeys = Object.keys(cache).sort((a, b) => 
        new Date(cache[a].timestamp) - new Date(cache[b].timestamp)
      );
      
      while (totalSize > maxSizeBytes && sortedKeys.length > 0) {
        const oldestKey = sortedKeys.shift();
        totalSize -= cache[oldestKey].size;
        delete cache[oldestKey];
      }
    }
    
    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
    
    console.log('Dados salvos em cache:', key);
    return true;
  } catch (error) {
    console.error('Erro ao salvar dados em cache:', error);
    return false;
  }
};

// Função para carregar dados do cache
export const loadDataFromCache = (key) => {
  try {
    const cachePath = path.join(OFFLINE_CONFIG.storageDir, OFFLINE_CONFIG.dataCacheFile);
    
    if (!fs.existsSync(cachePath)) {
      return null;
    }
    
    const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    const cachedItem = cache[key];
    
    if (cachedItem) {
      // Verificar se o cache não expirou (7 dias)
      const cacheAge = Date.now() - new Date(cachedItem.timestamp).getTime();
      const maxAge = OFFLINE_CONFIG.maxOfflineAge * 24 * 60 * 60 * 1000;
      
      if (cacheAge < maxAge) {
        console.log('Dados carregados do cache:', key);
        return cachedItem.data;
      } else {
        // Remover cache expirado
        delete cache[key];
        fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
        console.log('Cache expirado removido:', key);
      }
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao carregar dados do cache:', error);
    return null;
  }
}; 