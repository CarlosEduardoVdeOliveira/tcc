import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";
import { getBeehive, updateBeehive } from "../../api/beehiveApi.js";
import Button from "../../components/Button.js";
import Footer from "../../components/Footer.js";
import Header from "../../components/Header.js";
import Map from "../../components/Map.js";

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

const statusOptions = [
  { label: "Selecione o status", value: "" },
  { label: "Ativa", value: "ativa" },
  { label: "Em Manutenção", value: "em manutenção" },
  { label: "Abandonada", value: "abandonada" },
];

function UpdateBeehive() {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [producerId, setProducerId] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    control,
    handleSubmit,
    setValue,
    watch,
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

  const watchedValues = watch();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    async function fetchBeehive() {
      try {
        const userToken = await AsyncStorage.getItem("user_token");
        const isConnected = (await NetInfo.fetch()).isConnected;

        if (isConnected) {
          const response = await getBeehive(id, {
            headers: { Authorization: `Bearer ${userToken}` },
          });

          const data = response.data;
          await AsyncStorage.setItem(`beehive_${id}`, JSON.stringify(data));

          setProducerId(data.producerId);
          setValue("name", data.name);
          setValue("typeBeehive", data.typeBeehive);
          setValue("observations", data.observations || "");
          setValue("startDate", data.startDate);
          setValue("status", data.status);
          setValue("latitude", data.latitude);
          setValue("longitude", data.longitude);

          if (data.startDate) {
            setSelectedDate(new Date(data.startDate));
          }
        } else {
          const localData = await AsyncStorage.getItem(`beehive_${id}`);
          if (localData) {
            const data = JSON.parse(localData);
            setProducerId(data.producerId);
            setValue("name", data.name);
            setValue("typeBeehive", data.typeBeehive);
            setValue("observations", data.observations || "");
            setValue("startDate", data.startDate);
            setValue("status", data.status);
            setValue("latitude", data.latitude);
            setValue("longitude", data.longitude);
            if (data.startDate) {
              setSelectedDate(new Date(data.startDate));
            }
          } else {
            Alert.alert(
              "Offline",
              "Sem conexão e sem dados locais disponíveis."
            );
          }
        }
      } catch (error) {
        console.error("Erro ao carregar colmeia:", error);
        Alert.alert("Erro", "Não foi possível carregar a colmeia.");
      } finally {
        setLoading(false);
      }
    }

    fetchBeehive();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const token = await AsyncStorage.getItem("user_token");
      const isConnected = (await NetInfo.fetch()).isConnected;

      if (isConnected) {
        await updateBeehive(
          id,
          { ...data, producerId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("Sucesso", "Colmeia atualizada com sucesso!");
        navigation.navigate("(tabs)", { screen: "Beehives" });
      } else {
        await AsyncStorage.setItem(
          `pending_update_beehive_${id}`,
          JSON.stringify({ ...data, producerId })
        );
        Alert.alert(
          "Offline",
          "Alteração salva localmente. Será sincronizada quando houver conexão."
        );
        navigation.navigate("(tabs)", { screen: "Beehives" });
      }
    } catch (err) {
      console.error("Erro ao atualizar:", err);
      Alert.alert("Erro", "Não foi possível atualizar a colmeia.");
    }
  };

  const handleDateChange = (_event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setValue("startDate", formattedDate);
    }
  };

  const formatDateToBrazilian = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ativa":
        return "#10B981";
      case "em manutenção":
        return "#F59E0B";
      case "abandonada":
        return "#6B7280";
      default:
        return "#6B7280";
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando colmeia...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header pathName="Beehives" title="Editar Colmeia" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {/* Nome */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Digite o nome da colmeia"
                  value={value}
                  onChangeText={onChange}
                  placeholderTextColor="#9CA3AF"
                />
              )}
            />
            {errors.name && (
              <Text style={styles.error}>{errors.name.message}</Text>
            )}
          </View>

          {/* Tipo de Colmeia */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo de Colmeia</Text>
            <Controller
              control={control}
              name="typeBeehive"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Digite o tipo da colmeia"
                  value={value}
                  onChangeText={onChange}
                  placeholderTextColor="#9CA3AF"
                />
              )}
            />
            {errors.typeBeehive && (
              <Text style={styles.error}>{errors.typeBeehive.message}</Text>
            )}
          </View>

          {/* Observações */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Observações</Text>
            <Controller
              control={control}
              name="observations"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, styles.textarea]}
                  placeholder="Digite observações sobre a colmeia"
                  multiline
                  numberOfLines={4}
                  value={value}
                  onChangeText={onChange}
                  placeholderTextColor="#9CA3AF"
                  textAlignVertical="top"
                />
              )}
            />
          </View>

          {/* Status e Data */}
          <View style={styles.row}>
            {/* Status */}
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Status</Text>
              <TouchableOpacity
                style={styles.selectInput}
                onPress={() => setShowStatusModal(true)}
              >
                <Text
                  style={[
                    styles.selectText,
                    {
                      color: watchedValues.status
                        ? getStatusColor(watchedValues.status)
                        : "#9CA3AF",
                    },
                  ]}
                >
                  {statusOptions.find(
                    (opt) => opt.value === watchedValues.status
                  )?.label || "Selecione o status"}
                </Text>
              </TouchableOpacity>
              {errors.status && (
                <Text style={styles.error}>{errors.status.message}</Text>
              )}
            </View>

            {/* Data de Início */}
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Data de Início</Text>
              <TouchableOpacity
                style={styles.selectInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Text
                  style={[
                    styles.selectText,
                    { color: watchedValues.startDate ? "#374151" : "#9CA3AF" },
                  ]}
                >
                  {watchedValues.startDate
                    ? formatDateToBrazilian(watchedValues.startDate)
                    : "Selecione a data"}
                </Text>
              </TouchableOpacity>
              {errors.startDate && (
                <Text style={styles.error}>{errors.startDate.message}</Text>
              )}
            </View>
          </View>

          {/* Mapa */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Localização</Text>
            <View style={styles.mapContainer}>
              <Map
                latitude={
                  watchedValues.latitude !== 0 ? watchedValues.latitude : -15.78
                }
                longitude={
                  watchedValues.longitude !== 0
                    ? watchedValues.longitude
                    : -47.93
                }
                onSelectLocation={(coords) => {
                  setValue("latitude", coords[0]);
                  setValue("longitude", coords[1]);
                }}
              />
            </View>
          </View>

          {/* Botão */}
          <Button onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
            <Text>Atualizar Colmeia</Text>
          </Button>
        </View>

        {/* Modal de Status */}
        <Modal
          visible={showStatusModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowStatusModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecione o Status</Text>
              {statusOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.modalOption}
                  onPress={() => {
                    setValue("status", option.value);
                    setShowStatusModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalOptionText,
                      {
                        color: option.value
                          ? getStatusColor(option.value)
                          : "#374151",
                      },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setShowStatusModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
            locale="pt-BR"
            maximumDate={new Date()}
          />
        )}
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  loadingText: {
    fontSize: 16,
    color: "#6B7280",
  },
  form: {
    padding: 24,
    paddingTop: 0,
  },
  inputGroup: {
    marginBottom: 20,
  },
  halfWidth: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#111827",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  selectInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  selectText: {
    fontSize: 16,
    fontWeight: "500",
  },
  mapContainer: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  error: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  submitButton: {
    marginTop: 32,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  modalOptionText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  modalCancel: {
    marginTop: 20,
    paddingVertical: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
    textAlign: "center",
  },
});

export default UpdateBeehive;
