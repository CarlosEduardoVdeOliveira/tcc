import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import syncService from "../utils/syncService.js";

function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingOperations, setPendingOperations] = useState(0);

  useEffect(() => {
    // Verificar conectividade inicial
    NetInfo.fetch().then(state => {
      setIsOnline(state.isConnected);
    });

    // Monitorar mudanças de conectividade
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });

    // Atualizar contador de operações pendentes
    const updatePendingCount = () => {
      const operations = syncService.getPendingOperations();
      setPendingOperations(operations.length);
    };

    // Atualizar a cada 5 segundos
    const interval = setInterval(updatePendingCount, 5000);
    updatePendingCount(); // Atualizar imediatamente

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleSyncPress = async () => {
    if (pendingOperations > 0) {
      Alert.alert(
        "Sincronizar Dados",
        `Existem ${pendingOperations} operações pendentes. Deseja sincronizar agora?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Sincronizar",
            onPress: async () => {
              try {
                await syncService.forceSync();
                Alert.alert("Sucesso", "Sincronização concluída!");
              } catch (error) {
                Alert.alert("Erro", "Falha na sincronização. Tente novamente.");
              }
            },
          },
        ]
      );
    }
  };

  if (isOnline && pendingOperations === 0) {
    return null; // Não mostrar nada se estiver online e sem operações pendentes
  }

  return (
    <View style={[styles.container, !isOnline && styles.offlineContainer]}>
      <View style={styles.statusContainer}>
        <Icon 
          name={isOnline ? "wifi" : "wifi-outline"} 
          size={16} 
          color={isOnline ? "#22c55e" : "#ef4444"} 
        />
        <Text style={[styles.statusText, !isOnline && styles.offlineText]}>
          {isOnline ? "Online" : "Offline"}
        </Text>
      </View>

      {pendingOperations > 0 && (
        <TouchableOpacity style={styles.syncButton} onPress={handleSyncPress}>
          <Icon name="sync" size={16} color="#78350f" />
          <Text style={styles.syncText}>{pendingOperations} pendente{pendingOperations > 1 ? 's' : ''}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  offlineContainer: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#22c55e",
    marginLeft: 4,
  },
  offlineText: {
    color: "#ef4444",
  },
  syncButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef3c7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  syncText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#78350f",
    marginLeft: 4,
  },
});

export default ConnectionStatus; 