import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Platform, Text, TouchableOpacity, View } from "react-native";
import { createFood, updateFood } from "../api/foodApi.js";
import Button from "./Button.js";
import GroupInput from "./GroupInput.js";

function FormFood({ beehiveId, onSuccess, editingItem }) {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dateFeeding, setDateFeeding] = useState("");
  const [typeFood, setTypeFood] = useState("");
  const [amount, setAmount] = useState("");
  const [observations, setObservations] = useState("");

  // Preencher dados se estiver editando
  useEffect(() => {
    if (editingItem && editingItem.data) {
      setDateFeeding(editingItem.data.dateFeeding || "");
      setTypeFood(editingItem.data.typeFood || "");
      setAmount(editingItem.data.amount?.toString() || "");
      setObservations(editingItem.data.observations || "");
    }
  }, [editingItem]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDateFeeding(formattedDate);
    }
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "Selecione uma data";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleSubmit = async () => {
    // Validação dos campos obrigatórios
    if (!dateFeeding) {
      Alert.alert("Erro", "Por favor, selecione uma data.");
      return;
    }
    
    if (!typeFood.trim()) {
      Alert.alert("Erro", "Por favor, informe o tipo de comida.");
      return;
    }
    
    if (!amount.trim()) {
      Alert.alert("Erro", "Por favor, informe a quantidade.");
      return;
    }
    
    // Validar se amount é um número válido
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert("Erro", "Por favor, informe uma quantidade válida.");
      return;
    }

    try {
      const foodData = {
        beehiveId: Number(beehiveId),
        dateFeeding,
        typeFood,
        amount: Number(amount),
        observations,
      };

      console.log("Enviando dados do alimento:", foodData);
      
      if (editingItem && editingItem.id) {
        // Atualizar alimento existente
        await updateFood(foodData, editingItem.id);
        console.log("Alimento atualizado com sucesso");
      } else {
        // Criar novo alimento
        await createFood(foodData);
        console.log("Alimento cadastrado com sucesso");
      }
      
      // Chamar callback de sucesso
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erro ao cadastrar/atualizar alimento:", error);
      console.error("Detalhes do erro:", error.response?.data || error.message);
      Alert.alert("Erro", "Falha ao cadastrar/atualizar alimento.");
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
          Data da Alimentação
        </Text>
        <Text style={{ color: dateFeeding ? "#78350f" : "#9ca3af" }}>
          {formatDateForDisplay(dateFeeding)}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dateFeeding ? new Date(dateFeeding) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          locale="pt-BR"
          maximumDate={new Date()}
        />
      )}

      <GroupInput value={typeFood} onChangeText={setTypeFood} label="Tipo de Comida" />
      <GroupInput value={amount} onChangeText={setAmount} label="Quantidade" />
      <GroupInput value={observations} onChangeText={setObservations} label="Observação" />
      <Button onPress={handleSubmit}>
        {editingItem && editingItem.id ? "Atualizar Alimento" : "Cadastrar Alimento"}
      </Button>
    </View>
  );
}
export default FormFood