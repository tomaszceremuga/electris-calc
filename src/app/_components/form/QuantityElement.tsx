"use client";

import React, { use, useState } from "react";

import InfoButton from "./InfoButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "~/components/ui/button";
import QuantityTable from "./QuantityTable";
import { number, set } from "zod";

interface QuantityElementProps {
  name: string;
  info?: string;
  isImportant?: boolean;
}

const QuantityElement: React.FC<QuantityElementProps> = ({
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
          {info != "" && <InfoButton info={info} />}{" "}
        </div>
        <Popover>
          <PopoverTrigger>
            <Button variant={"outline"} className="w-32">
              {quantity == 0 ? "" : quantity}
            </Button>{" "}
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
