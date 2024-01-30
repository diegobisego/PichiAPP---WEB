// HomePage.jsx
import React, { useEffect } from "react";
import RootLayout from "./layout";

const HomePage = () => {
  useEffect(() => {
    // Cualquier lógica específica para la página principal
  }, []);

  return (
    <RootLayout>
      <div>
        <h1>Bienvenido a mi aplicación</h1>
        {/* Otro contenido específico de la página principal */}
      </div>
    </RootLayout>
  );
};

export default HomePage;
