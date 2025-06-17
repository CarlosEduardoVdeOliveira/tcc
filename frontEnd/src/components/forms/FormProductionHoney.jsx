import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProductionHoney, getProductionHoneyById, updateProductionHoney } from "../../api/productionHoneyApi";
import { Button } from "../Button";
import { GroupInput } from "../GroupInput";
import { GroupTextarea } from "../GroupTextarea";

export function FormProductionHoney({ itemId, allProductionHoneys = [] }) {
  const { id } = useParams();
  const user_token = localStorage.getItem("user_token");

  const [dateCollection, setDateCollection] = useState("");
  const [amount, setAmount] = useState("");
  const [quality, setQuality] = useState("");
  const [observations, setObservations] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  // Carregar dados para edição se itemId for fornecido
  useEffect(() => {
    if (itemId) {
      setIsEditing(true);
      loadProductionHoneyData();
    } else {
      setIsEditing(false);
    }
  }, [itemId, id, allProductionHoneys]);

  const loadProductionHoneyData = async () => {
    try {
      // Buscar o item nos dados locais
      const productionHoney = allProductionHoneys.find(item => item.id === itemId);
      
      if (productionHoney) {
        setDateCollection(productionHoney.dateCollection ? productionHoney.dateCollection.substring(0, 10) : "");
        setAmount(productionHoney.amount || "");
        setQuality(productionHoney.quality || "");
        setObservations(productionHoney.observations || "");
      }
    } catch (error) {
      console.log("Erro ao carregar dados do produto:", error);
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
    if (!dateCollection || !amount || !quality) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const productionHoneyData = {
        beehiveId: Number(id),
        dateCollection,
        amount: Number(amount),
        quality,
        observations,
      };

      if (isEditing && itemId) {
        // Atualizar produto existente
        await updateProductionHoney(productionHoneyData, itemId);
        alert("Produto atualizado com sucesso!");
      } else {
        // Criar novo produto
        await createProductionHoney(productionHoneyData);
        alert("Produto cadastrado com sucesso!");
      }
      
      // Recarregar a página para mostrar as mudanças
      window.location.reload();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto. Verifique os dados e tente novamente.");
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
          {isEditing ? "Editar Produção de Mel" : "Nova Produção de Mel"}
        </h3>
        <p className="text-gray-600 text-sm">
          {isEditing ? "Atualize as informações da produção" : "Cadastre uma nova coleta de mel"}
        </p>
      </div>

      {/* Campos do formulário */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GroupInput
          value={dateCollection}
          onChange={(e) => setDateCollection(e.target.value)}
          type="date"
          label="Data da coleta"
          id="dateCollection"
          icon={false}
        />
        <GroupInput
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          label="Quantidade"
          id="amount"
          placeholder="Quantidade em kg"
          icon={false}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="quality" className="text-sm font-medium text-gray-700 mb-2">
          Qualidade da Produção
        </label>
        <select
          id="quality"
          className="border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none transition-colors duration-200"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
        >
          <option value="">Selecione o nível de produção</option>
          <option value="alta">Alta</option>
          <option value="média">Média</option>
          <option value="baixa">Baixa</option>
        </select>
      </div>

      <GroupTextarea
        value={observations}
        onChange={(e) => setObservations(e.target.value)}
        label="Observações"
        placeholder="Observações sobre a produção de mel..."
        id="observations"
      />

      {/* Botões de ação */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Button 
          type="submit"
          variant="warning"
        >
          {isEditing ? "Atualizar Produção" : "Cadastrar Produção"}
        </Button>
      </div>
    </form>
  );
}
