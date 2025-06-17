import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createActivity, getActivityById, updateActivity } from "../../api/activityApi";
import { Button } from "../Button";
import { GroupInput } from "../GroupInput";
import { GroupTextarea } from "../GroupTextarea";

export function FormActivity({ itemId }) {
  const { id } = useParams();
  const user_token = localStorage.getItem("user_token");

  const [dateActivity, setDateActivity] = useState("");
  const [typeActivity, setTypeActivity] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [observations, setObservations] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  // Carregar dados para edição se itemId for fornecido
  useEffect(() => {
    console.log("FormActivity useEffect - itemId:", itemId, "id:", id);
    if (itemId) {
      setIsEditing(true);
      loadActivityData();
    }
  }, [itemId, id]);

  const loadActivityData = async () => {
    try {
      console.log("Carregando dados da atividade com ID:", itemId);
      setLoading(true);
      const response = await getActivityById(itemId);
      console.log("Resposta da API:", response);
      const activity = response.data;
      
      setDateActivity(activity.dateActivity ? activity.dateActivity.substring(0, 10) : "");
      setTypeActivity(activity.typeActivity || "");
      setDescriptions(activity.descriptions || "");
      setObservations(activity.observations || "");
    } catch (error) {
      console.error("Erro ao carregar atividade:", error);
      console.error("Detalhes do erro:", error.response?.data);
      
      // Se for erro 404 (rota não encontrada), apenas mostra aviso mas não impede a edição
      if (error.response?.status === 404) {
        alert("Aviso: Não foi possível carregar os dados da atividade. O formulário será aberto vazio para você preencher manualmente.");
      } else {
        alert("Erro ao carregar dados da atividade. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user_token || !id) {
      navigate("/login");
      return;
    }

    // Validação básica
    if (!dateActivity || !typeActivity || !descriptions) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const activityData = {
        beehiveId: Number(id),
        dateActivity,
        typeActivity,
        descriptions,
        observations,
      };

      if (isEditing && itemId) {
        // Atualizar atividade existente
        await updateActivity(activityData, itemId);
        alert("Atividade atualizada com sucesso!");
      } else {
        // Criar nova atividade
        await createActivity(activityData);
        alert("Atividade cadastrada com sucesso!");
      }
      
      // Recarregar a página para mostrar as mudanças
      window.location.reload();
    } catch (error) {
      console.error("Erro ao salvar atividade:", error);
      alert("Erro ao salvar atividade. Verifique os dados e tente novamente.");
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
          {isEditing ? "Editar Atividade" : "Nova Atividade"}
        </h3>
        <p className="text-gray-600 text-sm">
          {isEditing ? "Atualize as informações da atividade" : "Cadastre uma nova atividade realizada na colmeia"}
        </p>
      </div>

      {/* Campos do formulário */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GroupInput
          value={dateActivity}
          onChange={(e) => setDateActivity(e.target.value)}
          type="date"
          label="Data da Atividade"
          id="dateActivity"
          icon={false}
        />
        
        <GroupInput
          value={typeActivity}
          onChange={(e) => setTypeActivity(e.target.value)}
          label="Tipo de Atividade"
          id="activity"
          placeholder="Ex: Inspeção, Colheita, Tratamento..."
          icon={false}
        />
      </div>

      <GroupTextarea
        value={descriptions}
        onChange={(e) => setDescriptions(e.target.value)}
        label="Descrição da Atividade"
        id="description"
        placeholder="Descreva detalhadamente a atividade realizada..."
      />
      
      <GroupInput
        value={observations}
        onChange={(e) => setObservations(e.target.value)}
        label="Observações"
        id="observations"
        placeholder="Observações adicionais..."
        icon={false}
      />

      {/* Botões de ação */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Button 
          type="submit"
          variant="success"
        >
          {isEditing ? "Atualizar Atividade" : "Cadastrar Atividade"}
        </Button>
      </div>
    </form>
  );
}
