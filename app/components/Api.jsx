import axios from "axios";
import { getApiCountries } from "./Api_Countries";


/*METODOS GET*/

async function getAllProducts() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products`
    );
    const products = response.data
    const productsActive = products.filter((a) => a.estado === 'Activo')
    return productsActive;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

async function getAllClients() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/clients`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return [];
  }
}

async function getPayMethods() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/shared/pay-methods`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener metodos de pagos:", error);
    return [];
  }
}

async function getProductCategory() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/categories`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorias:", error);
    return [];
  }
}

async function getProductUm() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/um`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorias:", error);
    return [];
  }
}

async function getCountries() {
  try {
     const authToken = await getApiCountries()

     const response = await axios.get('https://www.universal-tutorial.com/api/countries/', {
      headers: {
        Authorization: `Bearer ${authToken.auth_token}`,
        Accept: "application/json"
      }
     })
    
    return response.data;
  } catch (error) {
    console.error("Error al obtener paises:", error);
    return [];
  }
}

async function getStates(country) {
  try {

    const authToken = await getApiCountries()

    const response = await axios.get(`https://www.universal-tutorial.com/api/states/${country}`, {
      headers: {
        Authorization: `Bearer ${authToken.auth_token}`,
        Accept: "application/json"
      }
     })

    return response.data;
  } catch (error) {
    console.error("Error al obtener ciudades:", error);
    return [];
  }
}

async function getAccountResume() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/salesDetails/accountResume`
    );

    console.log('respuesta desde la api:', response)
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorias:", error);
    return [];
  }
}

async function getAccountStaiment() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/salesDetails/accountStaiment`
    );

    console.log('respuesta desde la api:', response)
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorias:", error);
    return [];
  }
}


async function getCities(state) {
  try {

    const authToken = await getApiCountries()

    const response = await axios.get(`https://www.universal-tutorial.com/api/cities/${state}`, {
      headers: {
        Authorization: `Bearer ${authToken.auth_token}`,
        Accept: "application/json"
      }
     })

    return response.data;
  } catch (error) {
    console.error("Error al obtener ciudades:", error);
    return [];
  }
}

async function getTaxStatus() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/clients/tax-status`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorias:", error);
    return [];
  }
}

/*METODOS POST, PUT Y PATCH*/

async function postSales(sale) {
  try {
    const responseSale = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/sales`,
      sale
    );
    return responseSale;

  } catch (error) {
    console.error("Error al realizar la carga de la venta:", error);
    return [];
  }
}

async function postSalesDetails(sale) {
  try {
    const responseSaleDetail = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/salesDetails`,
      sale
    );
    return responseSaleDetail;

  } catch (error) {
    console.error("Error al realizar la carga de la venta Detalle:", error);
    return [];
  }
}

async function patchProduct(id, updatedData) {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error al realizar la edición del producto:", error);
    return null;
  }
}


export {
  getAllProducts,
  getAllClients,
  getPayMethods,
  postSales,
  getProductCategory,
  getProductUm,
  patchProduct,
  getCountries,
  getStates,
  postSalesDetails,
  getCities,
  getTaxStatus,
  getAccountResume,
  getAccountStaiment
};
