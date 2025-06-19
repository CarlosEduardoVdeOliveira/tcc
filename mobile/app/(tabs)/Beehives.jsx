import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { getBeehives } from "../../api/beehiveApi.js";
import CardAdd from "../../components/CardAdd.js";
import CardBeehive from "../../components/CardBeehive.js";
import Container from "../../components/Container.js";
import Footer from "../../components/Footer.js";
import Header from "../../components/Header.js";
import Loading from "../../components/Loading.js";

export default function Beehives() {
  const [beehives, setBeehives] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadBeehives();
  }, []);

  const loadBeehives = async () => {
    try {
      setLoading(true);
      console.log("🔄 Carregando colmeias...");

      const data = await getBeehives();
      console.log("✅ Colmeias carregadas:", data);
      setBeehives(data);
    } catch (error) {
      console.error("❌ Erro ao carregar colmeias:", error);

      if (
        error.code === "ECONNREFUSED" ||
        error.message.includes("Network Error")
      ) {
        Alert.alert(
          "Erro de Conexão",
          "Não foi possível conectar ao servidor. Verifique se o backend está rodando.",
          [{ text: "OK" }, { text: "Tentar Novamente", onPress: loadBeehives }]
        );
      } else {
        Alert.alert("Erro", "Erro ao carregar colmeias. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };
  /* 
  const handleTestApi = async () => {
    try {
      console.log("🧪 Iniciando teste da API...");
      const result = await testApiConnection();
      console.log("✅ Resultado do teste:", result);
      
      if (result) {
        setBeehives(result);
        Alert.alert("Sucesso", "API funcionando! Colmeias carregadas.");
      } else {
        Alert.alert("Aviso", "Usuário não logado ou token não encontrado.");
      }
    } catch (error) {
      console.error("❌ Erro no teste:", error);
      Alert.alert("Erro", `Erro no teste: ${error.message}`);
    }
  }; */

  const handleRefresh = () => {
    loadBeehives();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header />
        <Loading />
        <Footer />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <Container>
        <View style={styles.content}>
          <Text style={styles.title}>Minhas Colmeias</Text>

          {/* <TouchableOpacity style={styles.testButton} onPress={handleTestApi}>
            <Text style={styles.testButtonText}>🧪 Testar API</Text>
          </TouchableOpacity> */}

          <FlatList
            data={beehives}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CardBeehive
                beehive={item}
                onPress={() =>
                  router.push(`/(tabs)/BeehiveDetails?id=${item.id}`)
                }
                onEdit={() =>
                  router.push(`/(tabs)/UpdateBeehive?id=${item.id}`)
                }
              />
            )}
            ListHeaderComponent={
              <CardAdd
                title="Cadastrar Nova Colmeia"
                onPress={() => router.push("/(tabs)/CreateBeehive")}
              />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            refreshing={loading}
            onRefresh={handleRefresh}
          />
        </View>
      </Container>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  testButton: {
    backgroundColor: "#f59e0b",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  testButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
});
