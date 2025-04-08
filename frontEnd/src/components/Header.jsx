import React from "react";
import imgHeader from "../assets/imgHeader.png";
export function Header() {
  return (
    <header className="w-100%">
      <img className="w-100%" src={imgHeader} alt="mel escorrendo." />
    </header>
  );
}
