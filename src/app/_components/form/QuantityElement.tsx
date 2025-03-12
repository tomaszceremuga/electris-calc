"use client";

import React, {  useState } from "react";

import InfoButton from "./InfoButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import QuantityTable from "./QuantityTable";
import { type formElementsInterface } from "~/lib/formElementsInterface";

const QuantityElement: React.FC<formElementsInterface> = ({
  name,
  info = "",
  isImportant = false,
}) => {
  const [quantity, setQuantity] = useState<number>(0);

  return (
    <div className="mb-5 flex flex-wrap items-center">
      <div className="ml-2 flex flex-wrap gap-2">
        <div className="flex items-center">
          <p className="whitespace-nowrap p-[6px] text-base">
            {isImportant && <span className="mr-1 text-red-500">*</span>}
            {name}
          </p>
          {info && <InfoButton info={info} />}{" "}
        </div>
        <Popover>
          <PopoverTrigger>
            <div className="inline-flex h-10 w-32 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
              {quantity == 0 ? "" : quantity}
            </div>{" "}
          </PopoverTrigger>
          <PopoverContent className="w-full max-w-[700px]">
            <QuantityTable setQuantity={setQuantity} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default QuantityElement;
