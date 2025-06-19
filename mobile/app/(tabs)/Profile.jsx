import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Container from "../../components/Container.js";
import Footer from "../../components/Footer.js";
import Header from "../../components/Header.js";
import Loading from "../../components/Loading.js";
import Map from "../../components/Map.js";
import { AuthContext } from "../../contexts/auth.js";
import { getUser } from "../../api/userApi.js";
import { formatDate } from "../../utils/formatDate.js";
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { signout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userData = await AsyncStorage.getItem("user");
        const token = await AsyncStorage.getItem("user_token");

        if (!userData || !token) {
          router.replace('/Login');
          return;
        }

        const user = await getUser();
        console.log("✅ Dados do usuário carregados:", user);
        setUser(user);
      } catch (error) {
        console.error("❌ Erro ao buscar usuário:", error);
        
        if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
          Alert.alert(
            "Erro de Conexão",
            "Não foi possível conectar ao servidor. Verifique se o backend está rodando.",
            [
              { text: "OK" },
              { text: "Tentar Novamente", onPress: loadUser }
            ]
          );
        } else {
          Alert.alert("Erro", "Erro ao carregar perfil. Tente novamente.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router]);

  const handleSignOut = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => {
            signout();
            router.replace('/');
          },
        },
      ]
    );
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

  if (!user) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Erro ao carregar perfil</Text>
        </View>
        <Footer />
      </View>
    );
  }

  const totalBeehives = user?.beehives?.length || 0;
  const activeBeehives = user?.beehives?.filter(beehive => 
    beehive.status?.toLowerCase() === 'ativo' || 
    beehive.status?.toLowerCase() === 'ativa'
  ).length || 0;
  const maintenanceBeehives = user?.beehives?.filter(beehive => 
    beehive.status?.toLowerCase() === 'manutenção' || 
    beehive.status?.toLowerCase() === 'em manutenção'
  ).length || 0;
  const abandonedBeehives = user?.beehives?.filter(beehive => 
    beehive.status?.toLowerCase() === 'abandonada' || 
    beehive.status?.toLowerCase() === 'abandonado'
  ).length || 0;

  return (
    <View style={styles.container}>
      <Header />
      <Container>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Cabeçalho do Perfil */}
            <View style={styles.profileHeader}>
              <View style={styles.headerContent}>
                <View style={styles.avatarContainer}>
                  <Feather name="user" size={32} color="#fff" />
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user?.name || "Usuário"}</Text>
                  <Text style={styles.userEmail}>{user?.email || "email@exemplo.com"}</Text>
                </View>
              </View>
              <View style={styles.headerActions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => router.push('/(tabs)/UpdateProfile')}
                >
                  <Feather name="edit-2" size={18} color="#fff" style={{ marginRight: 6 }} />
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.signOutButton}
                  onPress={handleSignOut}
                >
                  <Feather name="log-out" size={18} color="#fff" style={{ marginRight: 6 }} />
                  <Text style={styles.signOutButtonText}>Sair</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Grid de Informações */}
            <View style={styles.gridContainer}>
              {/* Card de Informações Pessoais */}
              <View style={styles.infoCard}>
                <View style={styles.cardHeader}>
                  <Feather name="user" size={20} color="#f59e0b" style={styles.cardIcon} />
                  <Text style={styles.cardTitle}>Informações Pessoais</Text>
                </View>
                <View style={styles.infoList}>
                  <View style={styles.infoItem}>
                    <Feather name="mail" size={16} color="#6b7280" style={styles.infoIcon} />
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>Email</Text>
                      <Text style={styles.infoValue}>{user?.email || "Não informado"}</Text>
                    </View>
                  </View>
                  <View style={styles.infoItem}>
                    <Feather name="hash" size={16} color="#6b7280" style={styles.infoIcon} />
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>CPF/CNPJ</Text>
                      <Text style={styles.infoValue}>{user?.cpfCnpj || "Não informado"}</Text>
                    </View>
                  </View>
                  <View style={styles.infoItem}>
                    <Feather name="calendar" size={16} color="#6b7280" style={styles.infoIcon} />
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>Data de Início</Text>
                      <Text style={styles.infoValue}>
                        {user?.startDate ? formatDate(user.startDate) : "Não informado"}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.infoItem}>
                    <Feather name="check-circle" size={16} color={user?.status === 'Ativo' ? '#10b981' : '#ef4444'} style={styles.infoIcon} />
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>Status</Text>
                      <Text style={[styles.infoValue, { color: user?.status === 'Ativo' ? '#10b981' : '#ef4444' }]}>
                        {user?.status || "Ativo"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Card de Estatísticas */}
              <View style={styles.infoCard}>
                <View style={styles.cardHeader}>
                  <Feather name="bar-chart-2" size={20} color="#f59e0b" style={styles.cardIcon} />
                  <Text style={styles.cardTitle}>Estatísticas das Colmeias</Text>
                </View>
                
                {/* Total de Colmeias */}
                <View style={styles.totalCard}>
                  <View style={styles.totalContent}>
                    <View>
                      <Text style={styles.totalLabel}>Total de Colmeias</Text>
                      <Text style={styles.totalValue}>{totalBeehives}</Text>
                    </View>
                    <Feather name="home" size={32} color="#f59e0b" style={styles.totalIcon} />
                  </View>
                </View>

                {/* Status das Colmeias */}
                <View style={styles.statusSection}>
                  <Text style={styles.statusTitle}>Status das Colmeias:</Text>
                  
                  {/* Colmeias Ativas */}
                  <View style={styles.statusCard}>
                    <View style={styles.statusContent}>
                      <View style={styles.statusInfo}>
                        <Feather name="check-circle" size={16} color="#10b981" style={styles.statusDot} />
                        <View>
                          <Text style={styles.statusLabel}>Ativas</Text>
                          <Text style={styles.statusValue}>{activeBeehives}</Text>
                        </View>
                      </View>
                      <Text style={styles.statusPercentage}>
                        {totalBeehives > 0 ? `${Math.round((activeBeehives / totalBeehives) * 100)}%` : '0%'}
                      </Text>
                    </View>
                  </View>

                  {/* Colmeias em Manutenção */}
                  <View style={styles.statusCard}>
                    <View style={styles.statusContent}>
                      <View style={styles.statusInfo}>
                        <MaterialCommunityIcons name="tools" size={16} color="#f59e0b" style={styles.statusDot} />
                        <View>
                          <Text style={styles.statusLabel}>Em Manutenção</Text>
                          <Text style={styles.statusValue}>{maintenanceBeehives}</Text>
                        </View>
                      </View>
                      <Text style={styles.statusPercentage}>
                        {totalBeehives > 0 ? `${Math.round((maintenanceBeehives / totalBeehives) * 100)}%` : '0%'}
                      </Text>
                    </View>
                  </View>

                  {/* Colmeias Abandonadas */}
                  <View style={styles.statusCard}>
                    <View style={styles.statusContent}>
                      <View style={styles.statusInfo}>
                        <Ionicons name="close-circle-outline" size={16} color="#6b7280" style={styles.statusDot} />
                        <View>
                          <Text style={styles.statusLabel}>Abandonadas</Text>
                          <Text style={styles.statusValue}>{abandonedBeehives}</Text>
                        </View>
                      </View>
                      <Text style={styles.statusPercentage}>
                        {totalBeehives > 0 ? `${Math.round((abandonedBeehives / totalBeehives) * 100)}%` : '0%'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Mapa da Localização */}
            <View style={styles.mapCard}>
              <View style={styles.cardHeader}>
                <Feather name="map-pin" size={20} color="#f59e0b" style={styles.cardIcon} />
                <Text style={styles.cardTitle}>Localização</Text>
              </View>
              <View style={styles.mapContainer}>
                <Map
                  latitude={user?.latitude}
                  longitude={user?.longitude}
                  style={styles.map}
                />
              </View>
              <View style={styles.coordinatesInfo}>
                <Text style={styles.coordinateText}>
                  <Text style={styles.coordinateLabel}>Latitude:</Text> {user?.latitude || "Não definida"}
                </Text>
                <Text style={styles.coordinateText}>
                  <Text style={styles.coordinateLabel}>Longitude:</Text> {user?.longitude || "Não definida"}
                </Text>
              </View>
            </View>

            {/* Botões de Ação */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push('/(tabs)/Beehives')}
              >
                <Feather name="home" size={16} color="#fff" style={{ marginRight: 6 }} />
                <Text style={styles.actionButtonText}>Ver Minhas Colmeias</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.editActionButton]}
                onPress={() => router.push('/(tabs)/UpdateProfile')}
              >
                <Feather name="edit-2" size={16} color="#fff" style={{ marginRight: 6 }} />
                <Text style={styles.actionButtonText}>Editar Perfil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Container>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  profileHeader: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6b7280',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#10b981',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  signOutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 20,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  totalCard: {
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  totalContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d97706',
  },
  totalIcon: {
    fontSize: 32,
  },
  statusSection: {
    gap: 8,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  statusCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
  },
  statusContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statusPercentage: {
    fontSize: 10,
    color: '#6b7280',
  },
  mapCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  coordinatesInfo: {
    gap: 4,
  },
  coordinateText: {
    fontSize: 12,
    color: '#6b7280',
  },
  coordinateLabel: {
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#f59e0b',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  editActionButton: {
    backgroundColor: '#10b981',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
});
