import { CirclePlusIcon } from "lucide-react";

export function ButtonAdd({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200 cursor-pointer shadow-md hover:shadow-lg ${className}`}
    >
      <CirclePlusIcon size={20} />
      {children}
    </button>
  );
}
