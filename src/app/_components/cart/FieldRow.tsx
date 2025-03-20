// import type { SelectedSurfaceType, UploadedFile } from "@/types"
import { type SelectedSurfaceType } from "~/lib/SelectedSurfaceType";
import { type UploadedFile } from "~/lib/UploadedFileType";

interface FieldRowProps {
  name: string;
  value: string | number | SelectedSurfaceType | UploadedFile[];
}

export function FieldRow({ name, value }: FieldRowProps) {
  // Format the value based on its type
  const formattedValue = formatValue(value);

  return (
    <div className="flex items-center justify-between rounded-md bg-muted/30 p-2.5">
      <span className="text-sm font-medium">{name}:</span>
      <span className="ml-2 text-sm">{formattedValue}</span>
    </div>
  );
}

// Helper function to format different value types
function formatValue(
  value: string | number | SelectedSurfaceType | UploadedFile[],
): string {
  if (value === null || value === undefined) {
    return "Nie określono";
  }

  // Handle different types of values
  if (typeof value === "string" || typeof value === "number") {
    return value.toString();
  }

  // Handle SelectedSurfaceType
  if (typeof value === "object" && "category" in value) {
    // przed poprawa eslinta
    // const surface = value as SelectedSurfaceType;
    const surface = value;

    return `${surface.option}${surface.color ? ` (${surface.color})` : ""}`;
  }

  // Handle UploadedFile[]
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "Brak plików";
    }
    return `${value.length} ${value.length === 1 ? "plik" : "pliki"}`;
  }

  return "Nieznany format";
}
