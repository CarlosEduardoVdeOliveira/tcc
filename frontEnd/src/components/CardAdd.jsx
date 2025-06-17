import { CirclePlusIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export function CardAdd() {
  return (
    <Link 
      to={"/cadastrar_colmeia"} 
      className="bg-white border-2 border-dashed border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-50 flex items-center justify-center w-[200px] h-[100px] group"
      title="Adicionar colmeia"
    >
      <div className="text-center">
        <CirclePlusIcon 
          size={32} 
          className="text-gray-400 group-hover:text-yellow-500 transition-colors duration-200 mx-auto mb-2" 
        />
        <p className="text-sm font-medium text-gray-600 group-hover:text-yellow-600 transition-colors duration-200">
          Adicionar Colmeia
        </p>
      </div>
    </Link>
  );
}
