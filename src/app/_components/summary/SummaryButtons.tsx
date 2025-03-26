import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SummaryButtons = () => {
  return (
    <div className="mt-10 flex flex-col">
      <Button variant="default" className="h-[100px] w-[250px]">
        Dodaj do zamówienia
      </Button>
    </div>
  );
};

export default SummaryButtons;
