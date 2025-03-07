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
  return (
    <div className="w-full">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="default" className="w-full">
            SZCZEGÓŁY ZAMÓWIENIA
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>SZCZEGÓŁY ZAMÓWIENIA</AlertDialogTitle>
            <AlertDialogDescription>
              <p>Data zamówienia: 07.03.2025</p>
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
