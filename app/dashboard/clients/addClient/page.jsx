"use client";

import axios from "axios";

import {
  getAllClients,
  getCountries,
  getStates,
  getCities,
  getTaxStatus,
} from "@/app/components/Api";
import { useState, useEffect } from "react";
import RootLayout from "@/app/layout";

const AddClient = () => {
  //useState
  const [allClients, setAllClients] = useState([]);
  const [allTaxStatus, setAllTaxStatus] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClientName, setSelectedClientName] = useState("");
  const [selectedClientPhone, setSelectedClientPhone] = useState("");
  const [selectedClientEmail, setSelectedClientEmail] = useState("");
  const [selectedClientTaxStatus, setSelectedTaxStatus] = useState("");
  const [selectedClientDniCuit, setSelectedClientDniCuit] = useState("");
  const [selectedClientAddInfo, setSelectedClientAddInfo] = useState("");
  const [selectedClientBusinessName, setSelectedClientBusinessName] =
    useState("");
  const [selectedClientAddress, setSelectedClientAddress] = useState("");
  const [selectedClientCountry, setSelectedClientCountry] = useState("");
  const [selectedClientState, setSelectedClientState] = useState("");
  const [selectedClientCity, setSelectedClientCity] = useState("");
  const [stateLoaded, setStateLoaded] = useState(true);
  const [cityLoaded, setCityLoaded] = useState(true);

  useEffect(() => {
    // Fetch de datos
    const fetchData = async () => {
      try {
        const [clientsData, countriesData, taxStatusData] = await Promise.all([
          getAllClients(),
          getCountries(),
          getTaxStatus(),
        ]);
        setAllClients(clientsData);
        setAllCountries(countriesData);
        setAllTaxStatus(taxStatusData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handlers

  // nombre y apellado
  const handleNameClientChange = (event) => {
    setSelectedClientName(event.target.value);
  };

  // email
  const handleEmailClientChange = (event) => {
    setSelectedClientEmail(event.target.value);
  };

  // telefono
  const handlePhoneClientChange = (event) => {
    setSelectedClientPhone(event.target.value);
  };

  // info adicional
  const handleAddInfoClientChange = (event) => {
    setSelectedClientAddInfo(event.target.value);
  };

  // dni / cuit
  const handleDniCuitClientChange = (event) => {
    setSelectedClientDniCuit(event.target.value);
  };

  // nombre de la empresa
  const handleBusinessNameClientChange = (event) => {
    setSelectedClientBusinessName(event.target.value);
  };

  // direccion
  const handleAddressClientChange = (event) => {
    setSelectedClientAddress(event.target.value);
  };

  // ciudad
  const handleSelectedCity = (event) => {
    const selectedCityCode = event.target.value;
    setSelectedClientCity(selectedCityCode);
  };

  // condicion fiscal
  const handleSelectedTaxStatus = (event) => {
    const selectTaxStatus = Number(event.target.value);
    setSelectedTaxStatus(selectTaxStatus);
  };

  // provincia
  const handleSelectedState = async (event) => {
    const selectedStateCode = event.target.value;
    setSelectedClientState(selectedStateCode);

    // Setear la Provincia en base al país
    const cities = await getCities(event.target.value);
    setAllCities(cities);
    setCityLoaded(false);
  };

  // carga de paises y carga de provincias
  const handleSelectedCountry = async (event) => {
    const selectedCountryCode = event.target.value;
    setSelectedClientCountry(selectedCountryCode);

    // Setear la Provincia en base al país
    const states = await getStates(event.target.value);
    setAllStates(states);
    setStateLoaded(false);
  };

  // Botón finalizar carga de producto
  const handleFinishAddClient = async (event) => {
    event.preventDefault();

    const clientData = {
      nombreCliente: selectedClientName,
      direccion: selectedClientAddress,
      telefono: selectedClientPhone,
      email: selectedClientEmail,
      razonSocial: selectedClientBusinessName,
      infoAdicional: selectedClientAddInfo,
      idCondicionFiscal: selectedClientTaxStatus,
      ciudad: selectedClientCity,
      pais: selectedClientCountry,
      provincia: selectedClientState,
      dniCuit: selectedClientDniCuit,
    };

    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/clients`,
        clientData
      );
      result.status === 201
        ? console.log("Se cargó el cliente:", result)
        : console.log("error al cargar el cliente");
    } catch (error) {
      console.error("Error al cargar el cliente:", error);
    }
  };

  const allDataLoaded = !loading;
  return (
    <>
    <RootLayout includeNavbar={true}>
      {allDataLoaded ? (
        <div className="m-4 p-6">
          <h1 className="flex items-center justify-center text-3xl font-bold dark:text-white mb-6">
            CLIENTE
          </h1>
          <form className="max-w-lg mx-auto md:w-full border border rounded-md p-6 mt-4 ">
            {/* nombre del cliente */}
            <div className="flex flex-wrap -mx-3 mb-6 justify-center items-center">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Nombre y Apellido *
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="Juan Perez"
                  onChange={handleNameClientChange}
                />
              </div>
            </div>
            {/* direccion */}
            <div className="flex flex-wrap -mx-3 mb-6 justify-center items-center">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Direccion *
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  placeholder="Pasaje San Pedro 123"
                  onChange={handleAddressClientChange}
                />
              </div>
            </div>
            {/* Pais */}
            <div className="flex flex-wrap -mx-3 mb-6 justify-center items-center">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Pais *
                </label>
                <div className="relative">
                  <select
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={selectedClientCountry}
                    onChange={handleSelectedCountry}
                  >
                    <option value="" disabled>
                      Seleccione un Pais
                    </option>
                    {allCountries.map((country) => (
                      <option
                        key={country.country_name}
                        value={country.country_name}
                      >
                        {country.country_name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
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

            {/* Provincias */}
            <div className="flex flex-wrap -mx-3 mb-6 justify-center items-center">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Provincia *
                </label>
                <div className="relative">
                  <select
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={selectedClientState}
                    onChange={handleSelectedState}
                    disabled={stateLoaded}
                  >
                    <option value="" disabled>
                      Seleccione una Provincia
                    </option>
                    {allStates.map((state) => (
                      <option key={state.state_name} value={state.state_name}>
                        {state.state_name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
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

            {/* Ciudades */}
            <div className="flex flex-wrap -mx-3 mb-6 justify-center items-center">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Ciudad *
                </label>
                <div className="relative">
                  <select
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={selectedClientCity}
                    onChange={handleSelectedCity}
                    disabled={cityLoaded}
                  >
                    <option value="" disabled>
                      Seleccione una Ciudad
                    </option>
                    {allCities.map((city) => (
                      <option key={city.city_name} value={city.city_name}>
                        {city.city_name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
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

            {/* Telefono */}
            <div className="flex flex-wrap -mx-3 mb-6 justify-center items-center">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Telefono *
                </label>
                <div className="relative">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="string"
                    placeholder="Sin 0 y sin 15"
                    onChange={handlePhoneClientChange}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-wrap -mx-3 mb-6 justify-center items-center">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Email *
                </label>
                <div className="relative">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="email"
                    placeholder="correo@email.com"
                    onChange={handleEmailClientChange}
                  />
                </div>
              </div>
            </div>

            {/* DNI/CUIT */}
            <div className="flex flex-wrap -mx-3 mb-6 justify-center items-center">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  DNI / CUIT *
                </label>
                <div className="relative">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="number"
                    placeholder="Sin puntos ni guiones"
                    onChange={handleDniCuitClientChange}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>
              </div>
            </div>

            {/* Condicion Fiscal */}
            <div className="flex flex-wrap -mx-3 mb-2 justify-center items-center">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Condicion Fiscal *
                </label>
                <div className="relative">
                  <select
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={selectedClientTaxStatus}
                    onChange={handleSelectedTaxStatus}
                  >
                    <option value="" disabled>
                      Condicion Fiscal
                    </option>
                    {allTaxStatus.map((tx) => (
                      <option
                        key={tx.idCondicionFiscal}
                        value={tx.idCondicionFiscal}
                      >
                        {tx.descripcion}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
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

            {/* Razon Social */}
            <div className="flex flex-wrap -mx-3 mb-6 justify-center items-center">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Razon Social
                </label>
                <div className="relative">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="string"
                    placeholder="La Empresa S.R.L"
                    onChange={handleBusinessNameClientChange}
                  />
                </div>
              </div>
            </div>

            {/* Info Adicional */}
            <div className="flex flex-wrap -mx-3 mb-6 justify-center items-center">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Info Adicional
                </label>
                <div className="relative">
                  <textarea
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="string"
                    placeholder="Datos extras"
                    onChange={handleAddInfoClientChange}
                  />
                </div>
              </div>
            </div>

            {/* Boton finalizar */}
            <div className="flex justify-center">
              <button
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                onClick={handleFinishAddClient}
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Cargar Cliente
                </span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="loader">Cargando</div>
      )}
      </RootLayout>
    </>
  );
};
export default AddClient;
