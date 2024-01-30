import RootLayout from "@/app/layout";
import Navigation from "../page";
import LinksNavProducts from "@/app/components/LinksNavProducts";

export default function products() {
  <Navigation />;

  return (
    <RootLayout includeNavbar={true}>
    <LinksNavProducts />
    </RootLayout>
  );
}
