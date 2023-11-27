import Navigation from "../page";
import Link from "next/link";

const links = [
  {
    label: "Agregar Productos",
    route: "/dashboard/products/addProduct",
  },
  {
    label: "Lista de Precios",
    route: "/dashboard/products/listprice",
  }
];

export default function products()  {

    <Navigation/>

    return (
        <div className="flex justify-center items-center h-screen">
          <nav>
            <ul className="space-y-4">
              {links.map(({ label, route }) => (
                <li key={route}>
                  <Link href={route}>
                    <button className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                      {label}
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      );
    }