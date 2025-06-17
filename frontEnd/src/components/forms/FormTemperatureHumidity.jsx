import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTemperatureHumidity, getTemperatureHumidityById, updateTemperatureHumidity } from "../../api/temperatureHumidity";
import { Button } from "../Button";
import { GroupInput } from "../GroupInput";

export function FormTemperatureHumidity({ itemId, allTemperatureHumidities = [] }) {
  const { id } = useParams();
  const user_token = localStorage.getItem("user_token");

  const [dateMeasurement, setDateMeasurement] = useState("");
  const [internalTemperature, setInternalTemperature] = useState("");
  const [humidityInternal, setHumidityInternal] = useState("");
  const [externalTemperature, setExternalTemperature] = useState("");
  const [humidityExternal, setHumidityExternal] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  // Carregar dados para edição se itemId for fornecido
  useEffect(() => {
    if (itemId) {
      setIsEditing(true);
      loadTemperatureHumidityData();
    } else {
      setIsEditing(false);
    }
  }, [itemId, id, allTemperatureHumidities]);

  const loadTemperatureHumidityData = async () => {
    try {
      // Buscar o item nos dados locais
      const tempHumidity = allTemperatureHumidities.find(item => item.id === itemId);
      
      if (tempHumidity) {
        setDateMeasurement(tempHumidity.dateMeasurement ? tempHumidity.dateMeasurement.substring(0, 10) : "");
        setInternalTemperature(tempHumidity.internalTemperature || "");
        setHumidityInternal(tempHumidity.humidityInternal || "");
        setExternalTemperature(tempHumidity.externalTemperature || "");
        setHumidityExternal(tempHumidity.humidityExternal || "");
      }
    } catch (error) {
      console.log("Erro ao carregar dados de temperatura e umidade:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submetendo formulário de temperatura e umidade");
    console.log("Token atual:", user_token);
    
    if (!user_token || !id) {
      console.log("Token ou ID não encontrado, redirecionando para login");
      navigate("/login");
      return;
    }

    // Validação básica
    if (!dateMeasurement || !internalTemperature || !humidityInternal || !externalTemperature || !humidityExternal) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const tempHumidityData = {
        beehiveId: Number(id),
        dateMeasurement,
        internalTemperature: Number(internalTemperature),
        humidityInternal: Number(humidityInternal),
        externalTemperature: Number(externalTemperature),
        humidityExternal: Number(humidityExternal),
      };

      console.log("Dados a serem enviados:", tempHumidityData);

      if (isEditing && itemId) {
        // Atualizar temperatura e umidade existente
        console.log("Atualizando temperatura e umidade com ID:", itemId);
        await updateTemperatureHumidity(tempHumidityData, itemId);
        alert("Temperatura e umidade atualizadas com sucesso!");
      } else {
        // Criar nova temperatura e umidade
        console.log("Criando nova temperatura e umidade");
        await createTemperatureHumidity(tempHumidityData);
        alert("Temperatura e umidade cadastradas com sucesso!");
      }
      
      // Recarregar a página para mostrar as mudanças
      window.location.reload();
    } catch (error) {
      console.error("Erro ao salvar temperatura e umidade:", error);
      console.error("Detalhes do erro:", error.response?.data);
      alert("Erro ao salvar temperatura e umidade. Verifique os dados e tente novamente.");
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Header do formulário */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {isEditing ? "Editar Medições" : "Novas Medições"}
        </h3>
        <p className="text-gray-600 text-sm">
          {isEditing ? "Atualize as medições de temperatura e umidade" : "Cadastre novas medições de temperatura e umidade"}
        </p>
      </div>

      {/* Data da medição */}
      <GroupInput
        value={dateMeasurement}
        onChange={(e) => setDateMeasurement(e.target.value)}
        type="date"
        label="Data da medição"
        id="dateMeasurement"
        icon={false}
      />

      {/* Medições internas */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="text-lg font-medium text-blue-800 mb-3">Medições Internas</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GroupInput
            label="Temperatura interna"
            placeholder="Temperatura em °C"
            id="internalTemperature"
            icon={false}
            value={internalTemperature}
            onChange={(e) => setInternalTemperature(e.target.value)}
          />
          <GroupInput
            label="Umidade interna"
            placeholder="Umidade em %"
            id="humidityInternal"
            value={humidityInternal}
            onChange={(e) => setHumidityInternal(e.target.value)}
          />
        </div>
      </div>

      {/* Medições externas */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h4 className="text-lg font-medium text-green-800 mb-3">Medições Externas</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GroupInput
            label="Temperatura externa"
            placeholder="Temperatura em °C"
            id="externalTemperature"
            value={externalTemperature}
            onChange={(e) => setExternalTemperature(e.target.value)}
          />
          <GroupInput
            label="Umidade externa"
            placeholder="Umidade em %"
            id="humidityExternal"
            value={humidityExternal}
            onChange={(e) => setHumidityExternal(e.target.value)}
          />
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Button 
          type="submit"
          variant="info"
        >
          {isEditing ? "Atualizar Medições" : "Cadastrar Medições"}
        </Button>
      </div>
    </form>
  );
}
