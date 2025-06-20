import { useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
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
import axios from "axios";
import Button from "../components/Button.js";
import Footer from "../components/Footer.js";
import { getApiUrl } from "../utils/config.js";

export default function CreateAccount() {
  const [viewPassword, setViewPassword] = useState(true);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateAccount = async () => {
    if (!name || !email || !password || !confirmPassword || !cpfCnpj) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (cpfCnpj.length < 11 || cpfCnpj.length > 18) {
      Alert.alert("Erro", "CPF/CNPJ deve ter entre 11 e 18 caracteres");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${getApiUrl()}producer`, {
        name,
        email,
        password,
        cpfCnpj,
        longitude: -42.64, // Coordenadas padrão (você pode implementar geolocalização depois)
        latitude: -19.55,
        startDate: new Date().toISOString(),
        status: "Ativo"
      });

      if (response.status === 201) {
        Alert.alert(
          "Sucesso",
          "Conta criada com sucesso! Faça login para continuar.",
          [
            {
              text: "OK",
              onPress: () => router.push("/Login"),
            },
          ]
        );
      }
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      if (error.response?.status === 409) {
        Alert.alert("Erro", "Este e-mail já está em uso");
      } else if (error.response?.status === 400) {
        const errorMessage = error.response.data?.message || "Dados inválidos";
        Alert.alert("Erro", errorMessage);
      } else {
        Alert.alert("Erro", "Falha ao criar conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Cadastre-se para começar a gerenciar suas colmeias</Text>
          <View style={styles.formBox}>
            <Text style={styles.formTitle}>Preencha seus dados:</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome completo"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#bdbdbd"
            />

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

            <Text style={styles.label}>CPF/CNPJ</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu CPF ou CNPJ"
              keyboardType="numeric"
              value={cpfCnpj}
              onChangeText={setCpfCnpj}
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
                {viewPassword ? <EyeOff size={22} color="#bdbdbd" /> : <Eye size={22} color="#bdbdbd" />}
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirmar Senha</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Confirme sua senha"
                secureTextEntry={viewConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor="#bdbdbd"
              />
              <TouchableOpacity onPress={() => setViewConfirmPassword((prev) => !prev)}>
                {viewConfirmPassword ? <EyeOff size={22} color="#bdbdbd" /> : <Eye size={22} color="#bdbdbd" />}
              </TouchableOpacity>
            </View>

            <Button
              title={loading ? "Criando conta..." : "Criar Conta"}
              onPress={handleCreateAccount}
              style={styles.button}
              disabled={loading}
            />

            <TouchableOpacity
              style={{ marginTop: 18 }}
              onPress={() => router.push("/Login")}
            >
              <Text style={styles.link}>Já tem conta? Faça login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
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