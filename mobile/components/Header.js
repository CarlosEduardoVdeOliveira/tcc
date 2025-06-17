import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

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
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      {userToken && route.name !== "Perfil" ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("Perfil")}
          style={styles.profileButton}
        >
          <Icon name="person" size={24} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#eead2d",
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  profileButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  placeholder: {
    width: 40,
  },
});

export default Header;
