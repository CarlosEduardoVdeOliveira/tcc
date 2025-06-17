import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDisease, getDiseaseById, updateDisease } from "../../api/diseaseApi";
import { Button } from "../Button";
import { GroupInput } from "../GroupInput";
import { GroupTextarea } from "../GroupTextarea";

export function FormDisease({ itemId, allDiseases = [] }) {
  const { id } = useParams();
  const user_token = localStorage.getItem("user_token");

  const [dateDiagnosis, setDateDiagnosis] = useState("");
  const [diseasePrague, setDiseasePrague] = useState("");
  const [treatment, setTreatment] = useState("");
  const [observations, setObservations] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  // Carregar dados para edição se itemId for fornecido
  useEffect(() => {
    if (itemId) {
      setIsEditing(true);
      loadDiseaseData();
    } else {
      setIsEditing(false);
    }
  }, [itemId, id, allDiseases]);

  const loadDiseaseData = async () => {
    try {
      // Buscar o item nos dados locais
      const disease = allDiseases.find(item => item.id === itemId);
      
      if (disease) {
        setDateDiagnosis(disease.dateDiagnosis ? disease.dateDiagnosis.substring(0, 10) : "");
        setDiseasePrague(disease.diseasePrague || "");
        setTreatment(disease.treatment || "");
        setObservations(disease.observations || "");
      }
    } catch (error) {
      console.log("Erro ao carregar dados da doença:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submetendo formulário de doença");
    
    if (!user_token || !id) {
      console.log("Token ou ID não encontrado, redirecionando para login");
      navigate("/login");
      return;
    }

    // Validação básica
    if (!dateDiagnosis || !diseasePrague || !treatment) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const diseaseData = {
        beehiveId: Number(id),
        dateDiagnosis,
        diseasePrague,
        treatment,
        observations,
      };

      console.log("Dados a serem enviados:", diseaseData);

      if (isEditing && itemId) {
        // Atualizar doença existente
        console.log("Atualizando doença com ID:", itemId);
        await updateDisease(diseaseData, itemId);
        alert("Doença/Praga atualizada com sucesso!");
      } else {
        // Criar nova doença
        console.log("Criando nova doença");
        await createDisease(diseaseData);
        alert("Doença/Praga cadastrada com sucesso!");
      }
      
      // Recarregar a página para mostrar as mudanças
      window.location.reload();
    } catch (error) {
      console.error("Erro ao salvar doença:", error);
      alert("Erro ao salvar doença/praga. Verifique os dados e tente novamente.");
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
          {isEditing ? "Editar Doença/Praga" : "Nova Doença/Praga"}
        </h3>
        <p className="text-gray-600 text-sm">
          {isEditing ? "Atualize as informações da doença/praga" : "Cadastre uma nova doença ou praga identificada"}
        </p>
      </div>

      {/* Campos do formulário */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GroupInput
          value={dateDiagnosis}
          onChange={(e) => setDateDiagnosis(e.target.value)}
          type="date"
          label="Data do diagnóstico"
          id="dateDiagnosis"
          icon={false}
        />
        <GroupInput
          value={diseasePrague}
          onChange={(e) => setDiseasePrague(e.target.value)}
          label="Doença/Praga"
          id="diseasePrague"
          placeholder="Ex: Varroa, Nosema, Loque..."
          icon={false}
        />
      </div>

      <GroupTextarea
        label="Tratamento"
        id="treatment"
        placeholder="Descreva o tratamento aplicado..."
        value={treatment}
        onChange={(e) => setTreatment(e.target.value)}
      />
      
      <GroupTextarea
        label="Observações"
        placeholder="Observações adicionais sobre a doença/praga..."
        id="observations"
        value={observations}
        onChange={(e) => setObservations(e.target.value)}
      />

      {/* Botões de ação */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Button 
          type="submit"
          variant="danger"
        >
          {isEditing ? "Atualizar Doença/Praga" : "Cadastrar Doença/Praga"}
        </Button>
      </div>
    </form>
  );
}
