import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

function Loading({ message = "Carregando..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#f59e0b" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
});

export default Loading; 