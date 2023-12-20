"use client";

import { getAllClients } from "@/app/components/Api";
import { useState, useEffect } from "react";
import { getAccountResume, getAccountStaiment } from "@/app/components/Api";
import { SalesDetails } from "@/app/components/SalesDetails";

function CurrentAccounts() {
  //useStates
  const [allAccountsResume, setAllAccountsResume] = useState([]);
  const [allAccountsStaiment, setAllAccountsStaiment] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    // Fetch de datos
    const fetchData = async () => {
      try {
        const [accountResumeData, allClientsData, accountsStaiment] = await Promise.all([getAccountResume(), getAllClients(), getAccountStaiment()]);
        
        console.log('desde la api: ', accountsStaiment)
        setAllAccountsResume(accountResumeData);
        setAllClients(allClientsData);
        setAllAccountsStaiment(accountsStaiment)


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
          <SalesDetails saleDetail={allAccountsResume} accountStaiment={allAccountsStaiment}/>
        </div>
      ) : (
        <div className="loader">Cargando</div>
      )}
    </>
  );
}
export default CurrentAccounts;
