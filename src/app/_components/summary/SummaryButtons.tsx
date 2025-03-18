import { Button } from "@/components/ui/button";
// import OrderDetails from "./OrderDetails";

const SummaryButtons = () => {
  return (
    <div className="mt-10 flex flex-col">
      {/* <OrderDetails /> */}
      <Button variant="default" className="h-[100px] w-[250px]">
        Dodaj do zamówienia
      </Button>
    </div>
  );
};

export default SummaryButtons;
