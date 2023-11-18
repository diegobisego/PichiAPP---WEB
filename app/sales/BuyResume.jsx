import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { postSales } from "../components/Api";

export function BuyResume(props) {
  const { addedProducts, onDeleteProduct, saleData } = props;

  const [totalSale, setTotalSale] = useState(0);
  const [itemsForBackend, setItemsForBackend] = useState([]);

  useEffect(() => {
    // Calcular el total de la venta al cambiar los productos agregados
    const total = addedProducts.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    setTotalSale(total);
  }, [addedProducts]);

  const handleFinishSale = async () => {
    // Enviar los datos al backend al finalizar la venta
    console.log("Enviando datos al backend:", addedProducts);

    try {
      // Comenté esta línea para evitar un error
      // const result = await postSales(itemsForBackend);
      console.log("resultado venta: ", addedProducts);

      // if (result) {
      //   console.log("Venta cargada");
      //   // aquí podrías mostrar un sweetalert
      // }
    } catch (error) {
      console.log("Error en la venta: ", error);
      // Aquí podrías mostrar un mensaje de error o manejarlo de acuerdo a tus necesidades
    }

    // Limpiar la lista de productos y el total después de finalizar la venta
    setItemsForBackend([]);
    setTotalSale(0);
  };

  const handleDeleteProduct = (index) => {
    // Eliminar el producto y actualizar el total
    const updatedProducts = [...addedProducts];
    const deletedProduct = updatedProducts.splice(index, 1)[0];
    setItemsForBackend((prevItems) => [...prevItems, deletedProduct]);
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
                  {item.quantity}
                </span>
                <span className="ml-2">- ${item.price * item.quantity}</span>
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
