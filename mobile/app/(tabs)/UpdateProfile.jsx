import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { z } from "zod";
import { getUser, updateUser } from "../../api/userApi.js";
import Button from "../../components/Button.js";
import Footer from "../../components/Footer.js";
import Header from "../../components/Header.js";
import Map from "../../components/Map.js";

const isValidCpfCnpj = (value) => {
  const onlyNumbers = value.replace(/\D/g, "");
  return onlyNumbers.length === 11 || onlyNumbers.length === 14;
};

const schema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: "A senha deve ter no mínimo 6 caracteres",
    }),
  startDate: z.string().min(1, "Selecione a data de início."),
  status: z.string().min(1, "Selecione um status"),
  latitude: z.number().min(-90).max(90, "Latitude inválida"),
  longitude: z.number().min(-180).max(180, "Longitude inválida"),
  cpfCnpj: z
    .string()
    .min(1, "Campo obrigatório")
    .refine(isValidCpfCnpj, "CPF ou CNPJ inválido"),
});

const statusOptions = [
  { label: "Selecione o status", value: "" },
  { label: "Ativo", value: "Ativo" },
  { label: "Inativo", value: "Inativo" },
];

function UpdateProfile() {
  const navigation = useNavigation();
  const [viewPassword, setViewPassword] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

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
      email: "",
      cpfCnpj: "",
      password: "",
      startDate: "",
      status: "",
      latitude: -23.55052,
      longitude: -46.633308,
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    async function loadUser() {
      try {
        const userJson = await AsyncStorage.getItem("user");
        const token = await AsyncStorage.getItem("user_token");

        if (!userJson || !token) {
          navigation.navigate("Login");
          return;
        }

        const user = JSON.parse(userJson);
        const id = user?.id;

        if (!id) {
          navigation.navigate("Login");
          return;
        }

        try {
          const userData = await getUser();
          await AsyncStorage.setItem("user", JSON.stringify(userData));

          setValue("name", userData.name || "");
          setValue("email", userData.email || "");
          setValue("cpfCnpj", userData.cpfCnpj || "");
          setValue("startDate", userData.startDate?.substring(0, 10) || "");
          setValue("status", userData.status || "");

          const lat = Number(userData.latitude) || -23.55052;
          const lng = Number(userData.longitude) || -46.633308;
          setValue("latitude", lat);
          setValue("longitude", lng);

          if (userData.startDate) {
            setSelectedDate(new Date(userData.startDate));
          }
        } catch (error) {
          console.log("Sem conexão, carregando dados locais");
          const userData = JSON.parse(userJson);
          setValue("name", userData.name || "");
          setValue("email", userData.email || "");
          setValue("cpfCnpj", userData.cpfCnpj || "");
          setValue("startDate", userData.startDate?.substring(0, 10) || "");
          setValue("status", userData.status || "");
          setValue("latitude", userData.latitude || -23.55052);
          setValue("longitude", userData.longitude || -46.633308);
        }
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
      }
    }
    loadUser();
  }, [navigation, setValue]);
  const testApiConnection = async () => {
    try {
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;
      if (!user?.id) {
        return false;
      }

      await getUser();
      return true;
    } catch (error) {
      console.error("Erro no teste de conexão:", error);
      return false;
    }
  };
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("user_token");
      if (!token) {
        Alert.alert(
          "Erro",
          "Token de autenticação não encontrado. Faça login novamente."
        );
        navigation.navigate("Login");
        return;
      }

      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;
      if (!user?.id) {
        navigation.navigate("Login");
        return;
      }

      const updateData = { ...data };
      if (!updateData.password) {
        delete updateData.password;
      }

      if (updateData.cpfCnpj) {
        updateData.cpfCnpj = String(updateData.cpfCnpj).replace(/\D/g, "");
      }

      updateData.name = String(updateData.name ?? "");
      updateData.email = String(updateData.email ?? "");
      updateData.status = String(updateData.status ?? "");
      updateData.startDate = String(updateData.startDate ?? "");
      updateData.latitude = Number(updateData.latitude ?? 0);
      updateData.longitude = Number(updateData.longitude ?? 0);

      if (
        !updateData.name ||
        !updateData.email ||
        !updateData.cpfCnpj ||
        !updateData.startDate ||
        !updateData.status ||
        !updateData.latitude ||
        !updateData.longitude
      ) {
        Alert.alert(
          "Erro",
          "Preencha todos os campos obrigatórios antes de atualizar o perfil."
        );
        setLoading(false);
        return;
      }

      if (updateData.startDate) {
        const date = new Date(updateData.startDate);
        if (!isNaN(date.getTime())) {
          updateData.startDate = date.toISOString().split("T")[0];
        }
      }

      const connected = await testApiConnection();

      if (connected) {
        await updateUser(updateData, user.id);
        const updatedUserData = await getUser();
        await AsyncStorage.setItem("user", JSON.stringify(updatedUserData));
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
        navigation.replace("(tabs)", { screen: "Profile" });
      } else {
        await AsyncStorage.setItem(
          "pending_update_profile",
          JSON.stringify(updateData)
        );
        Alert.alert(
          "Offline",
          "Atualização salva localmente e será enviada quando estiver online."
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    } finally {
      setLoading(false);
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

  // Função para formatar data no formato brasileiro
  const formatDateToBrazilian = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Ativo":
        return "#10B981";
      case "Inativo":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header pathName="Beehives" title="Editar Perfil" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.form}>
              {/* Nome e Email */}
              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Nome</Text>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Digite seu nome"
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

                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>E-mail</Text>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Digite seu email"
                        value={value}
                        onChangeText={onChange}
                        placeholderTextColor="#9CA3AF"
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    )}
                  />
                  {errors.email && (
                    <Text style={styles.error}>{errors.email.message}</Text>
                  )}
                </View>
              </View>

              {/* CPF/CNPJ e Senha */}
              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>CPF/CNPJ</Text>
                  <Controller
                    control={control}
                    name="cpfCnpj"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Digite seu CPF ou CNPJ"
                        value={value}
                        onChangeText={onChange}
                        placeholderTextColor="#9CA3AF"
                        keyboardType="numeric"
                      />
                    )}
                  />
                  {errors.cpfCnpj && (
                    <Text style={styles.error}>{errors.cpfCnpj.message}</Text>
                  )}
                </View>

                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Senha (opcional)</Text>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                      <View style={styles.passwordContainer}>
                        <TextInput
                          style={[styles.input, { flex: 1 }]}
                          placeholder="Deixe em branco para manter a senha atual"
                          value={value}
                          onChangeText={onChange}
                          placeholderTextColor="#9CA3AF"
                          secureTextEntry={viewPassword}
                          autoCapitalize="none"
                        />
                        <TouchableOpacity
                          onPress={() => setViewPassword(!viewPassword)}
                          style={styles.eyeButton}
                        >
                          <Icon
                            name={viewPassword ? "eye-off" : "eye"}
                            size={24}
                            color="#d1d1d1"
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                  {errors.password && (
                    <Text style={styles.error}>{errors.password.message}</Text>
                  )}
                </View>
              </View>

              {/* Status e Data */}
              <View style={styles.row}>
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
                      {watchedValues.status || "Selecione o status"}
                    </Text>
                  </TouchableOpacity>
                  {watchedValues.status && (
                    <View style={styles.statusIndicator}>
                      <View
                        style={[
                          styles.statusDot,
                          {
                            backgroundColor: getStatusColor(
                              watchedValues.status
                            ),
                          },
                        ]}
                      />
                      <Text
                        style={[
                          styles.statusText,
                          { color: getStatusColor(watchedValues.status) },
                        ]}
                      >
                        Status atual: {watchedValues.status}
                      </Text>
                    </View>
                  )}
                  {errors.status && (
                    <Text style={styles.error}>{errors.status.message}</Text>
                  )}
                </View>

                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Data de Início</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      style={[styles.selectInput, { flex: 1 }]}
                      onPress={() => setShowDatePicker(true)}
                    >
                      <Text
                        style={[
                          styles.selectText,
                          {
                            color: watchedValues.startDate
                              ? "#374151"
                              : "#9CA3AF",
                          },
                        ]}
                      >
                        {watchedValues.startDate
                          ? formatDateToBrazilian(watchedValues.startDate)
                          : "Selecione a data"}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(true)}
                      style={{ marginLeft: 8 }}
                    >
                      <Icon name="calendar" size={24} color="#d1d1d1" />
                    </TouchableOpacity>
                  </View>
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
                    key={`${watchedValues.latitude ?? -23.55052}-${
                      watchedValues.longitude ?? -46.633308
                    }`}
                    latitude={
                      watchedValues.latitude !== undefined &&
                      watchedValues.latitude !== null
                        ? watchedValues.latitude
                        : -23.55052
                    }
                    longitude={
                      watchedValues.longitude !== undefined &&
                      watchedValues.longitude !== null
                        ? watchedValues.longitude
                        : -46.633308
                    }
                    onSelectLocation={(coords) => {
                      setValue("latitude", coords[0]);
                      setValue("longitude", coords[1]);
                    }}
                  />
                </View>
                <View style={styles.coordinatesInfo}>
                  <Text style={styles.coordinatesText}>
                    <Text style={styles.coordinatesLabel}>Latitude:</Text>{" "}
                    {watchedValues.latitude
                      ? watchedValues.latitude.toFixed(6)
                      : "Não definida"}
                  </Text>
                  <Text style={styles.coordinatesText}>
                    <Text style={styles.coordinatesLabel}>Longitude:</Text>{" "}
                    {watchedValues.longitude
                      ? watchedValues.longitude.toFixed(6)
                      : "Não definida"}
                  </Text>
                </View>
              </View>

              {/* Botão */}
              <Button
                onPress={handleSubmit(onSubmit)}
                style={styles.submitButton}
                disabled={loading}
              >
                <Text>{loading ? "Atualizando..." : "Atualizar Perfil"}</Text>
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
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  form: {
    padding: 24,
    paddingTop: 0,
    top: 16,
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeButton: {
    position: "absolute",
    right: 16,
    zIndex: 1,
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
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
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
  coordinatesInfo: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
  },
  coordinatesText: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  coordinatesLabel: {
    fontWeight: "600",
    color: "#374151",
  },
  error: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  submitButton: {
    marginTop: 32,
    bottom: 16,
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

export default UpdateProfile;
