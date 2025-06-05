import { PencilIcon, TrashIcon } from "lucide-react";
import React from "react";
import { ButtonAdd } from "./ButtonAdd";

export function SectionListWithActions({ title, onAdd, children }) {
  return (
    <div className="mb-4 border-b border-gray-500 p-4">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-semibold text-lg">{title}</h4>
        <ButtonAdd onClick={() => onAdd(title)} />
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function SectionListWithActionsItem({ value, title, onEdit, onDelete }) {
  return (
    <div className="w-full flex items-center justify-between gap-2">
      <span>{value}</span>
      <div className="flex gap-2">
        <button
          title={`Editar ${title}`}
          onClick={onEdit}
          className="cursor-pointer text-green-500 hover:opacity-70 flex items-center gap-2"
        >
          <PencilIcon />
        </button>
        <button
          title={`Excluir ${title}`}
          onClick={onDelete}
          className="cursor-pointer text-red-500 hover:opacity-70 flex items-center gap-2"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}
