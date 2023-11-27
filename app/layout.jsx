import { Inter } from "next/font/google";
import Navbar from "./page";
import "./globals.css";
import { HeaderProvider } from "./context/HeaderContext";
import { SalesProvider } from "./context/SalesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Modulo de Ventas",
  description: "Modulo de Ventas para Clientes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <HeaderProvider>
          <SalesProvider>{children}</SalesProvider>
        </HeaderProvider>
      </body>
    </html>
  );
}
