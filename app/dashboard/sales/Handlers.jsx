// handlers para agregar productos

export const handleAddProduct = (productData, setBuyResumeData) => {
  setBuyResumeData((prevData) => ({
    ...prevData,
    addedProducts: [productData, ...prevData.addedProducts],
  }));
};


// En tu componente principal (Sales.js o donde manejes el estado addedProducts)

export const handleDeleteProduct = (index, setBuyResumeData) => {
  setBuyResumeData((prevData) => {
    const updatedProducts = [...prevData.addedProducts];
    updatedProducts.splice(index, 1);
    return { ...prevData, addedProducts: updatedProducts };
  });
};


export const setSaleData = (data, setSaleData) => {
  setSaleData((prevData) => [...prevData, data]);
};


// elimina los productos de la lista cuando finaliza la venta
export const handleDeleteAllProducts = (setBuyResumeData) => {
  // Lógica para borrar todos los productos
  setBuyResumeData({ addedProducts: [] });
};


