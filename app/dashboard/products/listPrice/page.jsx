"use client";

import { useEffect, useState } from "react";
import {
  getAllProducts,
  getProductCategory,
  getProductUm,
  patchProduct,
} from "@/app/components/Api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function ListPrice() {
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allUm, setAllUm] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resultAllProducts, resultAllCategories, resultAllUm] =
          await Promise.all([
            getAllProducts(),
            getProductCategory(),
            getProductUm(),
          ]);
        setAllProducts(resultAllProducts);
        setAllCategories(resultAllCategories);
        setAllUm(resultAllUm);
        setFilteredProducts(resultAllProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener la lista de productos: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filtrar productos según el término de búsqueda
    const filtered = allProducts.filter((product) =>
      product.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, allProducts]);

  const allDataLoaded = !loading;

  // metodos de sweetAlert

  const handleEditProduct = (productId) => {
    const productFind = allProducts.find(
      (product) => product.idProducto === productId
    );

    // Generar las opciones del select
    const categoryOptions = allCategories.map((category) => {
      return `<option value="${category.idCategoriaProducto}" ${
        category.idCategoriaProducto ===
        productFind.idCategoriaProducto.idCategoriaProducto
          ? "selected"
          : ""
      }>${category.descripcion}</option>`;
    });

    const umOptions = allUm.map((um) => {
      return `<option value="${um.idUnidadMedidaProducto}" ${
        um.idUnidadMedidaProducto ===
        productFind.idUnidadMedidaProducto.idUnidadMedidaProducto
          ? "selected"
          : ""
      }>${um.descripcion}</option>`;
    });

    MySwal.fire({
      title: "Editar Producto",
      html: `<div class="max-w-md mx-auto bg-slate-600 p-4 rounded-md">
      <div class="mb-4">
        <label for="productName" class="block text-sm font-medium text-white">Nombre del Producto</label>
        <input type="text" id="productName" value="${
          productFind.nombreProducto
        }" class="mt-1 p-2 w-full border rounded-md text-center">
      </div>
      <div class="mb-4">
        <label for="productWeight" class="block text-sm font-medium text-white">Peso/Cantidad</label>
        <input type="text" id="productWeight" value="${
          productFind.pesoCantidadProducto
        }" class="mt-1 p-2 w-full border rounded-md text-center">
      </div>
      <div class="mb-4">
        <label for="productStock" class="block text-sm font-medium text-white">Stock</label>
        <input type="text" id="productStock" value="${
          productFind.stockProducto
        }" class="mt-1 p-2 w-full border rounded-md text-center">
      </div>
      <div class="mb-4">
      <label for="productCategory" class="block text-sm font-medium text-white">Categoría</label>
      <select id="productCategory" class="mt-1 p-2 w-full border rounded-md text-center">
        ${categoryOptions.join("")}
      </select>
    </div>
      <div class="mb-4">
        <label for="productUnit" class="block text-sm font-medium text-white">Unidad de Medida</label>
        <select id="productUm" class="mt-1 p-2 w-full border rounded-md text-center">
        ${umOptions.join("")}
      </select>
      </div>
      <div class="mb-4">
        <label for="productPrice" class="block text-sm font-medium text-white">Precio</label>
        <input type="text" id="productPrice" value="${
          productFind.precioProducto
        }" class="mt-1 p-2 w-full border rounded-md text-center">
      </div>
    </div>`,

      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Obtener los valores editados después de hacer clic en "Guardar"
        const editedProductName = document.getElementById("productName").value;
        const editedProductWeight =
          document.getElementById("productWeight").value;
        const editedProductStock =
          document.getElementById("productStock").value;
        const editedProductCategory =
          document.getElementById("productCategory").value;
        const editedProductUm = document.getElementById("productUm").value;
        const editedProductPrice =
          document.getElementById("productPrice").value;

        const editProduct = {
          nombreProducto: editedProductName,
          pesoCantidadProducto: editedProductWeight,
          stockProducto: editedProductStock,
          idCategoriaProducto: editedProductCategory,
          idUnidadMedidaProducto: editedProductUm,
          precioProducto: editedProductPrice,
        };

        try {
          const result = await patchProduct(
            productFind.idProducto,
            editProduct
          );
          console.log(result);
        } catch (error) {
          console.error(
            "Error al intenetar realizar el envio de datos para editar el producto: ",
            error
          );
        }

        MySwal.fire("Guardado!", "", "success").then(() => {
          // Recargar la página después de mostrar el mensaje de éxito
          window.location.reload();
        });
      }
    });
  };

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "¿Eliminar Producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#808080",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        patchProduct(id, { estado: "Disc" });
        Swal.fire({
          title: "Eliminado!",
          text: "Producto Eliminado",
          icon: "success",
        }).then(() => {
          // Recargar la página después de mostrar el mensaje de éxito
          window.location.reload();
        });
      }
    });
  };

  return (
    <>
      {allDataLoaded ? (
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center mt-4">
            Lista de Precios
          </h1>
          <input
            type="search"
            className=" relative ml-4 m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-withe-600 dark:text-withe-200 dark:placeholder:text-withe-200 dark:focus:border-primary"
            placeholder="Buscar"
            aria-label="Search"
            aria-describedby="button-addon3"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredProducts.map((product) => (
            <div key={product.idProducto} className="m-4 p-4 border rounded-lg">
              <h3 className="text-lg leading-6 font-medium text-withe-900">
                {product.nombreCompleto}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Stock:{" "}
                  <span className="text-green-600">
                    {product.stockProducto}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Precio:{" "}
                  <span className="text-green-600">
                    ${product.precioProducto}
                  </span>
                </p>
                <div className="flex items-center">
                  <a
                    onClick={() => handleEditProduct(product.idProducto)}
                    className="font-medium text-indigo-600 hover:text-indigo-500 mr-2"
                  >
                    Editar
                  </a>
                  {/* Agregar aquí el botón de eliminar */}
                  <button
                    onClick={() => handleDeleteProduct(product.idProducto)}
                    className="font-medium text-red-600 hover:text-red-500"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="loader">Cargando</div>
      )}
    </>
  );
}

export default ListPrice;
