import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const OrderDetails = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day}.${month}.${year}`;
  };
  return (
    <div className="w-full">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="default" className="mt-5 w-full">
            SZCZEGÓŁY ZAMÓWIENIA
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>SZCZEGÓŁY ZAMÓWIENIA</AlertDialogTitle>
            <AlertDialogDescription>
              <p>Data zamówienia: {getCurrentDate()}</p>
              <p>RESZTA BĘDZIE Z SEKCJI FORMULARZA</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ZAMKNIJ</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OrderDetails;
