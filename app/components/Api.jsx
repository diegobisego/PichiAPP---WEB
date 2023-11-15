import axios from "axios";

async function getAllProducts() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/productos`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

async function getAllClients() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/clientes`);
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
    console.error("Error al obtener clientes:", error);
    return [];
  }
}

export { getAllProducts, getAllClients ,getPayMethods };
