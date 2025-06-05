import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";
import { getBeehive, updateBeehive } from "../../api/beehiveApi.js";

// Esquema Zod
const schema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  typeBeehive: z.string().min(3, "Tipo deve ter ao menos 3 caracteres"),
  observations: z.string().optional(),
  startDate: z.string().min(1, "Data obrigatória"),
  status: z.string().min(1, "Status obrigatório"),
  latitude: z.number().min(-90).max(90, "Latitude inválida"),
  longitude: z.number().min(-180).max(180, "Longitude inválida"),
});

function UpdateBeehive() {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [producerId, setProducerId] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
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
    async function fetchBeehive() {
      try {
        const userToken = await AsyncStorage.getItem("user_token");
        const response = await getBeehive(id, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const data = response.data;
        setProducerId(data.producerId);

        setValue("name", data.name);
        setValue("typeBeehive", data.typeBeehive);
        setValue("observations", data.observations || "");
        setValue("startDate", data.startDate);
        setValue("status", data.status);
        setValue("latitude", data.latitude);
        setValue("longitude", data.longitude);
      } catch (error) {
        console.error("Erro ao carregar colmeia:", error);
        Alert.alert("Erro", "Não foi possível carregar a colmeia.");
      } finally {
        setLoading(false);
      }
    }

    fetchBeehive();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const token = await AsyncStorage.getItem("user_token");
      await updateBeehive(
        id,
        { ...data, producerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigation.navigate("BeehiveList");
    } catch (err) {
      console.error("Erro ao atualizar:", err);
      Alert.alert("Erro", "Não foi possível atualizar a colmeia.");
    }
  };

  if (loading) return <Text style={styles.loading}>Carregando colmeia...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Atualizar Colmeia</Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Controller
        control={control}
        name="typeBeehive"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Tipo de Colmeia"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.typeBeehive && (
        <Text style={styles.error}>{errors.typeBeehive.message}</Text>
      )}

      <Controller
        control={control}
        name="observations"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Observações"
            multiline
            numberOfLines={4}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Status (ativa, em manutenção, abandonada)"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.status && (
        <Text style={styles.error}>{errors.status.message}</Text>
      )}

      <Controller
        control={control}
        name="startDate"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Data de início (YYYY-MM-DD)"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.startDate && (
        <Text style={styles.error}>{errors.startDate.message}</Text>
      )}

      {/* Localização (você pode integrar mapa aqui) */}
      <Controller
        control={control}
        name="latitude"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            value={String(value)}
            onChangeText={(text) => onChange(Number(text))}
            keyboardType="numeric"
          />
        )}
      />
      {errors.latitude && (
        <Text style={styles.error}>{errors.latitude.message}</Text>
      )}

      <Controller
        control={control}
        name="longitude"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Longitude"
            value={String(value)}
            onChangeText={(text) => onChange(Number(text))}
            keyboardType="numeric"
          />
        )}
      />
      {errors.longitude && (
        <Text style={styles.error}>{errors.longitude.message}</Text>
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Atualizar Colmeia" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
  },
  loading: {
    marginTop: 50,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  textarea: {
    height: 80,
  },
  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
});
export default UpdateBeehive;
