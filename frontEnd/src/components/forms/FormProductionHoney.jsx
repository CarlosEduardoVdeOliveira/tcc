import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProductionHoney } from "../../api/productionHoneyApi";
import { Button } from "../Button";
import { GroupInput } from "../GroupInput";
import { GroupTextarea } from "../GroupTextarea";

export function FormProductionHoney() {
  const { id } = useParams();
  const user_token = localStorage.getItem("user_token");
  const [dateCollection, setDateCollection] = useState("");
  const [amount, setAmount] = useState("");
  const [quality, setQuality] = useState("");
  const [observations, setObservations] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!user_token || !id) {
      navigate("/login");
    }
    try {
      await createProductionHoney({
        beehiveId: Number(id),
        dateCollection,
        amount: Number(amount),
        quality,
        observations,
      });
      navigate(`/colmeia/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <GroupInput
        type="date"
        label="Date de coleta"
        id="dateCollection"
        icon={false}
        value={dateCollection}
        onChange={(e) => setDateCollection(e.target.value)}
      />
      <GroupInput
        label="Qual a quantidade"
        placeholder="Digite a quantidade de produto"
        id="amount"
        icon={false}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="w-full flex flex-col">
        <label htmlFor="production" className="font-semibold text-center mb-4">
          Produção
        </label>
        <select
          id="production"
          className="border-b-[2px] rounded border-gray-500"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
        >
          <option value="">Seleciona nível de produção</option>
          <option id="alta" value="alta">
            Alta
          </option>
          <option id="media" value="média">
            Média
          </option>
          <option id="baixa" value="baixa">
            Baixa
          </option>
        </select>
      </div>
      <GroupTextarea
        value={observations}
        onChange={(e) => setObservations(e.target.value)}
        label="Observação"
        placeholder="Observações"
        id="observations"
      />
      <Button type="submit">Cadastra Produtos</Button>
    </form>
  );
}
