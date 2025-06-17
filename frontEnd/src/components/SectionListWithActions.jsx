import { PencilIcon, TrashIcon } from "lucide-react";
import React from "react";
import { ButtonAdd } from "./ButtonAdd";

export function SectionListWithActions({ title, onAdd, children }) {
  return (
    <div className="mb-6 bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-bold text-gray-800">{title}</h4>
        <ButtonAdd onClick={() => onAdd(title)}>
          Adicionar
        </ButtonAdd>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function SectionListWithActionsItem({ value, title, onEdit, onDelete }) {
  return (
    <div className="w-full flex items-center justify-between gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
      <span className="text-gray-800 font-medium">{value}</span>
      <div className="flex gap-2">
        <button
          title={`Editar ${title}`}
          onClick={onEdit}
          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-full transition-colors duration-200 cursor-pointer"
        >
          <PencilIcon size={18} />
        </button>
        <button
          title={`Excluir ${title}`}
          onClick={onDelete}
          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors duration-200 cursor-pointer"
        >
          <TrashIcon size={18} />
        </button>
      </div>
    </div>
  );
}
