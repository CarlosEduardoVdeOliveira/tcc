import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createDisease } from "../api/diseaseApi";
import { Button } from "./Button";
import { GroupInput } from "./GroupInput";
import { GroupTextarea } from "./GroupTextarea";

function FormDisease() {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();

  const [dateDiagnosis, setDateDiagnosis] = useState("");
  const [diseasePrague, setDiseasePrague] = useState("");
  const [treatment, setTreatment] = useState("");
  const [observations, setObservations] = useState("");

  const handleSubmit = async () => {
    try {
      await createDisease({
        beehiveId: Number(id),
        dateDiagnosis,
        diseasePrague,
        treatment,
        observations,
      });
      navigation.navigate("BeehiveDetails", { id });
    } catch (error) {
      Alert.alert("Erro", "Falha ao cadastrar doença.");
    }
  };

  return (
    <View style={{ gap: 16 }}>
      <GroupInput type="date" label="Data do diagnóstico" value={dateDiagnosis} onChangeText={setDateDiagnosis} />
      <GroupInput label="Qual doença" value={diseasePrague} onChangeText={setDiseasePrague} />
      <GroupTextarea label="Tratamento" value={treatment} onChangeText={setTreatment} />
      <GroupTextarea label="Observações" value={observations} onChangeText={setObservations} />
      <Button title="Cadastrar Doença/Praga" onPress={handleSubmit} />
    </View>
  );
}

export default FormDisease