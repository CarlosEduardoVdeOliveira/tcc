import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createFood } from "../../api/foodApi";
import { Button } from "../Button";
import { GroupInput } from "../GroupInput";
import { GroupTextarea } from "../GroupTextarea";

export function FormFood() {
  const { id } = useParams();
  const user_token = localStorage.getItem("user_token");
  const navigate = useNavigate();
  const [dateFeeding, setDateFeeding] = useState("");
  const [typeFood, setTypeFood] = useState("");
  const [amount, setAmount] = useState("");
  const [observations, setObservations] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user_token || !id) {
      navigate("/login");
    }
    try {
      await createFood({
        beehiveId: Number(id),
        dateFeeding,
        typeFood,
        amount: Number(amount),
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
        label="Date da alimentação"
        id="dateFeeding"
        icon={false}
        value={dateFeeding}
        onChange={(e) => setDateFeeding(e.target.value)}
      />
      <GroupInput
        label="Tipo de comida"
        placeholder="digite o alimento fornecido"
        id="typeFood"
        icon={false}
        value={typeFood}
        onChange={(e) => setTypeFood(e.target.value)}
      />

      <GroupInput
        label="Quantidade de comida"
        id="amount"
        placeholder="Digite a quantidade de alimento fornecido"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <GroupTextarea
        label="observations"
        placeholder="Observações..."
        id="observations"
        value={observations}
        onChange={(e) => setObservations(e.target.value)}
      />
      <Button type="submit">Cadastrar alimentação</Button>
    </form>
  );
}
