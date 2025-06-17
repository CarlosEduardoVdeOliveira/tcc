import { zodResolver } from "@hookform/resolvers/zod";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { z } from "zod";
import { createBeehive } from "../api/beehiveApi";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { GroupInput } from "../components/GroupInput";
import { GroupTextarea } from "../components/GroupTextarea";
import { Header } from "../components/Header";
import { Map } from "../components/Map";

const schema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  typeBeehive: z
    .string()
    .min(3, "Tipo de colmeia deve ter no mínimo três caracteres."),
  observations: z.string().min(0),
  startDate: z.string().date("Selecione a data de início."),
  status: z.string().min(1, "Selecione um status"),
  latitude: z.number().min(2, "Localização inválida"),
  longitude: z.number().min(2, "Localização inválida"),
});

export function CreateBeehive() {
  const getUserStorage = localStorage.getItem("user");
  const getUserId = JSON.parse(getUserStorage).id;
  const producerId = Number(getUserId);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState("");
  const [typeBeehive, setTypeBeehive] = useState("");
  const [observations, setObservations] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const formSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!getUserId) {
        return <Navigate to="/login" />;
      }
      await createBeehive(
        {
          producerId,
          name,
          startDate,
          status,
          typeBeehive,
          observations,
          latitude,
          longitude,
        }
      );

      navigate("/colmeias");
    } catch (err) {
      console.error("Erro ao criar conta:", err);
      errors;
    }
  };

  return (
    <>
      <Header pathName="/" />
      <Container>
        <ToastContainer position="top-right" autoClose={5000} />
        <div className="p-8 w-full" />
        <form
          onSubmit={formSubmit}
          className="flex flex-col gap-4 m-auto sm:w-[50%] w-full"
        >
          <h3 className="text-center">
            <strong>Ainda não tem cadastro?</strong>
            <br />
            Comece hoje a gerenciar suas colmeias, precisamos de alguns dados:
          </h3>
          <GroupInput
            label="Nome"
            id="name"
            placeholder="Digite seu nome."
            icon={false}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <GroupInput
            label="Tipo de Colmeia"
            id="typeBeehive"
            placeholder="Digite o tipo da colmeia."
            icon={false}
            value={typeBeehive}
            onChange={(e) => setTypeBeehive(e.target.value)}
          />
          {errors.typeBeehive && (
            <p className="text-red-500">{errors.typeBeehive.message}</p>
          )}
          <GroupTextarea
            label="Observações"
            id="observations"
            placeholder="Observações..."
            icon={false}
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
          />
          <div className="flex justify-between items-center mx-4 my-8 gap-4">
            <div className="w-full flex flex-col">
              <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-2">Status: </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-colors duration-200"
              >
                <option value="">Selecione o status</option>
                <option id="active" value="ativa" className="text-green-600">Ativa</option>
                <option id="under_maintenance" value="em manutenção" className="text-yellow-600">Em Manutenção</option>
                <option id="abandoned" value="abandonada" className="text-gray-600">Abandonada</option>
              </select>
              {errors.status && (
                <p className="text-xs text-red-500">{errors.status.message}</p>
              )}
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="date" className="text-sm font-medium text-gray-700 mb-2">Data de Início:</label>
              <input
                id="date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-colors duration-200"
              />
              {errors.startDate && (
                <p className="text-red-500">{errors.startDate.message}</p>
              )}
            </div>
          </div>
          <div className="map">
            <Map
              onSelectLocation={(coords) => {
                setLatitude(coords[0]);
                setLongitude(coords[1]);
              }}
            />
          </div>
          <Button
            className="mt-10 mb-4"
            onClick={(e) => {
              formSubmit(e);
            }}
            type="submit"
          >
            Adicionar
          </Button>
        </form>
        <Footer />
      </Container>
    </>
  );
}
