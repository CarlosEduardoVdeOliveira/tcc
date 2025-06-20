import { useNavigation } from "@react-navigation/native";
import { Eye, EyeOff } from "lucide-react-native";
import { useContext, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/Button.js";
import { AuthContext } from "../../contexts/auth.js";

function Login() {
  const [viewPassword, setViewPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signin } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogin = async () => {
    const result = await signin(email, password);
    if (result.success) {
      navigation.navigate("Beehives"); // ajuste conforme a sua rota
    } else {
      Alert.alert("Erro", result.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Boas-vindas!</Text>
        <Text style={styles.subtitle}>
          A sua plataforma de gerenciamento das suas colmeias.
        </Text>
        <View style={styles.formBox}>
          <Text style={styles.formTitle}>Já tem conta? Faça seu login:</Text>

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#bdbdbd"
          />

          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Digite sua senha"
              secureTextEntry={viewPassword}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#bdbdbd"
            />
            <TouchableOpacity onPress={() => setViewPassword((prev) => !prev)}>
              {viewPassword ? (
                <EyeOff size={22} color="#bdbdbd" />
              ) : (
                <Eye size={22} color="#bdbdbd" />
              )}
            </TouchableOpacity>
          </View>

          <Button
            onPress={handleLogin}
            style={styles.button}
            textStyle={styles.buttonText}
          >
            <Text>Entrar</Text>
          </Button>

          <TouchableOpacity
            style={{ marginTop: 18 }}
            onPress={() => navigation.navigate("CreateAccount")}
          >
            <Text style={styles.link}>Ainda não tem conta? Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3f3a36",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#7c7c7c",
    marginBottom: 32,
    textAlign: "center",
  },
  formBox: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3f3a36",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: "#7c7c7c",
    marginBottom: 4,
    marginTop: 12,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fafafa",
    fontSize: 15,
    color: "#3f3a36",
    marginBottom: 2,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#eead2d",
    borderRadius: 8,
    marginTop: 24,
    paddingVertical: 14,
    shadowColor: "#eead2d",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  link: {
    color: "#eead2d",
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 15,
  },
});
export default Login;
