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

const OrderDetails = () => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-neutral-50 transition-all hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-700 active:bg-neutral-700">
          ZOBACZ SZCZEGÓŁY ZAMÓWIENIA
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
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
