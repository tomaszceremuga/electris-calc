"use client";

import type React from "react";
import { useState, useEffect } from "react";
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

const ThicknessTable = ({
  filled,
  setThickness,
}: {
  setThickness: (value: number) => void;
  finalThickness: number;
  filled: number;
}) => {
  const thicknessOptions = [0.8, 1.0, 1.2, 1.5, 2.0, 2.5, 3.0, 4.0];

  const mmToInch = (mm: number): string => {
    return (mm * 0.03937).toFixed(4);
  };

  const [inputValue, setInputValue] = useState<string>("");
  const [selectedThickness, setSelectedThickness] = useState<number | null>(
    null,
  );
  const [customSelected, setCustomSelected] = useState<boolean>(false);

  useEffect(() => {
    setSelectedThickness(filled);
    setInputValue(filled.toString());
  }, [filled]);

  const handleSelect = (thickness: number) => {
    setSelectedThickness(thickness);
    setCustomSelected(false);
    setThickness(thickness);
  };

  const handleCustomSelect = () => {
    const numValue = Number.parseFloat(inputValue);
    if (!isNaN(numValue) && inputValue.trim() !== "") {
      setSelectedThickness(numValue);
      setCustomSelected(true);
      setThickness(numValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setCustomSelected(false);
  };

  const handleInputBlur = () => {
    const numValue = Number.parseFloat(inputValue);
    if (!isNaN(numValue) && inputValue.trim() !== "") {
      setThickness(numValue);
      setSelectedThickness(numValue);
      setCustomSelected(true);
    }
  };

  return (
    <div className="rounded-md bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[100px] text-center">mm</TableHead>
            <TableHead className="text-center">inch</TableHead>
            <TableHead className="text-center">Select</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {thicknessOptions.map((thickness) => (
            <TableRow
              key={thickness}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSelect(thickness)}
            >
              <TableCell className="text-center font-medium">
                {thickness} mm
              </TableCell>
              <TableCell className="text-center">
                {mmToInch(thickness)}&quot;
              </TableCell>
              <TableCell className="flex items-center justify-center text-center">
                {selectedThickness === thickness && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
              </TableCell>
            </TableRow>
          ))}

          {/* Dodajemy wiersz dla opcji custom */}
          {inputValue.trim() !== "" && !isNaN(Number(inputValue)) && (
            <TableRow
              className="cursor-pointer hover:bg-gray-50"
              onClick={handleCustomSelect}
            >
              <TableCell className="text-center font-medium">
                {inputValue} mm
              </TableCell>
              <TableCell className="text-center">
                {mmToInch(Number(inputValue))} &quot;
              </TableCell>
              <TableCell className="flex items-center justify-center text-center">
                {customSelected && inputValue.trim() !== "" ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : null}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex cursor-pointer items-center gap-2 border-t p-3">
        <div className="flex items-center gap-2">
          <p>Podaj własną wartość</p>
          <Input
            type="text"
            inputMode="decimal"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="max-w-[80px]"
          />
          <span className="text-sm">mm</span>
          {inputValue.trim() !== "" && !isNaN(Number(inputValue)) && (
            <span className="text-sm text-gray-500">
              ({mmToInch(Number.parseFloat(inputValue))}&quot;)
            </span>
          )}
        </div>
      </div>

      <div className="p-3 text-sm text-gray-500">
        Note: Thickness values are shown in both millimeters (mm) and inches
        (&quot;). The selected value will be stored in millimeters.
      </div>
    </div>
  );
};

export default ThicknessTable;
