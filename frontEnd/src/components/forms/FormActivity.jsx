import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createActivity } from "../../api/activityApi";
import { Button } from "../Button";
import { GroupInput } from "../GroupInput";
import { GroupTextarea } from "../GroupTextarea";

export function FormActivity() {
  const { id } = useParams();
  const user_token = localStorage.getItem("user_token");

  const [dateActivity, setDateActivity] = useState("");
  const [typeActivity, setTypeActivity] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [observations, setObservations] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    
    if (!user_token || !id) {
      navigate("/login");
    }
    try {
      await createActivity(
        {
          beehiveId: Number(id),
          dateActivity,
          typeActivity,
          descriptions,
          observations,
        }
      );
      navigate(`/colmeia/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <GroupInput
        value={dateActivity}
        onChange={(e) => setDateActivity(e.target.value)}
        type="date"
        label="Date da Atividade"
        id="dateActivity"
        icon={false}
      />
      
      <GroupInput
        value={typeActivity}
        onChange={(e) => setTypeActivity(e.target.value)}
        label="Qual atividade"
        id="activity"
        icon={false}
      />

      <GroupTextarea
        value={descriptions}
        onChange={(e) => setDescriptions(e.target.value)}
        label="Descrição"
        id="description"
        placeholder="Digite a descrição da atividade..."
      />
      <GroupInput
        value={observations}
        onChange={(e) => setObservations(e.target.value)}
        label="Observação"
        id="observations"
        icon={false}
      />
      <Button type="submit">Cadastra Atividade</Button>
    </form>
  );
}
