import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Platform, Text, TouchableOpacity, View } from "react-native";
import { createDisease, updateDisease } from "../api/diseaseApi.js";
import Button from "./Button.js";
import GroupInput from "./GroupInput.js";

function FormDisease({ beehiveId, onSuccess, editingItem }) {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dateDiagnosis, setDateDiagnosis] = useState("");
  const [diseasePrague, setDiseasePrague] = useState("");
  const [treatment, setTreatment] = useState("");
  const [observations, setObservations] = useState("");

  // Preencher dados se estiver editando
  useEffect(() => {
    if (editingItem && editingItem.data) {
      setDateDiagnosis(editingItem.data.dateDiagnosis || "");
      setDiseasePrague(editingItem.data.diseasePrague || "");
      setTreatment(editingItem.data.treatment || "");
      setObservations(editingItem.data.observations || "");
    }
  }, [editingItem]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDateDiagnosis(formattedDate);
    }
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "Selecione uma data";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleSubmit = async () => {
    // Validação dos campos obrigatórios
    if (!dateDiagnosis) {
      Alert.alert("Erro", "Por favor, selecione uma data.");
      return;
    }
    
    if (!diseasePrague.trim()) {
      Alert.alert("Erro", "Por favor, informe a doença/praga.");
      return;
    }
    
    if (!treatment.trim()) {
      Alert.alert("Erro", "Por favor, informe o tratamento.");
      return;
    }

    try {
      const diseaseData = {
        beehiveId: Number(beehiveId),
        dateDiagnosis,
        diseasePrague,
        treatment,
        observations,
      };

      console.log("Enviando dados da doença/praga:", diseaseData);
      
      if (editingItem && editingItem.id) {
        // Atualizar doença/praga existente
        await updateDisease(diseaseData, editingItem.id);
        console.log("Doença/praga atualizada com sucesso");
      } else {
        // Criar nova doença/praga
        await createDisease(diseaseData);
        console.log("Doença/praga cadastrada com sucesso");
      }
      
      // Chamar callback de sucesso
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erro ao cadastrar/atualizar doença/praga:", error);
      console.error("Detalhes do erro:", error.response?.data || error.message);
      Alert.alert("Erro", "Falha ao cadastrar/atualizar doença/praga.");
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
          Data do Diagnóstico
        </Text>
        <Text style={{ color: dateDiagnosis ? "#78350f" : "#9ca3af" }}>
          {formatDateForDisplay(dateDiagnosis)}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dateDiagnosis ? new Date(dateDiagnosis) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          locale="pt-BR"
          maximumDate={new Date()}
        />
      )}

      <GroupInput value={diseasePrague} onChangeText={setDiseasePrague} label="Doença/Praga" />
      <GroupInput value={treatment} onChangeText={setTreatment} label="Tratamento" />
      <GroupInput value={observations} onChangeText={setObservations} label="Observação" />
      <Button onPress={handleSubmit}>
        {editingItem && editingItem.id ? "Atualizar Doença/Praga" : "Cadastrar Doença/Praga"}
      </Button>
    </View>
  );
}

export default FormDisease