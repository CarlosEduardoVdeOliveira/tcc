import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity } from "react-native";
import { createActivity } from "../api/activityApi.js";
import { createDisease } from "../api/diseaseApi.js";
import { createFood } from "../api/foodApi.js";
import { createProductionHoney } from "../api/productionHoneyApi.js";
import { createTemperatureHumidity } from "../api/temperatureHumidity.js";

function TestApi() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("user_token");
      const user = await AsyncStorage.getItem("user");
      console.log("Token atual:", userToken);
      console.log("Usuário atual:", user);
      setToken(userToken || "Nenhum token encontrado");
      Alert.alert("Token", userToken ? "Token encontrado" : "Nenhum token");
    } catch (error) {
      console.error("Erro ao verificar token:", error);
      Alert.alert("Erro", "Falha ao verificar token");
    }
  };

  const testActivity = async () => {
    setLoading(true);
    try {
      console.log("=== TESTE DE ATIVIDADE ===");
      const response = await createActivity({
        beehiveId: 1, // Substitua pelo ID de uma colmeia existente
        dateActivity: "2024-01-15",
        typeActivity: "Teste de API",
        descriptions: "Teste de criação de atividade",
        observations: "Teste realizado via app"
      });
      Alert.alert("Sucesso", "Atividade criada: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Erro no teste de atividade:", error);
      Alert.alert("Erro", "Falha no teste de atividade: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testDisease = async () => {
    setLoading(true);
    try {
      console.log("=== TESTE DE DOENÇA ===");
      const response = await createDisease({
        beehiveId: 1,
        dateDiagnosis: "2024-01-15",
        diseasePrague: "Teste de API",
        treatment: "Teste de tratamento",
        observations: "Teste realizado via app"
      });
      Alert.alert("Sucesso", "Doença criada: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Erro no teste de doença:", error);
      Alert.alert("Erro", "Falha no teste de doença: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testFood = async () => {
    setLoading(true);
    try {
      console.log("=== TESTE DE ALIMENTAÇÃO ===");
      const response = await createFood({
        beehiveId: 1,
        dateFeeding: "2024-01-15",
        typeFood: "Teste de API",
        amount: 1.5,
        observations: "Teste realizado via app"
      });
      Alert.alert("Sucesso", "Alimentação criada: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Erro no teste de alimentação:", error);
      Alert.alert("Erro", "Falha no teste de alimentação: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testProduction = async () => {
    setLoading(true);
    try {
      console.log("=== TESTE DE PRODUÇÃO ===");
      const response = await createProductionHoney({
        beehiveId: 1,
        dateCollection: "2024-01-15",
        amount: 2.5,
        quality: "alta",
        observations: "Teste realizado via app"
      });
      Alert.alert("Sucesso", "Produção criada: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Erro no teste de produção:", error);
      Alert.alert("Erro", "Falha no teste de produção: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testTemperature = async () => {
    setLoading(true);
    try {
      console.log("=== TESTE DE TEMPERATURA ===");
      const response = await createTemperatureHumidity({
        beehiveId: 1,
        dateMeasurement: "2024-01-15",
        internalTemperature: 25.5,
        externalTemperature: 30.2,
        humidityInternal: 65,
        humidityExternal: 70
      });
      Alert.alert("Sucesso", "Temperatura criada: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Erro no teste de temperatura:", error);
      Alert.alert("Erro", "Falha no teste de temperatura: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Teste de APIs
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: "#3b82f6",
          padding: 12,
          borderRadius: 8,
          marginBottom: 10
        }}
        onPress={checkToken}
      >
        <Text style={{ textAlign: "center", fontWeight: "600", color: "white" }}>
          🔍 Verificar Token
        </Text>
      </TouchableOpacity>

      <Text style={{ marginBottom: 10, fontSize: 12, color: "#666" }}>
        Token: {token.substring(0, 20)}...
      </Text>
      
      <TouchableOpacity
        style={{
          backgroundColor: "#facc15",
          padding: 12,
          borderRadius: 8,
          marginBottom: 10
        }}
        onPress={testActivity}
        disabled={loading}
      >
        <Text style={{ textAlign: "center", fontWeight: "600" }}>
          Testar Criação de Atividade
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#facc15",
          padding: 12,
          borderRadius: 8,
          marginBottom: 10
        }}
        onPress={testDisease}
        disabled={loading}
      >
        <Text style={{ textAlign: "center", fontWeight: "600" }}>
          Testar Criação de Doença
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#facc15",
          padding: 12,
          borderRadius: 8,
          marginBottom: 10
        }}
        onPress={testFood}
        disabled={loading}
      >
        <Text style={{ textAlign: "center", fontWeight: "600" }}>
          Testar Criação de Alimentação
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#facc15",
          padding: 12,
          borderRadius: 8,
          marginBottom: 10
        }}
        onPress={testProduction}
        disabled={loading}
      >
        <Text style={{ textAlign: "center", fontWeight: "600" }}>
          Testar Criação de Produção
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#facc15",
          padding: 12,
          borderRadius: 8,
          marginBottom: 10
        }}
        onPress={testTemperature}
        disabled={loading}
      >
        <Text style={{ textAlign: "center", fontWeight: "600" }}>
          Testar Criação de Temperatura
        </Text>
      </TouchableOpacity>

      {loading && (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Testando...
        </Text>
      )}
    </ScrollView>
  );
}

export default TestApi; 