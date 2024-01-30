import RootLayout from "@/app/layout";
import AddPayments from "./AddPayments";

export default function payments() {
  return (
    <div>
      <RootLayout includeNavbar={true}>
        <AddPayments />
      </RootLayout>
    </div>
  );
}
