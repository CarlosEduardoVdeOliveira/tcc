import React from "react";

export function Button({ children, className="", ...props }) {
  return (
    <button
      className={`bg-yellow-500 w-full py-2 px-5 rounded-md text-brown-500 cursor-pointer font-semibold hover:bg-yellow-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
