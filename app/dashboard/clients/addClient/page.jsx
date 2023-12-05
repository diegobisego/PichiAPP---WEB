"use client";

import axios from "axios";

import { getAllClients, getCountries, getCities } from "@/app/components/Api";
import { useState, useEffect } from "react";

const AddClient = () => {

  //useState
  const [allClients, setAllClients] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClientName, setSelectedClientName] = useState("");
  const [selectedClientAddress, setSelectedClientAddress] = useState("");
  const [SelectedClientCountry, setSelectedClientCountry] = useState("");
  const [SelectedClientCity, setSelectedClientCity] = useState("");

  useEffect(() => {
    // Fetch de datos
    const fetchData = async () => {
      try {
        const [clientsData, countriesData, allCities] = await Promise.all([
          getAllClients(),
          getCountries(),
          getCities()  

        ]);
        setAllClients(clientsData);
        setAllCountries(countriesData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos de categoría:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handlers
  const handleNameClientChange = (event) => {
    console.log(event.target.value);
    setSelectedClientName(event.target.value);
  };

  const handleAddressClientChange = (event) => {
    setSelectedClientAddress(event.target.value);
  };

  const handleSelectedCountry = (event) => {
    setSelectedClientCountry(Number(event.target.value));
    const countryName = allCountries.find(
      (country) => country.idPais === Number(event.target.value)
    )?.descripcion;
    setNameUm(countryName);
  };

  const handleSelectedCity = (event) => {
    setSelectedClientCity(Number(event.target.value));
    const cityName = allCity.find(
      (city) => city.idCiudad === Number(event.target.value)
    )?.descripcion;
    setNameUm(cityName);
  };

  // Botón finalizar carga de producto
  const handleFinishAddClient = async (event) => {
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
            CLIENTE
          </h1>
          <form className="w-full max-w-lg">
            {/* nombre del cliente */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Cliente *
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white text-center"
                  type="text"
                  placeholder="Juan Perez"
                  onChange={handleNameClientChange}
                />
              </div>
            </div>
            {/* direccion */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Direccion *
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white text-center"
                  type="text"
                  placeholder="Pasaje San Pedro 123"
                  onChange={handleAddressClientChange}
                />
              </div>
            </div>
            {/* Pais */}
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Pais *
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-center"
                    value={SelectedClientCountry}
                    onChange={handleSelectedCountry}
                  >
                    <option value="" disabled>
                      Seleccione un pais
                    </option>
                    {allCountries.map((country) => (
                      <option key={country.idPais} value={country.idPais}>
                        {country.descripcion}
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
            </div>
            {/* Ciudad */}
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Ciudad *
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-center"
                    value={SelectedClientCity}
                    onChange={handleSelectedCity}
                  >
                    <option value="" disabled>
                      Seleccione una ciudad
                    </option>
                    {allCities.map((city) => (
                      <option key={city.idPais} value={city.idPais}>
                        {city.descripcion}
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
            </div>
            
          </form>
        </div>
      ) : (
        <div className="loader">Cargando</div>
      )}
    </>
  );
};
export default AddClient;
