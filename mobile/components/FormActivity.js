import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createActivity } from "../api/activityApi";
import { Button } from "./Button";
import { GroupInput } from "./GroupInput";
import { GroupTextarea } from "./GroupTextarea";

function FormActivity() {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();

  const [dateActivity, setDateActivity] = useState("");
  const [typeActivity, setTypeActivity] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [observations, setObservations] = useState("");

  const handleSubmit = async () => {
    try {
      await createActivity({
        beehiveId: Number(id),
        dateActivity,
        typeActivity,
        descriptions,
        observations,
      });
      navigation.navigate("BeehiveDetails", { id });
    } catch (error) {
      Alert.alert("Erro", "Falha ao cadastrar atividade.");
    }
  };

  return (
    <View style={{ gap: 16 }}>
      <GroupInput value={dateActivity} onChangeText={setDateActivity} label="Data da Atividade" type="date" />
      <GroupInput value={typeActivity} onChangeText={setTypeActivity} label="Qual atividade" />
      <GroupTextarea value={descriptions} onChangeText={setDescriptions} label="Descrição" placeholder="Digite a descrição da atividade..." />
      <GroupInput value={observations} onChangeText={setObservations} label="Observação" />
      <Button title="Cadastrar Atividade" onPress={handleSubmit} />
    </View>
  );
}
export default FormActivity