import React from "react";

import { ArrowLeftIcon, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Header({ pathName }) {
  const userToken = localStorage.getItem("user_token");
  const location = useLocation();
  const url = location.pathname;

  return (
    <header className="w-100% bg-yellow-500 p-4 flex justify-between items-center">
      {userToken && url !== "/" ? (
        <Link to={pathName} title="Início">
          <ArrowLeftIcon />{" "}
        </Link>
      ) : (
        <div></div>
      )}
      {userToken && url !== "/perfil" ? (
        <Link
          to="/perfil"
          title="Meu perfil"
          className="bg-gray-500 rounded-full flex items-center justify-center border border-yellow-600 text-yellow-600 w-[35px] h-[35px]"
        >
          <User />
        </Link>
      ) : (
        <div></div>
      )}
    </header>
  );
}
