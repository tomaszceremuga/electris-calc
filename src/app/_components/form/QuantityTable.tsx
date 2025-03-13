"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

const QuantityTable = ({
  id,
  onChange,
  filled,
  setQuantity,
}: {
  setQuantity: (value: number) => void;
  id: number;
  onChange: (id: number, value: string) => void;
  filled: number;
}) => {
  const quantities = [
    { qty: 1, unitPrice: "-/pc", totalPrice: "RFQ" },
    { qty: 2, unitPrice: "-/pc", totalPrice: "RFQ" },
    { qty: 5, unitPrice: "-/pc", totalPrice: "RFQ" },
    { qty: 10, unitPrice: "-/pc", totalPrice: "RFQ" },
    { qty: 50, unitPrice: "-/pc", totalPrice: "RFQ" },
    {
      qty: 100,
      unitPrice: "Customized Quote/pc",
      totalPrice: "Customized Quote",
    },
  ];

  const [customQuantity, setCustomQuantity] = React.useState(
    quantities.some((item) => item.qty === Number(filled))
      ? ""
      : (filled ?? ""),
  );
  const [selectedQty, setSelectedQty] = React.useState<number | null>(
    filled ?? null,
  );

  const handleSelect = (qty: number) => {
    setQuantity(qty);
    setSelectedQty(qty);
  };

  const handleSubmitCustom = () => {
    if (customQuantity) {
      const qty = Number.parseInt(String(customQuantity), 10);
      setQuantity(qty);
      setSelectedQty(qty);
    }
  };

  return (
    <div className="rounded-md bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[100px] text-center">Qty</TableHead>
            <TableHead className="text-center">Unit Price</TableHead>
            <TableHead className="text-center">Total Price</TableHead>
            <TableHead className="text-center">Select</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quantities.map((item) => (
            <TableRow
              key={item.qty}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSelect(item.qty)}
            >
              <TableCell className="text-center font-medium">
                {item.qty}
              </TableCell>
              <TableCell className="text-center">{item.unitPrice}</TableCell>
              <TableCell className="text-center">{item.totalPrice}</TableCell>
              <TableCell className="flex justify-center text-center">
                {selectedQty === item.qty && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center gap-2 p-3">
        <Input
          type="number"
          value={customQuantity}
          onChange={(e) => setCustomQuantity(e.target.value)}
          className="max-w-[120px]"
        />
        <Button
          variant="default"
          onClick={handleSubmitCustom}
          className="px-3 py-1"
        >
          Prześlij
        </Button>
        <span className="flex-1 text-neutral-500">Podaj własną wartość</span>
        {selectedQty && !quantities.some((q) => q.qty === selectedQty) && (
          <Check className="h-5 w-5 text-green-500" />
        )}
      </div>

      <div className="p-3 text-sm text-gray-500">
        Note: Bulk orders are customized quotes with the most favorable price.
        Unit price would decrease as quantity increases. VAT and freight are
        excluded.
      </div>
    </div>
  );
};

export default QuantityTable;
