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
  const [nameUm, setNameUm] = useState("");

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
    const nameUM = productUM.find(
      (um) => um.idUnidadMedidaProducto === Number(event.target.value)
    )?.descripcion;
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
      estado: "Activo",
    };

    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products`,
        productData
      );
      result.status === 201
        ? console.log("Se cargó el producto:", result)
        : console.log("error al cargar el producto");
    } catch (error) {
      console.error("Error al cargar el producto:", error);
    }
  };

  const allDataLoaded = !loading;

  return (
    <>
      {allDataLoaded ? (
        <div className="m-4 p-6">
          <h1 className="flex items-center justify-center text-3xl font-bold dark:text-white mb-6">
            PRODUCTO
          </h1>
          <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* Producto */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                  Producto *
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="Aceitunas"
                  onChange={handleNameProductChange}
                />
              </div>
              {/* Peso/Cantidad */}
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                  Peso/Cantidad *
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  placeholder="5"
                  onChange={handleQuantityProductChange}
                />
              </div>
            </div>
  
            <div className="flex flex-wrap -mx-3 mb-2">

              {/* Categoría */}
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                  Categoría *
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              </div>
              {/* Stock */}
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                  Stock
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  placeholder="500"
                  onChange={handleStockProductChange}
                />
              </div>
              {/* Precio */}
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                  Precio *
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  placeholder="1500"
                  onChange={handlePriceProductChange}
                />
              </div>
            </div>
  
            {/* Finalizar Carga */}
            <div className="flex justify-center">
              <button
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                onClick={handleFinishAddProduct}
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Cargar Producto
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
  
};

export default AddProduct;
