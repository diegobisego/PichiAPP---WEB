import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import moment from "moment";

export function SalesDetails({ saleDetail, accountStaiment }) {
  console.log("En acordion: ", saleDetail);
  console.log("En acordion Statiment: ", accountStaiment);

  const [openAccordions, setOpenAccordions] = useState(
    saleDetail.reduce((acc, detail) => {
      acc[detail.cliente_idCliente] = false;
      return acc;
    }, {})
  );

  const handleOpen = (clienteId) => {
    setOpenAccordions((prevOpenAccordions) => {
      return {
        ...prevOpenAccordions,
        [clienteId]: !prevOpenAccordions[clienteId],
      };
    });
  };

  // Obtener una lista única de clientes
  const uniqueClientes = [
    ...new Set(saleDetail.map((detail) => detail.cliente_idCliente)),
  ];

  const formatDate = (dateString) => {
    const date = moment(dateString).locale("es");
    const formattedDate = date.format("DD/MM/YYYY HH:mm:ss");
    return formattedDate;
  };

  return (
    <>
      {uniqueClientes.map((clienteId) => (
        <div key={clienteId} className="mb-4">
          <Accordion open={!!openAccordions[clienteId]}>
            <AccordionHeader onClick={() => handleOpen(clienteId)}>
              <div className="text-white w-full">
                {accountStaiment
                  .filter((detail) => detail.cliente_idCliente === clienteId)
                  .slice(0, 1)
                  .map((detail) => (
                    <div
                      key={detail.cliente_idCliente}
                      className="flex flex-row p-1 justify-between items-center w-full"
                    >
                      <span>{detail.cliente_nombreCliente}</span>
                      <span>
                        {Number(detail.TotalVentaFacturas) -
                          Number(detail.TotalVentaRecibos)}
                      </span>
                    </div>
                  ))}
              </div>
            </AccordionHeader>

            <AccordionBody>
              <div className="flex flex-col">
                {saleDetail
                  .filter((detail) => detail.cliente_idCliente === clienteId)
                  .map((detail) => (
                    <ul
                      key={detail.ventaDetalle_idVentaDetalle}
                      className="bg-white rounded-lg text-gray-900 m-1"
                    >
                      <li className="flex md:flex-row flex-col p-1 justify-between items-center">
                        <div className="md:w-1/4 mb-2">
                          <span className="font-bold">Fecha: </span>
                          {formatDate(detail.venta_fecha)}
                        </div>
                        <div className="md:w-1/4 mb-2">
                          <span className="font-bold">Tipo: </span>
                          {detail.TipoComprobanteFiscal_descripcion}
                        </div>
                        <div className="md:w-1/4 mb-2">
                          <span className="font-bold">Nro.Comprobante: </span>
                          {`${detail.venta_nroComprobante}`}
                        </div>
                        <div className="md:w-1/4">
                          <span className="font-bold">Total: </span>
                          {detail.venta_total}
                        </div>
                      </li>
                    </ul>
                  ))}
              </div>
            </AccordionBody>
          </Accordion>
        </div>
      ))}
    </>
  );
}
