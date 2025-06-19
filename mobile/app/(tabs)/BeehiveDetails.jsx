import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { deleteActivity, getActivity } from "../../api/activityApi.js";
import { deleteBeehive, getBeehive } from "../../api/beehiveApi.js";
import { deleteDisease, getDisease } from "../../api/diseaseApi.js";
import { deleteFood, getFood } from "../../api/foodApi.js";
import {
    deleteProductionHoney,
    getProductionHoney,
} from "../../api/productionHoneyApi.js";
import {
    deleteTemperatureHumidity,
    getTemperatureHumidity,
} from "../../api/temperatureHumidity.js";

import Footer from "../../components/Footer.js";
import FormActivity from "../../components/FormActivity.js";
import FormDisease from "../../components/FormDisease.js";
import FormFood from "../../components/FormFood.js";
import FormProductionHoney from "../../components/FormProductionHoney.js";
import FormTemperatureHumidity from "../../components/FormTemperatureHumidity.js";
import Header from "../../components/Header.js";
import { Map } from "../../components/Map.js";
import Modal from "../../components/Modal.js";
import { formatDate } from "../../utils/formatDate.js";

function BeehiveDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [beehive, setBeehive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const [activities, setActivities] = useState([]);
  const [foods, setFoods] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [productionHoneys, setProductionHoneys] = useState([]);
  const [temperatureHumidities, setTemperatureHumidities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const user_token = await AsyncStorage.getItem("user_token");
      if (!user_token) {
        router.replace("/Login");
        return;
      }

      try {
        const [
          { data: beehiveData },
          { data: activitiesData },
          { data: foodsData },
          { data: diseasesData },
          { data: productionHoneyData },
          { data: temperatureHumidityData },
        ] = await Promise.all([
          getBeehive(id),
          getActivity(id),
          getFood(id),
          getDisease(id),
          getProductionHoney(id),
          getTemperatureHumidity(id),
        ]);

        setBeehive(beehiveData);
        
        // Organizar todas as seções por data (mais recente primeiro)
        const sortedActivities = Array.isArray(activitiesData) 
          ? activitiesData.sort((a, b) => new Date(b.dateActivity) - new Date(a.dateActivity))
          : [];
        setActivities(sortedActivities);
        
        const sortedFoods = Array.isArray(foodsData) 
          ? foodsData.sort((a, b) => new Date(b.dateFeeding) - new Date(a.dateFeeding))
          : [];
        setFoods(sortedFoods);
        
        const sortedDiseases = Array.isArray(diseasesData) 
          ? diseasesData.sort((a, b) => new Date(b.dateDiagnosis) - new Date(a.dateDiagnosis))
          : [];
        setDiseases(sortedDiseases);
        
        const sortedProductionHoneys = Array.isArray(productionHoneyData) 
          ? productionHoneyData.sort((a, b) => new Date(b.dateCollection) - new Date(a.dateCollection))
          : [];
        setProductionHoneys(sortedProductionHoneys);
        
        const sortedTemperatureHumidities = Array.isArray(temperatureHumidityData) 
          ? temperatureHumidityData.sort((a, b) => new Date(b.dateMeasurement) - new Date(a.dateMeasurement))
          : [];
        setTemperatureHumidities(sortedTemperatureHumidities);
      } catch (error) {
        console.error("Erro ao carregar colmeia:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados da colmeia. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, router]);

  const handleDelete = async (itemId, deleteFunc) => {
    setActionLoading(true);
    try {
      await deleteFunc(itemId);
      setLoading(true);
      setBeehive(null);
      Alert.alert("Sucesso", "Item deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar:", error);
      Alert.alert("Erro", "Não foi possível deletar o item. Tente novamente.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenModal = (section) => setOpenModal(section);
  const handleCloseModal = () => {
    setOpenModal(null);
    setEditingItem(null);
  };

  const handleEdit = (id, section) => {
    setEditingItem({ id, section });
    setOpenModal(section);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'ativo':
      case 'active':
        return { backgroundColor: '#dcfce7', color: '#166534', borderColor: '#bbf7d0' };
      case 'inativo':
      case 'inactive':
        return { backgroundColor: '#fee2e2', color: '#991b1b', borderColor: '#fecaca' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#374151', borderColor: '#d1d5db' };
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header pathName="/" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando colmeia...</Text>
        </View>
      </View>
    );
  }

  if (!beehive) {
    return (
      <View style={styles.container}>
        <Header pathName="/" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Colmeia não encontrada.</Text>
        </View>
      </View>
    );
  }

  const statusStyle = getStatusColor(beehive.status);

  return (
    <View style={styles.container}>
      <Header pathName="/" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header da página */}
        <View style={styles.header}>
          <Text style={styles.title}>Detalhes da Colmeia</Text>
        </View>

        {/* Informações da colmeia */}
        <View style={styles.beehiveCard}>
          <View style={styles.beehiveInfo}>
            <Text style={styles.beehiveName}>{beehive.name}</Text>
            <Text style={styles.beehiveType}>{beehive.typeBeehive}</Text>
          </View>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Data de Início</Text>
              <Text style={styles.infoValue}>
                {beehive.startDate ? formatDate(beehive.startDate) : "Não informado"}
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Status</Text>
              <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor, borderColor: statusStyle.borderColor }]}>
                <Text style={[styles.statusText, { color: statusStyle.color }]}>
                  {beehive.status}
                </Text>
              </View>
            </View>
          </View>
          
          {beehive.observations && (
            <View style={styles.observationsContainer}>
              <Text style={styles.infoLabel}>Observações</Text>
              <Text style={styles.observationsText}>{beehive.observations}</Text>
            </View>
          )}
        </View>

        {/* Localização */}
        <View style={styles.mapCard}>
          <Text style={styles.sectionTitle}>Localização da Colmeia</Text>
          <Map 
            latitude={beehive.latitude} 
            longitude={beehive.longitude}
            style={styles.map}
          />
        </View>

        {/* Botões de ação */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push("AtualizarColmeia", { id })}
          >
            <Icon name="pencil" size={16} color="#fff" />
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              Alert.alert("Excluir", "Tem certeza que deseja excluir?", [
                { text: "Cancelar", style: "cancel" },
                {
                  text: "Sim",
                  onPress: () => handleDelete(id, deleteBeehive),
                },
              ]);
            }}
          >
            <Icon name="trash" size={16} color="#fff" />
            <Text style={styles.deleteButtonText}>Excluir</Text>
          </TouchableOpacity>
        </View>

        {/* Seções de dados */}
        <View style={styles.sectionsContainer}>
          {/* Atividades */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Atividades</Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => handleOpenModal("Atividade")}
              >
                <Icon name="add" size={20} color="#fff" />
                <Text style={styles.addButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
            <SimpleDataTable 
              data={activities} 
              columns={[
                { key: "dateActivity", header: "Data", render: (value) => formatDate(value) },
                { key: "typeActivity", header: "Tipo" },
                { key: "descriptions", header: "Descrição" }
              ]}
              onEdit={(id) => handleEdit(id, "Atividade")} 
              onDelete={(id) => handleDelete(id, deleteActivity)} 
              emptyMessage="Nenhuma atividade encontrada."
            />
          </View>

          {/* Comidas */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Comidas</Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => handleOpenModal("Comidas")}
              >
                <Icon name="add" size={20} color="#fff" />
                <Text style={styles.addButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
            <SimpleDataTable 
              data={foods} 
              columns={[
                { key: "dateFeeding", header: "Data", render: (value) => formatDate(value) },
                { key: "typeFood", header: "Tipo" },
                { key: "amount", header: "Quantidade" }
              ]}
              onEdit={(id) => handleEdit(id, "Comidas")} 
              onDelete={(id) => handleDelete(id, deleteFood)} 
              emptyMessage="Nenhum alimento encontrado."
            />
          </View>

          {/* Doenças/Pragas */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Doenças/Pragas</Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => handleOpenModal("Doenças/Pragas")}
              >
                <Icon name="add" size={20} color="#fff" />
                <Text style={styles.addButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
            <SimpleDataTable 
              data={diseases} 
              columns={[
                { key: "dateDiagnosis", header: "Data", render: (value) => formatDate(value) },
                { key: "diseasePrague", header: "Doença/Praga" },
                { key: "treatment", header: "Tratamento" }
              ]}
              onEdit={(id) => handleEdit(id, "Doenças/Pragas")} 
              onDelete={(id) => handleDelete(id, deleteDisease)} 
              emptyMessage="Nenhuma doença/praga encontrada."
            />
          </View>

          {/* Produtos */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Produtos</Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => handleOpenModal("Produtos")}
              >
                <Icon name="add" size={20} color="#fff" />
                <Text style={styles.addButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
            <SimpleDataTable 
              data={productionHoneys} 
              columns={[
                { key: "dateCollection", header: "Data", render: (value) => formatDate(value) },
                { key: "amount", header: "Quantidade" },
                { key: "quality", header: "Qualidade" }
              ]}
              onEdit={(id) => handleEdit(id, "Produtos")} 
              onDelete={(id) => handleDelete(id, deleteProductionHoney)} 
              emptyMessage="Nenhum produto encontrado."
            />
          </View>

          {/* Temperatura e Umidade */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Temperatura e Umidade</Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => handleOpenModal("Temperatura e Umidade")}
              >
                <Icon name="add" size={20} color="#fff" />
                <Text style={styles.addButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
            <SimpleDataTable 
              data={temperatureHumidities} 
              columns={[
                { key: "dateMeasurement", header: "Data", render: (value) => formatDate(value) },
                { key: "internalTemperature", header: "Temp. Interna" },
                { key: "humidityInternal", header: "Umidade" }
              ]}
              onEdit={(id) => handleEdit(id, "Temperatura e Umidade")} 
              onDelete={(id) => handleDelete(id, deleteTemperatureHumidity)} 
              emptyMessage="Nenhuma medição encontrada."
            />
          </View>
        </View>
      </ScrollView>

      {/* Modais */}
      <Modal
        visible={openModal !== null}
        onClose={handleCloseModal}
        title={`Adicionar ${openModal}`}
      >
        {openModal === "Atividade" && <FormActivity />}
        {openModal === "Doenças/Pragas" && <FormDisease />}
        {openModal === "Produtos" && <FormProductionHoney />}
        {openModal === "Comidas" && <FormFood />}
        {openModal === "Temperatura e Umidade" && <FormTemperatureHumidity />}
      </Modal>

      <Footer />
    </View>
  );
}

// Componente DataTable simplificado para React Native
function SimpleDataTable({ data, columns, onEdit, onDelete, emptyMessage }) {
  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.tableContainer}>
      {data.slice(0, 5).map((item, index) => (
        <View key={index} style={styles.tableRow}>
          {columns.map((column, colIndex) => (
            <View key={colIndex} style={styles.tableCell}>
              <Text style={styles.cellLabel}>{column.header}</Text>
              <Text style={styles.cellValue}>
                {column.render ? column.render(item[column.key]) : item[column.key]}
              </Text>
            </View>
          ))}
          <View style={styles.rowActionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => onEdit(item.id)}
            >
              <Icon name="pencil" size={16} color="#10b981" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => onDelete(item.id)}
            >
              <Icon name="trash" size={16} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
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
  beehiveCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  beehiveInfo: {
    alignItems: "center",
    marginBottom: 16,
  },
  beehiveName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  beehiveType: {
    fontSize: 16,
    color: "#6b7280",
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
    marginHorizontal: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: "#1f2937",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  observationsContainer: {
    marginTop: 8,
  },
  observationsText: {
    fontSize: 14,
    color: "#1f2937",
    lineHeight: 20,
  },
  mapCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  map: {
    height: 200,
    borderRadius: 8,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  editButton: {
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
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  deleteButton: {
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
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  sectionsContainer: {
    gap: 16,
  },
  sectionCard: {
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1f2937",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eead2d",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 4,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },
  tableContainer: {
    gap: 12,
  },
  tableRow: {
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  tableCell: {
    gap: 4,
  },
  cellLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
  },
  cellValue: {
    fontSize: 14,
    color: "#1f2937",
  },
  rowActionButtons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#f3f4f6",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    color: "#6b7280",
    fontSize: 14,
    textAlign: "center",
  },
});

export default BeehiveDetails;
