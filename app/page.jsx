'use client'

import Link from "next/link";
import { config } from "dotenv";
import { useState } from "react";
config();

const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      
      {/* Elemento izquierdo (nombre de la empresa desde .env.local) */}
      <div className="text-white text-2xl font-bold">{process.env.NEXT_PUBLIC_EMPRESA}</div>

      {/* Elemento derecho (botón de usuario con opciones) */}
      <div className="relative group">
        <button
          onClick={toggleOptions}
          className="flex items-center space-x-2 text-white focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-gray-200">
            {/* Aquí puedes agregar una letra o icono en lugar de una imagen */}
            <span className="text-blue-500 text-2xl font-semibold">{process.env.NEXT_PUBLIC_LETRA_USUARIO}</span>
          </div>
        </button>

        {/* Opciones de usuario (mostradas cuando se hace clic) */}
        {showOptions && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg py-2">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black">Logout</button>
            {/* Agrega más opciones según sea necesario */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
