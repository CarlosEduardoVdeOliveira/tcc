import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
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
import { createUser } from "../../api/userApi.js"; // precisa ser adaptado para mobile
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
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  const navigation = useNavigation();

  const {
    register,
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
      latitude: 0,
      longitude: 0,
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ainda não tem cadastro?</Text>
      <Text>Comece hoje a gerenciar suas colmeias:</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={(text) => setValue("name", text)}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setValue("email", text)}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <TextInput
        style={styles.input}
        placeholder="CPF ou CNPJ"
        onChangeText={(text) => setValue("cpfCnpj", text)}
      />
      {errors.cpfCnpj && (
        <Text style={styles.error}>{errors.cpfCnpj.message}</Text>
      )}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={viewPassword}
          onChangeText={(text) => setValue("password", text)}
        />
        <TouchableOpacity onPress={() => setViewPassword(!viewPassword)}>
          <Icon name={viewPassword ? "eye-off" : "eye"} size={24} />
        </TouchableOpacity>
      </View>
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Data de início (YYYY-MM-DD)"
        onChangeText={(text) => setValue("startDate", text)}
      />
      {errors.startDate && (
        <Text style={styles.error}>{errors.startDate.message}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Status (Ativo/Inativo)"
        onChangeText={(text) => setValue("status", text)}
      />
      {errors.status && (
        <Text style={styles.error}>{errors.status.message}</Text>
      )}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -15.7801,
          longitude: -47.9292,
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

      <Button title="Cadastrar" onPress={handleSubmit(onSubmit)} />

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginLink}>Já tenho conta, fazer login?</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  map: {
    height: 200,
    width: "100%",
    borderRadius: 8,
  },
  loginLink: {
    textAlign: "center",
    marginTop: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
export default CreateAccount;