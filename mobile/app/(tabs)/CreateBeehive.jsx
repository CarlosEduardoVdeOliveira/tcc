import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { 
  Alert, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Platform 
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import { z } from "zod";
import { createBeehive } from "../../api/beehiveApi.js";
import Button from "../../components/Button.js";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";

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
  const [producerId, setProducerId] = useState(null);
  const [coords, setCoords] = useState({ latitude: -15.7801, longitude: -47.9292 });
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

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
      latitude: -15.7801,
      longitude: -47.9292,
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
      navigation.navigate("BeehiveList");
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

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setValue("status", status);
    setShowStatusPicker(false);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split('T')[0];
      setValue("startDate", formattedDate);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <View style={styles.container}>
      <Header pathName="/" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header da página */}
        <View style={styles.header}>
          <Text style={styles.title}>Cadastro de Colmeia</Text>
          <Text style={styles.subtitle}>
            Adicione uma nova colmeia ao seu sistema de gerenciamento
          </Text>
        </View>

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
            {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
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
                <Text style={selectedStatus ? styles.selectText : styles.placeholderText}>
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
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
              onPress={handleMapPress}
            >
              {coords.latitude !== -15.7801 && <Marker coordinate={coords} />}
            </MapView>
            {errors.latitude && (
              <Text style={styles.error}>{errors.latitude.message}</Text>
            )}
            {errors.longitude && (
              <Text style={styles.error}>{errors.longitude.message}</Text>
            )}
          </View>

          {/* Botão Adicionar */}
          <Button title="Adicionar Colmeia" onPress={handleSubmit(onSubmit)} />
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
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
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
