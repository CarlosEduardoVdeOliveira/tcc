import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";

function CardAdd() {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate("CadastrarColmeia")}>
        <Feather name="plus-circle" color="#f9fafb" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#6b7280",
    width: 200,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CardAdd;
