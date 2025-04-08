import { CirclePlusIcon } from "lucide-react";
import React from "react";

export function CardAdd() {
  return (
    <div className="bg-gray-500 flex p-1 justify-between text-gray-50">
      <button className="bg-gray-500">
        <CirclePlusIcon />
      </button>
    </div>
  );
}
