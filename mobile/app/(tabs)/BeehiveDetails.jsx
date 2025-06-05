import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Pencil, Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

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

import Container from "../../components/Container.js";
import Footer from "../../components/Footer.js";
import FormActivity from "../../components/FormActivity.js";
import FormDisease from "../../components/FormDisease.js";
import FormFood from "../../components/FormFood.js";
import FormProductionHoney from "../../components/FormProductionHoney.js";
import FormTemperatureHumidity from "../../components/FormTemperatureHumidity.js";
import Header from "../../components/Header.js";
import Modal from "../../components/Modal.js";
import {
  default as SectionListWithActions,
  default as SectionListWithActionsItem,
} from "../../components/SectionListWithActions.js";

import { formatDate } from "../../utils/formatDate.js";

function BeehiveDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;

  const [beehive, setBeehive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(null);

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

        setBeehive(beehiveData);
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setFoods(Array.isArray(foodsData) ? foodsData : []);
        setDiseases(Array.isArray(diseasesData) ? diseasesData : []);
        setProductionHoneys(
          Array.isArray(productionHoneyData) ? productionHoneyData : []
        );
        setTemperatureHumidities(
          Array.isArray(temperatureHumidityData) ? temperatureHumidityData : []
        );
      } catch (error) {
        console.error("Erro ao carregar colmeia:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, navigation]);

  const handleDelete = async (itemId, deleteFunc) => {
    try {
      await deleteFunc(itemId);
      // Atualiza a tela recarregando tudo
      setLoading(true);
      setBeehive(null);
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  if (loading) {
    return (
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <Text>Carregando colmeia...</Text>
      </View>
    );
  }

  if (!beehive) {
    return (
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <Text>Colmeia não encontrada.</Text>
      </View>
    );
  }

  return (
    <Container>
      <Header />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>
            Detalhes da Colmeia
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Nome:</Text> {beehive.name}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Data de Início:</Text>{" "}
            {beehive.startDate
              ? formatDate(beehive.startDate)
              : "Não informado"}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Status:</Text> {beehive.status}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Tipo:</Text>{" "}
            {beehive.typeBeehive}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Observações:</Text>{" "}
            {beehive.observations}
          </Text>

          <View style={{ flexDirection: "row", marginTop: 16, gap: 8 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                padding: 12,
                borderColor: "green",
                borderWidth: 1,
                borderRadius: 6,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("AtualizarColmeia", { id })}
            >
              <Text style={{ color: "green", marginRight: 6 }}>Editar</Text>
              <Pencil color="green" size={18} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                padding: 12,
                borderColor: "red",
                borderWidth: 1,
                borderRadius: 6,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
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
              <Text style={{ color: "red", marginRight: 6 }}>Excluir</Text>
              <Trash2 color="red" size={18} />
            </TouchableOpacity>
          </View>
        </View>

        <SectionListWithActions
          title="Atividade"
          onAdd={() => setOpenModal("Atividade")}
        >
          {activities.map((item) => (
            <SectionListWithActionsItem
              key={item.id}
              title="Atividade"
              value={`${formatDate(item.dateActivity)} | ${
                item.typeActivity
              } | ${item.descriptions} ${item?.observations}`}
              onDelete={() => handleDelete(item.id, deleteActivity)}
            />
          ))}
        </SectionListWithActions>

        <SectionListWithActions
          title="Comidas"
          onAdd={() => setOpenModal("Comidas")}
        >
          {foods.map((item) => (
            <SectionListWithActionsItem
              key={item.id}
              title="Comidas"
              value={`${formatDate(item.dateFeeding)} | ${item.typeFood} | ${
                item.amount
              } | ${item.observations}`}
              onDelete={() => handleDelete(item.id, deleteFood)}
            />
          ))}
        </SectionListWithActions>

        <SectionListWithActions
          title="Doenças/Pragas"
          onAdd={() => setOpenModal("Doenças/Pragas")}
        >
          {diseases.map((item) => (
            <SectionListWithActionsItem
              key={item.id}
              title="Doenças/Pragas"
              value={`${formatDate(item.dateDiagnosis)} | ${
                item.diseasePrague
              } | ${item.treatment} | ${item.observations}`}
              onDelete={() => handleDelete(item.id, deleteDisease)}
            />
          ))}
        </SectionListWithActions>

        <SectionListWithActions
          title="Produtos"
          onAdd={() => setOpenModal("Produtos")}
        >
          {productionHoneys.map((item) => (
            <SectionListWithActionsItem
              key={item.id}
              title="Produtos"
              value={`${formatDate(item.dateCollection)} | ${item.amount} | ${
                item.quality
              } | ${item.observations}`}
              onDelete={() => handleDelete(item.id, deleteProductionHoney)}
            />
          ))}
        </SectionListWithActions>

        <SectionListWithActions
          title="Temperatura e Umidade"
          onAdd={() => setOpenModal("Temperatura e Umidade")}
        >
          {temperatureHumidities.map((item) => (
            <SectionListWithActionsItem
              key={item.id}
              title="Temperatura e Umidade"
              value={`${formatDate(item.dateMeasurement)} | Interna: ${
                item.internalTemperature
              }°C / ${item.humidityInternal}% | Externa: ${
                item.externalTemperature
              }°C / ${item.humidityExternal}%`}
              onDelete={() => handleDelete(item.id, deleteTemperatureHumidity)}
            />
          ))}
        </SectionListWithActions>
      </ScrollView>

      <Modal
        visible={openModal !== null}
        onClose={() => setOpenModal(null)}
        title={`Adicionar ${openModal}`}
      >
        {openModal === "Atividade" && <FormActivity />}
        {openModal === "Doenças/Pragas" && <FormDisease />}
        {openModal === "Produtos" && <FormProductionHoney />}
        {openModal === "Comidas" && <FormFood />}
        {openModal === "Temperatura e Umidade" && <FormTemperatureHumidity />}
      </Modal>

      <Footer />
    </Container>
  );
}
export default BeehiveDetails;
