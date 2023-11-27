import axios from "axios";

/*METODOS GET*/

async function getAllProducts() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

async function getAllClients() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/clients`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return [];
  }
}


async function getPayMethods() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/shared/pay-methods`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener metodos de pagos:", error);
    return [];
  }
}

async function getProductCategory() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorias:", error);
    return [];
  }
}

async function getProductUm() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/products/um`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorias:", error);
    return [];
  }
}


/*METODOS POST*/

async function postSales(sale){
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/sales`,sale)
      return response.data;
    } catch (error) {
      console.error("Error al realizar la carga de la venta:", error);
      return [];
    }
}

export { getAllProducts, getAllClients ,getPayMethods, postSales, getProductCategory, getProductUm };
