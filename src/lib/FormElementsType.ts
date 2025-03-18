import { type SelectedSurfaceType } from "./SelectedSurfaceType";
import { type UploadedFile } from "./UploadedFileType";

export interface FormElementsType {
  id: number;
  onChange: (id: number, value: string | number) => void;
  filled?: string | number | SelectedSurfaceType | UploadedFile[];
  name?: string;
  info?: string;
  options?: string[];
  isImportant?: boolean;
  description?: string;
}
