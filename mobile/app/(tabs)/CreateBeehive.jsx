import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import { z } from "zod";
import { createBeehive } from "../../api/beehiveApi.js";
import Button from "../../components/Button.js";
import Footer from "../../components/Footer.js";
import Header from "../../components/Header.js";

const schema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  typeBeehive: z
    .string()
    .min(3, "Tipo de colmeia deve ter no mínimo três caracteres."),
  observations: z.string().optional(),
  startDate: z.string().min(1, "Selecione a data de início."),
  status: z.string().min(1, "Selecione um status"),
  latitude: z
    .number()
    .refine((val) => val >= -90 && val <= 90, "Latitude inválida"),
  longitude: z
    .number()
    .refine((val) => val >= -180 && val <= 180, "Longitude inválida"),
});

function CreateBeehive() {
  const router = useRouter();
  const [producerId, setProducerId] = useState(null);
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange", // para atualizar isValid sempre que mudar
    defaultValues: {
      name: "",
      typeBeehive: "",
      observations: "",
      startDate: "",
      status: "",
      latitude: -15.7801,
      longitude: -47.9292,
    },
  });

  // Para sincronizar status e localização com o formulário
  const status = watch("status");
  const latitude = watch("latitude");
  const longitude = watch("longitude");

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
    setLoading(true);
    const result = await createBeehive({
      ...data,
      producerId,
    });
    setLoading(false);
    if (result?.error) {
      Alert.alert("Erro", result.message || "Falha ao criar colmeia.");
      return;
    }
    Alert.alert("Sucesso", "Colmeia criada com sucesso!");
    router.replace("/(tabs)/Beehives");
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setValue("latitude", latitude, { shouldValidate: true, shouldTouch: true });
    setValue("longitude", longitude, {
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const handleStatusSelect = (status) => {
    setValue("status", status, { shouldValidate: true, shouldTouch: true });
    setShowStatusPicker(false);
  };
  const handleDateChange = (event, date) => {
  setShowDatePicker(false);
  if (date) {
    setSelectedDate(date);
    // Formata para 'YYYY-MM-DD' ou outro formato que sua API espera
    const formattedDate = date.toISOString().split("T")[0];
    setValue("startDate", formattedDate, { shouldValidate: true, shouldTouch: true });
  }
};
  const formatDate = (date) => {
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <View style={styles.container}>
      <Header pathName="/" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Cadastro de Colmeia</Text>
          <Text style={styles.subtitle}>
            Adicione uma nova colmeia ao seu sistema de gerenciamento
          </Text>
        </View>

        <View style={styles.form}>
          {/* Nome */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite o nome da colmeia"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.name && (
                  <Text style={styles.error}>{errors.name.message}</Text>
                )}
              </View>
            )}
          />

          {/* Tipo de Colmeia */}
          <Controller
            control={control}
            name="typeBeehive"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tipo de Colmeia</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite o tipo da colmeia"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.typeBeehive && (
                  <Text style={styles.error}>{errors.typeBeehive.message}</Text>
                )}
              </View>
            )}
          />

          {/* Observações */}
          <Controller
            control={control}
            name="observations"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Observações</Text>
                <TextInput
                  style={[styles.input, styles.textarea]}
                  placeholder="Digite observações sobre a colmeia"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={value}
                  onChangeText={onChange}
                />
              </View>
            )}
          />

          {/* Status e Data */}
          <View style={styles.rowContainer}>
            {/* Status */}
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Status</Text>
              <TouchableOpacity
                style={styles.selectInput}
                onPress={() => setShowStatusPicker(true)}
              >
                <Text
                  style={status ? styles.selectText : styles.placeholderText}
                >
                  {status || "Selecione o status"}
                </Text>
                <Icon name="chevron-down" size={20} color="#666" />

              </TouchableOpacity>
              {errors.status && (
                <Text style={styles.error}>{errors.status.message}</Text>
              )}
            </View>

            {/* Data */}
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Data de Início</Text>
              <TouchableOpacity
                style={styles.selectInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.selectText}>
                  {watch("startDate")
                    ? new Date(watch("startDate")).toLocaleDateString("pt-BR")
                    : formatDate(selectedDate)}
                </Text>
                <Icon name="calendar" size={20} color="#666" />
              </TouchableOpacity>
              {errors.startDate && (
                <Text style={styles.error}>{errors.startDate.message}</Text>
              )}
            </View>
          </View>

          {/* Mapa */}
          <View style={styles.mapContainer}>
            <Text style={styles.label}>Localização</Text>
            <Text style={styles.mapSubtitle}>
              Toque no mapa para definir a localização da colmeia
            </Text>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
              onPress={handleMapPress}
            >
              <Marker coordinate={{ latitude, longitude }} />
            </MapView>
            {(errors.latitude || errors.longitude) && (
              <>
                {errors.latitude && (
                  <Text style={styles.error}>{errors.latitude.message}</Text>
                )}
                {errors.longitude && (
                  <Text style={styles.error}>{errors.longitude.message}</Text>
                )}
              </>
            )}
          </View>

          {/* Botão Adicionar */}
          <Button
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading || !isValid}
          >Adicionar Colmeia</Button>
        </View>
      </ScrollView>

      {/* Modal Status Picker */}
      {showStatusPicker && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o Status</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleStatusSelect("Ativa")}
            >
              <Text style={styles.modalOptionText}>Ativa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleStatusSelect("Em Manutenção")}
            >
              <Text style={styles.modalOptionText}>Em Manutenção</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleStatusSelect("Abandonada")}
            >
              <Text style={styles.modalOptionText}>Abandonada</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setShowStatusPicker(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* DateTimePicker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  form: {
    padding: 20,
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textarea: {
    height: 100,
    paddingTop: 12,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
    gap: 8,
  },
  selectInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  selectText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
  },
  mapContainer: {
    gap: 8,
  },
  mapSubtitle: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  map: {
    height: 200,
    borderRadius: 8,
  },
  error: {
    color: "#dc2626",
    fontSize: 12,
    marginTop: 4,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  modalOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  modalCancel: {
    padding: 12,
    marginTop: 8,
  },
  modalCancelText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default CreateBeehive;
