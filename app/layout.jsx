// RootLayout.jsx
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar"; 
import "./globals.css";
import { HeaderProvider } from "./context/HeaderContext";
import { SalesProvider } from "./context/SalesContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, includeNavbar = true }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {includeNavbar && <Navbar />}
        <HeaderProvider>
          <SalesProvider>{children}</SalesProvider>
        </HeaderProvider>
      </body>
    </html>
  );
}
