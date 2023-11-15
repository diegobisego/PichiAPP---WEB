import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()


const apiUrl = `${process.env.BASE_URL}/productos`;

const axiosGetProducts = async () => {
  return await axios.get(apiUrl);
};

export async function GetProducts() {
  const products = await axiosGetProducts();

  return products.data.map((product) => (
    <article key={product.id}>
      <h2>Producto: {product.nombreProducto}</h2>
      <p>Stock: {product.stockProducto}</p>
    </article>
  ));
}
