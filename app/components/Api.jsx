import axios from "axios";


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
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/shared/countries`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorias:", error);
    return [];
  }
}

async function getCities() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/shared/cities`
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
  getCities,
  postSalesDetails
};
