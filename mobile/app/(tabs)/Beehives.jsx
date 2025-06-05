import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { getBeehives } from "../../api/beehiveApi.js";
import CardAdd from "../../components/CardAdd.js";
import CardBeehive from "../../components/CardBeehive.js";
import Footer from "../../components/Footer.js";
import Header from "../../components/Header.js";

function Beehives() {
  const [beehives, setBeehives] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadUserData() {
      try {
        const userString = await AsyncStorage.getItem("user");
        const token = await AsyncStorage.getItem("user_token");

        if (!userString || !token) {
          navigation.navigate("Login");
          return;
        }

        const userObj = JSON.parse(userString);
        setUserId(userObj.id);
        setUserToken(token);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        navigation.navigate("Login");
      }
    }

    loadUserData();
  }, [navigation]);

  useEffect(() => {
    if (!userId || !userToken) return;

    async function fetchBeehives() {
      try {
        const response = await getBeehives({
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const userBeehives = response.data.filter(
          (b) => b.producerId === userId
        );
        setBeehives(userBeehives);
      } catch (err) {
        console.error("Erro ao carregar colmeias:", err);
      }
    }

    fetchBeehives();
  }, [userId, userToken]);

  return (
    <View style={styles.container}>
      <Header pathName="/" />
      <Text style={styles.title}>Minha(s) colmeia(s)</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {beehives.length === 0 ? (
          <Text style={styles.noBee}>Nenhuma colmeia cadastrada.</Text>
        ) : (
          beehives.map((beehive) => (
            <TouchableOpacity
              key={beehive.id}
              onPress={() =>
                navigation.navigate("ColmeiaDetalhes", { id: beehive.id })
              }
            >
              <CardBeehive
                beehive={beehive}
                latitude={beehive.latitude}
                longitude={beehive.longitude}
              />
            </TouchableOpacity>
          ))
        )}
        <CardAdd />
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },
  scrollContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  noBee: {
    fontSize: 16,
    marginVertical: 20,
    color: "gray",
  },
});
export default Beehives;