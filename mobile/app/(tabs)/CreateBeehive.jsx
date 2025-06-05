import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { z } from "zod";
import { createBeehive } from "../../api/beehiveApi.js";
import Button from "../../components/Button.js";

const schema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  typeBeehive: z
    .string()
    .min(3, "Tipo de colmeia deve ter no mínimo três caracteres."),
  observations: z.string().optional(),
  startDate: z.string().min(1, "Selecione a data de início."),
  status: z.string().min(1, "Selecione um status"),
  latitude: z.number().min(2, "Localização inválida"),
  longitude: z.number().min(2, "Localização inválida"),
});

function CreateBeehive() {
  const navigation = useNavigation();
  // eslint-disable-next-line no-undef
  const [producerId, setProducerId] = (useState < number) | (null > null);
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      typeBeehive: "",
      observations: "",
      startDate: "",
      status: "",
      latitude: 0,
      longitude: 0,
    },
  });

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const parsed = JSON.parse(userData);
        setProducerId(Number(parsed.id));
      }
    };
    loadUser();
  }, []);

  const onSubmit = async (data) => {
    if (!producerId) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    try {
      await createBeehive({
        ...data,
        producerId,
      });

      Alert.alert("Sucesso", "Colmeia criada com sucesso!");
      navigation.navigate("BeehiveList"); // Ajuste o nome da rota conforme seu app
    } catch (error) {
      console.error("Erro ao criar colmeia:", error);
      Alert.alert("Erro", "Falha ao criar colmeia.");
    }
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setCoords({ latitude, longitude });
    setValue("latitude", latitude);
    setValue("longitude", longitude);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Colmeia</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={(text) => setValue("name", text)}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Tipo de Colmeia"
        onChangeText={(text) => setValue("typeBeehive", text)}
      />
      {errors.typeBeehive && (
        <Text style={styles.error}>{errors.typeBeehive.message}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Observações"
        multiline
        numberOfLines={3}
        onChangeText={(text) => setValue("observations", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Data de início (YYYY-MM-DD)"
        onChangeText={(text) => setValue("startDate", text)}
      />
      {errors.startDate && (
        <Text style={styles.error}>{errors.startDate.message}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Status (ativa/em manutenção/abandonada)"
        onChangeText={(text) => setValue("status", text)}
      />
      {errors.status && (
        <Text style={styles.error}>{errors.status.message}</Text>
      )}

      <Text style={styles.label}>
        Toque no mapa para definir a localização:
      </Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -15.7801,
          longitude: -47.9292,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={handleMapPress}
      >
        {coords.latitude !== 0 && <Marker coordinate={coords} />}
      </MapView>
      {errors.latitude && (
        <Text style={styles.error}>{errors.latitude.message}</Text>
      )}
      {errors.longitude && (
        <Text style={styles.error}>{errors.longitude.message}</Text>
      )}

      <Button title="Adicionar" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginVertical: 12,
  },
  label: {
    fontWeight: "bold",
    marginTop: 8,
  },
});
export default CreateBeehive;
