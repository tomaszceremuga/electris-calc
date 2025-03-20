"use client";

import { Info, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FieldRow } from "./FieldRow";
import { type CartElementType } from "~/lib/CartElementType";
import { type FilledFormType } from "~/lib/FilledFormType";
import { type FormDataToGenerateType } from "~/lib/FormDataToGenerateType";
// import { useFormContext } from "~/lib/FormContext";
// import { useEffect } from "react";

interface CartItemProps {
  item: CartElementType;
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
  onShowDetails: (id: number) => void;
}

const INITIAL_FIELDS_TO_SHOW = 4;

export function CartItem({
  item,
  onEdit,
  onRemove,
  onShowDetails,
}: CartItemProps) {
  // const {generateForm,formCurrentState}=useFormContext()
  const filledForm = item.filledForm as FilledFormType;
  const formDataToGenerate = item.formDataToGenerate as FormDataToGenerateType;
  const importantFieldIds = formDataToGenerate.values
    .filter((field) => field.isImportant)
    .map((field) => field.id);

  const fieldsToShow = importantFieldIds
    .slice(0, INITIAL_FIELDS_TO_SHOW)
    .map((id) => {
      const formField = formDataToGenerate.values.find(
        (field) => field.id === id,
      );
      const filledValue = filledForm.values.find((value) => value.id === id);

      if (!formField || !filledValue) return null;

      return {
        name: formField.name,
        value: filledValue.value,
        id: formField.id,
      };
    })
    .filter(Boolean);

  const totalFields = formDataToGenerate.values.length;
  // useEffect(() => {
  //   console.log("Aktualny stan formularza:", formCurrentState);
  // }, [formCurrentState]);
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="mb-3 flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              onEdit(item.id)
              // generateForm(formDataToGenerate, filledForm);
            }}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edytuj</span>
          </Button>
          <Button
            variant="ghost"

            size="icon"
            onClick={() => onRemove(item.id)}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Usuń</span>
          </Button>
        </div>

        <div className="grid gap-2">
          {fieldsToShow.map((field, index) => (
            <FieldRow
              key={index}
              name={typeof field!.name == "string" && field ? field.name : ""}
              value={field!.value}
            />
          ))}
        </div>

        {totalFields > INITIAL_FIELDS_TO_SHOW && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 w-full text-xs font-medium"
            onClick={() => onShowDetails(item.id)}
          >
            <span className="flex items-center">
              Pokaż więcej szczegółów ({totalFields - INITIAL_FIELDS_TO_SHOW}){" "}
              <Info className="ml-1 h-4 w-4" />
            </span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
