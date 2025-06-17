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
import { DataTable } from "../components/DataTable";
import { Footer } from "../components/Footer";
import { FormActivity } from "../components/forms/FormActivity.jsx";
import { FormDisease } from "../components/forms/FormDisease.jsx";
import { FormFood } from "../components/forms/FormFood.jsx";
import { FormProductionHoney } from "../components/forms/FormProductionHoney.jsx";
import { FormTemperatureHumidity } from "../components/forms/FormTemperatureHumidity.jsx";
import { Header } from "../components/Header";
import { MapWithRoute } from "../components/MapWithRoute";
import { Modal } from "../components/Modal";
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
        
        // Organizar todas as seções por data (mais recente primeiro)
        const sortedActivities = Array.isArray(activitiesData) 
          ? activitiesData.sort((a, b) => new Date(b.dateActivity) - new Date(a.dateActivity))
          : [];
        setActivities(sortedActivities);
        
        const sortedFoods = Array.isArray(foodsData) 
          ? foodsData.sort((a, b) => new Date(b.dateFeeding) - new Date(a.dateFeeding))
          : [];
        setFoods(sortedFoods);
        console.log("=== DADOS CARREGADOS ===");
        console.log("Foods carregados:", sortedFoods);
        console.log("Primeiro item de foods:", sortedFoods[0]);
        console.log("Keys do primeiro item de foods:", sortedFoods[0] ? Object.keys(sortedFoods[0]) : "Nenhum item");
        
        const sortedDiseases = Array.isArray(diseasesData) 
          ? diseasesData.sort((a, b) => new Date(b.dateDiagnosis) - new Date(a.dateDiagnosis))
          : [];
        setDiseases(sortedDiseases);
        console.log("Diseases carregados:", sortedDiseases);
        console.log("Primeiro item de diseases:", sortedDiseases[0]);
        console.log("Keys do primeiro item de diseases:", sortedDiseases[0] ? Object.keys(sortedDiseases[0]) : "Nenhum item");
        
        const sortedProductionHoneys = Array.isArray(productionHoneyData) 
          ? productionHoneyData.sort((a, b) => new Date(b.dateCollection) - new Date(a.dateCollection))
          : [];
        setProductionHoneys(sortedProductionHoneys);
        
        const sortedTemperatureHumidities = Array.isArray(temperatureHumidityData) 
          ? temperatureHumidityData.sort((a, b) => new Date(b.dateMeasurement) - new Date(a.dateMeasurement))
          : [];
        setTemperatureHumidities(sortedTemperatureHumidities);
        console.log("TemperatureHumidities carregados:", sortedTemperatureHumidities);
        console.log("Primeiro item de temperatureHumidities:", sortedTemperatureHumidities[0]);
        console.log("Keys do primeiro item de temperatureHumidities:", sortedTemperatureHumidities[0] ? Object.keys(sortedTemperatureHumidities[0]) : "Nenhum item");

      } catch (error) {
        console.error("Erro ao carregar colmeia:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBeehive();
  }, [id, user_token, navigate]);

  const [openModal, setOpenModal] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const handleOpenModal = (section) => setOpenModal(section);
  const handleCloseModal = () => {
    setOpenModal(null);
    setEditingItem(null);
  };

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

  const handleEdit = (id, section) => {
    console.log("=== handleEdit ===");
    console.log("ID recebido:", id);
    console.log("Section recebida:", section);
    console.log("Tipo do ID:", typeof id);
    setEditingItem({ id, section });
    setOpenModal(section);
    console.log("editingItem definido:", { id, section });
    console.log("openModal definido:", section);
  };

  // Configuração das colunas das tabelas
  const activityColumns = [
    { key: "dateActivity", header: "Data", render: (value) => formatDate(value) },
    { key: "typeActivity", header: "Tipo de Atividade" },
    { key: "descriptions", header: "Descrição" },
    { key: "observations", header: "Observações" }
  ];

  const foodColumns = [
    { key: "dateFeeding", header: "Data da Alimentação", render: (value) => formatDate(value) },
    { key: "typeFood", header: "Tipo de Comida" },
    { key: "amount", header: "Quantidade" },
    { key: "observations", header: "Observações" }
  ];

  const diseaseColumns = [
    { key: "dateDiagnosis", header: "Data do Diagnóstico", render: (value) => formatDate(value) },
    { key: "diseasePrague", header: "Doença/Praga" },
    { key: "treatment", header: "Tratamento" },
    { key: "observations", header: "Observações" }
  ];

  const productionHoneyColumns = [
    { key: "dateCollection", header: "Data da Coleta", render: (value) => formatDate(value) },
    { key: "amount", header: "Quantidade" },
    { key: "quality", header: "Qualidade" },
    { key: "observations", header: "Observações" }
  ];

  const temperatureHumidityColumns = [
    { key: "dateMeasurement", header: "Data da Medição", render: (value) => formatDate(value) },
    { key: "internalTemperature", header: "Temp. Interna (°C)" },
    { key: "humidityInternal", header: "Umidade Interna (%)" },
    { key: "externalTemperature", header: "Temp. Externa (°C)" },
    { key: "humidityExternal", header: "Umidade Externa (%)" }
  ];

  return (
    <>
      <Header pathName="/" />
      <Container>
        <div className="flex flex-col justify-between p-4">
          <div className="p-8 border-b-[1px] border-gray-500 mb-6">
            <h2 className="text-3xl font-bold mb-4">Detalhes da Colmeia</h2>
            <p><strong>Nome:</strong> {beehive.name}</p>
            <p><strong>Data de Início:</strong> {beehive.startDate ? formatDate(beehive.startDate) : "Não informado"}</p>
            <p><strong>Status:</strong> {beehive.status}</p>
            <p><strong>Tipo:</strong> {beehive.typeBeehive}</p>
            <p><strong>Observações:</strong> {beehive.observations}</p>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Localização da Colmeia</h3>
              <MapWithRoute
                beehiveLatitude={beehive.latitude}
                beehiveLongitude={beehive.longitude}
                beehiveName={beehive.name}
                style={{ height: "300px", width: "100%" }}
              />
            </div>
            
            <div className="flex justify-between items-center gap-2 mt-4">
              <Link to={`/atualizar_colmeia/${id}`} title="Editar colmeia" className="w-full text-green-500 border border-green-500 rounded flex items-center justify-center cursor-pointer hover:opacity-70 gap-2">
                Editar <PencilIcon />
              </Link>
              <Link to="/colmeias" onClick={() => handleDelete(id, deleteBeehive)} title="Excluir colmeia" className="w-full text-red-500 border border-red-500 rounded flex items-center justify-center cursor-pointer hover:opacity-70 gap-2">
                Excluir <TrashIcon />
              </Link>
            </div>
          </div>

          {/* Tabela de Atividades */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Atividades</h3>
              <button onClick={() => handleOpenModal("Atividade")} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors cursor-pointer">
                + Adicionar Atividade
              </button>
            </div>
            <DataTable 
              data={activities} 
              columns={activityColumns} 
              onEdit={(id) => handleEdit(id, "Atividade")} 
              onDelete={(id) => handleDelete(id, deleteActivity)} 
              emptyMessage="Nenhuma atividade encontrada." 
              title=""
              itemsPerPage={5}
            />
          </div>

          {/* Tabela de Comidas */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Comidas</h3>
              <button onClick={() => handleOpenModal("Comidas")} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors cursor-pointer">
                + Adicionar Comida
              </button>
            </div>
            <DataTable 
              data={foods} 
              columns={foodColumns} 
              onEdit={(id) => handleEdit(id, "Comidas")} 
              onDelete={(id) => handleDelete(id, deleteFood)} 
              emptyMessage="Nenhum alimento encontrado." 
              title=""
              itemsPerPage={5}
            />
          </div>

          {/* Tabela de Doenças/Pragas */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Doenças/Pragas</h3>
              <button onClick={() => handleOpenModal("Doenças/Pragas")} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors cursor-pointer">
                + Adicionar Doença/Praga
              </button>
            </div>
            <DataTable 
              data={diseases} 
              columns={diseaseColumns} 
              onEdit={(id) => handleEdit(id, "Doenças/Pragas")} 
              onDelete={(id) => handleDelete(id, deleteDisease)} 
              emptyMessage="Nenhuma doença/praga encontrada." 
              title=""
              itemsPerPage={5}
            />
          </div>

          {/* Tabela de Produtos */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Produtos</h3>
              <button onClick={() => handleOpenModal("Produtos")} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors cursor-pointer">
                + Adicionar Produto
              </button>
            </div>
            <DataTable 
              data={productionHoneys} 
              columns={productionHoneyColumns} 
              onEdit={(id) => handleEdit(id, "Produtos")} 
              onDelete={(id) => handleDelete(id, deleteProductionHoney)} 
              emptyMessage="Nenhum produto encontrado." 
              title=""
              itemsPerPage={5}
            />
          </div>

          {/* Tabela de Temperatura e Umidade */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Temperatura e Umidade</h3>
              <button onClick={() => handleOpenModal("Temperatura e Umidade")} className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors cursor-pointer">
                + Adicionar Medição
              </button>
            </div>
            <DataTable 
              data={temperatureHumidities} 
              columns={temperatureHumidityColumns} 
              onEdit={(id) => handleEdit(id, "Temperatura e Umidade")} 
              onDelete={(id) => handleDelete(id, deleteTemperatureHumidity)} 
              emptyMessage="Nenhuma medição encontrada." 
              title=""
              itemsPerPage={5}
            />
          </div>
        </div>
        <Modal open={openModal !== null} onClose={handleCloseModal} title={`${editingItem ? 'Editar' : 'Adicionar'} ${openModal}`}>
          {openModal === "Atividade" && <FormActivity itemId={editingItem?.id} />}
          {openModal === "Doenças/Pragas" && <FormDisease itemId={editingItem?.id} allDiseases={diseases} />}
          {openModal === "Produtos" && <FormProductionHoney itemId={editingItem?.id} allProductionHoneys={productionHoneys} />}
          {openModal === "Comidas" && <FormFood itemId={editingItem?.id} allFoods={foods} />}
          {openModal === "Temperatura e Umidade" && <FormTemperatureHumidity itemId={editingItem?.id} allTemperatureHumidities={temperatureHumidities} />}
        </Modal>
        <Footer />
      </Container>
    </>
  );
}
