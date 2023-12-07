import Navigation from "../page";
import Link from "next/link";

const links = [
  {
    label: "Agregar Productos",
    route: "/dashboard/products/addProduct",
  },
  {
    label: "Lista de Precios",
    route: "/dashboard/products/listPrice",
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
                    <button className="w-32 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
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