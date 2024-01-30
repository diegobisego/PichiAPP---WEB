import Link from "next/link"

export default function LinksNavClients() {

    const linksNavigation =   [  {
        label: "Resumen de Cuentas",
        route: "/dashboard/clients/accountResume",
      },
      {
        label: "Agregar Cliente",
        route: "/dashboard/clients/addClient",
      },
      {
        label: "Pagos",
        route: "/dashboard/clients/payments",
      }]


  return (
    <div className="flex justify-center items-center h-screen">
    <nav>
      <ul className="space-y-4">
        {linksNavigation.map(({ label, route }) => (
          <li key={route}>
            <Link href={route}>
              <button className="w-32 md:w-64 md:h-16 md:text-lg text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                {label}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </div>
  )
}
