import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import NetInfo from "@react-native-community/netinfo";
import { getUser } from "../../api/userApi.js";
import Footer from "../../components/Footer.js";
import Header from "../../components/Header.js";
import { formatDate } from "../../utils/formatDate.js";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
  const loadUser = async () => {
    try {
      setLoading(true);
      const userJson = await AsyncStorage.getItem("user");
      const userToken = await AsyncStorage.getItem("user_token");

      if (!userJson || !userToken) {
        navigation.navigate("Login");
        return;
      }

      const isConnected = (await NetInfo.fetch()).isConnected;

      if (isConnected) {
        // Tenta buscar da API
        const response = await getUser();
        if (response) {
          setUser(response);
          await AsyncStorage.setItem("user", JSON.stringify(response));
        } else {
          throw new Error("Falha ao obter dados do usuário na API.");
        }
      } else {
        // Sem conexão: carrega do cache local
        const localUser = await AsyncStorage.getItem("user");
        if (localUser) {
          setUser(JSON.parse(localUser));
        } else {
          Alert.alert(
            "Modo Offline",
            "Sem conexão e nenhum dado de usuário encontrado localmente."
          );
        }
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
    } finally {
      setLoading(false);
    }
  };

  loadUser();
}, [navigation]);

  // Recarregar dados quando a tela for focada
  /*   useFocusEffect(
    useCallback(() => {
      
    }, [])
  );
 */
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const logOut = async () => {
    await AsyncStorage.removeItem("user_token");
    await AsyncStorage.removeItem("user");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };

  const updateProfile = () => {
    if (!user?.id) return;
    navigation.navigate("(tabs)", {
      screen: "UpdateProfile",
      params: { id: user.id },
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header pathName="Beehives" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando perfil...</Text>
        </View>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Header pathName="Beehives" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Erro ao carregar perfil</Text>
        </View>
      </View>
    );
  }

  const totalBeehives = user?.beehives?.length || 0;
  const activeBeehives =
    user?.beehives?.filter(
      (beehive) =>
        beehive.status?.toLowerCase() === "ativo" ||
        beehive.status?.toLowerCase() === "ativa"
    ).length || 0;
  const maintenanceBeehives =
    user?.beehives?.filter(
      (beehive) =>
        beehive.status?.toLowerCase() === "manutenção" ||
        beehive.status?.toLowerCase() === "em manutenção"
    ).length || 0;
  const abandonedBeehives =
    user?.beehives?.filter(
      (beehive) =>
        beehive.status?.toLowerCase() === "abandonada" ||
        beehive.status?.toLowerCase() === "abandonado"
    ).length || 0;

  return (
    <View style={styles.container}>
      <Header pathName={"Beehives"} title="Meu Perfil" subtitle={user.email} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Informações do Usuário */}
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <Icon name="person" size={32} color="#fff" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={updateProfile}
          >
            <Icon name="pencil" size={16} color="#fff" />
            <Text style={styles.editProfileText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
            <Icon name="log-out" size={16} color="#fff" />
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>

        {/* Informações do Usuário */}
        <View style={styles.infoGrid}>
          {/* Card de Informações Pessoais */}
          <View style={styles.infoCard}>
            <View style={styles.cardHeader}>
              <Icon name="person" size={20} color="#eead2d" />
              <Text style={styles.cardTitle}>Informações Pessoais</Text>
            </View>

            <View style={styles.infoList}>
              <View style={styles.infoItem}>
                <Icon name="mail" size={16} color="#6b7280" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{user.email}</Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <Icon name="card" size={16} color="#6b7280" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>CPF/CNPJ</Text>
                  <Text style={styles.infoValue}>{user.cpfCnpj}</Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <Icon name="calendar" size={16} color="#6b7280" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Data de Início</Text>
                  <Text style={styles.infoValue}>
                    {user.startDate
                      ? formatDate(user.startDate)
                      : "Não informado"}
                  </Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor:
                        user.status === "Ativo" ? "#10b981" : "#ef4444",
                    },
                  ]}
                />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Status</Text>
                  <Text
                    style={[
                      styles.infoValue,
                      {
                        color: user.status === "Ativo" ? "#10b981" : "#ef4444",
                      },
                    ]}
                  >
                    {user.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Card de Estatísticas */}
          <View style={styles.infoCard}>
            <View style={styles.cardHeader}>
              <Icon name="home" size={20} color="#eead2d" />
              <Text style={styles.cardTitle}>Estatísticas das Colmeias</Text>
            </View>

            <View style={styles.statsContainer}>
              {/* Total de Colmeias */}
              <View style={styles.totalStatsCard}>
                <View style={styles.totalStatsContent}>
                  <View>
                    <Text style={styles.totalStatsLabel}>
                      Total de Colmeias
                    </Text>
                    <Text style={styles.totalStatsValue}>{totalBeehives}</Text>
                  </View>
                  <Icon name="home" size={32} color="#eead2d" />
                </View>
              </View>

              {/* Status das Colmeias */}
              <View style={styles.statusStatsContainer}>
                <Text style={styles.statusStatsTitle}>
                  Status das Colmeias:
                </Text>

                {/* Colmeias Ativas */}
                <View style={styles.statusStatsCard}>
                  <View style={styles.statusStatsContent}>
                    <View style={styles.statusStatsInfo}>
                      <View
                        style={[
                          styles.statusDot,
                          { backgroundColor: "#10b981" },
                        ]}
                      />
                      <View>
                        <Text style={styles.statusStatsLabel}>Ativas</Text>
                        <Text style={styles.statusStatsValue}>
                          {activeBeehives}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.statusStatsPercentage}>
                      {totalBeehives > 0
                        ? `${Math.round(
                            (activeBeehives / totalBeehives) * 100
                          )}%`
                        : "0%"}
                    </Text>
                  </View>
                </View>

                {/* Colmeias em Manutenção */}
                <View style={styles.statusStatsCard}>
                  <View style={styles.statusStatsContent}>
                    <View style={styles.statusStatsInfo}>
                      <View
                        style={[
                          styles.statusDot,
                          { backgroundColor: "#f59e0b" },
                        ]}
                      />
                      <View>
                        <Text style={styles.statusStatsLabel}>
                          Em Manutenção
                        </Text>
                        <Text style={styles.statusStatsValue}>
                          {maintenanceBeehives}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.statusStatsPercentage}>
                      {totalBeehives > 0
                        ? `${Math.round(
                            (maintenanceBeehives / totalBeehives) * 100
                          )}%`
                        : "0%"}
                    </Text>
                  </View>
                </View>

                {/* Colmeias Abandonadas */}
                <View style={styles.statusStatsCard}>
                  <View style={styles.statusStatsContent}>
                    <View style={styles.statusStatsInfo}>
                      <View
                        style={[
                          styles.statusDot,
                          { backgroundColor: "#6b7280" },
                        ]}
                      />
                      <View>
                        <Text style={styles.statusStatsLabel}>Abandonadas</Text>
                        <Text style={styles.statusStatsValue}>
                          {abandonedBeehives}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.statusStatsPercentage}>
                      {totalBeehives > 0
                        ? `${Math.round(
                            (abandonedBeehives / totalBeehives) * 100
                          )}%`
                        : "0%"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
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
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    backgroundColor: "#eead2d",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#6b7280",
  },
  headerButtons: {
    flexDirection: "row",
    marginBottom: 16,
    marginTop: 16,
    gap: 12,
  },
  editProfileButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10b981",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  editProfileText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  logoutButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  infoGrid: {
    gap: 16,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  infoList: {
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1f2937",
  },
  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  statsContainer: {
    gap: 16,
  },
  totalStatsCard: {
    backgroundColor: "#fef3c7",
    borderRadius: 8,
    padding: 16,
  },
  totalStatsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalStatsLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  totalStatsValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#d97706",
  },
  statusStatsContainer: {
    gap: 12,
  },
  statusStatsTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  statusStatsCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 12,
  },
  statusStatsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusStatsInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statusStatsLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 2,
  },
  statusStatsValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
  },
  statusStatsPercentage: {
    fontSize: 12,
    color: "#6b7280",
  },
});

export default Profile;
