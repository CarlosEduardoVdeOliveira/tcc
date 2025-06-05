import React from "react";

export function GroupTextarea({ label, id, icon = null, ...props }) {
  return (
    <div className="text-center g-1 flex flex-col">
      <label htmlFor={id} className="block text-brown-500 font-semibold mb-4">
        {label}
      </label>
      <div className="relative flex items-center">
        <textarea
          resize="none"
          id={id}
          className={`text-brown-500 p-2 w-full placeholder:text-gray-500 focus:outline-gray-500 
            border-b-2 rounded border-gray-500 ${
              icon ? "pl-8" : ""
            }`}
          {...props}
        />
        <button
          {...props}
          className="absolute right-2 text-gray-500 cursor-pointer"
        >
          {icon && <span>{icon}</span>}
        </button>
      </div>
    </div>
  );
}
