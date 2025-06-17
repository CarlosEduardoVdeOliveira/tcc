import React, { useEffect, useState } from "react";

import { LogOutIcon, PenIcon, MapPinIcon, CalendarIcon, UserIcon, MailIcon, HashIcon, HomeIcon } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { getUser } from "../api/userApi.js";
import { Container } from "../components/Container.jsx";
import { Footer } from "../components/Footer.jsx";
import { Header } from "../components/Header.jsx";
import { Map } from "../components/Map.jsx";
import { formatDate } from "../utils/formatDate.js";

export function Profile() {
  const userLocalStorage = localStorage.getItem("user");
  const userJson = JSON.parse(userLocalStorage);
  const id = userJson.id;
  const user_token = localStorage.getItem("user_token");
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !user_token) {
      return <Navigate to="/login" />;
    }
    async function userId() {
      try {
        const response = await getUser(id);
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
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

  if (loading) {
    return (
      <>
        <Header pathName="/" />
        <Container>
          <div className="flex justify-center items-center min-h-[60vh]">
            <p className="text-center text-gray-500">Carregando perfil...</p>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header pathName="/" />
      <Container>
        <div className="max-w-4xl mx-auto p-6">
          {/* Cabeçalho do Perfil */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                  <UserIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{user?.name}</h1>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateProfile()}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <PenIcon size={16} /> Editar Perfil
                </button>
                <button
                  onClick={() => logOut()}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <LogOutIcon size={16} /> Sair
                </button>
              </div>
            </div>
          </div>

          {/* Informações do Usuário */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Card de Informações Pessoais */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-yellow-500" />
                Informações Pessoais
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MailIcon className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <HashIcon className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">CPF/CNPJ</p>
                    <p className="font-medium">{user?.cpfCnpj}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Data de Início</p>
                    <p className="font-medium">{user?.startDate ? formatDate(user.startDate) : "Não informado"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${user?.status === 'Ativo' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={`font-medium ${user?.status === 'Ativo' ? 'text-green-600' : 'text-red-600'}`}>{user?.status}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de Estatísticas */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <HomeIcon className="w-5 h-5 text-yellow-500" />
                Estatísticas das Colmeias
              </h2>
              <div className="space-y-4">
                {/* Total de Colmeias */}
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total de Colmeias</p>
                      <p className="text-2xl font-bold text-yellow-600">{user?.beehives?.length || 0}</p>
                    </div>
                    <HomeIcon className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>

                {/* Status das Colmeias */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Status das Colmeias:</p>
                  
                  {/* Colmeias Ativas */}
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        <div>
                          <p className="text-sm text-gray-600">Ativas</p>
                          <p className="text-lg font-bold text-green-600">
                            {user?.beehives?.filter(beehive => 
                              beehive.status?.toLowerCase() === 'ativo' || 
                              beehive.status?.toLowerCase() === 'ativa'
                            ).length || 0}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {user?.beehives?.length > 0 
                            ? `${Math.round((user?.beehives?.filter(beehive => 
                                beehive.status?.toLowerCase() === 'ativo' || 
                                beehive.status?.toLowerCase() === 'ativa'
                              ).length / user?.beehives?.length) * 100)}%`
                            : '0%'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Colmeias em Manutenção */}
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                        <div>
                          <p className="text-sm text-gray-600">Em Manutenção</p>
                          <p className="text-lg font-bold text-yellow-600">
                            {user?.beehives?.filter(beehive => 
                              beehive.status?.toLowerCase() === 'manutenção' || 
                              beehive.status?.toLowerCase() === 'em manutenção'
                            ).length || 0}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {user?.beehives?.length > 0 
                            ? `${Math.round((user?.beehives?.filter(beehive => 
                                beehive.status?.toLowerCase() === 'manutenção' || 
                                beehive.status?.toLowerCase() === 'em manutenção'
                              ).length / user?.beehives?.length) * 100)}%`
                            : '0%'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Colmeias Abandonadas */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                        <div>
                          <p className="text-sm text-gray-600">Abandonadas</p>
                          <p className="text-lg font-bold text-gray-600">
                            {user?.beehives?.filter(beehive => 
                              beehive.status?.toLowerCase() === 'abandonada' || 
                              beehive.status?.toLowerCase() === 'abandonado'
                            ).length || 0}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {user?.beehives?.length > 0 
                            ? `${Math.round((user?.beehives?.filter(beehive => 
                                beehive.status?.toLowerCase() === 'abandonada' || 
                                beehive.status?.toLowerCase() === 'abandonado'
                              ).length / user?.beehives?.length) * 100)}%`
                            : '0%'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mapa da Localização */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-yellow-500" />
              Localização
            </h2>
            <div className="h-80 rounded-lg overflow-hidden">
              <Map
                latitude={user?.latitude}
                longitude={user?.longitude}
                onSelectLocation={() => {}} // Apenas visualização
              />
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Latitude:</strong> {user?.latitude || "Não definida"}</p>
              <p><strong>Longitude:</strong> {user?.longitude || "Não definida"}</p>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/colmeias")}
              className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <HomeIcon size={16} /> Ver Minhas Colmeias
            </button>
            <button
              onClick={() => updateProfile()}
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <PenIcon size={16} /> Editar Perfil
            </button>
          </div>
        </div>
        <Footer />
      </Container>
    </>
  );
}
