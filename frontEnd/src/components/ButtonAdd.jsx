import { CirclePlusIcon } from "lucide-react";
import React from "react";

export function ButtonAdd({ ...props }) {
  return (
    <button {...props} className="text-blue-500 cursor-pointer">
      <CirclePlusIcon />
    </button>
  );
}
