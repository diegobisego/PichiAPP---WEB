"use client";

import axios from "axios";

import { useState, useEffect } from "react";
import { getProductCategory, getProductUm } from "@/app/components/Api";


const AddProduct = () => {
  // Seteos de variables
  const [categories, setCategories] = useState([]);
  const [productUM, setProductUM] = useState([]);
  const [loading, setLoading] = useState(true);

  // Variables para armar el nombre completo
  const [nameUm, setNameUm] = useState('');

  // Selecciones
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProductUM, setSelectedProductUM] = useState("");
  const [selectedProductName, setSelectedProductName] = useState("");
  const [selectedProductQuantity, setSelectedProductQuantity] = useState("");
  const [selectedProductStock, setSelectedProductStock] = useState("");
  const [selectedProductPrice, setSelectedProductPrice] = useState("");

  useEffect(() => {
    // Fetch de datos
    const fetchData = async () => {
      try {
        const [categoriesData, umData] = await Promise.all([
          getProductCategory(),
          getProductUm(),
        ]);
        setCategories(categoriesData);
        setProductUM(umData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos de categoría:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handlers
  const handleSelectedCategory = (event) => {
    setSelectedCategory(Number(event.target.value));
  };

  const handleSelectedUM = (event) => {
    setSelectedProductUM(Number(event.target.value));
    const nameUM = productUM.find((um) => um.idUnidadMedidaProducto === Number(event.target.value))?.descripcion;
    setNameUm(nameUM);
  };

  const handleNameProductChange = (event) => {
    setSelectedProductName(event.target.value);
  };

  const handleQuantityProductChange = (event) => {
    setSelectedProductQuantity(Number(event.target.value));
  };

  const handleStockProductChange = (event) => {
    setSelectedProductStock(Number(event.target.value));
  };

  const handlePriceProductChange = (event) => {
    setSelectedProductPrice(Number(event.target.value));
  };

  // Botón finalizar carga de producto
  const handleFinishAddProduct = async (event) => {
    event.preventDefault();

    const productData = {
      nombreProducto: selectedProductName,
      pesoCantidadProducto: selectedProductQuantity, 
      stockProducto: selectedProductStock,  
      idCategoriaProducto: selectedCategory,  
      idUnidadMedidaProducto: selectedProductUM,  
      precioProducto: selectedProductPrice,
      nombreCompleto: `${selectedProductName} x ${selectedProductQuantity}${nameUm}`,
      estado: 'Activo'
    };

    try {
      const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/products`, productData);
      (result.status === 201)?console.log("Se cargó el producto:", result):console.log("error al cargar el producto");
    } catch (error) {
      console.error("Error al cargar el producto:", error);
    }
  };

  const allDataLoaded = !loading;

  return (
    <>
      {allDataLoaded ? (
        <div className="m-4 p-6">
          
          <h1 className="flex items-center justify-center text-3xl font-bold dark:text-white mb-6">PRODUCTO</h1>
          <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Producto *
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white text-center"
                  type="text"
                  placeholder="Aceitunas"
                  onChange={handleNameProductChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Peso/Cantidad *
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-center"
                  type="number"
                  placeholder="5"
                  onChange={handleQuantityProductChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Unidad de Medida *
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-center"
                    value={selectedProductUM}
                    onChange={handleSelectedUM}
                  >
                    <option value="" disabled>
                      Selecciona una Unidad de Medida
                    </option>
                    {productUM.map((um) => (
                      <option
                        key={um.idUnidadMedidaProducto}
                        value={um.idUnidadMedidaProducto}
                      >
                        {um.descripcion}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Categoria *
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-center"
                    value={selectedCategory}
                    onChange={handleSelectedCategory}
                  >
                    <option value="" disabled>
                      Selecciona una Categoría
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category.idCategoriaProducto}
                        value={category.idCategoriaProducto}
                      >
                        {category.descripcion}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Stock
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-center"
                  type="number"
                  placeholder="500"
                  onChange={handleStockProductChange}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Precio *
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-center"
                  type="number"
                  placeholder="1500"
                  onChange={handlePriceProductChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 items-center justify-center">
              <button
                className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full"
                onClick={handleFinishAddProduct}
              >
                Cargar Producto
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

export default AddProduct;
