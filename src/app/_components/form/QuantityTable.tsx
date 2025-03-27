"use client";

import React, { useEffect } from "react";
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
  filled,
  finalQuantity,
  setQuantity,
}: {
  setQuantity: (value: number) => void;
  finalQuantity: number;
  filled: number;
}) => {
  const quantities = [
    { qty: 1, unitPrice: "-/pc", totalPrice: "RFQ" },
    { qty: 2, unitPrice: "-/pc", totalPrice: "RFQ" },
    { qty: 5, unitPrice: "-/pc", totalPrice: "RFQ" },
    { qty: 10, unitPrice: "-/pc", totalPrice: "RFQ" },
    { qty: 50, unitPrice: "-/pc", totalPrice: "RFQ" },
    { qty: 100, unitPrice: "-/pc", totalPrice: "RFQ" },
  ];

  const [customQuantity, setCustomQuantity] = React.useState(
    quantities.some((item) => item.qty === Number(filled))
      ? ""
      : (filled ?? ""),
  );
  const [selectedQty, setSelectedQty] = React.useState<number | null>(
    quantities.some((item) => item.qty === Number(finalQuantity))
      ? finalQuantity
      : null,
  );

  useEffect(() => {
    if (!quantities.some((item) => item.qty === Number(finalQuantity))) {
      setCustomQuantity(finalQuantity.toString());
    } else {
      setCustomQuantity("");
    }
    setSelectedQty(finalQuantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalQuantity]);

  const handleSelect = (qty: number) => {
    setQuantity(qty);
    setSelectedQty(qty);
  };

  return (
    <div className="rounded-md bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[100px] text-center">Ilość</TableHead>
            <TableHead className="text-center">Cena jednostkowa</TableHead>
            <TableHead className="text-center">Cena całkowita</TableHead>
            <TableHead className="text-center">Wybrano</TableHead>
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
              <TableCell className="flex items-center justify-center text-center">
                {selectedQty === item.qty && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex cursor-pointer items-center gap-2 border-t p-3 hover:bg-gray-50">
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
          {customQuantity !== "" &&
            selectedQty &&
            !quantities.some((q) => q.qty === selectedQty) && (
              <Check className="h-5 w-5 text-green-500" />
            )}
        </div>
      </div>
      <div className="p-3 text-sm text-gray-500">
        Uwaga: Zamówienia hurtowe są wyceniane indywidualnie z najkorzystniejszą
        ceną. Cena jednostkowa maleje wraz ze wzrostem ilości. Podane ceny nie
        zawierają VAT i kosztów transportu.
      </div>
    </div>
  );
};

export default QuantityTable;
