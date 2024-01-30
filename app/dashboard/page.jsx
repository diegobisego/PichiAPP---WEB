"use client";

import { useEffect } from "react";
import LinksNavDashboard from "../components/LinksNavDashboard";
import RootLayout from "../layout";

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
    <RootLayout includeNavbar={true}>
      <LinksNavDashboard />
      </RootLayout>
    </>
  );
}
