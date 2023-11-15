import { useState } from "react";

export default function ChargeProducts(props) {
  const { products, onAddProduct } = props;

  console.log('productos: ',products)

  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleChangeProduct = (event) => {
    setSelectedProduct(event.target.value);
    console.log('ID del producto seleccionado:', event.target.value);
    console.log('Array de productos:', products);
    const idProducto = parseInt(event.target.value, 10);

    
    const selectedPrice = products.find((product) => product.idProducto === idProducto)?.precioProducto || 0;
    console.log('Precio del producto seleccionado:', selectedPrice);
  
    setPrice(selectedPrice);
  };

  const handleAddButtonClick = () => {
    const quantityValue = parseInt(quantity, 10);
    const priceValue = parseInt(price, 10);

    if (!isNaN(quantityValue) && quantityValue > 0 && !isNaN(priceValue) && priceValue > 0) {
      // Llamamos a la función onAddProduct del padre para agregar el producto
      onAddProduct({ selectedProduct, quantity: quantityValue, price: priceValue });
    } else {
      console.error("La cantidad y el precio deben ser números positivos.");
    }
    setQuantity("");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center border-solid border-2 border-sky-500 m-4 p-2 rounded shadow-lg shadow-gray-400">
        {/* Seleccion de producto */}
        <div className="flex-col mt-3 md:mt-0 md:mr-3">
          <p className="mr-3">Producto</p>
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
                {product.nombreProducto}
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
        <div className="flex-col mt-3 md:mt-0 md:mr-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleAddButtonClick}
          >
            Agregar
          </button>
        </div>
      </div>
    </>
  );
}