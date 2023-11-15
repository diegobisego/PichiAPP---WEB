'use client'

import Link from "next/link";
import { useEffect } from "react";

const links = [
  {
    label: "Clientes",
    route: "/clients",
  },
  {
    label: "Productos",
    route: "/products",
  },
  {
    label: "Ventas",
    route: "/sales",
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
    <div className="flex justify-center items-center h-screen">
      <nav>
        <ul className="space-y-4">
          {links.map(({ label, route }) => (
            <li key={route}>
              <Link href={route}>
                <button className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                  {label}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

