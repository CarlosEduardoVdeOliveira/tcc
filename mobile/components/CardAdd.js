import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

function CardAdd() {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push('/(tabs)/CreateBeehive')}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.icon}>+</Text>
        <Text style={styles.text}>Adicionar Colmeia</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#d1d5db",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 32,
    color: "#9ca3af",
    marginBottom: 8,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
    textAlign: "center",
  },
});

export default CardAdd;
