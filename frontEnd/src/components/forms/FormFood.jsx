import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createFood, getFoodById, updateFood } from "../../api/foodApi";
import { Button } from "../Button";
import { GroupInput } from "../GroupInput";
import { GroupTextarea } from "../GroupTextarea";

export function FormFood({ itemId, allFoods = [] }) {
  const { id } = useParams();
  const user_token = localStorage.getItem("user_token");
  console.log("Token atual:", user_token);
  console.log("ID da colmeia:", id);

  const [dateFeeding, setDateFeeding] = useState("");
  const [typeFood, setTypeFood] = useState("");
  const [amount, setAmount] = useState("");
  const [observations, setObservations] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  // Carregar dados para edição se itemId for fornecido
  useEffect(() => {
    if (itemId) {
      setIsEditing(true);
      loadFoodData();
    } else {
      setIsEditing(false);
    }
  }, [itemId, id, allFoods]);

  const loadFoodData = async () => {
    try {
      // Buscar o item nos dados locais
      const food = allFoods.find(item => item.id === itemId);
      
      if (food) {
        setDateFeeding(food.dateFeeding ? food.dateFeeding.substring(0, 10) : "");
        setTypeFood(food.typeFood || "");
        setAmount(food.amount || "");
        setObservations(food.observations || "");
      }
    } catch (error) {
      console.log("Erro ao carregar dados do alimento:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submetendo formulário de comida");
    console.log("Token atual:", user_token);
    
    if (!user_token || !id) {
      console.log("Token ou ID não encontrado, redirecionando para login");
      navigate("/login");
      return;
    }

    // Validação básica
    if (!dateFeeding || !typeFood || !amount) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const foodData = {
        beehiveId: Number(id),
        dateFeeding,
        typeFood,
        amount: Number(amount),
        observations,
      };

      console.log("Dados a serem enviados:", foodData);

      if (isEditing && itemId) {
        // Atualizar alimento existente
        console.log("Atualizando alimento com ID:", itemId);
        await updateFood(foodData, itemId);
        alert("Alimento atualizado com sucesso!");
      } else {
        // Criar novo alimento
        console.log("Criando novo alimento");
        await createFood(foodData);
        alert("Alimento cadastrado com sucesso!");
      }
      
      // Recarregar a página para mostrar as mudanças
      window.location.reload();
    } catch (error) {
      console.error("Erro ao salvar alimento:", error);
      console.error("Detalhes do erro:", error.response?.data);
      alert("Erro ao salvar alimento. Verifique os dados e tente novamente.");
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
          {isEditing ? "Editar Alimentação" : "Nova Alimentação"}
        </h3>
        <p className="text-gray-600 text-sm">
          {isEditing ? "Atualize as informações da alimentação" : "Cadastre uma nova alimentação para a colmeia"}
        </p>
      </div>

      {/* Campos do formulário */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GroupInput
          value={dateFeeding}
          onChange={(e) => setDateFeeding(e.target.value)}
          type="date"
          label="Data da alimentação"
          id="dateFeeding"
          icon={false}
        />
        <GroupInput
          value={typeFood}
          onChange={(e) => setTypeFood(e.target.value)}
          label="Tipo de comida"
          id="typeFood"
          placeholder="Ex: Água com açúcar, xarope..."
          icon={false}
        />
      </div>

      <GroupInput
        label="Quantidade de comida"
        id="amount"
        placeholder="Digite a quantidade (em litros ou kg)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <GroupTextarea
        label="Observações"
        placeholder="Observações sobre a alimentação..."
        id="observations"
        value={observations}
        onChange={(e) => setObservations(e.target.value)}
      />

      {/* Botões de ação */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Button 
          type="submit"
          variant="warning"
        >
          {isEditing ? "Atualizar Alimentação" : "Cadastrar Alimentação"}
        </Button>
      </div>
    </form>
  );
}
