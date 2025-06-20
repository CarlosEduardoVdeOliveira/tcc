import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

class SyncService {
  constructor() {
    this.pendingOperations = [];
    this.isOnline = true;
    this.syncInProgress = false;
    this.init();
  }

  async init() {
    // Carregar operações pendentes
    await this.loadPendingOperations();
    
    // Monitorar conectividade
    NetInfo.addEventListener(state => {
      const wasOffline = !this.isOnline;
      this.isOnline = state.isConnected;
      
      if (wasOffline && this.isOnline) {
        this.syncPendingOperations();
      }
    });
  }

  // Adicionar operação à fila
  async addPendingOperation(operation) {
    const pendingOp = {
      id: Date.now() + Math.random(),
      operation,
      timestamp: new Date().toISOString(),
      retries: 0
    };

    this.pendingOperations.push(pendingOp);
    await this.savePendingOperations();
    
    console.log("Operação adicionada à fila:", pendingOp);
  }

  // Salvar operações pendentes no AsyncStorage
  async savePendingOperations() {
    try {
      await AsyncStorage.setItem('pendingOperations', JSON.stringify(this.pendingOperations));
    } catch (error) {
      console.error("Erro ao salvar operações pendentes:", error);
    }
  }

  // Carregar operações pendentes do AsyncStorage
  async loadPendingOperations() {
    try {
      const stored = await AsyncStorage.getItem('pendingOperations');
      if (stored) {
        this.pendingOperations = JSON.parse(stored);
        console.log("Operações pendentes carregadas:", this.pendingOperations.length);
      }
    } catch (error) {
      console.error("Erro ao carregar operações pendentes:", error);
    }
  }

  // Sincronizar operações pendentes
  async syncPendingOperations() {
    if (this.syncInProgress || !this.isOnline || this.pendingOperations.length === 0) {
      return;
    }

    this.syncInProgress = true;
    console.log("Iniciando sincronização de", this.pendingOperations.length, "operações");

    const operationsToSync = [...this.pendingOperations];
    
    for (const pendingOp of operationsToSync) {
      try {
        await this.executeOperation(pendingOp.operation);
        
        // Remover operação bem-sucedida
        this.pendingOperations = this.pendingOperations.filter(op => op.id !== pendingOp.id);
        await this.savePendingOperations();
        
        console.log("Operação sincronizada com sucesso:", pendingOp.id);
      } catch (error) {
        console.error("Erro ao sincronizar operação:", pendingOp.id, error);
        pendingOp.retries++;
        
        // Remover operação após muitas tentativas
        if (pendingOp.retries >= 3) {
          this.pendingOperations = this.pendingOperations.filter(op => op.id !== pendingOp.id);
          await this.savePendingOperations();
          console.log("Operação removida após muitas tentativas:", pendingOp.id);
        }
      }
    }

    this.syncInProgress = false;
    console.log("Sincronização concluída");
  }

  // Executar operação específica
  async executeOperation(operation) {
    const { type, apiFunction, data, id } = operation;
    
    switch (type) {
      case 'CREATE_ACTIVITY':
        return await apiFunction(data);
      case 'UPDATE_ACTIVITY':
        return await apiFunction(data, id);
      case 'DELETE_ACTIVITY':
        return await apiFunction(id);
      case 'CREATE_FOOD':
        return await apiFunction(data);
      case 'UPDATE_FOOD':
        return await apiFunction(data, id);
      case 'DELETE_FOOD':
        return await apiFunction(id);
      case 'CREATE_DISEASE':
        return await apiFunction(data);
      case 'UPDATE_DISEASE':
        return await apiFunction(data, id);
      case 'DELETE_DISEASE':
        return await apiFunction(id);
      case 'CREATE_PRODUCTION_HONEY':
        return await apiFunction(data);
      case 'UPDATE_PRODUCTION_HONEY':
        return await apiFunction(data, id);
      case 'DELETE_PRODUCTION_HONEY':
        return await apiFunction(id);
      case 'CREATE_TEMPERATURE_HUMIDITY':
        return await apiFunction(data);
      case 'UPDATE_TEMPERATURE_HUMIDITY':
        return await apiFunction(data, id);
      case 'DELETE_TEMPERATURE_HUMIDITY':
        return await apiFunction(id);
      default:
        throw new Error(`Tipo de operação não suportado: ${type}`);
    }
  }

  // Verificar se está online
  isConnected() {
    return this.isOnline;
  }

  // Obter operações pendentes
  getPendingOperations() {
    return this.pendingOperations;
  }

  // Forçar sincronização
  async forceSync() {
    await this.syncPendingOperations();
  }
}

export default new SyncService(); 