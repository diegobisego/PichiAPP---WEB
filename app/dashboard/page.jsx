"use client";

import { useState, useEffect } from "react";
import Link from "next/link";


const links = [
  {
    label: "Clientes",
    route: "/dashboard/clients",
  },
  {
    label: "Productos",
    route: "/dashboard/products",
  },
  {
    label: "Ventas",
    route: "/dashboard/sales",
  },
];

export default function Navigation() {
  useEffect(() => {
    // Aplicar el estilo overflow: hidden al body solo en pantallas pequeñas
    if (window.innerWidth <= 640) {
      document.body.style.overflowY = "hidden"; // Establecer overflow en el eje vertical
    }

    return () => {
      // Restablecer el estilo cuando se desmonte el componente
      document.body.style.overflowY = "auto"; // Restablecer overflow en el eje vertical
    };
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <nav>
          <ul className="space-y-4">
            {links.map(({ label, route }) => (
              <li key={route}>
                <Link href={route}>
                  <button className="w-32 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    {label}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
