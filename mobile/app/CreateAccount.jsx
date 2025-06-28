import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { Eye, EyeOff } from "lucide-react-native";
import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import { z } from "zod";
import { createUser } from "../api/userApi.js";
import Button from "../components/Button.js";
import Footer from "../components/Footer.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  latitude: z
    .number()
    .refine((val) => Math.abs(val) <= 90, "Latitude inválida"),
  longitude: z
    .number()
    .refine((val) => Math.abs(val) <= 180, "Longitude inválida"),
  cpfCnpj: z.string().refine(isValidCpfCnpj, "CPF ou CNPJ inválido"),
});

function CreateAccount() {
  const [viewPassword, setViewPassword] = useState(true);
  const [, setPassword] = useState("");
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

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permissão negada",
            "Não foi possível obter a localização."
          );
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setCoords({ latitude, longitude });
        setValue("latitude", latitude);
        setValue("longitude", longitude);
      } catch (error) {
        console.error("Erro ao obter localização:", error);
      }
    })();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      await createUser(data);
      Alert.alert("Sucesso", "Conta criada com sucesso");
      navigation.navigate("Login");
    } catch (err) {
      console.error("Erro ao criar conta:", err);
      // Salva os dados localmente em caso de erro de rede
      try {
        const pendingUsersJson = await AsyncStorage.getItem("pending_users");
        const pendingUsers = pendingUsersJson ? JSON.parse(pendingUsersJson) : [];
        pendingUsers.push(data);
        await AsyncStorage.setItem("pending_users", JSON.stringify(pendingUsers));
        Alert.alert(
          "Offline",
          "Sem conexão. Os dados foram salvos localmente e serão enviados quando possível."
        );
        navigation.navigate("Login");
      } catch (localError) {
        console.error("Erro ao salvar localmente:", localError);
        Alert.alert("Erro", "Falha ao criar conta e salvar localmente.");
      }
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
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
            <Text style={styles.label}>Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Digite sua senha"
                secureTextEntry={viewPassword}
                /* value={password}
                onChangeText={setPassword} */
                onChangeText={(text) => {
                  setPassword(text);
                  setValue("password", text);
                }}
                placeholderTextColor="#bdbdbd"
              />
              <TouchableOpacity
                onPress={() => setViewPassword((prev) => !prev)}
              >
                {viewPassword ? (
                  <EyeOff size={22} color="#bdbdbd" />
                ) : (
                  <Eye size={22} color="#bdbdbd" />
                )}
              </TouchableOpacity>
            </View>
            {/* <View style={styles.inputGroup}>
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
        </View> */}

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
                      selectedStatus
                        ? styles.selectText
                        : styles.placeholderText
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
                  <Text
                    style={
                      selectedDate ? styles.selectText : styles.placeholderText
                    }
                  >
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
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress}
              >
                <Marker
                  coordinate={{
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                  }}
                />
              </MapView>
              {errors.latitude && (
                <Text style={styles.error}>{errors.latitude.message}</Text>
              )}
            </View>

            {/* Botão de Cadastro */}
            <Button onPress={handleSubmit(onSubmit)}>
              <Text>Criar Conta</Text>
            </Button>

            {/* Link para Login */}
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginLink}>
                Já tem uma conta?{" "}
                <Text
                  style={styles.loginLinkBold}
                  onPress={() => navigation.navigate("Login")}
                >
                  Faça login
                </Text>
              </Text>
            </View>
          </View>

          {/* Modal Status */}
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

          <Footer />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    backgroundColor: "transparent",
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
    backgroundColor: "#fafafa",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fafafa",
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
