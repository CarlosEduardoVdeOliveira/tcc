import axios from "axios";
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Button from "../../components/Button.js";
import Footer from "../../components/Footer.js";
import Header from "../../components/Header.js";
import Loading from "../../components/Loading.js";
import { AuthContext } from "../../contexts/auth.js";
import { getApiUrl } from "../../utils/config.js";
import { validateCpfCnpj, validateEmail, validateName } from '../../utils/validation.js';

export default function UpdateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user, updateUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setCpfCnpj(user.cpfCnpj || "");
      setLoading(false);
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!name || !email || !cpfCnpj) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }
    const nameValidation = validateName(name);
    if (!nameValidation.isValid) {
      Alert.alert("Erro", nameValidation.error);
      return;
    }
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      Alert.alert("Erro", emailValidation.error);
      return;
    }
    const cpfCnpjValidation = validateCpfCnpj(cpfCnpj);
    if (!cpfCnpjValidation.isValid) {
      Alert.alert("Erro", cpfCnpjValidation.error);
      return;
    }
    setSaving(true);
    try {
      const response = await axios.put(`${getApiUrl()}producer/${user.id}`, {
        name,
        email,
        cpfCnpj,
      });

      if (response.status === 200) {
        // Atualizar o contexto com os novos dados
        if (typeof updateUser === 'function') {
          updateUser(response.data);
        }
        Alert.alert(
          "Sucesso",
          "Perfil atualizado com sucesso!",
          [
            {
              text: "OK",
              onPress: () => router.back(),
            },
          ]
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      if (error.response?.status === 409) {
        Alert.alert("Erro", "Este e-mail já está em uso");
      } else if (error.response?.status === 400) {
        const errorMessage = error.response.data?.message || "Dados inválidos";
        Alert.alert("Erro", errorMessage);
      } else {
        Alert.alert("Erro", error.message || "Falha ao atualizar perfil. Tente novamente.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header />
        <Loading />
        <Footer />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Editar Perfil</Text>
            <Text style={styles.subtitle}>
              Atualize suas informações pessoais
            </Text>

            <View style={styles.formBox}>
              <Text style={styles.formTitle}>Dados Pessoais</Text>

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

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => router.back()}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <Button
                  title="Salvar Alterações"
                  onPress={handleUpdateProfile}
                  style={[styles.button, styles.saveButton]}
                  loading={saving}
                  disabled={saving}
                />
              </View>
            </View>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3f3a36",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#7c7c7c",
    marginBottom: 32,
    textAlign: "center",
  },
  formBox: {
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
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  cancelButtonText: {
    color: "#6b7280",
    fontWeight: "bold",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#eead2d",
  },
});
