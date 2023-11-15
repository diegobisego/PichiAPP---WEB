import { useState } from "react";
import moment from "moment/moment";

export default function HeaderSales(props) {
  const { clients, payMethods } = props;

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedDate, setSelectedDate] = useState(getTodayFormattedDate());
  const [selectedPayMethod, setSelectedPayMethod] = useState("");

  function getTodayFormattedDate() {
    return moment().format("YYYY-MM-DD");
  }

  const handleChangeClient = (event) => {
    setSelectedClient(event.target.value);
  };

  const handleChangePayMethod = (event) => {
    setSelectedPayMethod(event.target.value);
  };

  const handleChangeDate = (event) => {
    setSelectedDate(event.target.value);
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
          <input type="text" className="w-full md:w-32 text-black text-center rounded" />
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
              <option key={client.idCliente} value={client.idCliente}>
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
