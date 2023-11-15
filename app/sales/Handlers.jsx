// handlers para agregar productos

export const handleAddProduct = (productData, setBuyResumeData) => {
    console.log("Producto agregado:", productData);
    setBuyResumeData((prevData) => ({
      ...prevData,
      addedProducts: [productData, ...prevData.addedProducts],
    }));
  };
  
  