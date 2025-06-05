import { zodResolver } from "@hookform/resolvers/zod";
import "leaflet/dist/leaflet.css";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { z } from "zod";
import { updateUser } from "../api/userApi";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { GroupInput } from "../components/GroupInput";
import { Map } from "../components/Map";
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

  const userLocalStorage = localStorage.getItem("user");
  const userJson = JSON.parse(userLocalStorage);
  const id = Number(userJson?.id);

  
  const user_token = localStorage.getItem("user_token");
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
      }
    }
  
    fetchUser();
  }, [id, user_token]);
  
  const navigate = useNavigate();
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
    try {
      await updateUser({
        /* id: Number(id), */
        name,
        email,
        cpfCnpj,
        startDate,
        password,
        latitude,
        longitude,
        status,
      });
      
      navigate("/");
    } catch (err) {
      console.error("Erro ao criar conta:", err);
      errors;
    }
  };

  return (
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
          label="E-mail"
          id="email"
          placeholder="Digite seu email."
          icon={false}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <div className="flex justify-between items-center mx-4 my-8 gap-4">
          <div className="w-full flex flex-col">
            <label htmlFor="status">Status: </label>
            <select
              id="status"
              {...register("status")}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Seleciona o status</option>
              <option id="ativo" value="Ativo">
                Ativo
              </option>
              <option id="inativo" value="Inativo">
                Inativo
              </option>
            </select>
            {errors.status && (
              <p className="text-xs text-red-500">{errors.status.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="date">Data de inicio:</label>
            <input
              id="date"
              type="date"
              {...register("startDate")}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {errors.startDate && (
              <p className="text-red-500">{errors.startDate.message}</p>
            )}
          </div>
        </div>
        <div className="map">
        <Map
  initialPosition={[latitude, longitude]} // você precisa suportar essa prop no componente
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
  );
}
