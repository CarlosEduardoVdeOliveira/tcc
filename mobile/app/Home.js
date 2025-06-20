import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Hero from "../assets/images/imgHero.png";
export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Bem-vindo ao Sistema de Colmeias</Text>
          <Text style={styles.subtitle}>
            Gerencie suas colmeias de forma eficiente e inteligente
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/Login")}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push("/CreateAccount")}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Criar Conta
            </Text>
          </TouchableOpacity>
          <Image
            source={Hero}
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
              marginTop: 32,
            }}
            accessibilityLabel="Logo do app"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    backgroundColor: "#F59E0B",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#F59E0B",
  },
  secondaryButtonText: {
    color: "#F59E0B",
  },
  testButton: {
    backgroundColor: "#3B82F6",
  },
});
