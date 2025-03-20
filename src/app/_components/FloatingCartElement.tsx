"use client";

import { useState } from "react";
import { Edit, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Specification {
  name: string;
  value: string;
}

interface CartItem {
  id: string;
  specifications: Specification[];
  quantity: number;
}

interface FloatingCartElementProps {
  item: CartItem;
  isEditing: boolean;
  onEdit: () => void;
  onRemove: () => void;
  onUpdate: (updatedItem: CartItem) => void;
}

const FloatingCartElement = ({
  item,
  isEditing,
  onEdit,
  onRemove,
  onUpdate,
}: FloatingCartElementProps) => {
  const [editedItem, setEditedItem] = useState<CartItem>({ ...item });

  const handleSpecificationChange = (index: number, value: string) => {
    if (index >= 0 && index < editedItem.specifications.length) {
      const updatedSpecs = [...editedItem.specifications];
      updatedSpecs[index] = { ...updatedSpecs[index], value };
      setEditedItem({ ...editedItem, specifications: updatedSpecs });
    }
  };

  const handleQuantityChange = (value: string) => {
    const quantity = Number.parseInt(value) || 1;
    setEditedItem({ ...editedItem, quantity });
  };

  const handleSave = () => {
    onUpdate(editedItem);
  };

  const handleCancel = () => {
    setEditedItem({ ...item });
    onEdit();
  };

  // Group specifications by category
  const groupedSpecs: Record<string, Specification[]> = {};
  let currentCategory = "Podstawowe";

  item.specifications.forEach((spec) => {
    if (spec.name.includes("Kategoria")) {
      currentCategory = spec.name.replace("Kategoria ", "");
      return;
    }

    if (!groupedSpecs[currentCategory]) {
      groupedSpecs[currentCategory] = [];
    }

    groupedSpecs[currentCategory].push(spec);
  });

  return (
    <li className="mb-4">
      <Card className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <Badge variant="outline" className="px-2 py-1">
            Element {item.id.replace("item", "")}
          </Badge>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button size="icon" variant="ghost" onClick={handleSave}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={handleCancel}>
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button size="icon" variant="ghost" onClick={onEdit}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={onRemove}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {Object.entries(groupedSpecs).map(
          ([category, specs], categoryIndex) => (
            <div key={categoryIndex} className="mb-3">
              <h4 className="mb-1 text-sm font-medium">{category}</h4>
              <div className="grid grid-cols-1 gap-1">
                {specs.map((spec, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {spec.name}:
                      </span>
                      {isEditing ? (
                        <Input
                          className="ml-2 h-7 text-xs"
                          value={
                            editedItem.specifications.find(
                              (s) => s.name === spec.name,
                            )?.value ?? ""
                          }
                          onChange={(e) => {
                            const specIndex =
                              editedItem.specifications.findIndex(
                                (s) => s.name === spec.name,
                              );
                            if (specIndex !== -1) {
                              handleSpecificationChange(
                                specIndex,
                                e.target.value,
                              );
                            }
                          }}
                        />
                      ) : (
                        <span className="text-xs font-medium">
                          {spec.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {categoryIndex < Object.keys(groupedSpecs).length - 1 && (
                <Separator className="my-2" />
              )}
            </div>
          ),
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm">Ilość:</span>
          {isEditing ? (
            <Input
              type="number"
              className="h-8 w-16"
              min="1"
              value={editedItem.quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
            />
          ) : (
            <span className="font-medium">{item.quantity}</span>
          )}
        </div>
      </Card>
    </li>
  );
};

export default FloatingCartElement;
