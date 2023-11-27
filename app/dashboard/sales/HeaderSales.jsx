import { useState, useEffect } from "react";
import { useHeaderContext } from "../../context/HeaderContext";
import moment from "moment/moment";

export default function HeaderSales(props) {
  const { clients, payMethods  } = props;
  const { setHeaderInfo } = useHeaderContext();

  const efectivo = payMethods[0]?.idMetodoPago;

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedDate, setSelectedDate] = useState(getTodayFormattedDate());
  const [selectedPayMethod, setSelectedPayMethod] = useState(efectivo);
  const [selectedBillNumber, setSelectBillNumber] = useState("");

  function getTodayFormattedDate() {
    return moment().format("YYYY-MM-DD");
  }

  



  useEffect(() => {
    // Establecer la fecha inicial cuando se monta el componente
    setHeaderInfo((prevInfo) => ({ ...prevInfo, selectedDate: selectedDate }));
  }, [selectedDate, setHeaderInfo]);

  useEffect(() => {
    // Establecer el metodo de pago inicial cuando se monta el componente
    setHeaderInfo((prevInfo) => ({ ...prevInfo, selectedPayMethod: selectedPayMethod }));
  }, [selectedPayMethod, setHeaderInfo]);

  const handleChangeClient = (event) => {
    setSelectedClient(event.target.value);
    const selectedClientCondicionFiscal = event.target.options[event.target.selectedIndex].getAttribute('data-idcondicionfiscal');
    setHeaderInfo((prevInfo) => ({ ...prevInfo, selectedClient: event.target.value, selectedClientTaxStatus: selectedClientCondicionFiscal }));

  };

  const handleChangePayMethod = (event) => {
    setSelectedPayMethod(event.target.value);
    setHeaderInfo((prevInfo) => ({ ...prevInfo, selectedPayMethod: event.target.value }));
  };

  const handleChangeDate = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    setHeaderInfo((prevInfo) => ({ ...prevInfo, selectedDate: newDate }));
  };

  const handleBillNumber = (event) => {
    setSelectBillNumber(event.target.value);
    setHeaderInfo((prevInfo) => ({ ...prevInfo, selectBillNumber: event.target.value }));
  };


  

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center border-solid border-2 border-sky-500 m-4 p-2 rounded shadow-lg shadow-gray-400">
        {/* fecha */}
        <div className="flex-col mt-3 md:mt-0 md:mr-3">
          <p className="mr-3">Fecha</p>
          <input
            type="date"
            className="w-full md:w-32 text-black text-center align-middle rounded"
            value={selectedDate}
            onChange={handleChangeDate}
          />
        </div>
        {/* Factura */}
        <div className="flex-col mt-3 md:mt-0 md:mr-3">
          <p className="mr-3">N° Factura</p>
          <input
            type="text"
            className="w-full md:w-32 text-black text-center rounded"
            value={selectedBillNumber}
            onChange={handleBillNumber}
          />
        </div>

        {/* cliente */}
        <div className="flex-col mt-3 md:mt-0 md:mr-3">
          <p className="mr-3">Cliente</p>
          <select
            className="w-full md:w-32 text-black text-center rounded"
            value={selectedClient}
            onChange={handleChangeClient}
          >
            <option value="" disabled>
              Selecciona el cliente
            </option>
            {clients.map((client) => (
              <option key={client.idCliente} value={client.idCliente} data-idcondicionfiscal={client.idCondicionFiscal.idCondicionFiscal}>
                {client.nombreCliente}
              </option>
            ))}
          </select>
        </div>
        {/* Metodo de pago */}
        <div className="flex-col mt-3 md:mt-0 md:mr-3">
          <p className="mr-3">Metodo de Pago</p>
          <select
            className="w-full md:w-32 text-black text-center rounded"
            value={selectedPayMethod}
            onChange={handleChangePayMethod}
          >
            {payMethods.map((payMethod) => (
              <option
                key={payMethod.idMetodoPago}
                value={payMethod.idMetodoPago}
              >
                {payMethod.descripcion}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

