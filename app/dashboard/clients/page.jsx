import Navigation from "../page";
import Link from "next/link";

const links = [
  {
    label: "Resumen de Cuentas",
    route: "/dashboard/clients/accountResume",
  },
  {
    label: "Agregar Cliente",
    route: "/dashboard/clients/addClient",
  }
];

export default function clients()  {

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