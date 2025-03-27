import type React from "react";

import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface InfoButtonProps {
  info: string;
}

const InfoButton: React.FC<InfoButtonProps> = ({ info }) => {
  return (
    <span className="ml-1">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="link"
            size="icon"
            className="h-6 w-6 rounded-full bg-background p-0 px-2 text-neutral-500 hover:bg-neutral-500 hover:text-primary-foreground"
            aria-label="Information"
          >
            <InfoIcon className="h-3 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>{info}</PopoverContent>
      </Popover>
    </span>
  );
};

export default InfoButton;
