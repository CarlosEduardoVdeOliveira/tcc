import { zodResolver } from "@hookform/resolvers/zod";
import "leaflet/dist/leaflet.css";
import { EyeClosedIcon, EyeIcon, ArrowLeftIcon, HomeIcon, SaveIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import { updateUser } from "../api/userApi";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { GroupInput } from "../components/GroupInput";
import { Map } from "../components/Map";
import { Header } from "../components/Header";
import { useEffect } from "react";
import { getUser } from "../api/userApi";

const isValidCpfCnpj = (value) => {
  const onlyNumbers = value.replace(/\D/g, "");
  return onlyNumbers.length === 11 || onlyNumbers.length === 14;
};

const schema = z.object({
  name: z.string().min(3, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  startDate: z.string().date("Selecione a data de início."),
  status: z.string().min(1, "Selecione um status"),
  latitude: z.number().min(2, "Localização inválida"),
  longitude: z.number().min(2, "Localização inválida"),
  cpfCnpj: z
    .string()
    .min(1, "Campo obrigatório")
    .refine(isValidCpfCnpj, "CPF ou CNPJ inválido"),
});

export function UpdateProfile() {
  /* States */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [password, setPassword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [viewPassword, setViewPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const userLocalStorage = localStorage.getItem("user");
  const userJson = JSON.parse(userLocalStorage);
  const id = Number(userJson?.id);

  const user_token = localStorage.getItem("user_token");
  const navigate = useNavigate();

  // Validação do ID
  useEffect(() => {
    if (!id || !user_token) {
      console.log("ID ou token não encontrado:", { id, user_token });
      navigate("/login");
      return;
    }
  }, [id, user_token, navigate]);

  useEffect(() => {
    async function fetchUser() {
      if (!id || !user_token) {
        navigate("/login");
        return;
      }

      try {
        const response = await getUser(id);
        const user = response.data;

        setName(user.name);
        setEmail(user.email);
        setCpfCnpj(user.cpfCnpj);
        setStartDate(user.startDate?.substring(0, 10)); // garantir formato yyyy-mm-dd
        setStatus(user.status);
        setLatitude(user.latitude);
        setLongitude(user.longitude);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        toast.error("Erro ao carregar dados do usuário");
      }
    }

    fetchUser();
  }, [id, user_token, navigate]);

  const handleViewPassword = (e) => {
    e.preventDefault();
    setViewPassword((prev) => !prev);
  };

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const formSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    console.log("=== DEBUG UPDATE PROFILE ===");
    console.log("ID do usuário:", id);
    console.log("Tipo do ID:", typeof id);
    console.log("Dados a serem enviados:", {
      name,
      email,
      cpfCnpj,
      startDate,
      password,
      latitude,
      longitude,
      status,
    });

    try {
      await updateUser({
        name,
        email,
        cpfCnpj,
        startDate,
        password,
        latitude,
        longitude,
        status,
      }, id);

      toast.success("Perfil atualizado com sucesso!");
      
      // Aguarda um pouco para mostrar o toast antes de redirecionar
      setTimeout(() => {
        navigate("/perfil");
      }, 1500);
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      toast.error("Erro ao atualizar perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header pathName="/" />
      <Container>
        <ToastContainer position="top-right" autoClose={5000} />
        
        {/* Header da página */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/colmeias"
                className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-colors"
                title="Voltar para Colmeias"
              >
                <HomeIcon size={20} />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Editar Perfil</h1>
                <p className="text-gray-600">Atualize suas informações pessoais</p>
              </div>
            </div>
            <Link
              to="/perfil"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <ArrowLeftIcon size={16} /> Voltar ao Perfil
            </Link>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={formSubmit} className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-center text-lg font-semibold text-gray-800 mb-6">
              Atualize suas informações
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <GroupInput
                label="Nome"
                id="name"
                placeholder="Digite seu nome."
                icon={false}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

              <GroupInput
                label="E-mail"
                id="email"
                placeholder="Digite seu email."
                icon={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <GroupInput
                label="CPF/CNPJ"
                id="cpfCnpj"
                placeholder="Digite seu CPF ou CNPJ"
                icon={false}
                value={cpfCnpj}
                onChange={(e) => setCpfCnpj(e.target.value)}
              />

              <GroupInput
                label="Senha"
                type={viewPassword ? "password" : "text"}
                id="password"
                placeholder="Digite uma senha."
                icon={
                  viewPassword ? (
                    <EyeClosedIcon onClick={handleViewPassword} />
                  ) : (
                    <EyeIcon onClick={handleViewPassword} />
                  )
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col">
                <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">Selecione o status</option>
                  <option value="Ativo" className="text-green-600">Ativo</option>
                  <option value="Inativo" className="text-red-600">Inativo</option>
                </select>
                {status && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${status === 'Ativo' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`text-sm font-medium ${status === 'Ativo' ? 'text-green-600' : 'text-red-600'}`}>
                      Status atual: {status}
                    </span>
                  </div>
                )}
                {errors.status && (
                  <p className="text-red-500 text-sm">{errors.status.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="date" className="text-sm font-medium text-gray-700 mb-1">
                  Data de Início
                </label>
                <input
                  id="date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm">{errors.startDate.message}</p>
                )}
              </div>
            </div>

            {/* Mapa */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Localização
              </label>
              <div className="h-64 rounded-lg overflow-hidden border border-gray-300">
                <Map
                  latitude={latitude}
                  longitude={longitude}
                  onSelectLocation={(coords) => {
                    setLatitude(coords[0]);
                    setLongitude(coords[1]);
                  }}
                />
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p><strong>Latitude:</strong> {latitude || "Não definida"}</p>
                <p><strong>Longitude:</strong> {longitude || "Não definida"}</p>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-4 justify-center">
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md transition-colors flex items-center justify-center gap-2"
                onClick={(e) => {
                  formSubmit(e);
                }}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Atualizando...
                  </>
                ) : (
                  <>
                    <SaveIcon size={16} />
                    Atualizar Perfil
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
        <Footer />
      </Container>
    </>
  );
}
