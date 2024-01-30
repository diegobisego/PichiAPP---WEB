"use client";

import { useState, useEffect } from "react";
import {
  getPayMethods,
  getAllClients,
  getBillsClient,
  getPayment,
} from "@/app/components/Api";
import moment from "moment/moment";
import axios from "axios";


export default function AddPayments({ payment }) {
  // seccion primera carga
  const [clientLoaded, setClientLoaded] = useState(true); // carga de clientes
  const [pageLoaded, setPageLoaded] = useState(false); // Carga de los pagos
  const [paymet, setPayment] = useState([]);
  const [clients, setClients] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedPayMethod, setSelectedPayMethod] = useState(""); // metodo de pago
  const [selectedAddInfo, setSelectedAddInfo] = useState(""); // info adicional
  const [selectedClient, setSelectedClient] = useState(""); // cliente seleccionado
  const [selectedBill, setSelectedBill] = useState(""); // numero de factura
  const [selectedPayment, setSelectedPayment] = useState(); // pago realizado

  const [selectedDate, setSelectedDate] = useState(getTodayFormattedDate());
  const [totalAmount, setTotalAmount] = useState(0);

  // use para cargar las llamadas a las apis
  useEffect(() => {
    // Fetch de datos
    const fetchData = async () => {
      try {
        const [paymentsData, clientData] = await Promise.all([
          getPayMethods(),
          getAllClients(),
        ]);
        setPayment(paymentsData);
        setClients(clientData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos de pagos:", error);
        setLoading(false);
      }
    };

    fetchData();
    setPageLoaded(true);
  }, []);

  // use para cargar las facturas del cliente una vez que se selecciona
  useEffect(() => {
    // Fetch de datos del cliente
    if (pageLoaded && selectedClient !== null) {
      const fetchClientData = async () => {
        try {
          const clientBills = await getBillsClient(selectedClient);
          setBills(clientBills);
          setClientLoaded(false);
        } catch (error) {
          console.error("Error al obtener las facturas del cliente:", error);
        }
      };
      // Verifica si hay un cliente seleccionado antes de llamar al nuevo efecto
      if (selectedClient) {
        fetchClientData();
      }
    }
  }, [selectedClient]);

// use para traer el total de la factura una vez seleccionada la factura
useEffect(() => {
  if (pageLoaded && selectedBill !== null) {
    // Fetch de datos del cliente
    const fetchAmountBillData = async () => {
      try {
        // traigo todas las facturas del cliente
        const clientBills = await getBillsClient(selectedClient);
        // filtro la factura seleccionada para ver su monto
        const filterBill = clientBills.find(
          (bill) => bill.nroComprobante === selectedBill
        );

        if (filterBill) {
          const prueba = Number(filterBill.total)
          console.log(typeof(prueba))

          // busco la factura dentro de los registros de pagos
          const findPayments = await getPayment(selectedBill); // busco las facturas en pagos

          // acumulo los pagos realizados para esa factura
          const acumAmount = findPayments.reduce(
            (sum, current) => sum + current.totalPago,
            0
          );

          // resto los pagos realizados al total de la factura
          const totalAmount = Number(filterBill.total) - acumAmount;

          setTotalAmount(Number(filterBill.total))
          setSelectedPayment(totalAmount)
        } else {
          console.error("La factura seleccionada no fue encontrada.");
        }
      } catch (error) {
        console.error("Error al obtener las facturas del cliente:", error);
      }
    };

    fetchAmountBillData();
  }
}, [selectedBill]);


  function getTodayFormattedDate() {
    return moment().format("YYYY-MM-DD");
  }

  /* Handlres */
  const handleChangePayMethod = (event) => {
    setSelectedPayMethod(Number(event.target.value));
  };

  const handleChangeBill = (event) => {
    setSelectedBill(event.target.value);
  };

  const handleChangeClient = async (event) => {
    setSelectedClient(Number(event.target.value));
  };

  const handleChangePayment = (event) => {
    setSelectedPayment(Number(event.target.value));
  };
  const handleChangeAddInfo = (event) => {
    setSelectedAddInfo(event.target.value);
  };

  const handleChangeDate = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    setHeaderInfo((prevInfo) => ({ ...prevInfo, selectedDate: newDate }));
  };

  const handleFinishPayment = async (event) => {
    event.preventDefault();

    const paymentData = {
      fecha: selectedDate,
      totalPago: selectedPayment,
      idCliente: selectedClient,
      idMetodoPago: selectedPayMethod,
      nroComprobante: selectedBill,
      totalFactura: totalAmount,
      infoAdicional: selectedAddInfo,
    };

    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sales/payments`,
        paymentData
      );
      if (result.status === 201) {
        console.log("Se cargó el Pago:", result);

        // Limpiar campos
        setSelectedPayMethod("");
        setSelectedAddInfo("");
        setSelectedClient("");
        setSelectedBill("");
        setSelectedPayment(undefined);
        setTotalAmount(0);
      } else {
        console.log("Error al cargar el Pago:", result);
      }
    } catch (error) {
      console.error(
        "Error al cargar el Pago:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const allDataLoaded = !loading;

  return (
    <>

      {allDataLoaded ? (
        <div className="m-4 p-6 md:flex md:flex-col md:mx-auto md:my-auto">
          <h1 className="flex items-center justify-center text-3xl font-bold dark:text-white mb-6">
            PAGOS
          </h1>
          <form className="mx-auto md:w-2/3 md:h-3/4 border border rounded-md p-6 mt-4 font- text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              {/* fecha */}
              <div className="flex-col mt-3 md:mt-0 md:mr-3 w-full md:w-auto">
                <p className="mr-3">Fecha</p>
                <input
                  type="date"
                  className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
                  value={selectedDate}
                  onChange={handleChangeDate}
                />
              </div>
              {/* Cliente */}
              <div className="flex-col">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                  Cliente
                </label>
                <select
                  className="w-full md:w-90 h-10 text-black text-center rounded text-center"
                  value={selectedClient}
                  onChange={handleChangeClient}
                >
                  <option value="" disabled>
                    Selecciona el cliente
                  </option>
                  {clients.map((client) => (
                    <option
                      key={client.idCliente}
                      value={client.idCliente}
                      data-idcondicionfiscal={
                        client.idCondicionFiscal.idCondicionFiscal
                      }
                    >
                      {client.nombreCliente}
                    </option>
                  ))}
                </select>
              </div>
              {/* Metodo de Pago */}
              <div className="flex-col">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                  Método de Pago *
                </label>
                <select
                  className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
                  value={selectedPayMethod}
                  onChange={handleChangePayMethod}
                >
                  <option value="" disabled>
                    Selecciona un método de pago
                  </option>
                  {paymet.map((py) => (
                    <option key={py.idMetodoPago} value={py.idMetodoPago}>
                      {py.descripcion}
                    </option>
                  ))}
                </select>
              </div>
              {/* Factura Vinculada */}
              <div className="flex-col">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                  Factura Vinculada *
                </label>
                <select
                  className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
                  value={selectedBill}
                  onChange={handleChangeBill}
                  disabled={clientLoaded}
                >
                  <option value="" disabled>
                    Selecciona la factura
                  </option>
                  {bills.map((b) => {
                    if (
                      b.nroComprobante.substring(0, 2) === "FC" ||
                      b.nroComprobante.substring(0, 2) === "NC"
                    ) {
                      return (
                        <option key={b.idVenta} value={b.nroComprobante}>
                          {b.nroComprobante}
                        </option>
                      );
                    }
                    return null; // Agregado para manejar el caso en que no se cumpla la condición
                  })}
                </select>
              </div>
              {/* Importe a pagar */}
              <div className="flex-col">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                  Importe a Pagar *
                </label>
                <input
                  className="w-full h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
                  onChange={handleChangePayment}
                  value={selectedPayment !== undefined ? selectedPayment : ""}
                  type="number"
                ></input>
              </div>
              {/* Info Adicional */}
              <div className="flex-col">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                  Info Adicional
                </label>
                <textarea
                  className="w-full sm:w-64 md:w-96 lg:w-120 h-32 sm:h-24 md:h-32 lg:h-40 border border-gray-300 p-2 text-gray-700 rounded-md"
                  onChange={handleChangeAddInfo}
                ></textarea>
              </div>
            </div>
            {/* Boton finalizar */}
            <div className="flex justify-center">
              <button
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                onClick={handleFinishPayment}
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Cargar Pago
                </span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="loader">Cargando</div>
      )}

    </>
  );
}
