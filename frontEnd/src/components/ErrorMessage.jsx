import React from "react";
import { X } from "lucide-react";

export function ErrorMessage({ 
  message, 
  type = "warning",
  onClose,
  className = "" 
}) {
  const typeClasses = {
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800 shadow-lg",
    error: "bg-red-50 border-red-200 text-red-800 shadow-lg",
    info: "bg-blue-50 border-blue-200 text-blue-800 shadow-lg",
    success: "bg-green-50 border-green-200 text-green-800 shadow-lg"
  };

  return (
    <div className={`border-2 px-4 py-3 rounded-lg text-sm font-medium ${typeClasses[type]} ${className}`}>
      <div className="flex items-center justify-between">
        <span className="flex-1">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
            title="Fechar"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
} 