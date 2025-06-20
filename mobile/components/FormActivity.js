import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Platform, Text, TouchableOpacity, View } from "react-native";
import { createActivity, updateActivity } from "../api/activityApi.js";
import Button from "./Button.js";
import GroupInput from "./GroupInput.js";
import GroupTextarea from "./GroupTextarea.js";

function FormActivity({ beehiveId, onSuccess, editingItem }) {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dateActivity, setDateActivity] = useState("");
  const [typeActivity, setTypeActivity] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [observations, setObservations] = useState("");

  // Preencher dados se estiver editando
  useEffect(() => {
    if (editingItem && editingItem.data) {
      setDateActivity(editingItem.data.dateActivity || "");
      setTypeActivity(editingItem.data.typeActivity || "");
      setDescriptions(editingItem.data.descriptions || "");
      setObservations(editingItem.data.observations || "");
    }
  }, [editingItem]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDateActivity(formattedDate);
    }
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "Selecione uma data";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleSubmit = async () => {
    // Validação dos campos obrigatórios
    if (!dateActivity) {
      Alert.alert("Erro", "Por favor, selecione uma data.");
      return;
    }
    
    if (!typeActivity.trim()) {
      Alert.alert("Erro", "Por favor, informe o tipo de atividade.");
      return;
    }
    
    if (!descriptions.trim()) {
      Alert.alert("Erro", "Por favor, informe a descrição.");
      return;
    }

    try {
      const activityData = {
        beehiveId: Number(beehiveId),
        dateActivity,
        typeActivity,
        descriptions,
        observations,
      };

      console.log("Enviando dados da atividade:", activityData);
      
      if (editingItem && editingItem.id) {
        // Atualizar atividade existente
        await updateActivity(activityData, editingItem.id);
        console.log("Atividade atualizada com sucesso");
      } else {
        // Criar nova atividade
        await createActivity(activityData);
        console.log("Atividade cadastrada com sucesso");
      }
      
      // Chamar callback de sucesso
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erro ao cadastrar/atualizar atividade:", error);
      console.error("Detalhes do erro:", error.response?.data || error.message);
      Alert.alert("Erro", "Falha ao cadastrar/atualizar atividade.");
    }
  };

  return (
    <View style={{ gap: 16 }}>
      <TouchableOpacity 
        style={{ 
          borderBottomWidth: 2, 
          borderColor: "#6b7280", 
          paddingVertical: 8,
          alignItems: "center"
        }}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ color: "#78350f", fontWeight: "600", marginBottom: 8 }}>
          Data da Atividade
        </Text>
        <Text style={{ color: dateActivity ? "#78350f" : "#9ca3af" }}>
          {formatDateForDisplay(dateActivity)}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dateActivity ? new Date(dateActivity) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          locale="pt-BR"
          maximumDate={new Date()}
        />
      )}

      <GroupInput 
        value={typeActivity} 
        onChangeText={setTypeActivity} 
        label="Qual atividade" 
      />
      <GroupTextarea 
        value={descriptions} 
        onChangeText={setDescriptions} 
        label="Descrição" 
        placeholder="Digite a descrição da atividade..." 
      />
      <GroupInput 
        value={observations} 
        onChangeText={setObservations} 
        label="Observação" 
      />
      <Button onPress={handleSubmit}>
        {editingItem && editingItem.id ? "Atualizar Atividade" : "Cadastrar Atividade"}
      </Button>
    </View>
  );
}
export default FormActivity