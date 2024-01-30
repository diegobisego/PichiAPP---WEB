import RootLayout from "@/app/layout";
import Navigation from "../page";
import LinksNavClients from "@/app/components/LinksNavClients";

export default function clients() {
  <Navigation />;

  return (
    <RootLayout includeNavbar={true}>
      <LinksNavClients />
    </RootLayout>
  );
}
