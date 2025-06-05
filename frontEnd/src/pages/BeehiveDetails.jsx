import { PencilIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteActivity, getActivity } from "../api/activityApi.js";
import { deleteBeehive, getBeehive } from "../api/beehiveApi.js";
import { deleteDisease, getDisease } from "../api/diseaseApi.js";
import { deleteFood, getFood } from "../api/foodApi.js";
import {
  deleteProductionHoney,
  getProductionHoney,
} from "../api/productionHoneyApi.js";
import {
  deleteTemperatureHumidity,
  getTemperatureHumidity,
} from "../api/temperatureHumidity.js";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { FormActivity } from "../components/forms/FormActivity.jsx";
import { FormDisease } from "../components/forms/FormDisease.jsx";
import { FormFood } from "../components/forms/FormFood.jsx";
import { FormProductionHoney } from "../components/forms/FormProductionHoney.jsx";
import { FormTemperatureHumidity } from "../components/forms/FormTemperatureHumidity.jsx";
import { Header } from "../components/Header";
import { Modal } from "../components/Modal";
import {
  SectionListWithActions,
  SectionListWithActionsItem,
} from "../components/SectionListWithActions";
import { formatDate } from "../utils/formatDate.js";

export function BeehiveDetails() {
  const { id } = useParams();
  const user_token = localStorage.getItem("user_token");

  const [beehive, setBeehive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [foods, setFoods] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [productionHoneys, setProductionHoneys] = useState([]);
  const [temperatureHumidities, setTemperatureHumidities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user_token) {
      navigate("/login");
      return;
    }

    async function fetchBeehive() {
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
        setProductionHoneys(Array.isArray(productionHoneyData) ? productionHoneyData : []);
        setTemperatureHumidities(Array.isArray(temperatureHumidityData) ? temperatureHumidityData : []);

      } catch (error) {
        console.error("Erro ao carregar colmeia:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBeehive();
  }, [id, user_token, navigate]);


  const [openModal, setOpenModal] = useState(null);
  const handleOpenModal = (section) => setOpenModal(section);
  const handleCloseModal = () => setOpenModal(null);

  if (loading)
    return <p className="text-center mt-10">Carregando colmeia...</p>;

  if (!beehive)
    return <p className="text-center mt-10">Colmeia não encontrada.</p>;

  const handleDelete = async (idSettings, func) => {
    try {
      await func(idSettings);
      window.location.reload();
    } catch (error) {
      console.log("Erro ao deletar colmeia:", error);
    }
  };

  return (
    <>
      <Header pathName="/" />
      <Container>
        <div className="flex flex-col justify-between p-4">
          <div className="p-8 border-b-[1px] border-gray-500 mb-6">
            <h2 className="text-3xl font-bold mb-4">Detalhes da Colmeia</h2>
            <p>
              <strong>Nome:</strong> {beehive.name}
            </p>
            <p>
              <strong>Data de Início:</strong>{" "}
              {beehive.startDate
                ? formatDate(beehive.startDate)
                : "Não informado"}
            </p>
            <p>
              <strong>Status:</strong> {beehive.status}
            </p>
            <p>
              <strong>Tipo:</strong> {beehive.typeBeehive}
            </p>
            <p>
              <strong>Observações:</strong> {beehive.observations}
            </p>
            <div className="flex justify-between items-center gap-2 mt-4">
              <Link
                to={`/atualizar_colmeia/${id}`}
                title="Editar colmeia"
                className="w-full text-green-500 border border-green-500 rounded flex items-center justify-center cursor-pointer hover:opacity-70 gap-2"
              >
                Editar <PencilIcon />
              </Link>
              <Link
                to="/colmeias"
                onClick={() => handleDelete(id, deleteBeehive)}
                title="Excluir colmeia"
                className="w-full text-red-500 border border-red-500 rounded flex items-center justify-center cursor-pointer hover:opacity-70 gap-2"
              >
                Excluir <TrashIcon />
              </Link>
            </div>
          </div>

          <SectionListWithActions title="Atividade" onAdd={handleOpenModal}>
            {activities.length === 0 ? (
              <p>Nenhuma atividade encontrada.</p>
            ) : (
              activities.map((item) => (
                <SectionListWithActionsItem
                  key={item.id}
                  title="Atividade"
                  value={`${formatDate(item.dateActivity)} | 
                  ${item.typeActivity} | 
                  ${item.descriptions}  
                  ${item?.observations}`}
                  /* onEdit={() => handleEdit(item.id)} */
                  onDelete={() => handleDelete(item.id, deleteActivity)}
                />
              ))
            )}
          </SectionListWithActions>

          <SectionListWithActions title="Comidas" onAdd={handleOpenModal}>
            {foods.length === 0 ? (
              <p>Nenhum alimento encontrado.</p>
            ) : (
              foods.map((item) => (
                <SectionListWithActionsItem
                  key={item.id}
                  title="Comidas"
                  value={`${formatDate(item.dateFeeding)} |
                  ${item.typeFood} |
                  ${item.amount} |
                  ${item.observations}`}
                  /* onEdit={() => handleEdit(item.id)} */
                  onDelete={() => handleDelete(item.id, deleteFood)}
                />
              ))
            )}
          </SectionListWithActions>

          <SectionListWithActions
            title="Doenças/Pragas"
            onAdd={handleOpenModal}
          >
            {diseases.length === 0 ? (
              <p>Nenhuma doença/praga encontrada.</p>
            ) : (
              diseases.map((item) => (
                <SectionListWithActionsItem
                  key={item.id}
                  title="Doenças/Pragas"
                  value={`${formatDate(item.dateDiagnosis)} |
                  ${item.diseasePrague} |
                  ${item.treatment} |
                  ${item.observations}`}
                  /* onEdit={() => handleEdit(item.id)} */
                  onDelete={() => handleDelete(item.id, deleteDisease)}
                />
              ))
            )}
          </SectionListWithActions>
          {/* {console.log(productionHoneys)} */}
          <SectionListWithActions title="Produtos" onAdd={handleOpenModal}>
            {productionHoneys.length === 0 ? (
              <p>Nenhum produto encontrado.</p>
            ) : (
              productionHoneys.map((item) => (
                <SectionListWithActionsItem
                  key={item.id}
                  title="Produtos"
                  value={`${formatDate(item.dateCollection)} |
                ${item.amount} |
                ${item.quality} |
                ${item.observations}`}
                  /* onEdit={() => handleOpenModal(item.id)} */
                  onDelete={() => handleDelete(item.id, deleteProductionHoney)}
                />
              ))
            )}
          </SectionListWithActions>

          <SectionListWithActions
            title="Temperatura e Umidade"
            onAdd={handleOpenModal}
          >
            {temperatureHumidities.length === 0 ? (
              <p>Nenhuma temperatura e umidade encontradas.</p>
            ) : (
              temperatureHumidities.map((item) => (
                <SectionListWithActionsItem
                  key={item.id}
                  title="Temperatura e Umidade"
                  value={`${formatDate(item.dateMeasurement)} |
                  Interna: ${item.internalTemperature}°C / ${
                    item.humidityInternal
                  }% |
                  Externa: ${item.externalTemperature}°C / ${
                    item.humidityExternal
                  }%`}
                  /* onEdit={() => handleEdit(item.id)} */
                  onDelete={() =>
                    handleDelete(item.id, deleteTemperatureHumidity)
                  }
                />
              ))
            )}
          </SectionListWithActions>
        </div>
        <Modal
          open={openModal !== null}
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
      </Container>
    </>
  );
}
