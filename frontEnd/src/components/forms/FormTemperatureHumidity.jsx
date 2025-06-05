import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTemperatureHumidity } from "../../api/temperatureHumidity";
import { Button } from "../Button";
import { GroupInput } from "../GroupInput";

export function FormTemperatureHumidity() {
  const { id } = useParams();
  const user_token = localStorage.getItem("user_token");

  const [dateMeasurement, setDateMeasurement] = useState("");
  const [internalTemperature, setInternalTemperature] = useState("");
  const [externalTemperature, setExternalTemperature] = useState("");
  const [humidityInternal, setHumidityInternal] = useState("");
  const [humidityExternal, setHumidityExternal] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user_token || !id) {
      navigate("/login");
    }
    try {
      await createTemperatureHumidity({
        beehiveId: Number(id),
        dateMeasurement,
        internalTemperature: Number(internalTemperature),
        externalTemperature: Number(externalTemperature),
        humidityInternal: Number(humidityInternal),
        humidityExternal: Number(humidityExternal),
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
        label="Date de medição"
        id="dateMeasurement"
        icon={false}
        value={dateMeasurement}
        onChange={(e) => setDateMeasurement(e.target.value)}
      />
      {console.log(dateMeasurement)}
      <GroupInput
        label="Temperatura interna"
        placeholder="Digite a temperatura interna"
        id="internalTemperature"
        icon={false}
        value={internalTemperature}
        onChange={(e) => setInternalTemperature(e.target.value)}
      />
      <GroupInput
        label="Umidade interna"
        placeholder="Digite a umidade interna"
        id="humidityInternal"
        value={humidityInternal}
        onChange={(e) => setHumidityInternal(e.target.value)}
      />

      <GroupInput
        label="Temperatura externa"
        placeholder="Digite a temperatura externa"
        id="externalTemperature"
        value={externalTemperature}
        onChange={(e) => setExternalTemperature(e.target.value)}
      />
      <GroupInput
        label="Umidade externa"
        placeholder="Digite a umidade externa"
        id="humidityExternal"
        value={humidityExternal}
        onChange={(e) => setHumidityExternal(e.target.value)}
      />
      <Button type="submit">Cadastra temperaturas</Button>
    </form>
  );
}
