import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import NetInfo from '@react-native-community/netinfo';
import * as Location from "expo-location";
import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import Icon from "react-native-vector-icons/Ionicons";
import { z } from "zod";
import { createBeehive } from "../../api/beehiveApi.js";
import Button from "../../components/Button.js";
import Footer from "../../components/Footer.js";
import Header from "../../components/Header.js";
import Map from "../../components/Map.js";

const schema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  typeBeehive: z
    .string()
    .min(3, "Tipo de colmeia deve ter no mínimo três caracteres."),
  observations: z.string().optional(),
  startDate: z.string().min(1, "Selecione a data de início."),
  status: z.string().min(1, "Selecione um status"),
  latitude: z.number().min(-90).max(90, "Latitude inválida"),
  longitude: z.number().min(-180).max(180, "Longitude inválida"),
});

function CreateBeehive() {
  const navigation = useNavigation();
  const [producerId, setProducerId] = useState(null);
  const [coords, setCoords] = useState({ latitude: null, longitude: null });
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    setValue,
    handleSubmit,
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
      latitude: null,
      longitude: null,
    },
  });

  const watchedValues = watch();
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userJson = await AsyncStorage.getItem("user");
        const token = await AsyncStorage.getItem("user_token");

        if (!userJson || !token) {
          navigation.navigate("Login");
          return;
        }
        if (userJson) {
          const parsed = JSON.parse(userJson);
          setProducerId(Number(parsed.id));

          // Usar coordenadas do usuário se disponíveis
          if (parsed.latitude && parsed.longitude) {
            const userLat = Number(parsed.latitude);
            const userLng = Number(parsed.longitude);
            console.log("Usando coordenadas do usuário:", {
              latitude: userLat,
              longitude: userLng,
            });
            setCoords({ latitude: userLat, longitude: userLng });
            setValue("latitude", userLat);
            setValue("longitude", userLng);
            return;
          }
        }
        // Se não tem coordenadas do usuário, buscar localização atual
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });
          setCoords({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          setValue("latitude", location.coords.latitude);
          setValue("longitude", location.coords.longitude);
        }
      } catch (error) {
        console.error("Erro ao carregar usuário ou localização:", error);
      }
    };
    loadUser();
  }, [navigation, setValue]);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const onSubmit = async (data) => {
  if (!producerId) {
    Alert.alert("Erro", "Usuário não autenticado.");
    return;
  }

  if (!data.latitude || !data.longitude) {
    Alert.alert("Erro", "Por favor, selecione a localização da colmeia no mapa.");
    return;
  }

  try {
    const isConnected = (await NetInfo.fetch()).isConnected;

    const beehiveData = {
      ...data,
      producerId,
      offline: !isConnected,
      createdAt: new Date().toISOString(),
    };

    if (isConnected) {
      await createBeehive(beehiveData);
      Alert.alert("Sucesso", "Colmeia criada com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.replace("(tabs)", { screen: "Beehives" }),
        },
      ]);
    } else {
      // Salva no AsyncStorage para sincronizar depois
      const saved = await AsyncStorage.getItem("offline_beehives");
      const parsed = saved ? JSON.parse(saved) : [];
      parsed.push(beehiveData);
      await AsyncStorage.setItem("offline_beehives", JSON.stringify(parsed));

      Alert.alert("Modo offline", "Colmeia salva localmente e será sincronizada quando houver conexão.", [
        {
          text: "OK",
          onPress: () => navigation.replace("(tabs)", { screen: "Beehives" }),
        },
      ]);
    }
  } catch (error) {
    console.error("Erro ao criar colmeia:", error);
    Alert.alert("Erro", "Falha ao criar colmeia.");
  }
};

  const handleLocationSelect = (location) => {
    const [latitude, longitude] = location;
    console.log("Nova localização selecionada:", { latitude, longitude });
    setCoords({ latitude, longitude });
    setValue("latitude", latitude);
    setValue("longitude", longitude);
  };

  const handleStatusSelect = (status) => {
    console.log("Status selecionado no modal:", status);
    setSelectedStatus(status);
    setValue("status", status);
    console.log("Status definido no formulário:", status);
    setShowStatusPicker(false);
  };

  const handleDateChange = (_event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split("T")[0];
      setValue("startDate", formattedDate);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <View style={styles.container}>
      <Header
        pathName="Beehives"
        title="Cadastro de Colmeia"
        subtitle="Adicione uma nova colmeia ao seu sistema de gerenciamento"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Formulário */}
        <View style={styles.form}>
          {/* Nome */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome da colmeia"
              onChangeText={(text) => setValue("name", text)}
            />
            {errors.name && (
              <Text style={styles.error}>{errors.name.message}</Text>
            )}
          </View>

          {/* Tipo de Colmeia */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo de Colmeia</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o tipo da colmeia"
              onChangeText={(text) => setValue("typeBeehive", text)}
            />
            {errors.typeBeehive && (
              <Text style={styles.error}>{errors.typeBeehive.message}</Text>
            )}
          </View>

          {/* Observações */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Observações</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Digite observações sobre a colmeia"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              onChangeText={(text) => setValue("observations", text)}
            />
          </View>

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
                  style={
                    selectedStatus ? styles.selectText : styles.placeholderText
                  }
                >
                  {selectedStatus || "Selecione o status"}
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
                  {formatDate(selectedDate)}
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
            <Map
              latitude={watchedValues.latitude}
              longitude={watchedValues.longitude}
              onSelectLocation={handleLocationSelect}
              style={styles.map}
            />

            {/* Informações das coordenadas */}
            <View style={styles.coordinatesInfo}>
              <Text style={styles.coordinatesText}>
                Latitude:{" "}
                {coords.latitude !== null
                  ? coords.latitude.toFixed(6)
                  : "Carregando..."}
              </Text>
              <Text style={styles.coordinatesText}>
                Longitude:{" "}
                {coords.longitude !== null
                  ? coords.longitude.toFixed(6)
                  : "Carregando..."}
              </Text>
            </View>

            {errors.latitude && (
              <Text style={styles.error}>{errors.latitude.message}</Text>
            )}
            {errors.longitude && (
              <Text style={styles.error}>{errors.longitude.message}</Text>
            )}
          </View>

          {/* Botão Adicionar */}
          <Button onPress={handleSubmit(onSubmit)}>
            <Text>Adicionar Colmeia</Text>
          </Button>
        </View>
      </ScrollView>

      {/* Modal Status Picker */}
      {showStatusPicker && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o Status</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleStatusSelect("ativa")}
            >
              <Text style={styles.modalOptionText}>Ativa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleStatusSelect("em manutenção")}
            >
              <Text style={styles.modalOptionText}>Em Manutenção</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleStatusSelect("abandonada")}
            >
              <Text style={styles.modalOptionText}>Abandonada</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalOption, styles.cancelOption]}
              onPress={() => setShowStatusPicker(false)}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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
    padding: 16,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  rowContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  halfWidth: {
    flex: 1,
  },
  selectInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e0e0e0",
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
    marginBottom: 20,
  },
  mapSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  map: {
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  error: {
    color: "#ef4444",
    fontSize: 14,
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
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  cancelOption: {
    borderBottomWidth: 0,
    marginTop: 8,
  },
  cancelText: {
    color: "#ef4444",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  coordinatesInfo: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  coordinatesText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
});

export default CreateBeehive;
