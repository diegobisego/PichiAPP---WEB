"use client";

import { useState, useEffect } from "react";
import HeaderSales from "./HeaderSales";
import ChargeProducts from "./ChargeProducts";
import { BuyResume } from "./BuyResume";
import {
  getAllClients,
  getPayMethods,
  getAllProducts,
} from "../../components/Api";
import {
  handleAddProduct,
  handleDeleteProduct,
  handleDeleteAllProducts,
} from "./Handlers";
import RootLayout from "@/app/layout";

export default function Sales() {
  //seteos de variables
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [payMethods, setPayMethods] = useState([]);
  const [products, setProducts] = useState([]);
  const [buyResumeData, setBuyResumeData] = useState({ addedProducts: [] });

  // llamo a la api para traer los datos y los guardo en las variables
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsData, payMethodsData, productsData] = await Promise.all([
          getAllClients(),
          getPayMethods(),
          getAllProducts(),
        ]);

        setClients(clientsData);
        setPayMethods(payMethodsData);
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // constante para determinar si esta cargando la pagina
  const allDataLoaded = !loading;

  return (
    <RootLayout includeNavbar={true}>
      <div>
        {allDataLoaded ? (
          <>
          <h1 className="text-2xl font-bold mb-4 text-center mt-4">VENTA DE PRODUCTOS</h1>
            <HeaderSales clients={clients} payMethods={payMethods} />

            <ChargeProducts
              products={products}
              onAddProduct={(productData) =>
                handleAddProduct(productData, setBuyResumeData)
              }
            />
            {buyResumeData && (
              <BuyResume
                addedProducts={buyResumeData.addedProducts}
                onDeleteProduct={(index) =>
                  handleDeleteProduct(index, setBuyResumeData)
                }
                onDeleteAllProducts={() =>
                  handleDeleteAllProducts(setBuyResumeData)
                }
              />
            )}
          </>
        ) : (
          <div className="loader">Cargando</div>
        )}
      </div>
    </RootLayout>
  );
}
