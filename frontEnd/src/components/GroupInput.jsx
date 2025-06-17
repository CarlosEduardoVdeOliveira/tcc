import React from "react";

export function GroupInput({ label, id, icon = null, ...props }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className={`w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 
            focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-colors duration-200
            ${icon ? "pl-10" : ""}`}
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}
      </div>
    </div>
  );
}
