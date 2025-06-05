import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Alert, View } from "react-native";
import { createTemperatureHumidity } from "../api/temperatureHumidity";
import { Button } from "./Button";
import { GroupInput } from "./GroupInput";

function FormTemperatureHumidity() {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();

  const [dateMeasurement, setDateMeasurement] = useState("");
  const [internalTemperature, setInternalTemperature] = useState("");
  const [externalTemperature, setExternalTemperature] = useState("");
  const [humidityInternal, setHumidityInternal] = useState("");
  const [humidityExternal, setHumidityExternal] = useState("");

  const handleSubmit = async () => {
    try {
      await createTemperatureHumidity({
        beehiveId: Number(id),
        dateMeasurement,
        internalTemperature: Number(internalTemperature),
        externalTemperature: Number(externalTemperature),
        humidityInternal: Number(humidityInternal),
        humidityExternal: Number(humidityExternal),
      });
      navigation.navigate("BeehiveDetails", { id });
    } catch (error) {
      Alert.alert("Erro", "Falha ao cadastrar temperatura/umidade.");
    }
  };

  return (
    <View style={{ gap: 16 }}>
      <GroupInput
        type="date"
        label="Data de medição"
        value={dateMeasurement}
        onChangeText={setDateMeasurement}
      />
      <GroupInput
        label="Temperatura interna"
        value={internalTemperature}
        onChangeText={setInternalTemperature}
      />
      <GroupInput
        label="Temperatura externa"
        value={externalTemperature}
        onChangeText={setExternalTemperature}
      />
      <GroupInput
        label="Umidade interna"
        value={humidityInternal}
        onChangeText={setHumidityInternal}
      />
      <GroupInput
        label="Umidade externa"
        value={humidityExternal}
        onChangeText={setHumidityExternal}
      />
      <Button title="Cadastrar Temperatura" onPress={handleSubmit} />
    </View>
  );
}
export default FormTemperatureHumidity;
