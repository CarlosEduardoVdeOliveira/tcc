import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LogOut, Pen } from "lucide-react-native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getUser } from "../../api/userApi.js";

function Profile() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      const userToken = await AsyncStorage.getItem("user_token");

      if (!userData || !userToken) {
        navigation.navigate("Login");
        return;
      }

      const parsedUser = JSON.parse(userData);
      const id = parsedUser.id;

      try {
        const response = await getUser(id);
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    loadUser();
  }, []);

  const logOut = async () => {
    await AsyncStorage.removeItem("user_token");
    await AsyncStorage.removeItem("user");
    navigation.navigate("Login");
  };

  const updateProfile = () => {
    if (!user?.id) return;
    navigation.navigate("UpdateProfile", { id: user.id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.label}>Nome:</Text> {user?.name}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Email:</Text> {user?.email}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>CPF/CNPJ:</Text> {user?.cpfCnpj}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Status:</Text> {user?.status}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Colmeias:</Text> {user?.beehives?.length}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={logOut} style={styles.logoutButton}>
          <LogOut size={20} color="#ef4444" />
          <Text style={[styles.buttonText, { color: "#ef4444" }]}>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={updateProfile} style={styles.editButton}>
          <Pen size={20} color="#22c55e" />
          <Text style={[styles.buttonText, { color: "#22c55e" }]}>
            Editar perfil
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  label: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: "#444",
  },
  buttonContainer: {
    marginTop: 32,
    gap: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
  },
});
export default Profile;
