import { useState, useEffect, useContext } from "react";
import { MdDelete } from "react-icons/md";
import { postSales, postSalesDetails } from "../../components/Api";
import { HeaderContext } from "../../context/HeaderContext";
import Swal from "sweetalert2";
import moment from "moment";


export function BuyResume(props) {
  const { addedProducts, onDeleteProduct, onDeleteAllProducts } = props;
  const { headerInfo } = useContext(HeaderContext);

  const [totalSale, setTotalSale] = useState(0);
  const [itemsDeleted, setItemsDeleted] = useState([]);
  const [descuentos, setDescuenstos] = useState(0);


  useEffect(() => {
    // Calcular el total de la venta al cambiar los productos agregados
    const total = addedProducts.reduce((acc, item) => {
      return acc + item.totalUnit * item.cantidad;
    }, 0);

    setTotalSale(total);
  }, [addedProducts]);

  const handleFinishSale = async () => {
    try {
      // Cálculos
      const subTotalValue =  ((totalSale - descuentos) / process.env.NEXT_PUBLIC_SACAR_IVA).toFixed(2); 
      const subTotal =  parseFloat(subTotalValue); 
      const impuestosValue = (totalSale - subTotal).toFixed(2); 
      const impuestos = parseFloat(impuestosValue); 
      const totalConImpuestosValue = (subTotal + impuestos).toFixed(2); 
      const totalConImpuestos = parseFloat(totalConImpuestosValue); 

     
      const saleData = {
        idCodigoComprobante: 1, 
        nroComprobante: headerInfo.selectBillNumber,
        fecha: moment(headerInfo.selectedDate).format('YYYY-MM-DD HH:mm:ss'),
        idCliente: parseInt(headerInfo.selectedClient,10),
        idVendedor: 1,
        idMetodoPago: parseInt(headerInfo.selectedPayMethod,10),
        subTotal,
        impuestos, 
        descuentos, 
        total: totalConImpuestos      
      };

      // Realizar la solicitud de venta
      const resultPostSale = await postSales(saleData)
      const idVenta = resultPostSale.data.idVenta

      // agrego el id de la venta en cada una de los detalles de las ventas
      const finishSaleDetail = addedProducts.map(product => ({ ...product, idVenta }))


      // realiza la solicitud de ventas detail
      const resultSaleDitails = await postSalesDetails(finishSaleDetail)

       if (resultPostSale.status === 201 && resultSaleDitails.status === 201) {
        Swal.fire({
          title: "Venta Realizada!",
          icon: "success"
        });
       } else {
        Swal.fire({
          title: "Hubo un error en la venta!",
          icon: "error"
        });
       }
    } catch (error) {
      console.log("Error en la venta: ", error);
      // Aquí podrías mostrar un mensaje de error o manejarlo de acuerdo a tus necesidades
    }

    // Limpiar la lista de productos y el total después de finalizar la venta
    setItemsDeleted([]);
    setTotalSale(0);
    onDeleteAllProducts();
  };

  const handleDeleteProduct = (index) => {
    // Eliminar el producto y actualizar el total
    const updatedProducts = [...addedProducts];
    const deletedProduct = updatedProducts.splice(index, 1)[0];
    setItemsDeleted((prevItems) => [...prevItems, deletedProduct]);
    onDeleteProduct(index);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center border-solid border-2 border-sky-500 m-4 p-2 rounded shadow-lg shadow-gray-400">
        <ul className="bg-white rounded-lg w-full md:w-96 text-gray-900">
          {addedProducts.map((item, index) => (
            <li
              key={index}
              className={`flex flex-col md:flex-row items-center px-4 md:px-6 py-2 border-b ${
                index === addedProducts.length - 1
                  ? "rounded-b-lg"
                  : "border-gray-200"
              } w-full`}
            >
              <span className="font-bold mb-2 md:mb-0 md:mr-2">
                {item.productName}
              </span>
              <div className="flex">
                <span className="ml-2 mb-2 md:mb-0 md:ml-auto">
                  {item.cantidad}
                </span>
                <span className="ml-2">- ${item.totalUnit * item.cantidad}</span>
                <button
                  className="ml-2 p-1 text-white bg-red-500 rounded-full hover:bg-red-700"
                  onClick={() => handleDeleteProduct(index)}
                >
                  <MdDelete />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between border-solid border-2 border-sky-500 m-4 p-2 rounded shadow-lg shadow-gray-400">
        <h2 className="m-0">TOTAL</h2>
        <span className="m-0">$ {totalSale}</span>
      </div>

      <div className="flex-col mt-5 md:mt-0 md:mr-3 text-center">
        <button
          className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full"
          onClick={handleFinishSale}
        >
          Finalizar Venta
        </button>
      </div>
    </>
  );
}
