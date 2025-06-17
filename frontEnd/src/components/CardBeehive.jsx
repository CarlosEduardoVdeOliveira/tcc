import React from "react";
import { Map } from "./Map.jsx";
import { formatDate } from "../utils/formatDate.js";

export function CardBeehive({ beehive, ...props }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'ativo':
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inativo':
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="w-full h-[200px]">
        <Map {...props} style={{ height: "200px", width: "100%" }} />
      </div>
      <div className="p-6">
        <div className="space-y-3">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-1">{beehive.name}</h3>
            <p className="text-sm text-gray-600">Colmeia</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Data de Início:</span>
              <span className="text-sm text-gray-800">{formatDate(beehive.startDate)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Tipo:</span>
              <span className="text-sm text-gray-800">{beehive.typeBeehive}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(beehive.status)}`}>
                {beehive.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
