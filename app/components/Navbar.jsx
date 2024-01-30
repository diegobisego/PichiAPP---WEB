'use client'

// components/Navbar.jsx
import React, { useState } from "react";
import Link from "next/link";
import { config } from "dotenv";
config();

const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <nav className="bg-teal-800 text-white p-4 flex justify-between items-center">
      <div className="text-white text-2xl font-bold">
        <Link href={"/dashboard"}>{process.env.NEXT_PUBLIC_EMPRESA}</Link>
      </div>

      <div className="relative group">
        <button
          onClick={toggleOptions}
          className="flex items-center space-x-2 text-white focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-gray-200">
            <span className="text-blue-500 text-2xl font-semibold">
              {process.env.NEXT_PUBLIC_LETRA_USUARIO}
            </span>
          </div>
        </button>

        {showOptions && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg py-2">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black">
              Logout
            </button>
            {/* Agrega más opciones según sea necesario */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
