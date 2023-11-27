'use client'

// HeaderContext.js

import { createContext, useContext, useState } from "react";

export const HeaderContext = createContext();

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) throw new Error("Debe ser usado dentro de un provider");
  return context;
};

export const HeaderProvider = ({ children }) => {
  const [headerInfo, setHeaderInfo] = useState({
    selectedClient: "",
    selectedClientTaxStatus:"",
    selectedDate: "",
    selectedPayMethod: "",
    selectBillNumber: "",
  });

  

  return (
    <HeaderContext.Provider value={{ headerInfo, setHeaderInfo }}>
      {children}
    </HeaderContext.Provider>
  );
};


