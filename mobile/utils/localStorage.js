import AsyncStorage from "@react-native-async-storage/async-storage";

class LocalStorageService {
  // Chaves para armazenamento
  static KEYS = {
    ACTIVITIES: 'local_activities_',
    FOODS: 'local_foods_',
    DISEASES: 'local_diseases_',
    PRODUCTION_HONEY: 'local_production_honey_',
    TEMPERATURE_HUMIDITY: 'local_temperature_humidity_',
    BEEHIVES: 'local_beehives',
    USER_DATA: 'user_data',
  };

  // Salvar dados localmente
  async saveData(key, data, beehiveId = null) {
    try {
      const storageKey = beehiveId ? `${key}${beehiveId}` : key;
      await AsyncStorage.setItem(storageKey, JSON.stringify(data));
      console.log(`Dados salvos localmente: ${storageKey}`);
    } catch (error) {
      console.error(`Erro ao salvar dados localmente: ${key}`, error);
    }
  }

  // Carregar dados localmente
  async loadData(key, beehiveId = null) {
    try {
      const storageKey = beehiveId ? `${key}${beehiveId}` : key;
      const data = await AsyncStorage.getItem(storageKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Erro ao carregar dados localmente: ${key}`, error);
      return null;
    }
  }

  // Adicionar item a uma lista
  async addItem(key, item, beehiveId = null) {
    try {
      const storageKey = beehiveId ? `${key}${beehiveId}` : key;
      const existingData = await this.loadData(key, beehiveId) || [];
      
      // Gerar ID local se não existir
      if (!item.id) {
        item.id = `local_${Date.now()}_${Math.random()}`;
        item.isLocal = true;
      }
      
      existingData.push(item);
      await this.saveData(key, existingData, beehiveId);
      
      console.log(`Item adicionado localmente: ${storageKey}`);
      return item;
    } catch (error) {
      console.error(`Erro ao adicionar item localmente: ${key}`, error);
      throw error;
    }
  }

  // Atualizar item em uma lista
  async updateItem(key, itemId, updatedItem, beehiveId = null) {
    try {
      const storageKey = beehiveId ? `${key}${beehiveId}` : key;
      const existingData = await this.loadData(key, beehiveId) || [];
      
      const index = existingData.findIndex(item => item.id === itemId);
      if (index !== -1) {
        existingData[index] = { ...existingData[index], ...updatedItem };
        await this.saveData(key, existingData, beehiveId);
        
        console.log(`Item atualizado localmente: ${storageKey}`);
        return existingData[index];
      }
      
      throw new Error(`Item não encontrado: ${itemId}`);
    } catch (error) {
      console.error(`Erro ao atualizar item localmente: ${key}`, error);
      throw error;
    }
  }

  // Remover item de uma lista
  async removeItem(key, itemId, beehiveId = null) {
    try {
      const storageKey = beehiveId ? `${key}${beehiveId}` : key;
      const existingData = await this.loadData(key, beehiveId) || [];
      
      const filteredData = existingData.filter(item => item.id !== itemId);
      await this.saveData(key, filteredData, beehiveId);
      
      console.log(`Item removido localmente: ${storageKey}`);
      return true;
    } catch (error) {
      console.error(`Erro ao remover item localmente: ${key}`, error);
      throw error;
    }
  }

  // Limpar dados de uma colmeia específica
  async clearBeehiveData(beehiveId) {
    try {
      const keys = [
        LocalStorageService.KEYS.ACTIVITIES,
        LocalStorageService.KEYS.FOODS,
        LocalStorageService.KEYS.DISEASES,
        LocalStorageService.KEYS.PRODUCTION_HONEY,
        LocalStorageService.KEYS.TEMPERATURE_HUMIDITY,
      ];

      for (const key of keys) {
        await AsyncStorage.removeItem(`${key}${beehiveId}`);
      }
      
      console.log(`Dados da colmeia ${beehiveId} removidos localmente`);
    } catch (error) {
      console.error(`Erro ao limpar dados da colmeia: ${beehiveId}`, error);
    }
  }

  // Limpar todos os dados locais
  async clearAllData() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const localKeys = keys.filter(key => 
        key.startsWith('local_') || 
        key === 'pendingOperations'
      );
      
      await AsyncStorage.multiRemove(localKeys);
      console.log("Todos os dados locais removidos");
    } catch (error) {
      console.error("Erro ao limpar todos os dados locais", error);
    }
  }

  // Obter tamanho dos dados armazenados
  async getStorageSize() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;
      
      for (const key of keys) {
        const data = await AsyncStorage.getItem(key);
        if (data) {
          totalSize += data.length;
        }
      }
      
      return totalSize;
    } catch (error) {
      console.error("Erro ao calcular tamanho do armazenamento", error);
      return 0;
    }
  }
}

export default new LocalStorageService(); 