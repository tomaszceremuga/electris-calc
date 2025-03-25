import type React from "react";

import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const LoadedElement = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="link"
          size="icon"
          className="h-6 w-6 rounded-full bg-background p-0 px-2 text-blue-400 hover:bg-blue-400 hover:text-primary-foreground"
          aria-label="Information"
        >
          <RefreshCcw className="h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        Ten element jest wyświetlany zależnie od innej opcji
      </PopoverContent>
    </Popover>
  );
};

export default LoadedElement;
