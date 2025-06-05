import { useNavigation } from "@react-navigation/native";
import { Eye, EyeOff } from "lucide-react-native";
import { useContext, useState } from "react";
import {
  Alert,
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
      navigation.navigate("BeehiveList"); // ajuste conforme a sua rota
    } else {
      Alert.alert("Erro", result.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Já tem conta? Faça seu login:</Text>

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Digite sua senha"
          secureTextEntry={viewPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setViewPassword((prev) => !prev)}>
          {viewPassword ? <EyeOff size={24} /> : <Eye size={24} />}
        </TouchableOpacity>
      </View>

      <Button title="Entrar" onPress={handleLogin} style={{ marginTop: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: "center",
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
export default Login;
