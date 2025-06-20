import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Platform, Text, TouchableOpacity, View } from "react-native";
import { createTemperatureHumidity, updateTemperatureHumidity } from "../api/temperatureHumidity.js";
import Button from "./Button.js";
import GroupInput from "./GroupInput.js";

function FormTemperatureHumidity({ beehiveId, onSuccess, editingItem }) {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dateMeasurement, setDateMeasurement] = useState("");
  const [internalTemperature, setInternalTemperature] = useState("");
  const [humidityInternal, setHumidityInternal] = useState("");
  const [externalTemperature, setExternalTemperature] = useState("");
  const [humidityExternal, setHumidityExternal] = useState("");

  // Preencher dados se estiver editando
  useEffect(() => {
    if (editingItem && editingItem.data) {
      setDateMeasurement(editingItem.data.dateMeasurement || "");
      setInternalTemperature(editingItem.data.internalTemperature?.toString() || "");
      setHumidityInternal(editingItem.data.humidityInternal?.toString() || "");
      setExternalTemperature(editingItem.data.externalTemperature?.toString() || "");
      setHumidityExternal(editingItem.data.humidityExternal?.toString() || "");
    }
  }, [editingItem]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDateMeasurement(formattedDate);
    }
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "Selecione uma data";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleSubmit = async () => {
    // Validação dos campos obrigatórios
    if (!dateMeasurement) {
      Alert.alert("Erro", "Por favor, selecione uma data.");
      return;
    }
    
    if (!internalTemperature.trim()) {
      Alert.alert("Erro", "Por favor, informe a temperatura interna.");
      return;
    }
    
    if (!humidityInternal.trim()) {
      Alert.alert("Erro", "Por favor, informe a umidade interna.");
      return;
    }
    
    if (!externalTemperature.trim()) {
      Alert.alert("Erro", "Por favor, informe a temperatura externa.");
      return;
    }
    
    if (!humidityExternal.trim()) {
      Alert.alert("Erro", "Por favor, informe a umidade externa.");
      return;
    }
    
    // Validar se os valores são números válidos
    if (isNaN(Number(internalTemperature))) {
      Alert.alert("Erro", "Por favor, informe uma temperatura interna válida.");
      return;
    }
    
    if (isNaN(Number(humidityInternal)) || Number(humidityInternal) < 0 || Number(humidityInternal) > 100) {
      Alert.alert("Erro", "Por favor, informe uma umidade interna válida (0-100%).");
      return;
    }
    
    if (isNaN(Number(externalTemperature))) {
      Alert.alert("Erro", "Por favor, informe uma temperatura externa válida.");
      return;
    }
    
    if (isNaN(Number(humidityExternal)) || Number(humidityExternal) < 0 || Number(humidityExternal) > 100) {
      Alert.alert("Erro", "Por favor, informe uma umidade externa válida (0-100%).");
      return;
    }

    try {
      const measurementData = {
        beehiveId: Number(beehiveId),
        dateMeasurement,
        internalTemperature: Number(internalTemperature),
        humidityInternal: Number(humidityInternal),
        externalTemperature: Number(externalTemperature),
        humidityExternal: Number(humidityExternal),
      };

      console.log("Enviando dados da medição:", measurementData);
      
      if (editingItem && editingItem.id) {
        // Atualizar medição existente
        await updateTemperatureHumidity(measurementData, editingItem.id);
        console.log("Medição atualizada com sucesso");
      } else {
        // Criar nova medição
        await createTemperatureHumidity(measurementData);
        console.log("Medição cadastrada com sucesso");
      }
      
      // Chamar callback de sucesso
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erro ao cadastrar/atualizar medição:", error);
      console.error("Detalhes do erro:", error.response?.data || error.message);
      Alert.alert("Erro", "Falha ao cadastrar/atualizar medição.");
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
          Data da Medição
        </Text>
        <Text style={{ color: dateMeasurement ? "#78350f" : "#9ca3af" }}>
          {formatDateForDisplay(dateMeasurement)}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dateMeasurement ? new Date(dateMeasurement) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          locale="pt-BR"
          maximumDate={new Date()}
        />
      )}

      <GroupInput value={internalTemperature} onChangeText={setInternalTemperature} label="Temperatura Interna (°C)" />
      <GroupInput value={humidityInternal} onChangeText={setHumidityInternal} label="Umidade Interna (%)" />
      <GroupInput value={externalTemperature} onChangeText={setExternalTemperature} label="Temperatura Externa (°C)" />
      <GroupInput value={humidityExternal} onChangeText={setHumidityExternal} label="Umidade Externa (%)" />
      <Button onPress={handleSubmit}>
        {editingItem && editingItem.id ? "Atualizar Medição" : "Cadastrar Medição"}
      </Button>
    </View>
  );
}
export default FormTemperatureHumidity;
