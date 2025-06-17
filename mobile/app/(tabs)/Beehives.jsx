import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

import { getBeehives } from "../../api/beehiveApi.js";
import CardAdd from "../../components/CardAdd.js";
import CardBeehive from "../../components/CardBeehive.js";
import Footer from "../../components/Footer.js";
import Header from "../../components/Header.js";

const { width } = Dimensions.get('window');

function Beehives() {
  const [beehives, setBeehives] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);
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
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }

    fetchBeehives();
  }, [userId, userToken]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Header pathName="/" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando colmeias...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header pathName="/" />
      
      {/* Header da página */}
      <View style={styles.header}>
        <Text style={styles.title}>Minha(s) colmeia(s)</Text>
        <Text style={styles.subtitle}>
          Gerencie suas colmeias de forma eficiente
        </Text>
      </View>

      {/* Conteúdo principal */}
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {beehives.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Nenhuma colmeia cadastrada</Text>
            <Text style={styles.emptySubtitle}>
              Comece adicionando sua primeira colmeia para começar a gerenciar
            </Text>
            <CardAdd />
          </View>
        ) : (
          <View style={styles.gridContainer}>
            {beehives.map((beehive) => (
              <TouchableOpacity
                key={beehive.id}
                style={styles.cardWrapper}
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
            ))}
            <View style={styles.cardWrapper}>
              <CardAdd />
            </View>
          </View>
        )}
      </ScrollView>
      
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  cardWrapper: {
    width: (width - 48) / 2, // 2 colunas com gap de 16px
    marginBottom: 16,
  },
});

export default Beehives;