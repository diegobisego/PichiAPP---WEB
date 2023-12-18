"use client";


import { getAllClients } from "@/app/components/Api";
import { useState, useEffect } from "react";

function CurrentAccounts() {
  //useStates
  const [allClients, setAllClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch de datos
    const fetchData = async () => {
      try {
        const [clientsData] = await Promise.all([getAllClients()]);
        setAllClients(clientsData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const allDataLoaded = !loading;

  return (
    <>
      {allDataLoaded ? (
        <div>
          <h1>Tu Componente Principal</h1>
        </div>
      ) : (
        <div className="loader">Cargando</div>
      )}
    </>
  );
}
export default CurrentAccounts;
