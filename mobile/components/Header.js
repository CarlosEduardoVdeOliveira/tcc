import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";

function Header({ pathName }) {
  const navigation = useNavigation();
  const route = useRoute();
  const userToken = true; // Substitua por seu método de autenticação (ex: useAuth())

  return (
    <View style={styles.header}>
      {userToken && route.name !== "Home" ? (
        <TouchableOpacity
          onPress={() => navigation.navigate(pathName)}
          style={styles.iconButton}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <View />
      )}

      {userToken && route.name !== "Perfil" ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("Perfil")}
          style={styles.profileButton}
        >
          <Feather name="user" size={20} color="#facc15" />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#facc15", // yellow-500
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
  },
  profileButton: {
    backgroundColor: "#6b7280", // gray-500
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#ca8a04", // yellow-600
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Header;
