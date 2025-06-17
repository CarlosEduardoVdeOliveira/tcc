import React, { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createActivity } from "../api/activityApi.js";

function TestForm() {
  const [dateActivity, setDateActivity] = useState("2024-01-15");
  const [typeActivity, setTypeActivity] = useState("Teste");
  const [descriptions, setDescriptions] = useState("Descrição de teste");
  const [observations, setObservations] = useState("Observação de teste");
  const [beehiveId, setBeehiveId] = useState("1");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("=== TESTE DE FORMULÁRIO ===");
    console.log("BeehiveId:", beehiveId);
    console.log("Data:", dateActivity);
    console.log("Tipo:", typeActivity);
    console.log("Descrição:", descriptions);
    console.log("Observação:", observations);

    setLoading(true);
    
    try {
      const data = {
        beehiveId: Number(beehiveId),
        dateActivity,
        typeActivity,
        descriptions,
        observations,
      };

      console.log("Dados a enviar:", JSON.stringify(data, null, 2));
      
      const response = await createActivity(data);
      console.log("Resposta:", JSON.stringify(response.data, null, 2));
      
      Alert.alert("Sucesso", "Atividade criada com sucesso!");
    } catch (error) {
      console.error("Erro no teste:", error);
      Alert.alert("Erro", `Falha: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Formulário de Teste
      </Text>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 8, fontWeight: "600" }}>ID da Colmeia:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 4,
            padding: 8,
            backgroundColor: "white"
          }}
          value={beehiveId}
          onChangeText={setBeehiveId}
          keyboardType="numeric"
          placeholder="Digite o ID da colmeia"
        />
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 8, fontWeight: "600" }}>Data da Atividade:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 4,
            padding: 8,
            backgroundColor: "white"
          }}
          value={dateActivity}
          onChangeText={setDateActivity}
          placeholder="YYYY-MM-DD"
        />
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 8, fontWeight: "600" }}>Tipo de Atividade:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 4,
            padding: 8,
            backgroundColor: "white"
          }}
          value={typeActivity}
          onChangeText={setTypeActivity}
          placeholder="Tipo de atividade"
        />
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 8, fontWeight: "600" }}>Descrição:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 4,
            padding: 8,
            backgroundColor: "white",
            height: 80,
            textAlignVertical: "top"
          }}
          value={descriptions}
          onChangeText={setDescriptions}
          placeholder="Descrição da atividade"
          multiline
        />
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ marginBottom: 8, fontWeight: "600" }}>Observações:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 4,
            padding: 8,
            backgroundColor: "white",
            height: 80,
            textAlignVertical: "top"
          }}
          value={observations}
          onChangeText={setObservations}
          placeholder="Observações (opcional)"
          multiline
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: loading ? "#ccc" : "#facc15",
          padding: 12,
          borderRadius: 8,
          alignItems: "center"
        }}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          {loading ? "Enviando..." : "Testar Criação"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default TestForm; 