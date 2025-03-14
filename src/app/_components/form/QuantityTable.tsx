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
      unitPrice:"-/pc",
      totalPrice: "RFQ",
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
              <TableCell className="flex justify-center text-center items-center">
                {selectedQty === item.qty && (
                  <Check className="h-5 w-5 text-green-500 " />

                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center gap-2 p-3 hover:bg-gray-50 cursor-pointer border-t">
        <Input
          type="number"
          value={customQuantity}
          onChange={(e) => {
            const value = e.target.value;
            setCustomQuantity(value);

            if (value) {
              const qty = Number.parseInt(value, 10);
              if (!isNaN(qty)) {
                setQuantity(qty);
                setSelectedQty(qty);
              }
            }
          }}
          className="max-w-[120px]"
        />


        <div
          className="flex w-full justify-between pr-4"
          onClick={() => {
            const qty = Number(customQuantity);
            if (!isNaN(qty)) {
              handleSelect(qty);
            }
          }}
        >
          <span className="flex-1 text-neutral-500">Podaj własną wartość</span>
          {customQuantity != 0 &&
            selectedQty &&
            !quantities.some((q) => q.qty === selectedQty) && (
              <Check className="h-5 w-5 text-green-500 " />
            )}
        </div>
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
