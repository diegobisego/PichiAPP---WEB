'use client'

import { useState, useEffect } from "react";
import HeaderSales from "./HeaderSales";
import ChargeProducts from "./ChargeProducts";
import { BuyResume } from "./BuyResume";
import { getAllClients, getPayMethods, getAllProducts } from "../components/Api";
import { handleAddProduct, handleDeleteProduct } from "./Handlers";

export default function Sales() {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [payMethods, setPayMethods] = useState([]);
  const [products, setProducts] = useState([]);
  const [buyResumeData, setBuyResumeData] = useState({ addedProducts: [] });
  const [saleData, setSaleData] = useState([]);

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

  const allDataLoaded = !loading;

  return (
    <div>
      {allDataLoaded ? (
        <>
          <HeaderSales clients={clients} payMethods={payMethods} />
          <ChargeProducts
            products={products}
            onAddProduct={(productData) =>
              handleAddProduct(productData, setBuyResumeData, setSaleData)
            }
          />
          {buyResumeData && (
            <BuyResume
              addedProducts={buyResumeData.addedProducts}
              onDeleteProduct={(index) =>
                handleDeleteProduct(index, setBuyResumeData)
              }
              setSaleData={saleData}
            />
          )}
        </>
      ) : (
        <div className="loader">Loading...</div>
      )}
    </div>
  );
}
