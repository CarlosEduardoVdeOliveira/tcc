import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import Map from "../../components/Map.js";
import Modal from "../../components/Modal.js";
import { formatDate } from "../../utils/formatDate.js";

// Função para formatar qualidade para exibição
const formatQuality = (quality) => {
  if (!quality) return "";
  return quality.charAt(0).toUpperCase() + quality.slice(1);
};

function BeehiveDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [beehive, setBeehive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesPage, setActivitiesPage] = useState(1);
  const [foodsPage, setFoodsPage] = useState(1);
  const [diseasesPage, setDiseasesPage] = useState(1);
  const [productsPage, setProductsPage] = useState(1);
  const [measurementsPage, setMeasurementsPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [activities, setActivities] = useState([]);
  const [foods, setFoods] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [productionHoneys, setProductionHoneys] = useState([]);
  const [temperatureHumidities, setTemperatureHumidities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const user_token = await AsyncStorage.getItem("user_token");
      if (!user_token) {
        navigation.navigate("Login");
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

        // Salvar no AsyncStorage (somente após sucesso)
        await AsyncStorage.setItem(
          `beehive_${id}`,
          JSON.stringify(beehiveData)
        );
        await AsyncStorage.setItem(
          `activities_${id}`,
          JSON.stringify(activitiesData)
        );
        await AsyncStorage.setItem(`foods_${id}`, JSON.stringify(foodsData));
        await AsyncStorage.setItem(
          `diseases_${id}`,
          JSON.stringify(diseasesData)
        );
        await AsyncStorage.setItem(
          `productionHoneys_${id}`,
          JSON.stringify(productionHoneyData)
        );
        await AsyncStorage.setItem(
          `temperatureHumidities_${id}`,
          JSON.stringify(temperatureHumidityData)
        );

        setBeehive(beehiveData);

        setActivities(
          Array.isArray(activitiesData)
            ? activitiesData.sort(
                (a, b) => new Date(b.dateActivity) - new Date(a.dateActivity)
              )
            : []
        );

        setFoods(
          Array.isArray(foodsData)
            ? foodsData.sort(
                (a, b) => new Date(b.dateFeeding) - new Date(a.dateFeeding)
              )
            : []
        );

        setDiseases(
          Array.isArray(diseasesData)
            ? diseasesData.sort(
                (a, b) => new Date(b.dateDiagnosis) - new Date(a.dateDiagnosis)
              )
            : []
        );

        setProductionHoneys(
          Array.isArray(productionHoneyData)
            ? productionHoneyData.sort(
                (a, b) =>
                  new Date(b.dateCollection) - new Date(a.dateCollection)
              )
            : []
        );

        setTemperatureHumidities(
          Array.isArray(temperatureHumidityData)
            ? temperatureHumidityData.sort(
                (a, b) =>
                  new Date(b.dateMeasurement) - new Date(a.dateMeasurement)
              )
            : []
        );
      } catch (error) {
        console.error("Erro ao carregar colmeia:", error);
        console.warn("Tentando carregar dados do cache (modo offline)");

        try {
          const [
            cachedBeehive,
            cachedActivities,
            cachedFoods,
            cachedDiseases,
            cachedProductionHoneys,
            cachedTemperatureHumidities,
          ] = await Promise.all([
            AsyncStorage.getItem(`beehive_${id}`),
            AsyncStorage.getItem(`activities_${id}`),
            AsyncStorage.getItem(`foods_${id}`),
            AsyncStorage.getItem(`diseases_${id}`),
            AsyncStorage.getItem(`productionHoneys_${id}`),
            AsyncStorage.getItem(`temperatureHumidities_${id}`),
          ]);

          setBeehive(JSON.parse(cachedBeehive));
          setActivities(JSON.parse(cachedActivities) || []);
          setFoods(JSON.parse(cachedFoods) || []);
          setDiseases(JSON.parse(cachedDiseases) || []);
          setProductionHoneys(JSON.parse(cachedProductionHoneys) || []);
          setTemperatureHumidities(
            JSON.parse(cachedTemperatureHumidities) || []
          );
        } catch (storageError) {
          console.error("Erro ao carregar dados offline:", storageError);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, navigation]);

  // Recarregar dados quando a tela for focada
  useFocusEffect(
    useCallback(() => {
      console.log("Tela focada, recarregando dados");
      reloadData();
    }, [reloadData])
  );

  const handleDelete = async (itemId, deleteFunc) => {
    try {
      await deleteFunc(itemId);
      // Recarregar dados
      setLoading(true);
      setBeehive(null);
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  const handleDeleteActivity = async (activityId) => {
    try {
      console.log("Deletando atividade:", activityId);
      await deleteActivity(activityId);
      console.log("Atividade deletada com sucesso");
      // Recarregar dados
      reloadData();
    } catch (error) {
      console.error("Erro ao deletar atividade:", error);
      Alert.alert("Erro", "Falha ao excluir atividade.");
    }
  };

  const handleDeleteFood = async (foodId) => {
    try {
      console.log("Deletando alimento:", foodId);
      await deleteFood(foodId);
      console.log("Alimento deletado com sucesso");
      // Recarregar dados
      reloadData();
    } catch (error) {
      console.error("Erro ao deletar alimento:", error);
      Alert.alert("Erro", "Falha ao excluir alimento.");
    }
  };

  const handleDeleteDisease = async (diseaseId) => {
    try {
      console.log("Deletando doença/praga:", diseaseId);
      await deleteDisease(diseaseId);
      console.log("Doença/praga deletada com sucesso");
      // Recarregar dados
      reloadData();
    } catch (error) {
      console.error("Erro ao deletar doença/praga:", error);
      Alert.alert("Erro", "Falha ao excluir doença/praga.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      console.log("Deletando produto:", productId);
      await deleteProductionHoney(productId);
      console.log("Produto deletado com sucesso");
      // Recarregar dados
      reloadData();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      Alert.alert("Erro", "Falha ao excluir produto.");
    }
  };

  const handleDeleteMeasurement = async (measurementId) => {
    try {
      console.log("Deletando medição:", measurementId);
      await deleteTemperatureHumidity(measurementId);
      console.log("Medição deletada com sucesso");
      // Recarregar dados
      reloadData();
    } catch (error) {
      console.error("Erro ao deletar medição:", error);
      Alert.alert("Erro", "Falha ao excluir medição.");
    }
  };

  const handleOpenModal = (section) => {
    setOpenModal(section);
  };

  const handleCloseModal = () => {
    console.log("Fechando modal e recarregando dados");
    setOpenModal(null);
    setEditingItem(null);
    // Recarregar dados após fechar o modal
    reloadData();
  };

  const handleEdit = (id, section, itemData) => {
    setEditingItem({ id, section, data: itemData });
    setOpenModal(section);
  };

  // Funções para paginação
  const getPaginatedItems = (items, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const getTotalPages = (items) => {
    return Math.ceil(items.length / itemsPerPage);
  };

  const handleActivitiesPageChange = (newPage) => {
    setActivitiesPage(newPage);
  };

  const handleFoodsPageChange = (newPage) => {
    setFoodsPage(newPage);
  };

  const handleDiseasesPageChange = (newPage) => {
    setDiseasesPage(newPage);
  };

  const handleProductsPageChange = (newPage) => {
    setProductsPage(newPage);
  };

  const handleMeasurementsPageChange = (newPage) => {
    setMeasurementsPage(newPage);
  };

  const reloadData = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Recarregando dados da colmeia:", id);

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

      // Salvar dados em cache (somente após sucesso da API)
      await AsyncStorage.setItem(`beehive_${id}`, JSON.stringify(beehiveData));
      await AsyncStorage.setItem(
        `activities_${id}`,
        JSON.stringify(activitiesData)
      );
      await AsyncStorage.setItem(`foods_${id}`, JSON.stringify(foodsData));
      await AsyncStorage.setItem(
        `diseases_${id}`,
        JSON.stringify(diseasesData)
      );
      await AsyncStorage.setItem(
        `productionHoneys_${id}`,
        JSON.stringify(productionHoneyData)
      );
      await AsyncStorage.setItem(
        `temperatureHumidities_${id}`,
        JSON.stringify(temperatureHumidityData)
      );

      // Setar no estado (ordenado)
      setBeehive(beehiveData);

      setActivities(
        Array.isArray(activitiesData)
          ? activitiesData.sort(
              (a, b) => new Date(b.dateActivity) - new Date(a.dateActivity)
            )
          : []
      );

      setFoods(
        Array.isArray(foodsData)
          ? foodsData.sort(
              (a, b) => new Date(b.dateFeeding) - new Date(a.dateFeeding)
            )
          : []
      );

      setDiseases(
        Array.isArray(diseasesData)
          ? diseasesData.sort(
              (a, b) => new Date(b.dateDiagnosis) - new Date(a.dateDiagnosis)
            )
          : []
      );

      setProductionHoneys(
        Array.isArray(productionHoneyData)
          ? productionHoneyData.sort(
              (a, b) => new Date(b.dateCollection) - new Date(a.dateCollection)
            )
          : []
      );

      setTemperatureHumidities(
        Array.isArray(temperatureHumidityData)
          ? temperatureHumidityData.sort(
              (a, b) =>
                new Date(b.dateMeasurement) - new Date(a.dateMeasurement)
            )
          : []
      );

      console.log("Dados processados e armazenados com sucesso");
    } catch (error) {
      console.error("Erro ao recarregar dados:", error);
      console.warn("Tentando carregar dados do cache (modo offline)");

      try {
        const [
          cachedBeehive,
          cachedActivities,
          cachedFoods,
          cachedDiseases,
          cachedProductionHoneys,
          cachedTemperatureHumidities,
        ] = await Promise.all([
          AsyncStorage.getItem(`beehive_${id}`),
          AsyncStorage.getItem(`activities_${id}`),
          AsyncStorage.getItem(`foods_${id}`),
          AsyncStorage.getItem(`diseases_${id}`),
          AsyncStorage.getItem(`productionHoneys_${id}`),
          AsyncStorage.getItem(`temperatureHumidities_${id}`),
        ]);

        setBeehive(JSON.parse(cachedBeehive));
        setActivities(JSON.parse(cachedActivities) || []);
        setFoods(JSON.parse(cachedFoods) || []);
        setDiseases(JSON.parse(cachedDiseases) || []);
        setProductionHoneys(JSON.parse(cachedProductionHoneys) || []);
        setTemperatureHumidities(JSON.parse(cachedTemperatureHumidities) || []);
      } catch (storageError) {
        console.error("Erro ao carregar dados offline:", storageError);
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "ativo":
      case "active":
        return {
          backgroundColor: "#dcfce7",
          color: "#166534",
          borderColor: "#bbf7d0",
        };
      case "inativo":
      case "inactive":
        return {
          backgroundColor: "#fee2e2",
          color: "#991b1b",
          borderColor: "#fecaca",
        };
      default:
        return {
          backgroundColor: "#f3f4f6",
          color: "#374151",
          borderColor: "#d1d5db",
        };
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Header pathName="Beehives" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando colmeia...</Text>
        </View>
      </View>
    );
  }

  if (!beehive) {
    return (
      <View style={styles.container}>
        <Header pathName="Beehives" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Colmeia não encontrada.</Text>
        </View>
      </View>
    );
  }

  const statusStyle = getStatusColor(beehive.status);

  return (
    <View style={styles.container}>
      <Header pathName="Beehives" title="Detalhes da Colmeia" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
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
                {beehive.startDate
                  ? formatDate(beehive.startDate)
                  : "Não informado"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Status</Text>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: statusStyle.backgroundColor,
                    borderColor: statusStyle.borderColor,
                  },
                ]}
              >
                <Text style={[styles.statusText, { color: statusStyle.color }]}>
                  {beehive.status}
                </Text>
              </View>
            </View>
          </View>

          {beehive.observations && (
            <View style={styles.observationsContainer}>
              <Text style={styles.infoLabel}>Observações</Text>
              <Text style={styles.observationsText}>
                {beehive.observations}
              </Text>
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
            onPress={() =>
              navigation.navigate("(tabs)", { screen: "UpdateBeehive" }, { id })
            }
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

        {/* Seção de Atividades */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Atividades</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleOpenModal("Atividade")}
            >
              <Icon name="add" size={16} color="#fff" />
              <Text style={styles.addButtonText}>Adicionar Atividade</Text>
            </TouchableOpacity>
          </View>

          {activities.length > 0 ? (
            <>
              {getPaginatedItems(activities, activitiesPage).map(
                (activity, index) => (
                  <View key={activity.id || index} style={styles.itemCard}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemDate}>
                        {formatDate(activity.dateActivity)}
                      </Text>
                      <Text style={styles.itemType}>
                        {activity.typeActivity}
                      </Text>
                    </View>
                    <Text style={styles.itemDescription}>
                      {activity.descriptions}
                    </Text>
                    {activity.observations && (
                      <Text style={styles.itemObservations}>
                        {activity.observations}
                      </Text>
                    )}

                    {/* Botões de ação */}
                    <View style={styles.itemActions}>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() =>
                          handleEdit(activity.id, "Atividade", activity)
                        }
                      >
                        <Icon name="pencil" size={16} color="#22c55e" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => {
                          Alert.alert(
                            "Excluir Atividade",
                            "Tem certeza que deseja excluir esta atividade?",
                            [
                              { text: "Cancelar", style: "cancel" },
                              {
                                text: "Excluir",
                                style: "destructive",
                                onPress: () =>
                                  handleDeleteActivity(activity.id),
                              },
                            ]
                          );
                        }}
                      >
                        <Icon name="trash" size={16} color="#dc2626" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              )}

              {/* Controles de paginação */}
              {getTotalPages(activities) > 1 && (
                <View style={styles.paginationContainer}>
                  <TouchableOpacity
                    style={[
                      styles.paginationButton,
                      activitiesPage === 1 && styles.paginationButtonDisabled,
                    ]}
                    onPress={() =>
                      handleActivitiesPageChange(activitiesPage - 1)
                    }
                    disabled={activitiesPage === 1}
                  >
                    <Text
                      style={[
                        styles.paginationText,
                        activitiesPage === 1 && styles.paginationTextDisabled,
                      ]}
                    >
                      Anterior
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.paginationInfo}>
                    Página {activitiesPage} de {getTotalPages(activities)}
                  </Text>

                  <TouchableOpacity
                    style={[
                      styles.paginationButton,
                      activitiesPage === getTotalPages(activities) &&
                        styles.paginationButtonDisabled,
                    ]}
                    onPress={() =>
                      handleActivitiesPageChange(activitiesPage + 1)
                    }
                    disabled={activitiesPage === getTotalPages(activities)}
                  >
                    <Text
                      style={[
                        styles.paginationText,
                        activitiesPage === getTotalPages(activities) &&
                          styles.paginationTextDisabled,
                      ]}
                    >
                      Próxima
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : (
            <Text style={styles.emptyText}>Nenhuma atividade encontrada.</Text>
          )}
        </View>

        {/* Seção de Alimentos */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Alimentos</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleOpenModal("Alimentos")}
            >
              <Icon name="add" size={16} color="#fff" />
              <Text style={styles.addButtonText}>Adicionar Alimento</Text>
            </TouchableOpacity>
          </View>

          {foods.length > 0 ? (
            <>
              {getPaginatedItems(foods, foodsPage).map((food, index) => (
                <View key={food.id || index} style={styles.itemCard}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemDate}>
                      {formatDate(food.dateFeeding)}
                    </Text>
                    <Text style={styles.itemType}>{food.typeFood}</Text>
                  </View>
                  <Text style={styles.itemDescription}>
                    Quantidade: {food.amount}
                  </Text>
                  {food.observations && (
                    <Text style={styles.itemObservations}>
                      {food.observations}
                    </Text>
                  )}

                  {/* Botões de ação */}
                  <View style={styles.itemActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleEdit(food.id, "Alimentos", food)}
                    >
                      <Icon name="pencil" size={16} color="#22c55e" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => {
                        Alert.alert(
                          "Excluir Alimento",
                          "Tem certeza que deseja excluir este alimento?",
                          [
                            { text: "Cancelar", style: "cancel" },
                            {
                              text: "Excluir",
                              style: "destructive",
                              onPress: () => handleDeleteFood(food.id),
                            },
                          ]
                        );
                      }}
                    >
                      <Icon name="trash" size={16} color="#dc2626" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              {/* Controles de paginação */}
              {getTotalPages(foods) > 1 && (
                <View style={styles.paginationContainer}>
                  <TouchableOpacity
                    style={[
                      styles.paginationButton,
                      foodsPage === 1 && styles.paginationButtonDisabled,
                    ]}
                    onPress={() => handleFoodsPageChange(foodsPage - 1)}
                    disabled={foodsPage === 1}
                  >
                    <Text
                      style={[
                        styles.paginationText,
                        foodsPage === 1 && styles.paginationTextDisabled,
                      ]}
                    >
                      Anterior
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.paginationInfo}>
                    Página {foodsPage} de {getTotalPages(foods)}
                  </Text>

                  <TouchableOpacity
                    style={[
                      styles.paginationButton,
                      foodsPage === getTotalPages(foods) &&
                        styles.paginationButtonDisabled,
                    ]}
                    onPress={() => handleFoodsPageChange(foodsPage + 1)}
                    disabled={foodsPage === getTotalPages(foods)}
                  >
                    <Text
                      style={[
                        styles.paginationText,
                        foodsPage === getTotalPages(foods) &&
                          styles.paginationTextDisabled,
                      ]}
                    >
                      Próxima
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : (
            <Text style={styles.emptyText}>Nenhum alimento encontrado.</Text>
          )}
        </View>

        {/* Seção de Doenças/Pragas */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Doenças/Pragas</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleOpenModal("Doenças/Pragas")}
            >
              <Icon name="add" size={16} color="#fff" />
              <Text style={styles.addButtonText}>Adicionar Doença/Praga</Text>
            </TouchableOpacity>
          </View>

          {diseases.length > 0 ? (
            <>
              {getPaginatedItems(diseases, diseasesPage).map(
                (disease, index) => (
                  <View key={disease.id || index} style={styles.itemCard}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemDate}>
                        {formatDate(disease.dateDiagnosis)}
                      </Text>
                      <Text style={styles.itemType}>
                        {disease.diseasePrague}
                      </Text>
                    </View>
                    <Text style={styles.itemDescription}>
                      Tratamento: {disease.treatment}
                    </Text>
                    {disease.observations && (
                      <Text style={styles.itemObservations}>
                        {disease.observations}
                      </Text>
                    )}

                    {/* Botões de ação */}
                    <View style={styles.itemActions}>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() =>
                          handleEdit(disease.id, "Doenças/Pragas", disease)
                        }
                      >
                        <Icon name="pencil" size={16} color="#22c55e" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => {
                          Alert.alert(
                            "Excluir Doença/Praga",
                            "Tem certeza que deseja excluir esta doença/praga?",
                            [
                              { text: "Cancelar", style: "cancel" },
                              {
                                text: "Excluir",
                                style: "destructive",
                                onPress: () => handleDeleteDisease(disease.id),
                              },
                            ]
                          );
                        }}
                      >
                        <Icon name="trash" size={16} color="#dc2626" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              )}

              {/* Controles de paginação */}
              {getTotalPages(diseases) > 1 && (
                <View style={styles.paginationContainer}>
                  <TouchableOpacity
                    style={[
                      styles.paginationButton,
                      diseasesPage === 1 && styles.paginationButtonDisabled,
                    ]}
                    onPress={() => handleDiseasesPageChange(diseasesPage - 1)}
                    disabled={diseasesPage === 1}
                  >
                    <Text
                      style={[
                        styles.paginationText,
                        diseasesPage === 1 && styles.paginationTextDisabled,
                      ]}
                    >
                      Anterior
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.paginationInfo}>
                    Página {diseasesPage} de {getTotalPages(diseases)}
                  </Text>

                  <TouchableOpacity
                    style={[
                      styles.paginationButton,
                      diseasesPage === getTotalPages(diseases) &&
                        styles.paginationButtonDisabled,
                    ]}
                    onPress={() => handleDiseasesPageChange(diseasesPage + 1)}
                    disabled={diseasesPage === getTotalPages(diseases)}
                  >
                    <Text
                      style={[
                        styles.paginationText,
                        diseasesPage === getTotalPages(diseases) &&
                          styles.paginationTextDisabled,
                      ]}
                    >
                      Próxima
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : (
            <Text style={styles.emptyText}>
              Nenhuma doença/praga encontrada.
            </Text>
          )}
        </View>

        {/* Seção de Produtos */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Produtos</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleOpenModal("Produtos")}
            >
              <Icon name="add" size={16} color="#fff" />
              <Text style={styles.addButtonText}>Adicionar Produto</Text>
            </TouchableOpacity>
          </View>

          {productionHoneys.length > 0 ? (
            <>
              {getPaginatedItems(productionHoneys, productsPage).map(
                (product, index) => (
                  <View key={product.id || index} style={styles.itemCard}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemDate}>
                        {formatDate(product.dateCollection)}
                      </Text>
                      <Text style={styles.itemType}>
                        {formatQuality(product.quality)}
                      </Text>
                    </View>
                    <Text style={styles.itemDescription}>
                      Quantidade: {product.amount}
                    </Text>
                    {product.observations && (
                      <Text style={styles.itemObservations}>
                        {product.observations}
                      </Text>
                    )}

                    {/* Botões de ação */}
                    <View style={styles.itemActions}>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() =>
                          handleEdit(product.id, "Produtos", product)
                        }
                      >
                        <Icon name="pencil" size={16} color="#22c55e" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => {
                          Alert.alert(
                            "Excluir Produto",
                            "Tem certeza que deseja excluir este produto?",
                            [
                              { text: "Cancelar", style: "cancel" },
                              {
                                text: "Excluir",
                                style: "destructive",
                                onPress: () => handleDeleteProduct(product.id),
                              },
                            ]
                          );
                        }}
                      >
                        <Icon name="trash" size={16} color="#dc2626" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              )}

              {/* Controles de paginação */}
              {getTotalPages(productionHoneys) > 1 && (
                <View style={styles.paginationContainer}>
                  <TouchableOpacity
                    style={[
                      styles.paginationButton,
                      productsPage === 1 && styles.paginationButtonDisabled,
                    ]}
                    onPress={() => handleProductsPageChange(productsPage - 1)}
                    disabled={productsPage === 1}
                  >
                    <Text
                      style={[
                        styles.paginationText,
                        productsPage === 1 && styles.paginationTextDisabled,
                      ]}
                    >
                      Anterior
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.paginationInfo}>
                    Página {productsPage} de {getTotalPages(productionHoneys)}
                  </Text>

                  <TouchableOpacity
                    style={[
                      styles.paginationButton,
                      productsPage === getTotalPages(productionHoneys) &&
                        styles.paginationButtonDisabled,
                    ]}
                    onPress={() => handleProductsPageChange(productsPage + 1)}
                    disabled={productsPage === getTotalPages(productionHoneys)}
                  >
                    <Text
                      style={[
                        styles.paginationText,
                        productsPage === getTotalPages(productionHoneys) &&
                          styles.paginationTextDisabled,
                      ]}
                    >
                      Próxima
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : (
            <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
          )}
        </View>

        {/* Seção de Temperatura e Umidade */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Temperatura e Umidade</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleOpenModal("Temperatura e Umidade")}
            >
              <Icon name="add" size={16} color="#fff" />
              <Text style={styles.addButtonText}>Adicionar Medição</Text>
            </TouchableOpacity>
          </View>

          {temperatureHumidities.length > 0 ? (
            <>
              {getPaginatedItems(temperatureHumidities, measurementsPage).map(
                (measurement, index) => (
                  <View key={measurement.id || index} style={styles.itemCard}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemDate}>
                        {formatDate(measurement.dateMeasurement)}
                      </Text>
                      <Text style={styles.itemType}>Medição</Text>
                    </View>
                    <View style={styles.measurementGrid}>
                      <Text style={styles.measurementItem}>
                        Temp. Interna: {measurement.internalTemperature}°C
                      </Text>
                      <Text style={styles.measurementItem}>
                        Umidade Interna: {measurement.humidityInternal}%
                      </Text>
                      <Text style={styles.measurementItem}>
                        Temp. Externa: {measurement.externalTemperature}°C
                      </Text>
                      <Text style={styles.measurementItem}>
                        Umidade Externa: {measurement.humidityExternal}%
                      </Text>
                    </View>

                    {/* Botões de ação */}
                    <View style={styles.itemActions}>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() =>
                          handleEdit(
                            measurement.id,
                            "Temperatura e Umidade",
                            measurement
                          )
                        }
                      >
                        <Icon name="pencil" size={16} color="#22c55e" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => {
                          Alert.alert(
                            "Excluir Medição",
                            "Tem certeza que deseja excluir esta medição?",
                            [
                              { text: "Cancelar", style: "cancel" },
                              {
                                text: "Excluir",
                                style: "destructive",
                                onPress: () =>
                                  handleDeleteMeasurement(measurement.id),
                              },
                            ]
                          );
                        }}
                      >
                        <Icon name="trash" size={16} color="#dc2626" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              )}

              {/* Controles de paginação */}
              {getTotalPages(temperatureHumidities) > 1 && (
                <View style={styles.paginationContainer}>
                  <TouchableOpacity
                    style={[
                      styles.paginationButton,
                      measurementsPage === 1 && styles.paginationButtonDisabled,
                    ]}
                    onPress={() =>
                      handleMeasurementsPageChange(measurementsPage - 1)
                    }
                    disabled={measurementsPage === 1}
                  >
                    <Text
                      style={[
                        styles.paginationText,
                        measurementsPage === 1 && styles.paginationTextDisabled,
                      ]}
                    >
                      Anterior
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.paginationInfo}>
                    Página {measurementsPage} de{" "}
                    {getTotalPages(temperatureHumidities)}
                  </Text>

                  <TouchableOpacity
                    style={[
                      styles.paginationButton,
                      measurementsPage ===
                        getTotalPages(temperatureHumidities) &&
                        styles.paginationButtonDisabled,
                    ]}
                    onPress={() =>
                      handleMeasurementsPageChange(measurementsPage + 1)
                    }
                    disabled={
                      measurementsPage === getTotalPages(temperatureHumidities)
                    }
                  >
                    <Text
                      style={[
                        styles.paginationText,
                        measurementsPage ===
                          getTotalPages(temperatureHumidities) &&
                          styles.paginationTextDisabled,
                      ]}
                    >
                      Próxima
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : (
            <Text style={styles.emptyText}>Nenhuma medição encontrada.</Text>
          )}
        </View>
      </ScrollView>

      {/* Modal para formulários */}
      {openModal && (
        <Modal
          visible={true}
          onClose={handleCloseModal}
          title={`${editingItem ? "Editar" : "Adicionar"} ${openModal}`}
        >
          {openModal === "Atividade" && (
            <FormActivity
              beehiveId={id}
              onSuccess={handleCloseModal}
              editingItem={editingItem}
            />
          )}
          {openModal === "Alimentos" && (
            <FormFood
              beehiveId={id}
              onSuccess={handleCloseModal}
              editingItem={editingItem}
            />
          )}
          {openModal === "Doenças/Pragas" && (
            <FormDisease
              beehiveId={id}
              onSuccess={handleCloseModal}
              editingItem={editingItem}
            />
          )}
          {openModal === "Produtos" && (
            <FormProductionHoney
              beehiveId={id}
              onSuccess={handleCloseModal}
              editingItem={editingItem}
            />
          )}
          {openModal === "Temperatura e Umidade" && (
            <FormTemperatureHumidity
              beehiveId={id}
              onSuccess={handleCloseModal}
              editingItem={editingItem}
            />
          )}
        </Modal>
      )}

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  beehiveCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  beehiveInfo: {
    marginBottom: 16,
  },
  beehiveName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  beehiveType: {
    fontSize: 16,
    color: "#666",
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  observationsContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 16,
  },
  observationsText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  mapCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  map: {
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginVertical: 16,
  },
  editButton: {
    backgroundColor: "#eead2d",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: "#eead2d",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  itemCard: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 14,
    color: "#666",
  },
  itemType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  itemDescription: {
    fontSize: 16,
    color: "#333",
  },
  itemObservations: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
    paddingVertical: 20,
  },
  measurementGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  measurementItem: {
    fontSize: 14,
    color: "#666",
    flex: 1,
    minWidth: "45%",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  paginationButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
  },
  paginationButtonDisabled: {
    backgroundColor: "#f3f4f6",
  },
  paginationText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  paginationTextDisabled: {
    color: "#999",
  },
  paginationInfo: {
    marginHorizontal: 16,
    fontSize: 14,
    color: "#666",
  },
  itemActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
});

export default BeehiveDetails;
