import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Picker, View } from "react-native";
import { createProductionHoney } from "../api/productionHoneyApi";
import { Button } from "./Button";
import { GroupInput } from "./GroupInput";
import { GroupTextarea } from "./GroupTextarea";

function FormProductionHoney() {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();

  const [dateCollection, setDateCollection] = useState("");
  const [amount, setAmount] = useState("");
  const [quality, setQuality] = useState("");
  const [observations, setObservations] = useState("");

  const handleSubmit = async () => {
    try {
      await createProductionHoney({
        beehiveId: Number(id),
        dateCollection,
        amount: Number(amount),
        quality,
        observations,
      });
      navigation.navigate("BeehiveDetails", { id });
    } catch (error) {
      Alert.alert("Erro", "Falha ao cadastrar produção.");
    }
  };

  return (
    <View style={{ gap: 16 }}>
      <GroupInput
        type="date"
        label="Data de coleta"
        value={dateCollection}
        onChangeText={setDateCollection}
      />
      <GroupInput label="Quantidade" value={amount} onChangeText={setAmount} />
      <Picker selectedValue={quality} onValueChange={setQuality}>
        <Picker.Item label="Seleciona nível de produção" value="" />
        <Picker.Item label="Alta" value="alta" />
        <Picker.Item label="Média" value="média" />
        <Picker.Item label="Baixa" value="baixa" />
      </Picker>
      <GroupTextarea
        label="Observações"
        value={observations}
        onChangeText={setObservations}
      />
      <Button title="Cadastrar Produção" onPress={handleSubmit} />
    </View>
  );
}
export default FormProductionHoney;
