import React from "react";
import Map from "../assets/map.png";
export function CardHive() {
  return (
    <div className="bg-yellow-600 flex p-1 justify-between text-gray-50">
      <div className="">
        <img className="" src={Map} alt="" />
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <h3 className="mb-2 font-bold text-center">Descrição</h3>
        <p className="text-center">Codigo: 152-336</p>
        <p className="text-center">se precisar descrever algo </p>
      </div>
    </div>
  );
}
