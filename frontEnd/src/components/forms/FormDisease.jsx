import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDisease } from "../../api/diseaseApi";
import { Button } from "../Button";
import { GroupInput } from "../GroupInput";
import { GroupTextarea } from "../GroupTextarea";

export function FormDisease() {
  const { id } = useParams();
  
  const user_token = localStorage.getItem("user_token");

  const [dateDiagnosis, setDateDiagnosis] = useState("");
  const [diseasePrague, setDiseasePrague] = useState("");
  const [treatment, setTreatment] = useState("");
  const [observations, setObservations] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!user_token || !id) {
      navigate("/login");
    }
    try {
      await createDisease({
        beehiveId: Number(id),
        dateDiagnosis,
        diseasePrague,
        treatment,
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
        label="Date do diagnostico"
        id="dateDiagnosis"
        icon={false}
        value={dateDiagnosis}
        onChange={(e) => setDateDiagnosis(e.target.value)}
      />
      <GroupInput
        label="Qual doença"
        placeholder="digite a doença ou praga"
        id="diseasePrague"
        icon={false}
        value={diseasePrague}
        onChange={(e) => setDiseasePrague(e.target.value)}
      />

      <GroupTextarea
        label="Tratamento"
        id="treatment"
        placeholder="Digite a descrição do tratamento..."
        value={treatment}
        onChange={(e) => setTreatment(e.target.value)}
      />
      <GroupTextarea
        label="observations"
        placeholder="Observações..."
        id="observations"
        value={observations}
        onChange={(e) => setObservations(e.target.value)}
      />
      <Button type="submit">Cadastra Doença/praga</Button>
    </form>
  );
}
