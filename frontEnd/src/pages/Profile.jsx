import React, { useEffect, useState } from "react";

import { LogOutIcon, PenIcon } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { getUser } from "../api/userApi.js";
import { Container } from "../components/Container.jsx";
import { Footer } from "../components/Footer.jsx";
import { Header } from "../components/Header.jsx";

export function Profile() {
  const userLocalStorage = localStorage.getItem("user");
  const userJson = JSON.parse(userLocalStorage);
  const id = userJson.id;
  const user_token = localStorage.getItem("user_token");
  const navigate = useNavigate();

  const [user, setUser] = useState();

  useEffect(() => {
    if (!id || !user_token) {
      return <Navigate to="/login" />;
    }
    async function userId() {
      const response = await getUser(id);
      setUser(response.data);
    }
    userId();
  }, [id, user_token]);
  const logOut = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user");
    navigate("/login");

    return;
  };
  const updateProfile = () => {
    if (!id || !user_token) {
      return <Navigate to="/login" />;
    }
    navigate(`/atualizar_perfil/${id}`);
  };
  return (
    <>
      <Header pathName="/" />
      <Container>
        <div className={"m-auto text-brown-500"}>
          <p>
            <strong>Nome:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>CPF/CNPJ:</strong> {user?.cpfCnpj}
          </p>
          <p>
            <strong>Status:</strong> {user?.status}
          </p>
          <p>
            <strong>Colmeias:</strong> {user?.beehives.length}
          </p>
          <button
            onClick={() => logOut()}
            className="float-right gap-2 mt-8 cursor-pointer flex items-center justify-center text-gray-500 hover:text-red-500"
          >
            <LogOutIcon /> Sair
          </button>
          <button
            onClick={() => updateProfile()}
            className="gap-2 mt-8 cursor-pointer flex items-center justify-center text-gray-500 hover:text-green-500"
          >
            <PenIcon /> Editar perfil
          </button>
        </div>
        <Footer />
      </Container>
    </>
  );
}
