import { zodResolver } from "@hookform/resolvers/zod";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { z } from "zod";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { GroupInput } from "../components/GroupInput";
import { GroupTextarea } from "../components/GroupTextarea";
import { Header } from "../components/Header";
import { Map } from "../components/Map";
import { getBeehive, updateBeehive } from "../api/beehiveApi";

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

export function UpdateBeehive() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState("");
  const [producerId, setProducerId] = useState("");
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
  const { id } = useParams();
  const user_token = localStorage.getItem("user_token");
  const [beehive, setBeehive] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBeehive() {
      try {
        const response = await getBeehive(id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user_token")}`,
            },
          }
        );

        const data = response.data;
        setBeehive(data);
        setProducerId(data.producerId);
        setName(data.name);
        setStartDate(data.startDate);
        setStatus(data.status);
        setTypeBeehive(data.typeBeehive);
        setObservations(data.observations);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
      } catch (error) {
        console.error("Erro ao carregar colmeia:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBeehive();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10">Carregando colmeia...</p>;

  if (!beehive)
    return <p className="text-center mt-10">Colmeia não encontrada.</p>;

  const formSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!user_token || !id) {
        return <Navigate to="/login" />;
      }
      await updateBeehive(id,
        {
          producerId,
          name,
          startDate,
          status,
          typeBeehive,
          observations,
          latitude,
          longitude,
        },
        {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
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
      <Header pathName={`/colmeia/${id} `} />
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
                value={startDate ? startDate.substring(0, 10) : ""}
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
              latitude={latitude}
              longitude={longitude}
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
            Atualizar
          </Button>
        </form>
        <Footer />
      </Container>
    </>
  );
}
