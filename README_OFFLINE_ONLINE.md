# Funcionalidades Offline/Online - Sistema de Apiário

Este projeto foi implementado com funcionalidades robustas para funcionar tanto offline quanto online, garantindo que os usuários possam continuar trabalhando mesmo sem conexão com a internet.

## 🚀 Funcionalidades Implementadas

### 📱 **Mobile (React Native)**
- **Detecção automática de conectividade** usando NetInfo
- **Sincronização inteligente** com fila de operações pendentes
- **Armazenamento local** com AsyncStorage
- **Retry automático** com backoff exponencial
- **Priorização de operações** por tipo e importância
- **Interface visual** mostrando status de sincronização
- **Sincronização manual** com botão dedicado

### 🌐 **Frontend (React Web)**
- **Detecção de conectividade** usando navigator.onLine
- **Fila de operações offline** no localStorage
- **Sincronização automática** quando conexão é restaurada
- **Fallback offline** para operações críticas
- **Indicador visual** de status de conectividade

### ⚙️ **Backend (Node.js)**
- **Middleware de conectividade** para detectar status do banco
- **Armazenamento offline** de operações pendentes
- **Cache de dados** para respostas offline
- **Sincronização automática** quando banco volta online
- **Health checks** para monitorar conectividade

## 🔧 Como Usar

### **Mobile**

1. **Status de Conectividade**
   ```javascript
   import { useOfflineMode } from './hooks/useOfflineMode';
   
   const { isOffline, isCheckingConnection } = useOfflineMode();
   ```

2. **Sincronização**
   ```javascript
   import { useSync } from './contexts/syncContext';
   
   const { forceSync, addToSyncQueue } = useSync();
   
   // Adicionar operação à fila
   await addToSyncQueue({
     type: 'CREATE_ACTIVITY',
     data: activityData,
     apiFunction: createActivityApi
   });
   
   // Forçar sincronização
   await forceSync();
   ```

3. **Componente de Status**
   ```javascript
   import EnhancedOfflineStatus from './components/EnhancedOfflineStatus';
   
   // Adicionar ao seu componente
   <EnhancedOfflineStatus />
   ```

### **Frontend**

1. **Hook de Operações Offline**
   ```javascript
   import { useOfflineOperations } from './hooks/useOfflineOperations';
   
   const { createItem, updateItem, deleteItem, isOnline } = useOfflineOperations();
   
   // Criar item com fallback offline
   await createItem('activity', data, apiFunction, offlineFallback);
   ```

2. **Contexto Offline**
   ```javascript
   import { useOffline } from './contexts/offlineContext';
   
   const { isOnline, pendingOperations, forceSync } = useOffline();
   ```

3. **Componente de Status**
   ```javascript
   import OfflineStatus from './components/OfflineStatus';
   
   // Adicionar ao seu componente
   <OfflineStatus />
   ```

### **Backend**

1. **Middleware de Conectividade**
   ```javascript
   import { checkConnectivity, optionalConnectivity } from './middlewares/connectivity';
   
   // Para rotas que precisam de conectividade
   app.use('/api/v1/beehive', checkConnectivity, ensureDatabaseConnection, authenticate, beehiveRoutes);
   
   // Para rotas que podem funcionar offline
   app.use('/api/v1/login', optionalConnectivity, optionalDatabaseConnection, loginRoutes);
   ```

2. **Configuração Offline**
   ```javascript
   import { saveOfflineOperation, loadPendingOfflineOperations } from './config/offline';
   
   // Salvar operação offline
   saveOfflineOperation(operation);
   
   // Carregar operações pendentes
   const pendingOps = loadPendingOfflineOperations();
   ```

## 📊 Monitoramento e Debug

### **Mobile**
- Use o componente `EnhancedOfflineStatus` para ver status em tempo real
- Toque no indicador para ver detalhes das operações pendentes
- Use o botão de sincronização para forçar sincronização manual

### **Frontend**
- O componente `OfflineStatus` mostra status de conectividade
- Use o botão "Sincronizar" para forçar sincronização
- Verifique o console para logs de operações offline

### **Backend**
- Verifique logs para operações offline
- Monitore o diretório `offline-storage/` para dados armazenados
- Use endpoints `/api/v1/health` e `/api/v1/status` para verificar conectividade

## 🔄 Fluxo de Sincronização

1. **Usuário executa operação**
2. **Sistema tenta executar online**
3. **Se falhar, adiciona à fila offline**
4. **Executa fallback local se disponível**
5. **Monitora conectividade continuamente**
6. **Quando online, sincroniza automaticamente**
7. **Remove operações sincronizadas da fila**

## ⚠️ Considerações Importantes

### **Dados Offline**
- Dados offline são armazenados localmente
- Operações antigas (>7 dias) são removidas automaticamente
- Cache tem limite de tamanho configurável

### **Sincronização**
- Operações são priorizadas por tipo
- Retry automático com backoff exponencial
- Máximo de 3 tentativas por operação

### **Segurança**
- Tokens de autenticação são preservados offline
- Operações offline mantêm contexto de usuário
- Validação local para operações críticas

## 🚀 Próximos Passos

1. **Implementar testes** para funcionalidades offline
2. **Adicionar métricas** de sincronização
3. **Implementar compressão** de dados offline
4. **Adicionar notificações** de status de sincronização
5. **Implementar backup** de dados offline

## 📝 Logs e Debug

### **Mobile**
```javascript
// Ver logs de sincronização
console.log('Status da sincronização:', syncStatus);

// Ver operações pendentes
const pendingOps = getPendingOperations();
console.log('Operações pendentes:', pendingOps);
```

### **Frontend**
```javascript
// Ver status offline
console.log('Status online:', isOnline);
console.log('Operações pendentes:', pendingOperations);
```

### **Backend**
```bash
# Ver logs do servidor
npm run dev

# Verificar armazenamento offline
ls -la offline-storage/
cat offline-storage/pending-operations.json
```

## 🎯 Benefícios

- **Continuidade de trabalho** mesmo offline
- **Sincronização automática** quando conexão é restaurada
- **Experiência consistente** entre dispositivos
- **Resiliência** a falhas de rede
- **Performance melhorada** com cache local
- **Monitoramento em tempo real** do status

---

**Desenvolvido com ❤️ para funcionar em qualquer situação de conectividade!** 