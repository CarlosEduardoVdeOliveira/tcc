import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { clearAllOfflineData, initializeOfflineData } from "../api/offlineApi.js";
import { getAppConfig, setAppMode } from "../utils/config.js";

function OfflineConfig() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isOffline, setIsOffline] = useState(getAppConfig().MODE === 'offline');

  const handleModeToggle = async (value) => {
    try {
      if (value) {
        // Mudando para modo offline
        setAppMode('offline');
        setIsOffline(true);
        await initializeOfflineData();
        Alert.alert(
          "Modo Offline Ativado",
          "A aplicação agora funciona completamente offline. Todos os dados são salvos localmente."
        );
      } else {
        // Mudando para modo online
        Alert.alert(
          "Modo Online",
          "A aplicação agora tentará conectar com a API. Certifique-se de que o servidor está rodando.",
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Confirmar",
              onPress: () => {
                setAppMode('online');
                setIsOffline(false);
                Alert.alert("Modo Online Ativado", "A aplicação agora usa a API online.");
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error("Erro ao alterar modo:", error);
      Alert.alert("Erro", "Não foi possível alterar o modo da aplicação");
    }
  };

  const handleClearData = () => {
    Alert.alert(
      "Limpar Dados Offline",
      "Isso irá remover todos os dados salvos localmente. Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: async () => {
            try {
              await clearAllOfflineData();
              Alert.alert("Sucesso", "Todos os dados offline foram removidos");
            } catch (error) {
              Alert.alert("Erro", "Não foi possível limpar os dados");
            }
          },
        },
      ]
    );
  };

  const handleResetData = async () => {
    try {
      await clearAllOfflineData();
      await initializeOfflineData();
      Alert.alert("Sucesso", "Dados de exemplo recriados");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível recriar os dados de exemplo");
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.configButton}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="settings" size={20} color="#666" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Configurações</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.configSection}>
              <Text style={styles.sectionTitle}>Modo da Aplicação</Text>
              
              <View style={styles.configItem}>
                <View style={styles.configInfo}>
                  <Text style={styles.configLabel}>Modo Offline</Text>
                  <Text style={styles.configDescription}>
                    Funciona sem internet, dados salvos localmente
                  </Text>
                </View>
                <Switch
                  value={isOffline}
                  onValueChange={handleModeToggle}
                  trackColor={{ false: "#767577", true: "#eead2d" }}
                  thumbColor={isOffline ? "#fff" : "#f4f3f4"}
                />
              </View>

              <View style={styles.statusInfo}>
                <Icon 
                  name={isOffline ? "cloud-offline" : "cloud"} 
                  size={16} 
                  color={isOffline ? "#ef4444" : "#22c55e"} 
                />
                <Text style={[styles.statusText, isOffline && styles.offlineText]}>
                  {isOffline ? "Modo Offline Ativo" : "Modo Online Ativo"}
                </Text>
              </View>
            </View>

            {isOffline && (
              <View style={styles.configSection}>
                <Text style={styles.sectionTitle}>Dados Offline</Text>
                
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleResetData}
                >
                  <Icon name="refresh" size={16} color="#eead2d" />
                  <Text style={styles.actionButtonText}>Recriar Dados de Exemplo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.dangerButton]}
                  onPress={handleClearData}
                >
                  <Icon name="trash" size={16} color="#ef4444" />
                  <Text style={[styles.actionButtonText, styles.dangerText]}>
                    Limpar Todos os Dados
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.configSection}>
              <Text style={styles.sectionTitle}>Informações</Text>
              <Text style={styles.infoText}>
                • Modo offline: Dados salvos no dispositivo{'\n'}
                • Modo online: Dados salvos no servidor{'\n'}
                • Você pode alternar entre os modos a qualquer momento
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  configButton: {
    position: "absolute",
    top: 50,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "90%",
    maxWidth: 400,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  configSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  configItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  configInfo: {
    flex: 1,
    marginRight: 16,
  },
  configLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  configDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  statusInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    padding: 12,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#22c55e",
    marginLeft: 8,
  },
  offlineText: {
    color: "#ef4444",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fef3c7",
    borderRadius: 8,
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#78350f",
    marginLeft: 8,
  },
  dangerButton: {
    backgroundColor: "#fef2f2",
  },
  dangerText: {
    color: "#991b1b",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});

export default OfflineConfig; 