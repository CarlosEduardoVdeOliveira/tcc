import React from "react";

import { ArrowLeftIcon, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Header({ pathName }) {
  const userToken = localStorage.getItem("user_token");
  const location = useLocation();
  const url = location.pathname;

  return (
    <header className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 flex justify-between items-center shadow-lg">
      {userToken && url !== "/" ? (
        <Link 
          to={pathName} 
          title="Voltar"
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors duration-200"
        >
          <ArrowLeftIcon size={24} />
        </Link>
      ) : (
        <div></div>
      )}
      
      {userToken && url !== "/perfil" ? (
        <Link
          to="/perfil"
          title="Meu perfil"
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors duration-200"
        >
          <User size={24} />
        </Link>
      ) : (
        <div></div>
      )}
    </header>
  );
}
