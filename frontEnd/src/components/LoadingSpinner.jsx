import React from "react";

export function LoadingSpinner({ 
  message = "Carregando...", 
  size = "medium",
  color = "yellow" 
}) {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8", 
    large: "h-12 w-12"
  };

  const colorClasses = {
    yellow: "border-yellow-600",
    white: "border-white",
    gray: "border-gray-600"
  };

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <div 
          className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]} mx-auto mb-2`}
        ></div>
        {message && (
          <p className="text-gray-600 text-sm">{message}</p>
        )}
      </div>
    </div>
  );
} 