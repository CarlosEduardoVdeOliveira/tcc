import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
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
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import { z } from "zod";
import { createUser } from "../../api/userApi.js";
import Button from "../../components/Button.js";

const isValidCpfCnpj = (value) => {
  const onlyNumbers = value.replace(/\D/g, "");
  return onlyNumbers.length === 11 || onlyNumbers.length === 14;
};

const schema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  startDate: z.string().min(1, "Selecione a data de início."),
  status: z.string().min(1, "Selecione um status"),
  latitude: z.number().min(2, "Localização inválida"),
  longitude: z.number().min(2, "Localização inválida"),
  cpfCnpj: z.string().refine(isValidCpfCnpj, "CPF ou CNPJ inválido"),
});

function CreateAccount() {
  const [viewPassword, setViewPassword] = useState(true);
  const [coords, setCoords] = useState({
    latitude: -15.7801,
    longitude: -47.9292,
  });
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      startDate: "",
      status: "",
      latitude: -15.7801,
      longitude: -47.9292,
      cpfCnpj: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await createUser(data);
      Alert.alert("Sucesso", "Conta criada com sucesso");
      navigation.navigate("Login");
    } catch (err) {
      console.error("Erro ao criar conta:", err);
      Alert.alert("Erro", "Falha ao criar conta");
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
      const formattedDate = date.toISOString().split("T")[0];
      setValue("startDate", formattedDate);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text style={styles.bold}>Ainda não tem cadastro?</Text>
          {"\n"}
          Comece hoje a gerenciar suas colmeias, precisamos de alguns dados:
        </Text>
      </View>

      <View style={styles.form}>
        {/* Nome */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            onChangeText={(text) => setValue("name", text)}
          />
          {errors.name && (
            <Text style={styles.error}>{errors.name.message}</Text>
          )}
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => setValue("email", text)}
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}
        </View>

        {/* CPF/CNPJ */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>CPF/CNPJ</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu CPF ou CNPJ"
            onChangeText={(text) => setValue("cpfCnpj", text)}
          />
          {errors.cpfCnpj && (
            <Text style={styles.error}>{errors.cpfCnpj.message}</Text>
          )}
        </View>

        {/* Senha */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Digite uma senha"
              secureTextEntry={viewPassword}
              onChangeText={(text) => setValue("password", text)}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setViewPassword(!viewPassword)}
            >
              <Icon
                name={viewPassword ? "eye-off" : "eye"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}
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
            <Text style={styles.label}>Data de início</Text>
            <TouchableOpacity
              style={styles.selectInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.selectText}>{formatDate(selectedDate)}</Text>
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
            <Marker coordinate={coords} />
          </MapView>
          {errors.latitude && (
            <Text style={styles.error}>{errors.latitude.message}</Text>
          )}
          {errors.longitude && (
            <Text style={styles.error}>{errors.longitude.message}</Text>
          )}
        </View>

        {/* Botão Cadastrar */}
        <Button onPress={handleSubmit(onSubmit)}>
          <Text>Cadastrar</Text>
        </Button>

        {/* Link para Login */}
        <TouchableOpacity
          style={styles.loginLinkContainer}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginLink}>
            Já tenho conta,{" "}
            <Text style={styles.loginLinkBold}>fazer login?</Text>
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal Status Picker */}
      {showStatusPicker && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o Status</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleStatusSelect("Ativo")}
            >
              <Text style={styles.modalOptionText}>Ativo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleStatusSelect("Inativo")}
            >
              <Text style={styles.modalOptionText}>Inativo</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 24,
    color: "#333",
  },
  bold: {
    fontWeight: "bold",
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  eyeButton: {
    padding: 12,
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
  map: {
    height: 200,
    borderRadius: 8,
  },
  error: {
    color: "#dc2626",
    fontSize: 12,
    marginTop: 4,
  },
  loginLinkContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  loginLink: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  loginLinkBold: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#eead2d",
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

export default CreateAccount;
