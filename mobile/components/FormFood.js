import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createFood } from "../api/foodApi";
import { Button } from "./Button";
import { GroupInput } from "./GroupInput";
import { GroupTextarea } from "./GroupTextarea";

function FormFood() {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();

  const [dateFeeding, setDateFeeding] = useState("");
  const [typeFood, setTypeFood] = useState("");
  const [amount, setAmount] = useState("");
  const [observations, setObservations] = useState("");

  const handleSubmit = async () => {
    try {
      await createFood({
        beehiveId: Number(id),
        dateFeeding,
        typeFood,
        amount: Number(amount),
        observations,
      });
      navigation.navigate("BeehiveDetails", { id });
    } catch (error) {
      Alert.alert("Erro", "Falha ao cadastrar alimentação.");
    }
  };

  return (
    <View style={{ gap: 16 }}>
      <GroupInput type="date" label="Data da alimentação" value={dateFeeding} onChangeText={setDateFeeding} />
      <GroupInput label="Tipo de comida" value={typeFood} onChangeText={setTypeFood} />
      <GroupInput label="Quantidade de comida" value={amount} onChangeText={setAmount} />
      <GroupTextarea label="Observações" value={observations} onChangeText={setObservations} />
      <Button title="Cadastrar Alimentação" onPress={handleSubmit} />
    </View>
  );
}
export default FormFood