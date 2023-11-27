'use client'

import { createContext, useContext } from "react";

export const SalesContext = createContext();

export const useSalesContext = () => {
  const context = useContext(SalesContext);
  if (!context) throw new Error("Debe ser usado dentro de un provider");
  return context;
};

export const SalesProvider = ({ children }) => {
  // Puedes añadir lógica específica del contexto de ventas si es necesario
  return <SalesContext.Provider value={{}}>{children}</SalesContext.Provider>;
};

