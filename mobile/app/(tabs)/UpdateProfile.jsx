import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
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
  Modal,
} from "react-native";
import { z } from "zod";
import { getUser, updateUser } from "../../api/userApi.js";
import { Button } from "../../components/Button";
import { Map } from "../../components/Map";
import DateTimePicker from "@react-native-community/datetimepicker";

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
  latitude: z.number().refine((val) => val !== 0, "Localização inválida"),
  longitude: z.number().refine((val) => val !== 0, "Localização inválida"),
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
      latitude: 0,
      longitude: 0,
    },
  });

  const watchedValues = watch();

  // Recuperar usuário do AsyncStorage
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

        // Buscar dados do usuário na API
        const response = await getUser(id);
        const userData = response.data;

        // Popular o formulário
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
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
      }
    }
    loadUser();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;
      if (!user?.id) {
        navigation.navigate("Login");
        return;
      }
      await updateUser({ id: user.id, ...data });
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setValue("startDate", formattedDate);
    }
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Editar Perfil</Text>
        <Text style={styles.subtitle}>
          Atualize suas informações pessoais
        </Text>
      </View>

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
            {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
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
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
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
            {errors.cpfCnpj && <Text style={styles.error}>{errors.cpfCnpj.message}</Text>}
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Senha</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Digite uma senha"
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
                    <Text style={styles.eyeIcon}>
                      {viewPassword ? "🙈" : "🐵"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
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
              <Text style={[
                styles.selectText,
                { color: watchedValues.status ? getStatusColor(watchedValues.status) : "#9CA3AF" }
              ]}>
                {watchedValues.status || "Selecione o status"}
              </Text>
            </TouchableOpacity>
            {watchedValues.status && (
              <View style={styles.statusIndicator}>
                <View style={[
                  styles.statusDot,
                  { backgroundColor: getStatusColor(watchedValues.status) }
                ]} />
                <Text style={[
                  styles.statusText,
                  { color: getStatusColor(watchedValues.status) }
                ]}>
                  Status atual: {watchedValues.status}
                </Text>
              </View>
            )}
            {errors.status && <Text style={styles.error}>{errors.status.message}</Text>}
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Data de Início</Text>
            <TouchableOpacity
              style={styles.selectInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[
                styles.selectText,
                { color: watchedValues.startDate ? "#374151" : "#9CA3AF" }
              ]}>
                {watchedValues.startDate || "Selecione a data"}
              </Text>
            </TouchableOpacity>
            {errors.startDate && <Text style={styles.error}>{errors.startDate.message}</Text>}
          </View>
        </View>

        {/* Mapa */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Localização</Text>
          <View style={styles.mapContainer}>
            <Map
              latitude={watchedValues.latitude}
              longitude={watchedValues.longitude}
              onSelectLocation={(coords) => {
                setValue("latitude", coords[0]);
                setValue("longitude", coords[1]);
              }}
            />
          </View>
          <View style={styles.coordinatesInfo}>
            <Text style={styles.coordinatesText}>
              <Text style={styles.coordinatesLabel}>Latitude:</Text> {watchedValues.latitude || "Não definida"}
            </Text>
            <Text style={styles.coordinatesText}>
              <Text style={styles.coordinatesLabel}>Longitude:</Text> {watchedValues.longitude || "Não definida"}
            </Text>
          </View>
        </View>

        {/* Botão */}
        <Button
          title={loading ? "Atualizando..." : "Atualizar Perfil"}
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
          disabled={loading}
        />
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
                <Text style={[
                  styles.modalOptionText,
                  { color: option.value ? getStatusColor(option.value) : "#374151" }
                ]}>
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
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeButton: {
    position: "absolute",
    right: 16,
    zIndex: 1,
  },
  eyeIcon: {
    fontSize: 20,
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
