import React from "react";
import { Map } from "./Map.jsx";
import {formatDate} from "../utils/formatDate.js"
export function CardBeehive({ beehive, ...props }) {
  return (
    <div className="bg-yellow-600 flex p-1 justify-between text-gray-50">
      <div className="w-[200px] h-[200px]">
        <Map {...props} style={{ height: "200px", width: "100%" }} />
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <p className="mb-2 text-center"><span className="font-bold">Nome: {" "}</span>{beehive.name}</p>
        <p className="text-center"><span className="font-bold">Data: {" "}</span>{formatDate(beehive.startDate)}</p>
        <p className="text-center"><span className="font-bold">Status: {" "}</span>{beehive.status}</p>
        <p className="text-center"><span className="font-bold">Tipo de colmeia: {" "}</span>{beehive.typeBeehive}</p>
      </div>
    </div>
  );
}
