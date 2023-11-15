export function BuyResume(props) {
  const { addedProducts } = props;
  console.log('producto agregado en buy:', addedProducts)
  return (
    <>
      <div className="flex justify-center border rounded-lg">
        <ul className="bg-white rounded-lg w-96 text-gray-900">
          {addedProducts.map((item, index) => (
            <li
              key={index}
              className={`px-6 py-2 border-b ${
                index === addedProducts.length - 1
                  ? "rounded-b-lg"
                  : "border-gray-200"
              } w-full`}
            >
              <span className="font-bold">
                {item.selectedProduct.nombreProducto}
              </span>
              <span className="ml-2">{item.quantity}</span>
              <span className="ml-2">Precio: ${item.price}</span>
              {/* Puedes agregar más información del ítem aquí */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}