import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Platform, Text, TouchableOpacity, View } from "react-native";
import { createProductionHoney, updateProductionHoney } from "../api/productionHoneyApi.js";
import Button from "./Button.js";
import GroupInput from "./GroupInput.js";
import GroupSelect from "./GroupSelect.js";

function FormProductionHoney({ beehiveId, onSuccess, editingItem }) {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dateCollection, setDateCollection] = useState("");
  const [amount, setAmount] = useState("");
  const [quality, setQuality] = useState("");
  const [observations, setObservations] = useState("");

  // Opções para o select de qualidade
  const qualityOptions = [
    { value: "alta", label: "Alta" },
    { value: "média", label: "Média" },
    { value: "baixa", label: "Baixa" },
  ];

  // Preencher dados se estiver editando
  useEffect(() => {
    if (editingItem && editingItem.data) {
      setDateCollection(editingItem.data.dateCollection || "");
      setAmount(editingItem.data.amount?.toString() || "");
      setQuality(editingItem.data.quality || "");
      setObservations(editingItem.data.observations || "");
    }
  }, [editingItem]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDateCollection(formattedDate);
    }
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "Selecione uma data";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleSubmit = async () => {
    // Validação dos campos obrigatórios
    if (!dateCollection) {
      Alert.alert("Erro", "Por favor, selecione uma data.");
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
    
    if (!quality.trim()) {
      Alert.alert("Erro", "Por favor, selecione a qualidade.");
      return;
    }

    try {
      const productData = {
        beehiveId: Number(beehiveId),
        dateCollection,
        amount: Number(amount),
        quality,
        observations,
      };

      console.log("Enviando dados do produto:", productData);
      
      if (editingItem && editingItem.id) {
        // Atualizar produto existente
        await updateProductionHoney(productData, editingItem.id);
        console.log("Produto atualizado com sucesso");
      } else {
        // Criar novo produto
        await createProductionHoney(productData);
        console.log("Produto cadastrado com sucesso");
      }
      
      // Chamar callback de sucesso
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erro ao cadastrar/atualizar produto:", error);
      console.error("Detalhes do erro:", error.response?.data || error.message);
      Alert.alert("Erro", "Falha ao cadastrar/atualizar produto.");
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
          Data da Coleta
        </Text>
        <Text style={{ color: dateCollection ? "#78350f" : "#9ca3af" }}>
          {formatDateForDisplay(dateCollection)}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dateCollection ? new Date(dateCollection) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          locale="pt-BR"
          maximumDate={new Date()}
        />
      )}

      <GroupInput value={amount} onChangeText={setAmount} label="Quantidade" />
      <GroupSelect 
        value={quality} 
        onValueChange={setQuality} 
        label="Qualidade" 
        options={qualityOptions}
        placeholder="Selecione a qualidade"
      />
      <GroupInput value={observations} onChangeText={setObservations} label="Observação" />
      <Button onPress={handleSubmit}>
        {editingItem && editingItem.id ? "Atualizar Produto" : "Cadastrar Produto"}
      </Button>
    </View>
  );
}
export default FormProductionHoney;
