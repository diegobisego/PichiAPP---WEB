import { useState } from "react";

export default function ChargeProducts(props) {
  const { products, onAddProduct } = props;

  const [selectedProduct, setSelectedProduct] = useState("");
  const [idProduct, setIdProduct] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  const handleChangeProduct = (event) => {
    const idProducto = parseInt(event.target.value, 10);
    const selectedProduct = products.find((product) => product.idProducto === idProducto);

    const SelectedName =
      products.find((product) => product.idProducto === idProducto)
        ?.nombreCompleto || 0;

    setNameProduct(SelectedName);
    setIdProduct(idProducto);
    setPrice(selectedProduct?.precioProducto || 0);
  };

  const handleAddButtonClick = () => {
    const nameValue = nameProduct;
    const quantityValue = parseInt(quantity, 10);
    const discount = 0;
    const subTotalPriceValue = parseFloat((price - discount) / parseFloat(process.env.NEXT_PUBLIC_SACAR_IVA)).toFixed(2);
    const subTotalPriceNumber = parseFloat(subTotalPriceValue);    
    const taxesValue = parseFloat((price - subTotalPriceValue)).toFixed(2);
    const taxes = parseFloat(taxesValue);
    const totalWithtaxesValue = parseFloat(parseFloat(subTotalPriceValue) + parseFloat(taxes)).toFixed(2);
    const totalWithtaxes = parseFloat(totalWithtaxesValue);

    if (!isNaN(quantityValue) && quantityValue > 0 && !isNaN(subTotalPriceValue) && subTotalPriceValue > 0) {
      onAddProduct({
        cantidad: quantityValue,
        subTotalUnit: subTotalPriceNumber,
        impuestoUnit: taxes,
        descuentoUnit: discount,
        totalUnit: totalWithtaxes,
        idProducto: idProduct,
        productName: nameValue
      });
    } else {
      console.error("La cantidad y el precio deben ser números positivos.");
    }

    // Limpiar campos
    setQuantity(1);
    setSelectedProduct("");
    setPrice(0);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center border-solid border-2 border-sky-500 m-4 p-2 rounded shadow-lg shadow-gray-400">
        {/* Seleccion de producto */}
        <div className="flex-col mt-3 md:mt-0 md:mr-3">
          <p className="mr-3">  </p>
          <select
            className="w-full md:w-32 text-black text-center rounded"
            value={selectedProduct}
            onChange={handleChangeProduct}
          >
            <option value="" disabled>
              Selecciona un Producto
            </option>
            {products.map((product) => (
              <option key={product.idProducto} value={product.idProducto}>
                {product.nombreCompleto}
              </option>
            ))}
          </select>
        </div>
        {/* Cantidad del Producto */}
        <div className="flex-col mt-3 md:mt-0 md:mr-3">
          <p className="mr-3">Cantidad</p>
          <input
            type="text"
            className="w-full md:w-32 text-black text-center rounded"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        {/* Precio del Producto */}
        <div className="flex-col mt-3 md:mt-0 md:mr-3">
          <p className="mr-3">Precio</p>
          <input
            type="text"
            className="w-full md:w-32 text-black text-center rounded"
            value={price}
            readOnly
          />
        </div>
        {/* Agregar producto */}
        <div className="flex-col mt-5 md:mt-0 md:mr-3 text-center">
          <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={handleAddButtonClick}
          >
            Agregar
          </button>
        </div>
      </div>
    </>
  );
}
