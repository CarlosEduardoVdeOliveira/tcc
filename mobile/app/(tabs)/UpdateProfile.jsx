import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
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
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { z } from "zod";

import { getUser, updateUser } from "../../api/userApi.js";

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

function UpdateProfile() {
  const navigation = useNavigation();
  const [viewPassword, setViewPassword] = useState(true);
  const [initialRegion, setInitialRegion] = useState({
    latitude: -23.55052, // São Paulo - padrão
    longitude: -46.633308,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

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
        const lat = Number(userData.latitude) || initialRegion.latitude;
        const lng = Number(userData.longitude) || initialRegion.longitude;
        setValue("latitude", lat);
        setValue("longitude", lng);

        setInitialRegion({
          ...initialRegion,
          latitude: lat,
          longitude: lng,
        });
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
      }
    }
    loadUser();
  }, []);

  const latitude = watch("latitude");
  const longitude = watch("longitude");

  const onSubmit = async (data) => {
    try {
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;
      if (!user?.id) {
        navigation.navigate("Login");
        return;
      }
      await updateUser({ id: user.id, ...data });
      Alert.alert("Sucesso", "Perfil atualizado!");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o perfil.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        <Text style={{ fontWeight: "bold" }}>Ainda não tem cadastro?</Text>
        {"\n"}
        Comece hoje a gerenciar suas colmeias, precisamos de alguns dados:
      </Text>

      {/* Nome */}
      <Text style={styles.label}>Nome</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="Digite seu nome."
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}

      {/* Email */}
      <Text style={styles.label}>E-mail</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Digite seu email."
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      {/* CPF/CNPJ */}
      <Text style={styles.label}>CPF/CNPJ</Text>
      <Controller
        control={control}
        name="cpfCnpj"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.cpfCnpj && styles.inputError]}
            placeholder="Digite seu CPF ou CNPJ"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
          />
        )}
      />
      {errors.cpfCnpj && (
        <Text style={styles.errorText}>{errors.cpfCnpj.message}</Text>
      )}

      {/* Senha */}
      <Text style={styles.label}>Senha</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.input,
                { flex: 1 },
                errors.password && styles.inputError,
              ]}
              placeholder="Digite uma senha."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={viewPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setViewPassword(!viewPassword)}
              style={styles.eyeButton}
            >
              <Text>{viewPassword ? "🙈" : "🐵"}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      {/* Status */}
      <Text style={styles.label}>Status</Text>
      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value } }) => (
          <View
            style={[styles.pickerWrapper, errors.status && styles.inputError]}
          >
            <Picker selectedValue={value} onValueChange={onChange}>
              <Picker.Item label="Seleciona o status" value="" />
              <Picker.Item label="Ativo" value="Ativo" />
              <Picker.Item label="Inativo" value="Inativo" />
            </Picker>
          </View>
        )}
      />
      {errors.status && (
        <Text style={styles.errorText}>{errors.status.message}</Text>
      )}

      {/* Start Date */}
      <Text style={styles.label}>Data de início</Text>
      <Controller
        control={control}
        name="startDate"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.startDate && styles.inputError]}
            placeholder="AAAA-MM-DD"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.startDate && (
        <Text style={styles.errorText}>{errors.startDate.message}</Text>
      )}

      {/* Map */}
      <Text style={styles.label}>Localização</Text>
      <MapView
        style={styles.map}
        region={{
          latitude: latitude || initialRegion.latitude,
          longitude: longitude || initialRegion.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={(e) => {
          const coords = e.nativeEvent.coordinate;
          setValue("latitude", coords.latitude);
          setValue("longitude", coords.longitude);
        }}
      >
        {latitude !== 0 && longitude !== 0 && (
          <Marker coordinate={{ latitude, longitude }} />
        )}
      </MapView>
      {(errors.latitude || errors.longitude) && (
        <Text style={styles.errorText}>
          {errors.latitude?.message || errors.longitude?.message}
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: "bold",
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 4,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeButton: {
    padding: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
  },
  map: {
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 14,
    borderRadius: 6,
    marginTop: 24,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default UpdateProfile;
