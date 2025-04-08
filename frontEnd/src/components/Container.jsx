import React from "react";

export function Container({ children, ...props }) {
  return (
    <div {...props} className="w-full h-dvh flex flex-col justify-between">
      {children}
    </div>
  );
}
