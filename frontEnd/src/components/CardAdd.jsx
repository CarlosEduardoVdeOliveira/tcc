import { CirclePlusIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export function CardAdd() {
  return (
    <div
      title="Adicionar colmeia."
      className="bg-gray-500 flex p-1 w-[200px] h-[100px] items-center justify-center text-gray-50"
    >
      <Link to={"/cadastrar_colmeia"} className="bg-gray-500 cursor-pointer">
        <CirclePlusIcon />
      </Link>
    </div>
  );
}
